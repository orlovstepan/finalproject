const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    console.log("req.files", req.files);
    if (!req.files) {
        //there's no file to upload, smth went wrong with multer
        return res.sendStatus(500);
    }

    const promises = [];

    for (let i = 0; i < req.files.length; i++) {
        const { filename, mimetype, size, path } = req.files[i];

        const promise = s3
            .putObject({
                Bucket: "spicedling",
                ACL: "public-read",
                Key: filename,
                Body: fs.createReadStream(path),
                ContentType: mimetype,
                ContentLength: size,
            })
            .promise();

        promise
            .then(() => {
                // it worked!!!
                console.log("image is in the cloud!");
                fs.unlink(path, () => {});
            })
            .catch((err) => {
                // uh oh
                console.log(
                    "something went wrong in the uploads to the cloud:",
                    err
                );
                res.sendStatus(500);
            });
        promises.push(promise);
    }
    Promise.all(promises).then(() => next());
};
