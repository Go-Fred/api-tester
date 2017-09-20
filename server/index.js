var dotenv = require('dotenv');
dotenv.config();
dotenv.load();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Smooch = require('smooch-core');

const app = express();
const PORT = process.env.PORT || 5000;
const KEY_ID = process.env.KEY_ID;
const SECRET = process.env.SECRET;
console.log(KEY_ID)
console.log(SECRET)


const smooch = new Smooch({
    keyId: KEY_ID,
    secret: SECRET,
    scope: 'app'
});

var yoPayload = null;
var appUserId;

// smooch.appUsers.get('784483d2107d53ff3a7ede50','ds')
// smooch.appUsers.get(appUserId)
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(bodyParser.json());


// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":response.appUser._id}');
});

app.get('/yo', function (req, res){
  console.log('yo PAYLOAD:\n', yoPayload)
  if(yoPayload != null){
    res.send(yoPayload)
  }
  else {
    res.send("Retry sending message")
  }
});

app.post('/messages', function(req, res) {
  if (req.body.trigger === 'message:appUser') {
    //console.log('webhook PAYLOAD:\n', JSON.stringify(req.body, null, 4));
    yoPayload = JSON.stringify(req.body, null, 4);
    appUserId = req.body.appUser._id;
    console.log(appUserId);
    console.log(req.body);
    res.sendStatus(200);
  }
});

app.post('/updateappuser', function(req, res) {
console.log(req.body)
res.sendStatus(200);
});

// Answer API requests.
app.get('/appuser', function (req, res) {
  console.log(appUserId);

  smooch.appUsers.get(appUserId)
  .then((response) => {
    res.send(response)
})
.catch((err) => {
    console.log('API ERROR:\n', err);
    res.end();
});
});

app.get('/postmessage/message/:message', function(req,res){
  var message = req.params.message

  var messageRequest = {
    type: 'text',
    text: message,
    role: 'appMaker',
    metadata: {"lang": "en-ca", "items": 3}
  }

  console.log(messageRequest)

  smooch.appUsers.sendMessage(appUserId, messageRequest).then((response) => {
    res.send(response)
}) ;
});

app.get('/postmessage/message/:message/button/:buttonMessage', function(req,res){
  var message = req.params.message
  var buttonMessage = req.params.buttonMessage


  messageRequest = {
    type: 'text',
    text: message,
    role: 'appMaker',
    metadata: {"lang": "en-ca", "items": 3},
    actions: [
      {
        type: 'link',
        text: buttonMessage,
        uri: 'http://example.com',
        metadata: {buttonId: 'vinegar'}
      }
    ]
  }
  console.log(messageRequest)

  smooch.appUsers.sendMessage(appUserId, messageRequest).then((response) => {
    res.send(response)
}) ;
});
// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
