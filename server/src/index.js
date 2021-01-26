// @flow
const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, '/public')));

const server = http.createServer(app);
const io = require('socket.io')(server);

const HookProcessor = require('./hookProcessor');
const LoadTester = require('./loadTester');

const hookProcessor = new HookProcessor('116529085375415_566172007077785', io);
const loadTester = new LoadTester(io);

app.get('/', (req, res) => {
    res.send("Home page. Server running okay.");
});

// ROUTES
app.use('/game', require('./game/game.controller'));
app.use('/user', require('./user/user.controller'));
app.use('/admin', require('./admin/admin.controller'));

// For load testing
app.get('/load/:num', async(req, res) => {
    const numberOfUser = parseInt(req.params.num, 10) || 1000;
    await loadTester.runLoadTest(numberOfUser);
    res.status(200).send("OK");
});

app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === 'anh_hoang_dep_trai_vo_doi') {
        res.send(req.query['hub.challenge']);
        return;
    }
    res.send('Error, wrong validation token');
});

app.post('/webhook', async(req, res) => {
    const hookObject = req.body;
    console.log(JSON.stringify(hookObject, null, 2));
    await hookProcessor.processHook(hookObject);

    res.status(200).send("OK");
});


const ip = "127.0.0.1"; // process.env.IP || "127.0.0.1";
const port = 3002; // process.env.PORT || 3002;

server.listen(port, ip, function() {
    console.log("Express server listening at %s:%d ", ip, port, process.env.PORT);
});


// console.log(doten.env.PORT);