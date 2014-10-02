
//console.log("should print test");
//console.log(window.jsonData);

var graphData = window.jsonData;

var yesnoData = {yes: 0, no: 0}
var longAnswers = ['Student group', 'Self-promotion', 'Academic', 'Personal learning',
    'Community service', 'Entertainment relaxation', 'Campus community'];
//var longAnswersData = {"Student group": 0, "Self-promotion": 0, "Academic": 0,"Personal learning":0,
//                        "Community service":0, "Entertainment relaxation": 0, "Campus community": 0};
var longAnswersData = {};
var longDataSeries = [];

//console.log(graphData.data);

for(var x = 0; x < graphData.data.length; x++) {
//    console.log(JSON.stringify(graphData.data[x]));

//    console.log(graphData.data[x].question);

    var question = graphData.data[x].question.toString();
    var answer = graphData.data[x].answer.toString();

    if(question.indexOf("Was") >= 0) {
        if(answer.indexOf("yes") >= 0) {
            yesnoData.yes ++;
        } else {
            yesnoData.no ++;
        }
    } else if(question.indexOf("what") >= 0) {
//        console.log("ANSWER: " + answer);

        for(var y = 0; y < longAnswers.length; y++) {
            if(answer.indexOf(longAnswers[y]) >= 0) {
//                console.log("answers: " + answer);
//                console.log(longAnswersData[longAnswers[y]]);
//                console.log("Adding to: " + longAnswers[y]);
//                    longAnswersData[longAnswers[y]] ++;

                if (longAnswersData[longAnswers[y]] == null) {
                    longAnswersData[longAnswers[y]] = 1;
                } else {
                    longAnswersData[longAnswers[y]] ++;
                }
            }
        }
    }
 }

for (var q = 0; q < longAnswers.length; q++) {
    longDataSeries.push(longAnswersData[longAnswers[q]]);
}

function cleanArray(actual){
    var newArray = new Array();
    for(var i = 0; i< actual.length; i++){
        if (actual[i]){
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

//pie charts for uses
var data = {
    labels: longAnswers,
    series: cleanArray(longDataSeries)
};

var options = {
    labelInterpolationFnc: function(value) {
        return value[0]
    }
};

var responsiveOptions = [
    ['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'implode',
        labelInterpolationFnc: function(value) {
            return value;
        }
    }],
    ['screen and (min-width: 1024px)', {
        labelOffset: 100,
        chartPadding: 20
    }]
];

Chartist.Pie('.longData', data, options, responsiveOptions);

//pie charts for yes/no
var data1 = {
    labels: ["YES", "NO"],
    series: [yesnoData.yes , yesnoData.no]
};

var options1 = {
    labelInterpolationFnc: function(value) {
        return value[0]
    }
};

var responsiveOptions1 = [
    ['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value) {
            return value;
        }
    }],
    ['screen and (min-width: 1024px)', {
        labelOffset: 80,
        chartPadding: 20
    }]
];

Chartist.Pie('.yesNo', data1, options1, responsiveOptions1);