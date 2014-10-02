/**
 * Created by elanastroud on 9/3/14.
 */

var mongoUri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost:3000/questionDb/';

/*
 * Creating rollingnotes collection.
 * This will be where all note data is stored.
 */


//
//var databaseUrl = "questionDb"; // "username:password@example.com/mydb"
var collections = ["test", "questions", "answers"]
var db = require("mongojs").connect(mongoUri, collections);

var spawn = require('child_process').spawn;


var test = function() {
    console.log('adding to db?')
    db['test'].insert({"test":"1"});
};

var saveResponse = function(question) {
    console.log('saving response');
    db['test'].insert({"question": question.q, "answers": question.a});

}

var exportToCSV = function() {
    spawn('mongoexport', [
        '--db', 'questionDb', '--collection', 'test', '--csv',
        '--fields', 'question,answers',
        '--out', 'test.csv'
    ]);
}

exports.test = test;
exports.exportToCSV = exportToCSV;
exports.saveResponse = saveResponse;