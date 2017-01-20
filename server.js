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
var url = require("url");
var queryString = require("querystring");
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join(__dirname, 'client')));

var server = require('http').Server(app);

server.listen(app.get('port'), function () {
    console.log('App is running on port', app.get('port'));
});

/*------------------Sample Data--------------------------------*/
var data = {
    suites: [{
        id: 0,
        title: "یک سوییت خوب",
        description: "توضیح یک سوییت خوب",
        created_date: "12569537329",
        modified_added: "12569537329",
        access_date: "12569537329",
        country: "ایران",
        city: "همدان",
        price: 240000,
        area: 124,
        nor: 2,
        address: "خیابان بوعلی شماره ۱۸",
        vote_up: 11,
        vote_down: 1,
        average_rate: 10,
        comments: [{id: 0, comment: "سوییت خوبی بود"}
            , {id: 1, comment: "بسیار مرتب و تمیز بود"}],
        viewed: 10,
        thumbnails: [
            {
                id: "0",
                url: "http://cdn.zavaran.com/zavaran/images/slides/flex2.jpg"
            },
            {
                id: "1",
                url: "http://s4.picofile.com/file/8179036292/1379838460_%D9%87%D8%AA%D9%84_%D8%AF%D8%B1%D9%88%DB%8C%D8%B4%DB%8C_%D9%85%D8%B4%D9%87%D8%AF.jpg"
            },
            {
                id: "2",
                url: "http://www.iran-booking.com/SystemUpload/hotels/boshra-hotel-apartment-mashhad-room.jpg"
            }]
              
        }]
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

function interceptor(req, res, next) {
    res.setHeader('charset','UTF-8');
    next();
}

/*----------Server API -----------------------------*/
app.get('/all', interceptor, function (req, res) {
    res.status(200).json(data);
});

app.get('/suite/:id', function (req, res) {
    if (!req.params.id) {
        return res.status(403).send('{error:"unauthorized"}');
    }
    var id = req.params.id;
    res.status(200).json(data.suites[id]);
});

app.post('/vote_up', function (req, res) {
    if (!req.body || !req.body.id) {
        return res.status(403).send('{error:"unauthorized"}');
    }
    var id = req.body.id;
    if (data.suites[id].vote_up >= 0) {
        data.suites[id].vote_up += 1;
        data.suites[id].average_rate = (parseInt(data.suites[id].vote_up) - parseInt(data.suites[id].vote_down));
    }
    res.status(200).json(data.suites[id]);
});

app.post('/vote_down', function (req, res) {
    if (!req.body || !req.body.id) {
        return res.status(403).send('{error:"unauthorized"}');
    }
    var id = req.body.id;
    if (data.suites[id].vote_down >= 0) {
        data.suites[id].vote_down += 1;
        data.suites[id].average_rate = (parseInt(data.suites[id].vote_up) - parseInt(data.suites[id].vote_down));
    }
    res.status(200).json(data.suites[id]);
});

app.post('/comment', function (req, res) {
    var theUrl = url.parse(req.url);
    console.log(theUrl);

    var queryObj = queryString.parse(theUrl);
    var obj = JSON.parse(queryObj);
    if (!req.body || !req.body.id || !req.body.value) {
        return res.status(403).send('{error:"unauthorized"}');
    }
    var comment = req.body.value;
    var id = req.body.id;
    if (data.suites[id]) {
        data.suites[id].comments.push({id: data.suites[id].comments.length, comment: comment});
    }
    res.status(200).send(data.suites[id]);
});

app.get('/delete_suite', function (req, res) {
    if (!req.body || !req.body.id) {
        return res.status(403).send('{error:"unauthorized"}');
    }
    var id = req.body.id;

});

app.post('/update_suite', function (req, res) {

});

app.post('/search_suite', function (req, res) {
    var theUrl = url.parse(req.url);
    var queryObj = queryString.parse(theUrl.query);
    var obj = JSON.parse(queryObj.search);
    var result = {
        suites: []
    };

    var wrapFunction = function (data) {
        var found = false;
        result.suites.map(function (info) {
            if (info.id === data.id) {
                found = true;
            }
        });
        if (!found) {
            result.suites.push(data);
        }
    };

    data.suites.map(function (value) {
        if (obj.hasOwnProperty('average_rate')) {
            if (value.average_rate === obj.average_rate) {
                wrapFunction(value);
            }
        }
        if (obj.hasOwnProperty('area')) {
            if (Array.isArray(obj.area) && obj.area.length === 2)
                if (value.area >= obj.area[0] && value.area <= obj.area[1]) {
                    wrapFunction(value);
                }
        }
        if (obj.hasOwnProperty('price')) {
            if (Array.isArray(obj.price) && obj.price.length === 2) {
                if (value.price >= obj.price[0] && value.price <= obj.price[1]) {
                    wrapFunction(value);
                }
            }
        }
        if (obj.hasOwnProperty('nor')) {
            if (value.nor === obj.nor) {
                wrapFunction(value);
            }
        }
        if (obj.hasOwnProperty('city')) {
            var expression = /\obj.city/gi;
            if (value.city.indexOf(obj.city) || value.city.match(expression)) {
                wrapFunction(value);
            }
        }
        if (obj.hasOwnProperty('country')) {
            if (value.country.indexOf(obj.country)) {
                wrapFunction(value);
            }
        }
        if (obj.hasOwnProperty('title')) {
            if (value.title.indexOf(obj.title)) {
                wrapFunction(value);
            }
        }
    });

    res.json(result);
    /*data.suites.map(function (value) {
     console.log('----------');
     console.log(value);
     });*/

})
;

app.post('/add_suite', function (req, res) {

});
