import Data from "../models/data.models.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
    cloud_name: 'dwcvn48pf', 
    api_key: '625886177868176', 
    api_secret: 'Ed5eTfdx_sLKCsFeaeAfb209AEM' // Click 'View API Keys' above to copy your API secret
});

const uploadImageToCloudinary = async (localpath) => {
    try {
      const uploadResult = await cloudinary.uploader.upload(localpath, {
        resource_type: "auto",
      });
      fs.unlinkSync(localpath);
      return uploadResult.url;
    } catch (error) {
      fs.unlinkSync(localpath);
      return null;
    }
  };

const addData = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    res.status(400).json({
      message: "title required",
    });
    return;
  }
  if (!description) {
    res.status(400).json({
      message: "description required",
    });
    return;
  }
  
  const data = Data.create({
    title,
    description,
  });
  res.status(201).json({
    message: "data added to database successfully",
  });
};


const uploadImage = async (req, res) => {
    if (!req.file)
      return res.status(400).json({
        message: "no image file uploaded",
      });
  
    try {
      const uploadResult = await uploadImageToCloudinary(req.file.path);
  
      if (!uploadResult)
        return res
          .status(500)
          .json({ message: "error occured while uploading image" });
  
      res.json({
        message: "image uploaded successfully",
        url: uploadResult,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error occured while uploading image" });
    }
  };

  

export {uploadImage , addData}