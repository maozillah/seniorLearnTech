// question numbering
Handlebars.registerHelper("counter", function(index) {
    return index + 1;
});

// modal
function openModal() {
    $(".modal_wrapper").fadeToggle("slow");
    $("#modal").fadeToggle("slow");
    $(".proj-overlay").fadeToggle("slow");
    toggleResults();
}

function closeModal() {
    $(".modal_wrapper").fadeToggle("slow");
    $("#modal").fadeToggle("slow");
    $(".proj-overlay").fadeToggle("slow");
}

function closeResults() {
    $("#results-wrapper").fadeToggle("slow");
}

function toggleResults() {
    $("#survey").css("display", "block");
    $("#results").css("display", "none");
}

$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        closeModal();
    }
});

// var jsonData = "https://maozillah.github.io/seniorLearnTech/surveyData.json";
var jsonData = "json/quizQues.json";

// get survey questions + answers
$.getJSON(jsonData, function(json) {

    // quiz template
    var template = $('#survey-ques').html();
    var context = json;
    var templateScript = Handlebars.compile(template);
    var html = templateScript(context);
    $("#survey").append(html);
});

// scroll to next question on click
$(document).on("change", "input[type=radio]", function(event) {
    var quesNum = $(this).attr('id');
    var nextQuesNum = parseInt(quesNum) + 1;
    var numOfQues = $(".question").length;

    if (nextQuesNum < (numOfQues + 1)) {
        $('#modal').animate({
            scrollTop: $('#modal').scrollTop() + $("#" + nextQuesNum).offset().top - 5
        }, 2000);
    }

});

// process results
$("#survey").on("submit", function(event) {
    event.preventDefault();
    console.log("Submitted data");

    // var answers = $(this).serializeArray();

    // test variables
    var answers = [{ "name": "q1", "value": "c" }, { "name": "q2", "value": "a" }, { "name": "q3", "value": "c" }];

    closeModal();
    // console.log(answers);
    processResults(answers);

});

function loader() {
    $('#preloader').fadeToggle("slow", function() {

        setTimeout(function() {
            $('#preloader').fadeToggle("slow");

            $("#survey").css("display", "none");
            $("#results").css("display", "block");
            $("#results-wrapper").css("display", "block");
            $("#modal").scrollTop(0);
        }, 3000);
    });
}

function processResults(answers) {

    loader();

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

    var jsonData = "json/results.json";
    $.getJSON(jsonData, function(json) {

        // results template
        var results = $('#survey-results').html();

        // select result that matches stage
        var resultsScript = Handlebars.compile(results);


        var html2 = resultsScript(json.results[result]);

        $("#results").empty();
        $("#results").append(html2);
    });
}

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
