var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/app/views/index.html');
});

app.get('/login', function(req, res) {
	res.sendFile(__dirname + '/public/app/pages/auth/auth.html');
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Laluna server is running on port '+process.env.PORT);
	}
})