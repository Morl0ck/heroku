var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy$/,
      wooRegex = /\bwoo+\b/i,
      savageRegex = /\bsavage\b/i;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    var botResponse = cool();
    postMessage(botResponse);
    this.res.end();
  }
  else if (request.text && wooRegex.test(request.text)) {
    this.res.writeHead(200);
    var gifUrl = getWooGif();
    postMessage(gifUrl);
    this.res.end();
  } else if (request.text && savageRegex.test(request.text)) {
    this.res.writeHead(200);
    var gifUrl = getSavageGif();
    postMessage(gifUrl);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function getWooGif() {
  var gifs = [
    "https://media.giphy.com/media/HNhsFOGQqDLR6/giphy.gif",
    "https://media.giphy.com/media/V80llXf734WzK/giphy.gif",
    "https://media.giphy.com/media/yUI3a7RwLhOFy/giphy.gif",
    "https://media.giphy.com/media/125WvQGXcUfEBy/giphy.gif",
    "https://media.giphy.com/media/EHz0YB2dw6rGU/giphy.gif",
    "https://media.giphy.com/media/FXo3Din7pWybK/giphy.gif"
  ];

  var rand = Math.round(Math.random()*5);

  return gifs[rand];
}

function getSavageGif() {
  var gifs = [
    "https://media.giphy.com/media/BaSHs78BU2ZYQ/giphy.gif",
    "https://media.giphy.com/media/rRGMu2D3QV2cU/giphy.gif",
    "https://media.giphy.com/media/12k3XRGaPqjdja/giphy.gif",
    "https://media.giphy.com/media/wlxNmckePXGnK/giphy.gif", 
    "https://media.giphy.com/media/d1MTUu7cK4fjG/giphy.gif", 
    "https://media.giphy.com/media/AH0lMIxxUen6/giphy.gif",
    "https://media.giphy.com/media/AobQDNI4K7a4U/giphy.gif"
  ];

  var rand = Math.round(Math.random()*6);

  return gifs[rand];
}

function postMessage(botResponse) {
  var options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;