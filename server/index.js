const dotenv = require("dotenv");
dotenv.config();
dotenv.load();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Smooch = require("smooch-core");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const superagent = require("superagent");
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 5000;
const KEY_ID = process.env.KEY_ID;
const SECRET = process.env.SECRET;
const APP_ID = process.env.APP_ID;
const SERVICE_URL = process.env.SERVICE_URL + "/v1" || 'https://app.smooch.io/v1';
const token = jwt.sign(
  {
    scope: 'app'
<<<<<<< HEAD
  },
  SECRET,
  {
    header: {
      alg: 'HS256',
      kid: KEY_ID
    }
  }
);
=======
},
    SECRET,
    {
        header: {
            alg: 'HS256',
            kid: KEY_ID
        }
    });
>>>>>>> Remove crap secret

console.log(KEY_ID);
console.log(SECRET);

const smooch = new Smooch(
  {
    keyId: KEY_ID,
    secret: SECRET,
    scope: "app",
  },
  {
    serviceUrl: SERVICE_URL
  }
);

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

app.post("/updateappuser", function(req, res) {
  console.log(req.body);

  smooch.appUsers.update(appUserId, req.body).then(response => {
    res.send(response);
  });
});

app.post("/getchannels", function(req, res) {
  console.log(req.body);
  console.log(req.body.userId);
  console.log(SERVICE_URL + "/apps/" + APP_ID + "/appusers/" + appUserId + "/channels")
  if(req.body.userId === ""){
    console.log("going to Smooch")
      superagent
        .get(SERVICE_URL + "/apps/" + APP_ID + "/appusers/" + appUserId + "/channels")
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json")
        .then(response => {
          res.send(response.text);
        })
        .catch(err => {
          console.log("API ERROR:\n", err);
          res.end();
        });
  } else {
      superagent
        .get(SERVICE_URL + "/apps/" + APP_ID + "/appusers/" + req.body.userId + "/channels")
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json")
        .then(response => {
          res.send(response.text);
        })
        .catch(err => {
          console.log("API ERROR:\n", err);
          res.end();
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
