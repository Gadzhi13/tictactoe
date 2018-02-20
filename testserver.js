var http = require("http");
var fs = require("fs");
var port = process.argv[2];
var serv = http.createServer(function(req,res){
	res.writeHead(200, {"Content-Type": "text/html","Cache-Control":"no-cache, must-revalidate"});
	console.log(req.url);
	if (req.url.length > 3) {
		var file = fs.createReadStream("." + req.url);
		file.on("error", function (err) {console.log("Cannot read file " + err);});
		console.log("Sending: " + req.url)
		file.pipe(res);
	}
	res.on("error", function(err) {console.error(err)});
	res.on("end", function() {
		console.log("Done");
	});
});
serv.on("error", function(err) {console.log(err)});
serv.listen(port, function(){
	console.log("server listening on port: " + port);
});
