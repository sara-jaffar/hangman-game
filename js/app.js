/*-------------- Constants -------------*/
const words = ["cat", "dog", "week"];

/*---------- Variables (state) ---------*/
let wrongGusses;
let lives = 6;
let randomWord;
let displayedLetters = [ ];

/*----- Cached Element References  -----*/
const letterBtns = document.querySelectorAll(".letter-btn");
const blankEl = document.querySelector("#blanks");
const livesRemaningEl = document.querySelector("#lives-remaning");
const wrongLetters = document.querySelectorAll("#wrong-letters li");
const resetBtnEl = document.querySelector("#reset-btn");

/*-------------- Functions -------------*/
function init() {
    randomWord = words[Math.floor(Math.random() * words.length)];
    blankEl.textContent = "_ ".repeat(randomWord.length).trim();
    wrongGusses = 0;
    displayedLetters = new Array(randomWord.length).fill("");
    render();
    livesRemaningEl.textContent = `❤️ Lives: ${lives}`;
    console.log(randomWord);
    console.log(displayedLetters);
    console.log(blankEl);
}

init();

function render() {
    let display = "";
    for(let i=0; i < randomWord.length ;i++) {
        display += displayedLetters[i] ? displayedLetters[i] + " " : "_ ";
        blankEl.textContent = display.trim();
    }
}




/*----------- Event Listeners ----------*/