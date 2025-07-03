/*-------------- Constants -------------*/
const words = [
  { word: "cat", hint: "A small domesticated animal" },
  { word: "dog", hint: "Loyal animal that barks" },
  { word: "week", hint: "Has seven days" },
  { word: "apple", hint: "A red or green fruit" },
  { word: "sun", hint: "The star at the center of our solar system" },
  { word: "train", hint: "Runs on tracks and carries people or cargo" },
  { word: "car", hint: "Four-wheeled vehicle" },
  { word: "phone", hint: "Used to call or text people" },
  { word: "zebra", hint: "Striped animal in Africa" },
  { word: "moon", hint: "Orbits the Earth" },
  { word: "star", hint: "Shines in the night sky" },
  { word: "chair", hint: "You sit on it" },
  { word: "plant", hint: "Needs sunlight and water" },
  { word: "robot", hint: "A machine that can do tasks" },
  { word: "glass", hint: "Transparent and fragile" },
  { word: "mouse", hint: "Small rodent or a computer device" },
  { word: "house", hint: "A place to live" },
  { word: "light", hint: "Removes darkness" },
  { word: "candy", hint: "Sweet and sugary treat" },
  { word: "cloud", hint: "Floats in the sky and brings rain" },
  { word: "river", hint: "A natural flowing watercourse" },
  { word: "pizza", hint: "Popular Italian dish with toppings" },
  { word: "horse", hint: "Large animal you can ride" },
  { word: "shirt", hint: "Clothing worn on the upper body" },
  { word: "beach", hint: "Sandy shore by the sea" },
  { word: "spoon", hint: "Used to eat soup or cereal" },
  { word: "heart", hint: "Pumps blood in the body" },
  { word: "camel", hint: "Desert animal with humps" },
  { word: "watch", hint: "Worn on wrist to tell time" },
  { word: "piano", hint: "A musical instrument with keys" }
];

/*---------- Variables (state) ---------*/
let wrongGusses;
let lives = 6;
let randomWord;
let displayedLetters;

/*----- Cached Element References  -----*/
const letterBtns = document.querySelectorAll(".letter-btn");
const hangmanImg = document.querySelector("#hangman-img");
const blankEl = document.querySelector("#blanks");
const hintEl = document.querySelector("#hint");
const messageEl = document.querySelector("#message");
const livesRemaningEl = document.querySelector("#lives-remaning");
// const wrongLetters = document.querySelectorAll("#wrong-letters li");
const resetBtnEl = document.querySelector("#reset-btn");

/*-------------- Functions -------------*/
function init() {
    selected = words[Math.floor(Math.random() * words.length)];
    randomWord = selected.word;
    hintEl.textContent +=` ${selected.hint}`
    blankEl.textContent = "_ ".repeat(randomWord.length).trim();
    wrongGusses = 0;
    displayedLetters = new Array(randomWord.length).fill("");
    render();
    livesRemaningEl.textContent = `Remaning lives: ${lives} / 6`;
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
    livesRemaningEl.textContent = `Remaning lives: ${lives} / 6`;
}

function checkWin() {
    if(!displayedLetters.includes("")) {
        messageEl.textContent = `You Win!`;
        disableBtns();
    } else if(lives === 0) {
        messageEl.textContent = `You Lose!`;
        blankEl.textContent = randomWord.split("").join(" ");
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

            // if (wrongGusses <= wrongLetters.length) {
            //     wrongLetters[wrongGusses - 1].textContent = letter;
            // }

            hangmanImg.src = `images/hangman-${wrongGusses}.svg`;
        }
      
        render();
        checkWin();
        console.log(displayedLetters);
    })
})

resetBtnEl.addEventListener("click", () => { 
    messageEl.textContent = "";
    hintEl.textContent = "Hint: ";
    letterBtns.forEach(btn => btn.disabled = false);
    // wrongLetters.forEach(li => li.textContent = "");
    lives = 6;
    wrongGusses = 0;
    hangmanImg.src = `images/hangman-0.svg`;
   
    init();
})