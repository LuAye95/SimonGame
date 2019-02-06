var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomNumber;
var level = 0;
var start = false;

$(document).on("keypress", ()=> {
    if (!start) {
        nextSequence();
        start = true;  
    }

});

$(".btn").on("click", (event) => {

    // retrieve the id of the button that the user clicked 
    var userChosenColor = event.target.id;

    // and push it into the new Array
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
;    
});

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
        // retrieve the one user clicked
        $("#" + currentColor).removeClass('pressed');
    }, 100);
       
};

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("h1").text("Level " + level );
    // generate random number from 0 to 3
    randomNumber = Math.floor(Math.random() * 4);

    // assign the random color from buttonColors array to randomChosenColor variable
    var randomChosenColor = buttonColors[randomNumber];

    // add that random color to the gamepattern array
    gamePattern.push(randomChosenColor);

    // animate the random selected color 
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // and add sound to it
    playSound(randomChosenColor);
}

var playSound = function(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }  else {
       playSound("wrong");
       $("body").addClass("game-over");
       $("#level-title").text("Game Over, Press Any Key to Restart");
    
       setTimeout(() => {
           $("body").removeClass("game-over");
       }, 200);
       startOver();        
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;

    $("#level-title").text("Press A Key to Start");
}

