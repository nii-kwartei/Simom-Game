
 // array called buttonColours holding the sequence "red", "blue", "green", "yellow
  var buttonColors = ["red", "blue", "green", "yellow"];

  var gamePattern = []; // Empty array called gamePattern
  var userClickedPattern = []; // Empty array with the name userClickedPattern

  var started = false;
  var level = 0;

// Detect when any of the buttons are clicked and trigger a handler function.
  $(".btn").on("click", function(){

    var userChosenColour = $(this).attr("id"); // Store the id of the button that got clicked.
    userClickedPattern.push(userChosenColour); // Add the contents of the variable userChosenColour created to the end of this new userClickedPattern


    playSound(userChosenColour); // when a user clicks on a button, the corresponding sound should be played
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });

  $(document).keypress(function() {
    if (!started) {

      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


  // function called nextSequence()
  function nextSequence(){

    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 3) + 1; // Generate a random number between 0 and 3
    var randomChosenColour = buttonColors[randomNumber]; // use the randomNumber to select a random colour from the buttonColours array.
    gamePattern.push(randomChosenColour); // Add the new randomChosenColour generated to the end of the gamePattern.

    $("#" + randomChosenColour).fadeOut(250).fadeIn(250); // A flash animation to selected color
    playSound(randomChosenColour); // play the sound for the button colour selected

  }

  // function to play sound
  function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
  }

 // Animate the pressed button
  function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);

  }

  // Check for user answer
  function checkAnswer(currentLevel) {

      // check if the most recent user answer is the same as the game pattern.
      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        // If the user got the most recent answer right, then check that they have finished their sequence.
        if (userClickedPattern.length === gamePattern.length){

          setTimeout(function () {
            nextSequence();
          }, 1000);

        }

      } else {

        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver(); // restart the game
      }

  }

    // reset the game
      function startOver(){
        level = 0;
        gamePattern = [];
        started = false;
      }
