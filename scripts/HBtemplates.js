Handlebars.registerHelper("counter", function (index){
    return index + 1;
});

// var jsonData = "https://maozillah.github.io/seniorLearnTech/surveyData.json";

// TO DO: udpated to QuizQues when I figure out how to integrate results
var jsonData = "../json/surveyData.json";

// asynchronous call
$.getJSON(jsonData, function(json) {
    
    var template = $('#survey-ques').html();

    var context = json;

    var templateScript = Handlebars.compile(template);

    var html = templateScript(context);

    $("#survey").append(html);
});
