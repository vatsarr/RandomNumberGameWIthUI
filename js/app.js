// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;
let maxTries = 10;
let userTries = 0;

// Get DOM elements
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const resultDiv = document.getElementById("result");
const guessesContainer = document.getElementById("guessList");

// Add event listener to button
guessBtn.addEventListener("click", function () {
  // Get user's guess and convert it to a number
  const guess = parseInt(guessInput.value);
  // Check if the guess is a number between 1 and 100
  if (isNaN(guess) || guess < 1 || guess > 100) {
    resultDiv.innerHTML = "Please enter a number between 1 and 100.";
    resultDiv.className = "error";
    return;
  }
  userTries++;

  // Check if the guess is correct, too high, or too low
  if (guess === randomNumber) {
    resultDiv.innerHTML = `Congratulations! You guessed the number (${randomNumber}) in ${userTries} tries!`;
    resultDiv.className = "success";
    guessInput.disabled = true;
    guessBtn.disabled = true;
    reloadBTN();
  } else if (guess < randomNumber) {
    resultDiv.innerHTML = `Too low, try again. You have ${
      maxTries - userTries
    } tries left.`;
    resultDiv.className = "error";
    guessHistory();
  } else if (guess > randomNumber) {
    resultDiv.innerHTML = `Too high, try again. You have ${
      maxTries - userTries
    } tries left.`;
    resultDiv.className = "error";
    guessHistory();
  }

  if (userTries === maxTries) {
    resultDiv.innerHTML = `Sorry, you didn't guess the number in time. The correct number was (${randomNumber}).`;
    resultDiv.className = "error";
    guessInput.disabled = true;
    guessBtn.disabled = true;
    reloadBTN();
  }
});

function reloadBTN() {
  // create button element
  let refreshButton = document.createElement("button");

  // set button text
  refreshButton.textContent = "Play again!";
  refreshButton.className = "reload-btn";

  // add event listener to button
  refreshButton.addEventListener("click", function () {
    location.reload();
  });

  // add button to the page
  document.body.appendChild(refreshButton);
}

function guessHistory() {
  let guessesHeading = document.createElement("div");
  guessesHeading.className = "userGuesses";
  guessesHeading.innerHTML = "Your guess:";
  guessesContainer.appendChild(guessesHeading);
  let newGuess = document.createElement("li");
  newGuess.innerHTML = parseInt(guessInput.value);
  newGuess.className = "li-styling";
  guessesContainer.appendChild(newGuess);
}
