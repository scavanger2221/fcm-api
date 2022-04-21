import {Router} from "express";
import { matchedData, validationResult } from "express-validator";
import { addNewData, sendNotification } from "../services";
import { createNotificationSchema } from "../validations";

const router = Router();

router.route('api');

router.post("/notification/", createNotificationSchema, async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    const payload = matchedData(req);
  
    const newData = await addNewData(payload, "notifications");
    //send notification
    await sendNotification(payload);
  
    res.send(newData);
  });
  
export default router;