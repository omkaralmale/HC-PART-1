import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const upload_file = async (localFilePath) => {
  const uploadResult = await cloudinary.uploader
    .upload(localFilePath, {
      resource_type: "auto",
      quality: "auto",
    })
    .then(() => {
      console.log("file uploaded on cloudinary");
      return uploadResult;
    })
    .catch((error) => {
      console.log(error);
      // remove locally saved file when upload failed
      fs.unlinkSync(localFilePath);
    });
};
