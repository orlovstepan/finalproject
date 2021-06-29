const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const db = require("./db/db");
const { hash, compare } = require("../utils/bc");
const multer = require("multer");
const s3 = require("../s3");
const uidSafe = require("uid-safe");
const COOKIE_SECRET =
    process.env.COOKIE_SECRET || require("../secrets.json").COOKIE_SECRET;

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename(req, file, callback) {
        uidSafe(24).then((uid) => {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage,
    limits: {
        fileSize: 2097152,
    },
});

app.use(compression());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

const cookieSessionMiddleware = cookieSession({
    secret: `COOKIE_SECRET`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
    sameSite: "strict",
});

app.use(cookieSessionMiddleware);

app.post("/register", (req, res) => {
    // console.log("register reqbody", req.body);
    const { first, last, email, password } = req.body;
    if (!first || !last || !email || !password) {
        return res.json({
            success: false,
        });
    } else {
        db.isInvited(email).then(({ rows }) => {
            // console.log("rows after isInvited", rows);
            if (!rows.length) {
                return res.json({
                    invited: false,
                });
            } else {
                hash(password)
                    .then((hashedPw) => {
                        return db.registerUser(first, last, email, hashedPw);
                    })
                    .then(({ rows }) => {
                        // console.log("rows in registerUser", rows);
                        req.session.userId = rows[0].id;
                        return res.json({
                            success: true,
                        });
                    })
                    .catch((e) => console.log("error in registration", e));
            }
        });
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({
            errorMsg: "Please fill out all the fields",
            success: false,
        });
    } else {
        let userId;
        return db.isUser(email).then(({ rows }) => {
            if (!rows[0]) {
                return res.json({
                    success: false,
                    errorMsg: "Can you check your credentials once again? :(",
                });
            }
            userId = rows[0].id;
            // console.log("password", password);
            // console.log("rows password", rows[0].password);
            compare(password, rows[0].password)
                .then((auth) => {
                    if (auth) {
                        req.session.userId = userId;
                        return res.json({
                            success: true,
                        });
                    }
                })
                .catch((e) => console.log("passwords don't match", e));
        });
    }
});

app.get("/api/flat-preview", (req, res) => {
    db.getFlatPreview()
        .then(({ rows }) => {
            // console.log("rows in getFlatPreview", rows);
            return res.json(rows);
        })
        .catch((e) => console.log("error on the server in getting flats", e));
});

app.post(
    "/upload-images",
    uploader.array("images", 5),
    s3.upload,
    (req, res) => {
        const { headline, description } = req.body;
        const filenames = req.files.map((file) => {
            return `https://s3.amazonaws.com/spicedling/${file.filename}`;
        });
        db.uploadFlatImage(
            req.session.userId,
            headline,
            description,
            ...filenames
        )
            .then(({ rows }) => res.json(rows))
            .catch((e) => console.log("error in upload-img", e));
    }
);

app.post("/invite", (req, res) => {
    db.inviteFriend(req.body.email)
        .then(({ rows }) => {
            // console.log("invitation success server");
            return res.json({ success: true });
        })
        .catch((e) => console.log("error in inviting a friend", e));
});

app.get("/api/flats/:id", (req, res) => {
    db.getFlatPage(req.params.id).then(({ rows }) => {
        console.log("rows in server", rows);
        res.json(rows);
    });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/#/login");
});

///////////////DONT TOUCH/////////////////////////////

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
