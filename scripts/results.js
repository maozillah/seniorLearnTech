var jsonData = "json/results.json";

$(document).ready(function() {
    var retrievedObject = localStorage.getItem('quizAns');

    // test variables
    var answers = [{"name":"q1","value":"c"},{"name":"q2","value":"a"},{"name":"q3","value":"c"}]; 
    // var answers = JSON.parse(retrievedObject);

    console.log(retrievedObject);

    // console.log(answers);

    processResults(answers);

    localStorage.removeItem("quizAns");
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

    // console.log(counts);
    switch (topAns) {
        case "a":
            result = 0;
            break;
        case "b":
            result = 1;
            break;
        case "c":
            result = 2;
            break;
        case "d":
            result = 3;
            break;
    }

    $.getJSON(jsonData, function(json) {

        // results template
        var results = $('#survey-results').html();

        // select result that matches stage
        var resultsScript = Handlebars.compile(results);


        var html2 = resultsScript(json.results[result]);
        // var html2 = resultsScript(json);
        $("#results").append(html2);
    });
}
