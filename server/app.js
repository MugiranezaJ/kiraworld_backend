import express from "express";
import bodyParser from "body-parser";
import routes from './routes'
import dotenv from 'dotenv'
import cors from 'cors'
import { initialize } from './models';
// require('dotenv').config()

const app = express();

dotenv.config()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/v1', routes)

const db = initialize().then((db) => {
  db.sequelize.sync({force: false});
}).catch((err) => {
  console.log(err.message)
})

// Initialize with your API keys


app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am using babel in NodeJS!",
    status: "success",
  });
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log("server up and running " + PORT);
});