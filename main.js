const keyboardDiv =document.querySelector(".keyboard");
const wordDisplay=document.querySelector(".word-display");
const guessesText =document.querySelector(".guesses-text b");
const hangmanImg =document.querySelector(".hangman-box img ");
const gameModal =document.querySelector(".game-modal");
const playAgainBtn=document.querySelector(".play-again");

 let currentWord , wrongGuessCount=0 , correctLetters=[];
 const maxGuesses =6;


 const  resetGame = ()=>{
    // Ressestting all game variabels and UI elements
    correctLetters=[];
    wrongGuessCount=0;
    hangmanImg.src=`images/hangman-${wrongGuessCount}.svg `;
    guessesText.innerText=`${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn =>btn.disabled=false);
    wordDisplay.innerHTML=currentWord.split("").map(() =>`  <li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}
const getRandomword = () =>{
    //selecting a random word and hint from the wordlist
    const{word , hint} = wordList[Math.floor(Math.random()*wordList.length)]
    currentWord=word;
    document.querySelector(".hinttext b ").innerText=hint;
    resetGame();
    
}

const gameOver=(isVictory) => {
    // After 600ms of game complete.. showing modal with releant details
    setTimeout(()=>{
        const modalText=isVictory ? `You found the word :` : `The correct word was :`;
         gameModal.querySelector("img").src=`images/${isVictory ? 'victory' : 'lost'}.gif`;
         gameModal.querySelector("h4").innerText=`${isVictory ? 'Congrats!' : 'Game Over!'}`;
         gameModal.querySelector("p").innerHTML=`${modalText} <b>${currentWord}</b>`;
         gameModal.classList.add("show");
    },300);
}





const initGame = (button, clickedLetter) =>{
    // checking if clickedLetter is exist on the currentword
   if(currentWord.includes( clickedLetter)){
   [...currentWord].forEach((letter , index) =>  {
    //showing all cporrect letters on tg#he word display
    if(letter===clickedLetter)
     {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText=letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
   }
   });
   }
   else{
    // if clicked letter dosent exist then update the wrongGuessCount and hangman images
    wrongGuessCount++;
    hangmanImg.src=`images/hangman-${wrongGuessCount}.svg `;
   }
   button.disabled = true;
   guessesText.innerText=`${wrongGuessCount} / ${maxGuesses}`;
   //  calling gameover fun if any of these condition meets
   if(wrongGuessCount===maxGuesses) 
    return gameOver(false);
   if(correctLetters.length===currentWord.length) 
    return gameOver(true);
} 
//creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText= String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click" , e => initGame(e.target, String.fromCharCode(i) ))

    
}
getRandomword();
playAgainBtn.addEventListener("click", getRandomword);