// initialize the .js document with this. It contains all of the code for the .js file:
$(document).ready(function() {

    // this game object holds all of the questions, possible answers, and then the index of the correct answer for each
    var game = {
        questions: [{
                question: 'HTML and CSS are computer languages used to create what?',
                possibles: ['Foreign languages', 'Websites', 'Phones', 'Wireless headsets'],
                id: 'question-one',
                answer: 1
            },

            {
                question: 'The first person shooter video game Doom was first released in what year?',
                possibles: ['1993', '1998', '2001', '2003', '1988'],
                id: 'question-two',
                answer: 0
            }, {
                question: 'What does the acronym "lol" stand for when used in phone texts and on the internet?',
                possibles: ['Love on Larry', 'Lost on landing', 'Lingering on leafbed', 'Look out level', 'Laugh out loud'],
                id: 'question-three',
                answer: 4
            }, {
                question: 'In what year was the first Apple computer released?',
                possibles: ['1970', '1976', '1982', '1984', '2017'],
                id: 'question-four',
                answer: 1
            }, {
                question: 'In a website browser address bar what does "www" stand for?',
                possibles: ['World wide web', 'West world wanderer', 'World wide wireless', 'Websites wide world', 'window wide website'],
                id: 'question-five',
                answer: 0
            }, {
                question: 'In what year did Nintendo release its first game console in North America?',
                possibles: ['1982', '1985', '1989', '1991', '2017'],
                id: 'question-six',
                answer: 1

            }, {
                question: 'What year was Facebook founded?',
                possibles: ['1988', '1996', '2004', '2005', '2017'],
                id: 'question-seven',
                answer: 2
            }, {
                question: 'In computer science, what does "GUI" stand for?',
                possibles: ['Grand user interface', 'Graphical update input', 'Game using iPhone', 'Garage unanswered interface', 'Graphical user interface'],
                id: 'question-eight',
                answer: 4
            }, {
                question: 'In database programming, SQL is an acronym for what??',
                possibles: ['System question languages', 'Show query length', 'Structured query language', 'Science query loop ', 'Statement question level'],
                id: 'question-nine',
                answer: 2
            }, {
                question: 'In the world of video games, what does NES stand for?',
                possibles: ['North event stand', 'Nintendo entertainment system', 'Nice event system', 'Numbered each second', 'Nine equals seven'],
                id: 'question-ten',
                answer: 1
            }, {
                question: 'The companies HP, Microsoft and Apple were all started in a what?',
                possibles: ['Basement', 'Rock band', 'Van', 'Garage', 'Whole foods market'],
                id: 'question-eleven',
                answer: 3
            }, {
                question: 'In what year was the iPhone first released??',
                possibles: ['1978', '1980', '1999', '2017', '2007'],
                id: 'question-twelve',
                answer: 4
            }
        ]
    }

    
    var message = 'Game Over!';
    // var $message = $('#message');
    // test

    // This initializes the button that starts the game 
    $(".startGame").on("click", function() {
        // when the start button clicked, the div with the questions that was hidden is shown
        $('.wrapper').show();
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

    // this function dynamically creates the inputs needed for the form and relates them to the
    // items held within the game object 
    function formTemplate(data) {
        // the first variable relates the form field for question with the data in the object for
        // each question so that the questions can be inputed into that form field
        var qString = "<form id='questionOne'>" + data.question + "<br>";
        // this variable to access the question object's possibles array needed to answer each question
        var possibles = data.possibles;
        // a for loop to go through the possibles array for each question to add the values of each possibles
        // array and using qString, add them as radio buttons to the question to which they are
        // associated
        for (var i = 0; i < possibles.length; i++) {
            var possible = possibles[i];
            console.log(possible);
            qString = qString + "<input type='radio' name='" + data.id + "' value=" + i + ">" + possible;

        }
        return qString + "</form>";
    }
    window.formTemplate = formTemplate;

    // this function takes the template created in the last function and by appending it,
    // allows it to be displayed on the page
    function buildQuestions() {
        var questionHTML = ''
        for (var i = 0; i < game.questions.length; i++) {
            questionHTML = questionHTML + formTemplate(game.questions[i]);
        }
        $('#questions-container').append(questionHTML);

    }

    // function that 
    function isCorrect(question) {
        var answers = $('[name=' + question.id + ']');
        var correct = answers.eq(question.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    }

    // call the buildQuestions function
    buildQuestions();

    // function to build the display of guesser results
    function resultsTemplate(question) {
        var htmlBlock = '<div>'
        htmlBlock = htmlBlock + question.question + ': ' + isChecked;
        return htmlBlock + "</div>";
    }

    // function to tabulate the guesser results
    function checkAnswers() {

        // variables needed to hold results
        var resultsHTML = '';
        var guessedAnswers = [];
        var correct = 0;
        var incorrect = 0;
        var unAnswered = 0

        // for loop iterates through each question and passes the questions at each index first into
        // the isCorrect function to see if they match the indices of correct answers, and if they do,
        // increments up the correct score
        for (var i = 0; i < game.questions.length; i++) {
            if (isCorrect(game.questions[i])) {
                correct++;
            } else {
                // then this statement runs the questions at each index through the checkAnswered function
                // to determine whether the user clicked an answer, or did not click an answer, so that
                // incorrect and unAnswered scores can be delineated from each other
                if (checkAnswered(game.questions[i])) {
                    incorrect++;
                } else {
                    unAnswered++;
                }
            }

        }
        // display the results of the function in the results div and use strings of text to relate the
        // results of the for loop with their corresponding values
        $('.results').html('correct: ' + correct + "<br>" + 'incorrect: ' + incorrect + "<br>" + 'unanswered: ' + unAnswered);
    }

    // this function checks whether the guesser actually checked an answer for each of the 
    // questions
    function checkAnswered(question) {
        var anyAnswered = false;
        var answers = $('[name=' + question.id + ']');
        // the for loop creates a condition to check if the buttons were checked and and then sets
        // the anyAnswered variable to true if they were
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                anyAnswered = true;
            }
        }
        // then return the anyAnswered variable so it can be tabulated in the last function to distinguish
        // between incorrect answers and those answers that were not attempted
        return anyAnswered;

    }

    // create a function with an onclick event for the doneButton that both checks the Answers 
    // and stops the clock when "done" button is pressed
    $('#doneButton').on('click', function() {
        checkAnswers();
        stop();
        $("#messageDiv").html("Game Over!");
    })
});
