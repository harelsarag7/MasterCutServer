import { UploadedFile } from "express-fileupload";
import { s3bucket } from "../2-utils/dal";
import { RemoveBgResult, RemoveBgError, removeBackgroundFromImageFile, removeBackgroundFromImageUrl } from "remove.bg";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from 'dotenv'

dotenv.config({ path: ".env" });

export async function saveImagesToS3(file: any, imageId: string) {
    try {
        const type = file.name.split('.')[1];
        const params = {
            Body: file.data,
            Key: `${imageId}.${type}`,
            Bucket: 'master-cut'
        }
        await s3bucket.upload(params).promise()
        return params.Key
    } catch (err: any) {
        throw new Error(`S3 upload error: ${err.message}`)
    }
}

export async function deleteImageFromS3(imageId: string) {
    const params = { Bucket: 'master-cut', Key: imageId };
    try {
        const results = await s3bucket.deleteObject(params).promise();
        return results
    } catch (e) {
        console.log(e);
    }
}

export async function saveBase64ImageToS3(base64Image: string, imageId: string) {
    try {
        const data = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const type = base64Image.split(';')[0].split('/')[1];
        const params = {
            Body: data,
            Key: `${imageId}`,
            Bucket: 'master-cut'
        };
        await s3bucket.upload(params).promise();
        return params.Key;
    } catch (err: any) {
        throw new Error(`S3 upload error: ${err.message}`);
    }
}

export async function addImage(file: UploadedFile) {
    const uniq = uuidv4();
    const imageId = await saveImagesToS3(file, uniq);
    // console.log(imageId);
    const imageUrl = "https://master-cut.s3.us-east-1.amazonaws.com/" + imageId;
  
    try {
      const result = await removeBackgroundFromImageUrl({
        url: imageUrl,
        apiKey: process.env.REMOVEBGAPI,
        size: "regular",
        type: "auto",
      });
      const res = await saveBase64ImageToS3(result.base64img, "removed" + uniq + ".png");
      return {"originial": imageId, "removed": res};
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }