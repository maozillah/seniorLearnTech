var jsonData = "json/surveyData.json";

$.getJSON(jsonData, function(json) {

    // results template
    var results = $('#survey-results').html();
    var resultsScript = Handlebars.compile(results);
    var html2 = resultsScript(json);
    $("#results").append(html2);
});

$(document).ready(function() {
    var retrievedObject = localStorage.getItem('quizAns');
    var answers = JSON.parse(retrievedObject);

    console.log(answers);

    processResults(answers);
});

function processResults(answers) {

    var counts = {};
    var result;

    // count number of answers
    $.each(answers, function(i, answer) {
        counts[answer.value] = (counts[answer.value] || 0) + 1;
    });
    // surface most selected value
    var topAns = Object.keys(counts).reduce(function(a, b) {
        return counts[a] > counts[b] ? a : b
    });

    console.log(counts);

    switch (topAns) {
        case "a":
            result = "Beginner";
            break;
        case "b":
            result = "Novice";
            break;
        case "c":
            result = "Intermediate";
            break;
        case "d":
            result = "Beyond intermediate";
            break;
    }

    $("#results").empty();
    $("#results").append("<h1> You are " + result + "!</h1>");
}
