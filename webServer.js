import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import mongoose from "mongoose";
import session from "express-session";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

import cors from "cors"

import apirouter from "./app/controllers/routes/api.js";


import adminrouter from "./app/controllers/routes/admin.js";

dotenv.config();
mongoose.Promise = Promise;

mongoose.connect(process.env.DB);

const portno = 3000;
const app = express();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

app.use(express.static(_dirname));
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }));

app.use("/api", apirouter);
app.use("/admin", adminrouter);

var server = app.listen(portno, function () {
  var port = server.address().port;
  console.log("Listening at http://localhost/:" + port);
});
