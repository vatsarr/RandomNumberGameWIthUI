// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;
let maxTries = 10;
let userTries = 0;
let sec = 0;

// Get DOM elements
const inputContainer = document.getElementById("guess-container");
const guessInput = document.getElementById("guess-input");
const triesLeft = document.getElementById("tries-left");
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
    resultDiv.innerHTML =
      "&#127881" +
      ` Congratulations! ` +
      "&#127881" +
      "</br>" +
      `${randomNumber} was the correct number!` +
      "</br>" +
      `You guessed it in ${userTries} tries.`;
    resultDiv.className = "success";
    guessInput.disabled = true;
    guessBtn.disabled = true;
    guessesContainer.remove();
    clearInterval(timer);
    reloadBTN();
  } else if (guess < randomNumber) {
    resultDiv.innerHTML = "Too low, try again.";
    triesLeft.innerHTML = `${maxTries - userTries} tries left.`;
    resultDiv.className = "warning";
    guessHistory();
  } else if (guess > randomNumber) {
    resultDiv.innerHTML = "Too high, try again";
    triesLeft.innerHTML = `${maxTries - userTries} tries left.`;
    resultDiv.className = "warning";
    guessHistory();
  }

  if (userTries === maxTries) {
    resultDiv.innerHTML =
      `You ran out of tries!` +
      "</br>" +
      `The correct number was ${randomNumber}.`;
    resultDiv.className = "error";
    guessInput.disabled = true;
    guessBtn.disabled = true;
    //guessesContainer.remove();
    removeElements();
    clearInterval(timer);
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

// Display guess history
function guessHistory() {
  let guessesHeading = document.createElement("div");
  guessesHeading.className = "userGuesses";
  guessesHeading.innerHTML = "Your guess:";
  guessesContainer.appendChild(guessesHeading);
  let newGuess = document.createElement("li");
  newGuess.innerHTML = parseInt(guessInput.value);
  newGuess.className = "li-styling";
  guessesHeading.appendChild(newGuess);
}

// Timer

function pad(val) {
  return val > 9 ? val : "0" + val;
}
let timer = setInterval(function () {
  document.getElementById("seconds").innerHTML = pad(++sec % 60);
  document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
}, 1000);

// On win or loss remove some elements from page

function removeElements() {
  guessBtn.remove();
  guessesContainer.remove();
  triesLeft.remove();
}
