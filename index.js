const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: __dirname + "/.env" });
const app = express();
const cors = require("cors");
const path = require("path");
const routes = require("./routes/router");
const fileUpload = require("express-fileupload");
const errorHandler = require("./utils/errorHandler");
const mailSender = require("./utils/Nodemailer");
const registrationSuccessfully = require("./templets/registrationSuccessfully");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
const PORT = process.env.PORT;

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1", routes);
app.use(errorHandler);

 app.use(express.static(path.join(__dirname, "build")));
 app.get("/*", (req, res) => {
   res.sendFile(path.join(__dirname, "build", "index.html"));
 });

// Routes
//app.get("/", async (req, res) => {
  //return res.status(200).json({
//    msg: "Everything is good!",
 // });
//});
app.get("/health", async (req, res) => {
  return res.status(200).json({
    msg: "Health is good!",
  });
});

// (async () => {
//   await mailSender(
//     'vermaanand278@gmail.com',
//     `Congcongratulations,Anand Kumar Verma!`,
//     registrationSuccessfully("Anand Kumar Verma", 'vermaanand278@gmail.com', "123")
//   ).then((re)=>{console.log(re)}).catch((e)=>{console.log(e)});
// })();
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});  
