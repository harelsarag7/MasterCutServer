import * as dotenv from 'dotenv'
import AWS from "aws-sdk"
dotenv.config({ path: ".env" });

// import mysql, { RowDataPacket } from "mysql2/promise";

// const pool = mysql.createPool({
//     host:  process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     port: +process.env.DB_PORT,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD
//     // waitForConnections: true,
//     // connectionLimit: 10,
//     // queueLimit: 0
//   });

//   export function execute<T>(query: string, params?: any[]){
//     return pool.execute<T & RowDataPacket[]>(query, params)
//   }

  export const s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESSKEYID,
    secretAccessKey: process.env.AWS_SECRETKEYACCESSKEY,
  });

