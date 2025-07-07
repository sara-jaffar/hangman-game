/*-------------- Constants -------------*/
const words = [
  { word: "breeze", hint: "A gentle wind" },
  { word: "jungle", hint: "Dense forest in tropical regions" },
  { word: "planet", hint: "Orbits a star and may support life" },
  { word: "bridge", hint: "Connects two places across water or land" },
  { word: "rocket", hint: "Launches into space" },
  { word: "island", hint: "Land surrounded by water" },
  { word: "museum", hint: "Place where historical items are displayed" },
  { word: "pencil", hint: "Used for writing, can be erased" },
  { word: "camera", hint: "Captures images or videos" },
  { word: "ladder", hint: "Used to climb to higher places" },
  { word: "helmet", hint: "Protects your head" },
  { word: "castle", hint: "Large fortified building from the past" },
  { word: "mirror", hint: "Reflects your image" },
  { word: "forest", hint: "Large area full of trees" },
  { word: "pirate", hint: "Sailed seas and stole treasure" },
  { word: "desert", hint: "Very dry place with little rain" },
  { word: "oxygen", hint: "Gas we breathe to stay alive" },
  { word: "tunnel", hint: "Underground passageway" },
  { word: "planet", hint: "Orbits the sun in space" },
  { word: "violin", hint: "String instrument played with a bow" },
  { word: "guitar", hint: "Popular instrument with strings" },
  { word: "wallet", hint: "Holds your money and cards" },
  { word: "lantern", hint: "Portable light source used in the dark" },
  { word: "dragon", hint: "Mythical creature that breathes fire" },
  { word: "rocket", hint: "Used to reach space" },
  { word: "ticket", hint: "Grants entry or travel access" },
  { word: "puzzle", hint: "Game or problem to solve" },
  { word: "cactus", hint: "Plant that survives in the desert" },
  { word: "castle", hint: "Where medieval kings lived" },
  { word: "hammer", hint: "Tool used to drive nails" }
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
        btn.style.backgroundColor = "#fde4f2";
    })
}

/*----------- Event Listeners ----------*/

letterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const letter = btn.textContent;

        btn.disabled = true;
        btn.style.backgroundColor = "#fde4f2";
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

            hangmanImg.src = `images/hangman-${wrongGusses}.svg`;
        }
      
        render();
        checkWin();
    })
})

resetBtnEl.addEventListener("click", () => { 
    messageEl.textContent = "";
    hintEl.textContent = "Hint: ";
    letterBtns.forEach(btn => {
        btn.disabled = false;
        btn.style.backgroundColor = "#eea1cd";
    });

    lives = 6;
    wrongGusses = 0;
    hangmanImg.src = `images/hangman-0.svg`;
   
    init();
})