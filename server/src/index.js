// @flow
require('dotenv').config();
const http       = require('http');
const logger     = require('morgan');
const bodyParser = require('body-parser');
const express    = require('express');
const path       = require('path');
const hbs        = require('express-hbs');
const app        = express();
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   if ('OPTIONS' == req.method) {
//      res.sendStatus(200);
//    }
//    else {
//      next();
//    }});

  // Set to true if you need the website to include cookies in the requests sent

// Set to true if you need the website to include cookies in the requests sent
// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
    //partialsDir: path.join(__dirname, '/views/partials'),
    // OPTIONAL settings
    defaultLayout: path.join(__dirname, '/views/layouts/layout.hbs'),
    extname: ".hbs",
    layoutsDir: path.join(__dirname, '/views/layouts'),
    // override the default compile
    onCompile: function(exhbs, source, filename) {
      var options;
      if (filename && filename.indexOf('partials') > -1) {
        options = {preventIndent: true};
      }
      return exhbs.handlebars.compile(source, options);
    }
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname + '/public')));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
});

const server = http.createServer(app);
// const io = require('socket.io')(server);
// const HookProcessor = require('./hookProcessor');
// const LoadTester = require('./loadTester');
// const hookProcessor = new HookProcessor('116529085375415_566172007077785', io);
// const loadTester = new LoadTester(io);

app.get('/', (req, res) => {
    res.send("Home page. Server running okay.");
    // res.render('index');
});
// ROUTES GAME OFFLINE
app.use('/game', require('./game/game.controller'));
app.use('/user', require('./user/user.controller'));
app.use('/admin', require('./admin/admin.controller'));

// For load testing game
// app.get('/load/:num', async(req, res) => {
//     const numberOfUser = parseInt(req.params.num, 10) || 1000;
//     await loadTester.runLoadTest(numberOfUser);
//     res.status(200).send("OK");
// });

// app.get('/webhook', function(req, res) {
//     if (req.query['hub.verify_token'] === 'GameBet') {
//         res.send(req.query['hub.challenge']);
//         return;
//     }
//     res.send('Error, wrong validation token');
// });

// app.post('/webhook', async(req, res) => {
//     const hookObject = req.body;
//     console.log(JSON.stringify(hookObject, null, 2));
//     await hookProcessor.processHook(hookObject);

//     res.status(200).send("OK");
// });

// Config server here
const ip = process.env.IP || "127.0.0.1";
const port = process.env.PORT || 3000;
server.listen(port, ip, function() {
    console.log("Express server listening at %s:%d ", ip, port, process.env.PORT);
});
