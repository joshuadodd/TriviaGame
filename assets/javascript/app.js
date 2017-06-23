$(document).ready(function(){
answers = new Object();
$('.option').change(function(){
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
$('#next').click(function(){
    $($questions.get(currentQuestion)).fadeOut(function(){
        currentQuestion = currentQuestion + 1;
        if(currentQuestion == totalQuestions){
               var result = sum_values()
               //do stuff with the result
               alert(result);
        }else{
        $($questions.get(currentQuestion)).fadeIn();
        }
    });

});
});
$(".start-button").on("click", function() {
        // when the start button clicked, the div with the questions that was hidden is shown
        $('main-container').show();
        console.log('hello');

        $(this).hide();
    });

    // These events start the timer: set the number of seconds the guesser has 
    var number = 30;
    $('#timeLeft').on('click', run);

    // This function enables the number of seconds to decrease with time, and to display
    // the result of that decrease until time is up. 
    function decrement() {
        // Decrease number by one.
        number--;
        // Show the number in the #timeLeft div.
        $('#timeLeft').html('<h2>' + number + " seconds" + '</h2>');
        // When the number is equal to zero, 
        if (number === 0) {
            // run the stop function.
            stop();
            // Alert the user that time is up. Update the innerHTML of the message
            // div to say 'Game Over!'
            // alert('Time Up!')
            $('#message').html('time up!');
            checkAnswers();
        }
    }
    // test
    // writes the win or lose message 
    // function writeMessage (){
    //  // updates the contents of the message div
    //  $message.html(message);
    // }
    // test

    // the run function sets the spacing of the decrement function's time interval so that
    // it can be equal to a second per number decrement.
    function run() {
        counter = setInterval(decrement, 1000);
    }

    // The stop function
    function stop() {
        // Clears our "counter" interval. The interval name is passed to the clearInterval function.
        clearInterval(counter);
    }

    // Execute the run function.
    run();

function sum_values(){
var the_sum = 0;
for (questions in answers){
    the_sum = the_sum + parseInt(answers[question])
}
return the_sum
}