// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:time", function(req, res) {
  var raw_str = req.params['time'];
  var unix_num = null;
  var utc_string = null;

  if (raw_str.match("^[0-9]*$") != null) {
    unix_num = new Date(Number(raw_str)).valueOf();
    utc_string = new Date(Number(raw_str)).toUTCString();
  }

  else {
    unix_num = new Date(raw_str).valueOf();
    utc_string = new Date(raw_str).toUTCString();
  }

  res.json({"unix": unix_num, "utc": utc_string});
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
