require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/connectDB.js");
const projectRouter = require("./routes/projectRoute.js");
const sendEmailRouter = require("./routes/sendEmailRouter.js");

const app = express();

app.use(
  cors({
    origin: [
      "https://hh-portfolio.vercel.app",
      "http://localhost:3000",
      "https://heinhtet.me",
      "https://www.heinhtet.me",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Welcom from portfolio api :)" });
});

app.use("/projects", projectRouter);
app.use("/send_email", sendEmailRouter);

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(5000, () => {
      console.log("Server is listening on port http://localhost:5000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
