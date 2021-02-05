const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuidv4 = require('uuid/v4');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
});
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: process.env.S3_BUCKET,
        key: function(req, file, cb) {
            let new_filename = `${uuidv4()}.jpg`
            req.filename = `https://${process.env.S3_BUCKET}.s3.eu-central-1.amazonaws.com/${new_filename}`
            cb(null, new_filename);
        }
    })
});

module.exports = { upload: upload };