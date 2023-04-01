import express, { json } from 'express';
import { catchAll } from './3-middleware/error-handle';
import { logRequest } from './3-middleware/log';
import cors from "cors";
import * as dotenv from 'dotenv';

import fileUpload from 'express-fileupload';
import { uploadRouter } from './6-controllers/upload-controller';

dotenv.config({ path: ".env" });

const server = express();
server.use(cors())
server.use(json());
server.use(fileUpload())
server.use(logRequest);

server.use(uploadRouter);

server.use(catchAll);

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
});