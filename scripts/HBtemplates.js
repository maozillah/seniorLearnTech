Handlebars.registerHelper("counter", function (index){
    return index + 1;
});

// asynchronous call
$.getJSON("../surveyData.json", function(json) {
    
    var template = $('#survey-ques').html();

    var context = json;

    var templateScript = Handlebars.compile(template);

    var html = templateScript(context);

    $("#survey").append(html);
});
