const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const db = require("./db/db");
const { hash, compare } = require("../utils/bc");
const COOKIE_SECRET =
    process.env.COOKIE_SECRET || require("../secrets.json").COOKIE_SECRET;

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
            console.log("password", password);
            console.log("rows password", rows[0].password);
            compare(password, rows[0].password).then((auth) => {
                req.session.userId = userId;
                return res.json({
                    success: true,
                });
            });
        });
    }
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
