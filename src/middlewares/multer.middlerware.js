import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, req, "./public/temp");
  },
  filename: function (req, file, cb) {
    const unique_suffix = Date.now().toString().substr(2);
    cb(null, file.originalname + unique_suffix);
  },
});
export const upload = multer({ storage: storage });
