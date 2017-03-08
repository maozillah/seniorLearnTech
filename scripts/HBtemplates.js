// asynchronous call


$.getJSON("../surveyData.json", function(json) {
    
    var template = $('#handlebars-demo').html();

    var context = json;

    var templateScript = Handlebars.compile(template);

    var html = templateScript(context);

    $("#survey").append(html);
});
