// Selecting DOM Elements
const gameBoard = document.getElementById("game-board");
const restartButton = document.getElementById("restart-button");
const timerDisplay = document.getElementById("timer");

// Game Variables
const icons = ["🍎", "🍌", "🍒", "🍇", "🍉", "🥝", "🍍", "🍓"];
let cards = [...icons, ...icons];
let flippedCards = [];
let matchedCards = [];
let timer;
let timeElapsed = 0;

// Function to Shuffle Cards using Fisher-Yates Algorithm
function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// Start the Timer
function startTimer() {
  timeElapsed = 0;
  timerDisplay.textContent = timeElapsed;
  timer = setInterval(() => {
    timeElapsed++;
    timerDisplay.textContent = timeElapsed;
  }, 1000);
}

// Stop the Timer
function stopTimer() {
  clearInterval(timer);
}

// Reset Game
function resetGame() {
  stopTimer();
  startTimer();
  flippedCards = [];
  matchedCards = [];
  shuffleCards();
  renderCards();
}

// Render Cards on the Board
function renderCards() {
  gameBoard.innerHTML = ""; // Clear the board
  cards.forEach((icon, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip Card Logic
function flipCard() {
  const clickedCard = this;
  const cardIndex = clickedCard.dataset.index;

  // Prevent multiple flips
  if (
    flippedCards.length < 2 &&
    !flippedCards.includes(cardIndex) &&
    !clickedCard.classList.contains("matched")
  ) {
    clickedCard.textContent = cards[cardIndex];
    clickedCard.classList.add("flipped");
    flippedCards.push(cardIndex);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Check for Matching Cards
function checkMatch() {
  const [firstIndex, secondIndex] = flippedCards;
  const firstCard = document.querySelector(`[data-index='${firstIndex}']`);
  const secondCard = document.querySelector(`[data-index='${secondIndex}']`);

  if (cards[firstIndex] === cards[secondIndex]) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedCards.push(firstIndex, secondIndex);
    flippedCards = [];

    // Check for Win Condition
    if (matchedCards.length === cards.length) {
      setTimeout(() => {
        stopTimer();
        alert(`You won in ${timeElapsed} seconds! 🎉`);
      }, 500);
    }
  } else {
    // Flip cards back after a short delay
    setTimeout(() => {
      firstCard.textContent = "";
      secondCard.textContent = "";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

// Event Listener for Restart Button
restartButton.addEventListener("click", resetGame);

// Initialize the Game
resetGame();
