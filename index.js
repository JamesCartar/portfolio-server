require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/connectDB.js");
const projectRouter = require("./routes/projectRoute.js");
const sendEmailRouter = require("./routes/sendEmailRouter.js");

const app = express();

const allowedOrigins = [
  "https://hh-portfolio.vercel.app",
  "http://localhost:3000",
  "https://www.heinhtet.me",
  "https://heinhtet.me",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the allowedOrigins array or if it's undefined (meaning it's not a cross-origin request)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
