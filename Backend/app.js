const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");

const app = express();
dotenv.config({path: "./config.env"});


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const route = require("./routes/route");

mongoose.connect(process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD), {
        useNewUrlParser: true,
    }
).then(() => console.log('Connected to Database!'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // * means all
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // * means all
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); // * means all
        return res.status(200).json({});
    }
    next();
});

app.use('/api', route);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;