
import dotenv from "dotenv";
import {readFileSync} from "fs";
import path from 'path'

dotenv.config();

const __dirname = path.resolve();

//load config file
const varashConfigBuffer= readFileSync(__dirname+"/"+process.env.FIREBASE_VARASH_CONFIG);
const varashConfig = varashConfigBuffer.toString('ascii');

export const firebaseConfig = {
    varash: JSON.parse(varashConfig),
}