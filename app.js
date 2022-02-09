require("dotenv").config();
var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
var path = require("path");
var Routes = require('./src/routes');
const helmet = require("helmet");
//khoi tao server express: 
const app = express();

//Cau hinh middleware: 
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use('static', express.static(path.join(__dirname, 'public')));

Routes(app);
require("./src/connectDb");
module.exports = app;