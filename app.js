var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("query");
});

app.get("/results", function(req, res){
	console.log(req.query);
	var searchTerm = req.query.term;
	console.log(searchTerm);
	var url = "http://www.omdbapi.com/?s=" + searchTerm + "&apikey=thewdb";

	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("results", {data: data});;
		}
	});
});

app.listen(8080, function(){
	console.log("Movie App has started");
});