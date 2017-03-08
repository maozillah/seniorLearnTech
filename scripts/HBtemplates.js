// asynchronous call
// $.getJSON("../surveyData.json", function(json) {
//     var context = json;

//     var templateScript = Handlebars.templates.demo(context);

//     $(document.body).append(templateScript);
// });

//Retreive the template data from the HTML .
var template = $('#handlebars-demo').html();

var context = {
  "occupation" : "developer",
  "website" : {
    "name" : "sitepoint"
  },
  "names" : [
    {"firstName" : "Ritesh", "lastName" : "Kumar"},
    {"firstName" : "John" , "lastName" : "Doe"}
  ]
}

//Compile the template data into a function
var templateScript = Handlebars.compile(template);

var html = templateScript(context);
//html = 'My name is Ritesh Kumar . I am a developer.'

$(document.body).append(html);

