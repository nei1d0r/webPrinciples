let guessList = []; 
let GENERATE_RANDOM_NUMBER = Number(Math.floor(Math.random() * 100 + 1));

let getUserGuess = () => {
    document.getElementById("hintDisplay").style.display = "block"
    let userInput = document.getElementById("userGuess").value;
    
    //checks to see that user input is not empty and updates array if it is not.
    userInput > 0 && userInput <= 100 && userInput != "" ? guessList.push(userInput) : guessList = guessList;

    let guessDifference = userInput - GENERATE_RANDOM_NUMBER;

    document.getElementById("totalGuessesSoFar").innerHTML = guessList.length;

    // evaluates whether guess is high or low
    let highOrLow = () => {
        return userInput == GENERATE_RANDOM_NUMBER ? "YOU WIN!!"
        : userInput < GENERATE_RANDOM_NUMBER ? "Too low guess again!!" : "Too high guess again!!";
    }
    // evaluates proximity of guess and returns string to be used for style
    let hotOrCold = () => {
        let guessDifference = userInput - GENERATE_RANDOM_NUMBER;
        return guessDifference == 0 ? "#90EE90"
        : guessDifference >= -10 && guessDifference <= 10 ?  "#D87093" 
        : "#87CEFA";
    }
    // maps all guess values and writes to document after each guess
    guessesSoFar = () => {
        return guessList.map(guess => "<span class='guesses'>"+guess+" "+"</span>").join(""); 
    }
    // updates display passing in above highOrLow, hotOrCold and guessesDoFar functions as innerHTML and style values respectively
    let displayGuessResult = () => { 
        document.getElementById("userGuess").value = "";
        document.getElementById("userHint").innerHTML = highOrLow();
        document.getElementById("footer").style.background = hotOrCold();
        document.getElementById("guessList").innerHTML = "<h3>Your Guesses:</h3>"+guessesSoFar();
    }
    let playerWin = () => {
        displayGuessResult();
        document.getElementById("guessBtn").disabled = true; // disable guess button when player wins
    }
    // checks to see if player guess is correct or not, displays guesses so far, and updates display accordingly.
    guessDifference != 0 ? displayGuessResult()  :  playerWin();
};

// resets guesses, guessList, generates new random number, enables guess button, and hides hint display.
let resetGame = () => {
    guesses = 0;
    guessList = []; 
    GENERATE_RANDOM_NUMBER = Number(Math.floor(Math.random() * 100 + 1));
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("hintDisplay").style.display = "none"; // change this as causes 
    document.getElementById("userGuess").value = "";
    document.getElementById("totalGuessesSoFar").innerHTML = 0;
    document.getElementById("footer").style.background = "#FFFFE0";
}