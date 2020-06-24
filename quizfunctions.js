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
}}, 1000)

// this allows the function to move to the next question // 
next();
}

// this is the function to end the game when timer is cleared //
function endGame() {
    clearInterval(timer);

// this variable is for the quiz contents -- i put headers that you completed the quiz and I also put a score of xx / 100 -- i also included a button to save the score // 
    var quizContent = `
    <h1>Completed</h1>
    <h3>Your score is ` + score +  ` /100!</h3>
    <input type="text" id="name" placeholder="name"> 
    <button onclick="setScore()">Save My Score</button>`;
    document.getElementById("quizBody").innerHTML = quizContent;
}

// this function is to set the users score //
// please see source (#3 and #4) to see where I found and tweaked this //
// i combined both together // 
function setScore() {
    localStorage.setItem("highscores", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    getScore();
}

