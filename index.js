require("dotenv").config();
var http = require("http");
var app = require("./app");
var port = process.env.PORT || 5000;

//khoi tao server http:
const httpServer = http.createServer(app);

httpServer.listen(port, () => console.log(`server running port ${port}`));