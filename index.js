// index.js
// where your node app starts

// init project
// var express = require('express');
import express from "express";
import cors from "cors";
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// app.get("/api/:date", (request, response) => {
//   const { date } = request.params;

//   // if (isNaN(date)) return response.status(400).json({ error: "Invalid Date" });

//   response.json({
//     unix: Number(new Date(date)),
//     utc: new Date(date).toUTCString(),
//   });
// });

app.get("/api/:date?", (request, response) => {
  const { date } = request.params;
  let dateObj;
  if (!date) {
    dateObj = new Date();
    console.log(dateObj);
  } else {
    if (!isNaN(date)) {
      dateObj = new Date(Number(date));
      console.log(dateObj);
    } else {
      dateObj = new Date(date);
      console.log(dateObj);
    }
  }

  if (isNaN(dateObj.getTime())) {
    return response.json({ error: "Invalid Date" });
  } else {
    console.log(dateObj);
    return response.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString(),
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
