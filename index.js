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

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  const dateStr = req.params.date;
  if (!isNaN(Date.parse(dateStr))) {
    const dateObject = new Date(dateStr);
    res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  } else if (/\d{13}/.test(dateStr)) {
    let dateInt = parseInt(dateStr);
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else if (!req.params.date) {
    res.json({ unix: Date.now(), utc: Date() });
  } else {
    res.status(400).json({ error: "Invalid date" });
  }
});
// listen for requests :)
app.listen(5000, function () {
  console.log('Your app is listening on port 5000');
}) 
