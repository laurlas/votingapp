const app = require('express')();
const server = require('http').createServer(app);
const url = require('url');
const ws = require('socket.io')(server);
const path = require('path');

var clients = [];
var statistics = {};
const express = require('express');
app.use(express.static(__dirname + "/"));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

statistics['George'] = 0;
statistics['Maria'] = 0;
statistics['John'] = 0;
statistics['Joanna'] = 0;
ws.on('connection', function connection(ws) {
console.log(ws);
    clients.push(ws);
    for (client in clients) {
        try {
            clients[client].emit('message',JSON.stringify(statistics));
        }catch (e){

        }
    }
    ws.on('message', function incoming(message) {
        if (message == 'George' || message == 'Maria' || message == 'John' || message == 'Joanna') {
            statistics[message] += 1;
            for (client in clients) {
                try {
                    clients[client].emit('message', JSON.stringify(statistics));
                }catch (e){
                    console.log("error")
                }
            }
        }
    });
});
var port = process.env.PORT || 1337;
server.listen(port);