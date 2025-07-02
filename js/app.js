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
const messageEl = document.querySelector("#message");
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
    livesRemaningEl.textContent = `❤️ Lives: ${lives}`;
}

function checkWin() {
    if(!displayedLetters.includes("")) {
        messageEl.textContent = `You Win!`;
        disableBtns();
      
    } else if(lives === 0) {
        messageEl.textContent = `You Lose!`;
        disableBtns();
    }
}

function disableBtns() {
    letterBtns.forEach(btn => {
        btn.disabled = true;
    })
}

/*----------- Event Listeners ----------*/

letterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const letter = btn.textContent;

        btn.disabled = true;
        console.log(letter);

        if(randomWord.includes(letter)) {
            for(let i = 0; i < randomWord.length ;i++) {
                if(randomWord[i] === letter) {
                    displayedLetters[i] = letter;
                }
            }
        } else {
            wrongGusses++;
            lives--;

            if (wrongGusses <= wrongLetters.length) {
                wrongLetters[wrongGusses - 1].textContent = letter;
            }
        }
        checkWin();
        render();
        console.log(displayedLetters);
    })
})

resetBtnEl.addEventListener("click", () => {
    letterBtns.forEach(btn => btn.disabled = false);
    wrongLetters.forEach(li => li.textContent = "");
    lives = 6;
    wrongGusses = 0;
    messageEl.textContent = "";
    init();
})