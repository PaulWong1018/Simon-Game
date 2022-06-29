var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameTrigger = false;
var level = 0;

//setup

if (gameTrigger == false) {
  //game starts for the first time

  $("body").keypress(function () {
    nextSequence();
    gameTrigger = true;
  });
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    //play wrong sound
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    //flash wrong backgroup color
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    //change h1 text
    $("h1").text("Game Over, Press Any Key to Restart");

    //call restart function
    startOver();
  }
}

function nextSequence() {
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); //Random gen a number 0-3
  var randomChosenColor = buttonColors[randomNumber]; //use the random number to choose the color
  gamePattern.push(randomChosenColor); //add the chosen color to the end of the array

  //Randomly gen the target color that wants the user to choose
  $("#" + randomChosenColor) //Button flash first, tell user what should click
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(name) {
  $("#" + name).click(function () {
    var audio = new Audio("sounds/" + name + ".mp3");
    //create a variable autio , assign the path of the sound file
    audio.play(); //excute by playing the sound file
  });
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); // <-- add shadow

  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed"); // <-- Cancel shadow
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameTrigger = false;
}
