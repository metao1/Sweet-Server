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
app.use(express.static(path.join(__dirname, 'client')));

var server = require('http').Server(app);

server.listen(app.get('port'), function () {
    console.log('App is running on port', app.get('port'));
});

/*------------------Sample Data--------------------------------*/
var data = {
    suites: [{
        id: 0, title: "A Good Sweet", description: "Good Sweet to rent description",
        created_date: "12569537329",
        modified_added: "12569537329",
        access_date: "12569537329",
        country: "Iran",
        city: "Hamedan",
        address: "No.1,Buali Ave.",
        vote_up: 10, vote_down: 1, average_rate: 9,
        comments: [{id: 0, comment: "Very good Suite"}
            , {id: 1, comment: "I liked it"}],
        viewed: 10,
        thumbnails: [
            {
                id: "0",
                url: "assets/img/no_preview_image.jpg"
            },
            {
                id: "1",
                url: "assets/img/no_preview_image.jpg"
            },
            {
                id: "2",
                url: "assets/img/no_preview_image.jpg"
            },
            {
                id: "3",
                url: "assets/img/no_preview_image.jpg"
            },
            {
                id: "4",
                url: "assets/img/no_preview_image.jpg"
            },
            {
                id: "5",
                url: "assets/img/no_preview_image.jpg"
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
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/no_preview_image.jpg"},
                {
                    id: "1",
                    url: "assets/img/no_preview_image.jpg"
                }]
        },
        {
            id: 2, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Hamedan",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/no_preview_image.jpg"},
                {
                    id: "1",
                    url: "assets/img/no_preview_image.jpg"
                }]
        }
        ,
        {
            id: 3, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Hamedan",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/no_preview_image.jpg"},
                {
                    id: "1",
                    url: "assets/img/no_preview_image.jpg"
                }]
        }
        ,
        {
            id: 4, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Hamedan",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/no_preview_image.jpg"},
                {
                    id: "1",
                    url: "assets/img/no_preview_image.jpg"
                }]
        }
        ,
        {
            id: 5, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Hamedan",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/no_preview_image.jpg"},
                {
                    id: "1",
                    url: "assets/img/no_preview_image.jpg"
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
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/no_preview_image.jpg"},
                {
                    id: "1",
                    url: "assets/img/no_preview_image.jpg"
                }]
        }
        ,
        {
            id: 7, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Hamedan",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/no_preview_image.jpg"},
                {
                    id: "1",
                    url: "assets/img/no_preview_image.jpg"
                }]
        }
        ,
        {
            id: 8, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Hamedan",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/no_preview_image.jpg"},
                {
                    id: "1",
                    url: "assets/img/no_preview_image.jpg"
                }]
        }
        ,
        {
            id: 9, title: "Another Good Sweet", description: "Another Good Sweet to rent description",
            created_date: "12569537329",
            modified_added: "12569537329",
            access_date: "12569537329",
            country: "Iran",
            city: "Hamedan",
            address: "No.1,Buali Ave.",
            vote_up: 10, vote_down: 1, average_rate: 9,
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/no_preview_image.jpg"},
                {
                    id: "1",
                    url: "assets/img/no_preview_image.jpg"
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
            comments: [{id: 0, comment: "Very good Suite"}
                , {id: 1, comment: "I liked it"}],
            viewed: 10,
            thumbnails: [
                {id: "0", url: "assets/img/no_preview_image.jpg"},
                {
                    id: "1",
                    url: "assets/img/no_preview_image.jpg"
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
    var json = JSON.stringify(data);
    res.status(200).send(json);
});

app.get('/suite/:id', function (req, res) {
    if (!req.params.id) {
        return res.status(403).send('{error:"unauthorized"}');
    }
    var id = req.params.id;
    console.log(id);
    var json = JSON.stringify(data.suites[id]);
    res.status(200).send(json);
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
    var json = JSON.stringify(data.suites[id]);
    res.status(200).send(json);
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
    var json = JSON.stringify(data.suites[id]);
    res.status(200).send(json);
});

app.post('/comment', function (req, res) {
    if (!req.body || !req.body.id || !req.body.value) {
        return res.status(403).send('{error:"unauthorized"}');
    }
    var comment = req.body.value;
    var id = req.body.id;
    if (data.suites[id]) {
        data.suites[id].comments.push({"value": comment});
    }
    var json = JSON.stringify(data.suites[id]);
    res.status(200).send(json);
});

app.get('/delete_suite', function (req, res) {
    if (!req.body || !req.body.id) {
        return res.status(403).send('{error:"unauthorized"}');
    }
    var id = req.body.id;

});

app.post('/update_suite', function (req, res) {

});

app.get('/search_suite', function (req, res) {
    var search = {
        // id: 'id', title: '', description: '', vote_up: 1, vote_down: 10, average: 10,
    };
});

app.post('/add_suite', function (req, res) {

});