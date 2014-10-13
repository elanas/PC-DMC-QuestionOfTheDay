var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;
var csv = require('fast-csv');
var fs = require('fs');


var db = require('../database.js');

/* GET home page. */
router.get('/', function(req, res) {
//    console.log(req.body);
//    db.saveResponse(req.body);

//    db.exportToCSV();

    res.render('index', { title: 'Question Of The Day' , question:'This will be a question?'});

});

router.post('/testPost', function(req, res) {
    console.log("I AM POSTING!!!!");

//    db.saveResponse(req.body);
//    db.exportToCSV();
    res.end();
});

/* GET home page. */
router.get('/piechart', function(req, res) {
    var dataJSON = {data:[{question: "", answer: ""}]};

    fs.createReadStream("test.csv")
        .pipe(csv())
        .on("data", function(data){
            var insert = {question: data[0], answer: data[1]};

            dataJSON.data.push(insert);
        })
        .on("end", function(){
            res.render('piechart', {dataJSON:JSON.stringify(dataJSON)});
//            console.log(arr);
        });


});

module.exports = router;
