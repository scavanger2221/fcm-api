import express from "express";
import * as dotenv from "dotenv";
import {addNewData, sendNotification} from "./firebase/services/firebase.service.js";
import {createNotificationSchema} from "./firebase/validations/index.js";
import { validationResult } from "express-validator";
import bodyParser from "body-parser";

dotenv.config();
const app = express()
const port = process.env.APP_PORT || 3000

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/notification/', createNotificationSchema ,async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const data = req.body;
    const newData =  await addNewData(data, "notifications");
    
    //send notification
    await sendNotification(data);

    res.send(newData);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})