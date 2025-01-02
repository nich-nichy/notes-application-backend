const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/user.route.js");
const noteRoute = require("./routes/notes.route.js");

const { MONGO_URL, PORT, APP_URL } = process.env;
const port = PORT || 8081;

app.use(
    cors({
        origin: APP_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Middlewares
app.use(morgan("combined"));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(express.json());

mongoose.connect(MONGO_URL, {})
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.error(err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use("/", authRoute);
app.use("/notes", noteRoute);

app.get("/status", (req, res) => {
    res.send(`Backend for app is running on ${port}`);
});

app.use((req, res, next) => {
    const error = {
        status: 404,
        message: "Check route and method",
    };
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.log("ERROR", error);
    res.json({
        error: {
            message: error.message,
            status: error.status,
        },
    });
});