// this sets everything up -- the score starts at 0 -- time ends at 0 -- and the variation type is a timer -- current question starts it at 1 and not randomized //
var score = 0;
var timeLeft = 0;
var timer;
var currentQuestion = -1;

// this function is to start the timer as soon as the user hits the "begin" button //
function start() {
// timer is set at 90 //
// this is a timer output display, meaning this shows the time left //
// please see my readme for the source (#2) of where i found and tweaked this //
timeLeft = 90;
document.getElementById("timeLeft").innerHTML = timeLeft;
timer = setInterval(function() {
timeLeft--;
document.getElementById("timeLeft").innerHTML = timeLeft;

// if the timer hits zero, then this ends the game //
// please see my readme for the source (#1) on where i found and tweaked this //
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
}
}, 1000)

// this allows the function to move to the next question // 
next();
}

// this is the function to end the game when timer is cleared //
function endGame() {
    clearInterval(timer);

// this variable is for the quiz contents -- i put a header showing that you completed the quiz and I also put a score of xx / 100 -- i also included a button to save the score // 
    var quizContent = `
    <h1>Completed</h1>
    <h3>Your score is ` + score +  ` /70</h3>
    <input type="text" id="name" placeholder="name"> 
    <button onclick="setScore()">Save</button>`;
document.getElementById("quizBody").innerHTML = quizContent;
}

// this function is to set the users score //
// please see read me sources (#3 and #4) to see where I found and tweaked this //
// i combined both together, the high score will be saved along with the name // 
function setScore() {
    localStorage.setItem("highscores", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    getScore();
}

// once the user saves their score, their score and name will be saved onto the highscore list page //
function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s Highscore Is:
    </h2>
    <h1>` + localStorage.getItem("highscores") + `</h1><br>
 
    <button onclick="clearScore()">Clear</button>
    <button onclick="resetGame()">Play Again</button>
    `;
// above shows a clear button and a play again button //


// this allows use to clear their score and clear their name in the local storage //
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}


// this function allows the entire game to reset //
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;
}


// this goes back to the quiz body //
document.getElementById("quizBody").innerHTML = quizContent;
}

// in the quiz body, this function will deduct 5 seconds for each question that is answered uncorrectly .. it will also move to the next question once the function is performed //
function incorrect() {
timeLeft -= 5; 
next();
}

// this will increase the players score by 10 points if they answer the question correctly .. it will also move to the next question once the function is performed //
function correct() {
score += 10;
next();
}

// loops through the questions //
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}
// this allows the question loops to start -- when player clicks begin, first question will be asked //
var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

// this allows questions to go in order and to make sure the questions asked is following the choices //
for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
// this sets up the button codes and the choices. "if" the player chooses an answer, and the answer is correct, it will have an output saying of being correct //
// or "else", if the answer the player chose was not correct, meaning every other option will be wrong, the button is incorrect //
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}

document.getElementById("quizBody").innerHTML = quizContent;
}