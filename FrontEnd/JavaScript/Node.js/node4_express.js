var express = require('express');
var app = express();
var router = require('./node4_router');

app.use("/",router);
app.set("views","./");
app.set("view engine","ejs");
// app.engine("html",require("ejs").renderFile);

app.listen(3000, function () {
	console.log("Express server has started on port 3000");
});