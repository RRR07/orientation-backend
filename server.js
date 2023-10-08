const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const DBpass = process.env.DBpass;

const port = 3000;
const dataSchema = new mongoose.Schema({
  fullName: String,
  branch: String,
  email: String,
  prn: String,
  rollno: String,
});

const data = mongoose.model("data", dataSchema);

mongoose.connect(
  `mongodb+srv://edcviit:${DBpass}@cluster0.koohght.mongodb.net/FirstYearOrientation`
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/submit", async (req, res) => {
  const { name, branch, email, prn, rollno } = req.body;

  const student = await data.findOne({ email });
  if (student) {
    res.status(403).json({ message: "Form already filled by this email" });
  } else {
    const newData = new data({ fullname: name, branch, email, prn, rollno });
    await newData.save();
    // console.log(newData);

    res.status(200).send("Registration successful!");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
