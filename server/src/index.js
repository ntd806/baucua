// @flow
require('dotenv').config();
const http       = require('http');
const logger     = require('morgan');
const bodyParser = require('body-parser');
const express    = require('express');
const path       = require('path');
const hbs        = require('express-hbs');
const app        = express();
const cors = require('cors');

app.use(cors())

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

const server = http.createServer(app);
// const io = require('socket.io')(server);
// const HookProcessor = require('./hookProcessor');
// const LoadTester = require('./loadTester');
// const hookProcessor = new HookProcessor('116529085375415_566172007077785', io);
// const loadTester = new LoadTester(io);

app.get('/', (req, res) => {
    // res.send("Home page. Server running okay.");
    res.render('index');
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
const port = process.env.PORT || 3002;
server.listen(port, ip, function() {
    console.log("Express server listening at %s:%d ", ip, port);
});
