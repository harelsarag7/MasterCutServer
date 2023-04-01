import express from "express";
import { UploadedFile } from "express-fileupload";
import { addImage } from "../5-logic/aws-logic";

export const uploadRouter = express.Router();

uploadRouter.post('/upload/add', async (req, res, next) => {
    const file: any = req.files["image"];
    const images = await addImage(file);
    console.log(images);
    res.json(images).status(200);
  });
  
  
  
  
  
