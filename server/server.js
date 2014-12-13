var express = require("express");
var parser = require("body-parser");
var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.engine('.html', require("ejs").__express);
app.set('view engine', 'html');
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.use(allowCrossDomain);

var users = [];

app.get( "/get/data" , function ( request , response ) {
	response.json(
		users
	);
} );

app.post( "/post/data" , function ( request , response ) {
	users.push( request.body );
	response.json(
		request.body
	);
} );

app.listen(process.env.PORT || 8000);