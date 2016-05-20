/**
 * Created by metao on 5/16/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var path = require('path');
var http = require('http');
var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 3000));

var server = require('http').Server(app);

server.listen(app.get('port'), function () {
    console.log('App is running on port', app.get('port'));
});

/*------------------Sample Data--------------------------------*/
var data = {
    id: "0", title: "A Sweet", description: "Good Sweet ro rent description", number: "10",
    address: "n/a", date: "date", city: "Hamedan", thumbnails: [{id: "tbId", url: "tbUrl"}]
};

/*------------Server Log Config -----------------------------*/
var logDirectory = __dirname + '/log';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: logDirectory + '/log_%DATE%.log',
    frequency: 'daily',
    verbose: false
});
app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'/*, {stream: accessLogStream}*/));
app.use(assignId);

function createUUID() {
    return 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function assignId(req, res, next) {
    req.id = createUUID();
    next();
}
logger.token('id', function getId(req) {
    return req.id;
});

/*----------Server methods -----------------------------*/
app.get('/allsweets', function (req, res) {
    var json = JSON.stringify(data);
    res.status(200).send(json);
});


