// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

// Get DOM elements
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const resultDiv = document.getElementById("result");

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

  // Check if the guess is correct, too high, or too low
  if (guess === randomNumber) {
    resultDiv.innerHTML = `Congratulations! You guessed the number (${randomNumber})!`;
    resultDiv.className = "success";
  } else if (guess < randomNumber) {
    resultDiv.innerHTML = "Too low, try again.";
    resultDiv.className = "error";
  } else if (guess > randomNumber) {
    resultDiv.innerHTML = "Too high, try again.";
    resultDiv.className = "error";
  }
});
