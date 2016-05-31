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
        title: "A Good Sweet",
        description: "Good Sweet to rent description",
        created_date: "12569537329",
        modified_added: "12569537329",
        access_date: "12569537329",
        country: "Iran",
        city: "Hamedan",
        price: 240000,
        area: 124,
        nor: 2,
        address: "No.1, Buali Ave.",
        vote_up: 11,
        vote_down: 1,
        average_rate: 10,
        comments: [{id: 0, comment: "Very good Suite"}
            , {id: 1, comment: "I liked it"}],
        viewed: 10,
        thumbnails: [
            {
                id: "0",
                url: "assets/img/image1.bmp"
            },
            {
                id: "1",
                url: "assets/img/image2.bmp"
            },
            {
                id: "2",
                url: "assets/img/image3.bmp"
            },
            {
                id: "3",
                url: "assets/img/image4.bmp"
            },
            {
                id: "4",
                url: "assets/img/image5.bmp"
            },
            {
                id: "5",
                url: "assets/img/image1.bmp"
            }]
    },
        {
            id: 1, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Hamedan",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            price: 240000,
            area: 93,
            nor: 2,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/image1.bmp"},
                {
                    id: "1",
                    url: "assets/img/image1.bmp"
                }]
        },
        {
            id: 2, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Tehran",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            price: 240000,
            area: 24,
            nor: 2,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/image1.bmp"},
                {
                    id: "1",
                    url: "assets/img/image1.bmp"
                }]
        }
        ,
        {
            id: 3, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Isfahan",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            price: 240000,
            area: 114,
            nor: 2,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/image1.bmp"},
                {
                    id: "1",
                    url: "assets/img/image1.bmp"
                }]
        }
        ,
        {
            id: 4, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Shiraz",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            price: 240000,
            area: 44,
            nor: 2,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/image1.bmp"},
                {
                    id: "1",
                    url: "assets/img/image1.bmp"
                }]
        }
        ,
        {
            id: 5, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Shiraz",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            price: 240000,
            area: 60,
            nor: 2,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/image1.bmp"},
                {
                    id: "1",
                    url: "assets/img/image1.bmp"
                }]
        }
        ,
        {
            id: 6, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Hamedan",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            price: 240000,
            area: 91,
            nor: 2,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/image1.bmp"},
                {
                    id: "1",
                    url: "assets/img/image1.bmp"
                }]
        }
        ,
        {
            id: 7, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Tehran",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            price: 240000,
            area: 34,
            nor: 2,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/image1.bmp"},
                {
                    id: "1",
                    url: "assets/img/image1.bmp"
                }]
        }
        ,
        {
            id: 8, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Tehran",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            price: 240000,
            area: 45,
            nor: 2,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/image1.bmp"},
                {
                    id: "1",
                    url: "assets/img/image1.bmp"
                }]
        }
        ,
        {
            id: 9, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Mashhad",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            price: 240000,
            area: 104,
            nor: 2,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/image1.bmp"},
                {
                    id: "1",
                    url: "assets/img/image1.bmp"
                }]
        }
        ,
        {
            id: 10,
            title: "Another Good Sweet",
            description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Hamedan",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            price: 240000,
            area: 122,
            nor: 2,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/image1.bmp"},
                {
                    id: "1",
                    url: "assets/img/image1.bmp"
                }]
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
/*----------Server API -----------------------------*/
app.get('/all', function (req, res) {
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
        if (obj.hasOwnProperty('area_start') && obj.hasOwnProperty('area_end')) {
            if (value.area >= obj.area_start && value.area <= obj.area_end) {
                wrapFunction(value);
            }
        }
        if (obj.hasOwnProperty('price_start') && obj.hasOwnProperty('price_end')) {
            if (value.price >= obj.price_start && value.price <= obj.price) {
                wrapFunction(value);
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

});

app.post('/add_suite', function (req, res) {

});