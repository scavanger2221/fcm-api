import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import notificationRoute from "./firebase/routes";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.APP_PORT || 3000;

//server config
app.use(
  cors(),
  bodyParser.urlencoded({
    extended: true,
  }),
  bodyParser.json()
);

//register routes
app.use(
  notificationRoute
);

app.get("/", (req, res) => {
  res.send("Welcome to the fcm notification server");
});

app.listen(port, () => {
  console.log(`Web app listening on port ${port}`);
});
