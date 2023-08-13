const express = require("express");
const dotenv = require("dotenv").config();
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

//db connection
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connection"))
    .catch((err) => console.log("Database not connected", err));

const app = express();
const port = 8000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/", require("./routes/authRoutes"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
