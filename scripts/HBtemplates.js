Handlebars.registerHelper("counter", function (index){
    return index + 1;
});

var jsonData = "https://maozillah.github.io/seniorLearnTech/surveyData.json";
// var jsonData = "../surveyData.json";

// asynchronous call
$.getJSON(jsonData, function(json) {
    
    var template = $('#survey-ques').html();

    var context = json;

    var templateScript = Handlebars.compile(template);

    var html = templateScript(context);

    $("#survey").append(html);
});
