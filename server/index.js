var dotenv = require("dotenv");
dotenv.config();
dotenv.load();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Smooch = require("smooch-core");

const app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var superagent = require("superagent");
var jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 5000;
const KEY_ID = process.env.KEY_ID;
const SECRET = process.env.SECRET;
const APP_ID = process.env.APP_ID;
var token = jwt.sign({
    scope: 'app'
},
    SECRET,
    {
        header: {
            alg: 'HS256',
            kid: KEY_ID
        }
    });

console.log(KEY_ID);
console.log(SECRET);

const smooch = new Smooch({
  keyId: KEY_ID,
  secret: SECRET,
  scope: "app"
});

var messagePayload = null;
var appUserId;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));
app.use(bodyParser.json());

// Answer API requests.
app.get("/api", function(req, res) {
  res.set("Content-Type", "application/json");
  res.send('{"message":response.appUser._id}');
});

app.post("/messages", function(req, res) {
  if (req.body.trigger === "message:appUser") {
    console.log(req.body);
    messagePayload = JSON.stringify(req.body, null, 4);
    appUserId = req.body.appUser._id;
    io.emit("message", messagePayload);
    res.sendStatus(200);
  }
});

// app.get('/yo', function (req, res){
//   console.log('yo PAYLOAD:\n', yoPayload)
//   if(yoPayload != null){
//     res.send(yoPayload)
//   }
//   else {
//     res.send("Retry sending message")
//   }
// });

app.post("/updateappuser", function(req, res) {
  console.log(req.body);

  smooch.appUsers.update(appUserId, req.body).then(response => {
    res.send(response);
  });
});

app.post("/getchannels", function(req, res) {
  console.log(req.body);

  if (req.body) {
    superagent
      .get("https://api.smooch.io/v1/apps/"+ APP_ID +"appusers/" + req.body + "/channels")
      .set("authorization", "Bearer " + token)
      .set("Accept", "application/json")
      .end(function(err2, postres) {
        console.log(err2, postres.body, postres.statusCode);
      });
  } else {
    superagent
      .get("https://api.smooch.io/v1/apps/"+ APP_ID +"appusers/" + userId + "/channels")
      .set("authorization", "Bearer " + token)
      .set("Accept", "application/json")
      .end(function(err2, postres) {
        console.log(err2, postres.body, postres.statusCode);
      });
    });
  }
});

// Answer API requests.
app.get("/appuser", function(req, res) {
  console.log(appUserId);

  smooch.appUsers
    .get(appUserId)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log("API ERROR:\n", err);
      res.end();
    });
});

app.get("/deleteuserprofile", function(req, res) {
  smooch.appUsers
    .deleteProfile(appUserId)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log("API ERROR:\n", err);
      res.end();
    });
});

app.get("/postmessage/message/:message", function(req, res) {
  var message = req.params.message;

  var messageRequest = {
    type: "text",
    text: message,
    role: "appMaker",
    metadata: { lang: "en-ca", items: 3 }
  };

  console.log(messageRequest);

  smooch.appUsers.sendMessage(appUserId, messageRequest).then(response => {
    res.send(response);
  });
});

app.get("/postmessage/message/:message/button/:buttonMessage", function(
  req,
  res
) {
  var message = req.params.message;
  var buttonMessage = req.params.buttonMessage;

  messageRequest = {
    type: "text",
    text: message,
    role: "appMaker",
    metadata: { lang: "en-ca", items: 3 },
    actions: [
      {
        type: "link",
        text: buttonMessage,
        uri: "http://example.com",
        metadata: { buttonId: "vinegar" }
      }
    ]
  };
  console.log(messageRequest);

  smooch.appUsers.sendMessage(appUserId, messageRequest).then(response => {
    res.send(response);
  });
});
// All remaining requests return the React app, so it can handle routing.
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
});

server.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});

io.on("connection", function(socket) {
  socket.emit("server ready", console.log("server ready"));
});
