import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3 = new AWS.S3();

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "breakall",
    key: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
    acl: "public-read-write",
  }),
});
