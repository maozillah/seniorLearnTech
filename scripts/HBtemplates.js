// asynchronous call
$.getJSON("../surveyData.json", function(json) {
    var context = json;

    var templateScript = Handlebars.templates.demo(context);

    $(document.body).append(templateScript);
});
