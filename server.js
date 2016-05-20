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
    data:[{
	id: 0, title: "A Good Sweet", description: "Good Sweet to rent description",
    created_date: "12569537329",
	modified_added: "12569537329",
	access_date:"12569537329", 
	country:"Iran", 
	city: "Hamedan",
	address: "No.1,Buali Ave.", 
	vote_up:10, vote_down:1, 
	comments:[{id:0,comment:"Very good Suite"}
	, {id:1,comment:"I liked it"}], 
	viewed: 10, 
	thumbnails: [
	{id: "0", url: "https://https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Zeitstempel_01.jpg/220px-Zeitstempel_01.jpg"},
	{id: "tbId", url: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Android_6.0.1_Home_Screen_Nexus_7.png/240px-Android_6.0.1_Home_Screen_Nexus_7.png"}]
	},
	{id: 1, title: "A Good Sweet", description: "Good Sweet to rent description",
    created_date: "12569537329",
	modified_added: "12569537329",
	access_date:"12569537329", 
	country:"Iran", 
	city: "Hamedan",
	address: "No.1,Buali Ave.", 
	vote_up:10, vote_down:1, 
	comments:[{id:0,comment:"Very good Suite"}
	, {id:1,comment:"I liked it"}], 
	viewed: 10, 
	thumbnails: [
	{id: "0", url: "https://https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Zeitstempel_01.jpg/220px-Zeitstempel_01.jpg"},
	{id: "tbId", url: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Android_6.0.1_Home_Screen_Nexus_7.png/240px-Android_6.0.1_Home_Screen_Nexus_7.png"}]
	}
	]
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


