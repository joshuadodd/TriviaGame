$(document).ready(function() {
    answers = new Object();
    $('.option').change(function() {
        var answer = ($(this).attr('value'))
        var question = ($(this).attr('name'))
        answers[question] = answer
    })
    var item1 = document.getElementById('questions');

    var totalQuestions = $('.questions').size();
    var currentQuestion = 0;
    $questions = $('.questions');
    $questions.hide();
    $($questions.get(currentQuestion)).fadeIn();
    $('#next').click(function() {
        $($questions.get(currentQuestion)).fadeOut(function() {
            currentQuestion = currentQuestion + 1;
            if (currentQuestion == totalQuestions) {
                var result = sum_values()
                    //do stuff with the result
                alert(result);
            } else {
                $($questions.get(currentQuestion)).fadeIn();
            }
        });

    });
});
$("#btn btn-info").on("click", function() {
    // when the start button clicked, the div with the questions that was hidden is shown
    $('.questions').show();
    console.log('hello');

    $(this).hide();


});
function startTimer(duration, display) {
        $(".btn btn-info").on("click", function() {

           function startTimer(secs) {
                timeInSecs = parseInt(secs) - 1;
                ticker = setInterval("tick()", 1000); // every second
            }

           function tick() {
                var secs = timeInSecs;
                if (secs > 0) {
                    timeInSecs--;
                } else {
                    clearInterval(ticker); // stop counting at zero
                    // startTimer(30);  // remove forward slashes in front of startTimer to repeat if required
                }
                $("#countdownTimer").html(secs);
            }
            startTimer(30); //30 seconds
            console.log(secs, timeInSecs, ticker);
        })

   }


function sum_values() {
    var the_sum = 0;
    for (questions in answers) {
        the_sum = the_sum + parseInt(answers[question])
    }
    return the_sum
}
