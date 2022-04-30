import {Router} from "express";
import { matchedData, validationResult } from "express-validator";
import { addNewData, sendNotification } from "../services";
import { createNotificationSchema } from "../validations";

const router = Router();

router.post("/notification/:app", createNotificationSchema, async (req, res) => {

    console.log(req.params.app);

    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    const payload = matchedData(req);
  
    const app = req.params.app;

    const newData = await addNewData(payload, "notifications", app);
    //send notification
    await sendNotification(payload, app);
  
    res.send(newData);
  });
  
export default router;