/**
 * Created by elanastroud on 9/3/14.
 */

//var mongoUri = process.env.MONGOLAB_URI ||
//    process.env.MONGOHQ_URL ||
//    'mongodb://localhost:3000/questionDb/';

//
var databaseUrl = "questionDb"; // "username:password@example.com/mydb"
var collections = ["test", "questions", "answers"]
var db = require("mongojs").connect(databaseUrl, collections);

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
//    var x = ".." + "\\" + "test.csv";
//    console.log(x);
    spawn('.\\bin\\mongoexport', [
        '--db', 'questionDb', '--collection', 'test', '--csv',
        '--fields', 'question,answers',
        '--out', 'test.csv'
    ]);



    console.log("technically exporting");
//    console.log(db.collections.count());
//    console.log("I am in the export function")
//    db['test'].find({});

}

exports.test = test;
exports.exportToCSV = exportToCSV;
exports.saveResponse = saveResponse;