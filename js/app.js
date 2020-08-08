window.addEventListener('load', init);

const levels = {
    easy: 5,
    medium: 3,
    hard: 1
}

const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
// represents if the game is playing or not
let isPlaying;
let gameStatus;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const highScore = document.querySelector('#high-score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = ['hat', 'river', 'lucky', 'statue', 'generate', 'stubborn', 'cocktail', 'runaway', 'joke', 'developer', 'establishment', 'hero', 'javascript', 'nutrition', 'revolver', 'echo', 'siblings', 'investigate', 'horrendous', 'symptom', 'laughter', 'magic', 'master', 'space', 'definition'];

function init(){
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;

    // Load random word from array
    showWord(words);

    // Display the highscore from local storage
    getHighScore();

    // Start matching on word input
    wordInput.addEventListener('input', startMatch);

    // Call countdown every second
    setInterval(countdown, 1000);

    // Check game status
    gameStatus = setInterval(checkStatus, 50);
}

// Start Match
function startMatch(){
    if(matchWords()){
        isPlaying = true;

        time = currentLevel + 1;

        showWord(words);

        wordInput.value = '';

        score++;
    }

    // if score is -1, display 0
    if(score === -1){
        scoreDisplay.innerHTML = 0;
    }else{
        scoreDisplay.innerHTML = score;
    }

}

// Match currentWord to wordInput
function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        message.innerHTML = '<span class="text-success">Correct!!!</span>';
        return true;
    }else{
        message.innerHTML = '';
        return false;
    }
}

// Pick and show a random word
function showWord(words){
    // Generate a random array index
    const randIndex = Math.floor(Math.random() * words.length);

    // Output a random word
    currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown(){
    // Ensure time hasn't run out
    if(time > 0){
        // Decrement the time
        time--;
    }else if(time === 0){
        // Game Over
        isPlaying = false;
    }

    // Show Time
    timeDisplay.innerHTML = time;
}

function checkStatus(){
    if(!isPlaying && time === 0){
        message.innerHTML = '<span class="text-danger">Game Over!</span>';

        // Save the score if it is a highscore
        saveHighScore(score);

        setTimeout(() => {
            window.location.reload();
        }, 1000)

    }
}

function getHighScore(){
    let highscoreLS = localStorage.getItem('highscore');

    highScore.innerHTML = highscoreLS;
}

function saveHighScore(score){
    let highScoreLS = localStorage.getItem('highscore');

    if(highScoreLS === null){
        localStorage.setItem('highscore', score);
    }else{        
        if(score > highScoreLS){
            localStorage.setItem('highscore', score);
        }
    }
}