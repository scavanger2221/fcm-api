
import dotenv from "dotenv";
import {readFileSync} from "fs";
import path from 'path'

dotenv.config();

const __dirname = path.resolve();

const getConfigFromFile = (file) => {
    const configBuffer =  readFileSync(__dirname+"/"+file);
    const config = configBuffer.toString('ascii');
    return JSON.parse(config);
}

const createConfig = (config) => {
    const configs = {};
    for(let key of Object.keys(config)) {
        const configFile = getConfigFromFile(config[key]);
        configs[key] = configFile;
    }
    return configs;
}

const config  = {
    varash:process.env.FIREBASE_VARASH_CONFIG,
}

export const firebaseConfig = createConfig(config);