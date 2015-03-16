var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({port : 6000});

var clients = [];

server.on("connection", function(ws) {

  clients.push(ws);

  ws.on("close", function() {
    var x = clients.indexOf(ws);
    clients.splice(x,1);
    console.log("Clients connected: " + clients.length);
  });

  ws.on("message", function(input) {

    processedInput = JSON.parse(input);
    console.log(processedInput.name + " : " + processedInput.text);

    for (i = 0; i < clients.length; i++) {
      clients[i].send(input);
    }

  });
});
console.log("listening on port 6000!")
