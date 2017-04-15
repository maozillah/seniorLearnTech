// question numbering
Handlebars.registerHelper("counter", function(index) {
    return index + 1;
});

// var jsonData = "https://maozillah.github.io/seniorLearnTech/surveyData.json";
var jsonData = "json/quizQues.json";

// asynchronous call
$.getJSON(jsonData, function(json) {

    // quiz template
    var template = $('#survey-ques').html();
    var context = json;
    var templateScript = Handlebars.compile(template);
    var html = templateScript(context);
    $("#survey").append(html);
});

$("#survey").on("submit", function(event) {
    event.preventDefault();
    console.log("Submitted data");

    var answers = $(this).serializeArray();

    localStorage.setItem('quizAns', JSON.stringify(answers));
    window.open("results.html", "_self");

});

// scroll to next question on click
$(document).on("change", "input[type=radio]", function(event) {
    var quesNum = $(this).attr('id');
    var nextQuesNum = parseInt(quesNum) + 1;
    var numOfQues = $( ".question" ).length;

    if (nextQuesNum < (numOfQues+1)) {
        $('#modal').animate({
            scrollTop: $('#modal').scrollTop() + $("#" + nextQuesNum).offset().top - 5
        }, 2000);
    }

});
// TO DO: form validation, check all question answered
// $(function() {
//       $("form[name='digitalSurvey']").validate({
//             rules: {
//                   q1: "required",
//                   q2: "required"
//             },
//             // Specify validation error messages
//             messages: {
//                   q1: "Please enter your firstname",
//                   q2: "Please enter your lastname"
//             },
//             submitHandler: function(form) {
//                   form.submit();
//             }
//       });
// });
