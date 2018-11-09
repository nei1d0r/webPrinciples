// DRAW HANGMAN ON CANVAS
startGame = () => { // not full browser compatability!!??
    fetch("../words.json")   
    .then(response => response.json())
    .then(console.log("data loaded"))
    .then(json => randomWordGenerator(json))
}

function randomWordGenerator(json) {
    let endGame = false;
    let guessesSoFar = 0;
    let badKeyPresses = [];
    let words = json;
    let randomIndexNumber = Math.floor(Math.random() * words.length);
    let selectedRandomWord = words[randomIndexNumber].word; //random selection from words array
    let selectedRandomClue = words[randomIndexNumber].definition;
    let randomWordLetters = selectedRandomWord.toUpperCase().split("");
    let dashedString = [];
    const letterRegex = /[a-z]/i;

    badLetters = badKeyPresses;
    document.getElementById("body").innerHTML = '<div id="body"><h3>Word: </h3><h1 id="randomWord"></h1></div>';
    document.getElementById("badLetters").innerHTML = "";
    document.getElementById("guessesSoFar").innerHTML = guessesSoFar;
    document.getElementById("winner").innerHTML = "";
    drawHangman(badLetters);

    // -------------------- CONVERT WORD TO DASHES and DISPLAY DASHED WORD + CLUE --------------------------

    // converts selected word letters into "-" if it is a letter, regex ignores space and punctuation
    for (letter in randomWordLetters){
        randomWordLetters[letter].match(letterRegex) ? letter = "-" : letter = randomWordLetters[letter]; 
        dashedString.push(letter);
    }
    document.getElementById("randomWord").innerHTML = dashedString.join("");
    document.getElementById("clue").innerHTML = selectedRandomClue;

    // -------------------------------------- BUTTON EVENT HANDLERS ---------------------------------------

    // gets a keypress event, converts to uppercase and checks if it is in the keys array
    // if player wins, then keyName is set to null preventing further keypresses 
    document.addEventListener('keypress', (keyPressEvent) => {
        if(!endGame){
            let keyName = keyPressEvent.key.toUpperCase();
            keyName.charCodeAt(0) > 64 && keyName.charCodeAt(0) < 91 ? pushToArray(keyName) : console.log("not in alphabet");
        }
        else{
            keyname = null; // toggles keypress action after win
        }
    });

    // ----------------------------- CHECK IF KEYPRESS LETTER IS IN RANDOM WORD ---------------------------
    let pushToArray = (keyPressed) => {
        for (letter in randomWordLetters){
            keyPressed == randomWordLetters[letter] ? dashedString[letter] = keyPressed
            : randomWordLetters.includes(keyPressed) ? badKeyPresses = badKeyPresses : badKeyPresses.push(keyPressed);
            }

            badPressReport = () => {
                return badKeyPresses.push(keyPressed),
                document.getElementById("winner").innerHTML = "Invalid Keypress";
            }
        // Filters out duplicates from bad key presses
        badLetters = badKeyPresses.filter(function(item, index){
            return badKeyPresses.indexOf(item) >= index;
        });

        drawHangman(badLetters);
        
        // this is the endGame LOOP... winner = true fed into keypress event loop ^^.
        if (guessesSoFar + badLetters.length < 6){
            if (selectedRandomWord.toUpperCase() == dashedString.join("")){
                document.getElementById("winner").innerHTML = "WINNER!";
                endGame = true;
                document.getElementById("clue").innerHTML = "<button onClick='startGame()' autofocus>Play Again</button><button id='highScore' onClick='saveScore(badLetters)' autofocus>Save High Score</button>"
            }
        }
        else{
            selectedRandomWord.toUpperCase() == dashedString.join("")
            document.getElementById("winner").innerHTML = "You Lose!<br/> Answer:  "+selectedRandomWord;
            endGame = true;
            document.getElementById("clue").innerHTML = "<button onClick='startGame()' autofocus>Play Again</button>"
        }

        document.getElementById("randomWord").innerHTML = dashedString.join("");
        document.getElementById("badLetters").innerHTML = badLetters;
        document.getElementById("guessesSoFar").innerHTML = guessesSoFar + badLetters.length;
    }
}

let saveScore = (badLetters) => {
    console.log(badLetters.length);
    let name = prompt("name please").toUpperCase(); // maybe change this to get value of input??
    localStorage.setItem(name, badLetters.length);
    let highScoreList = [];
    for (i = 0; i < localStorage.length; i++)   {
        highScoreList.push([localStorage.getItem(localStorage.key(i)),localStorage.key(i)]);
    }
    displayList = highScoreList.sort().slice(0,10).map(person => "<p>"+person[1]+": " + person[0] + " guesses" + "</p>").join("")
    document.getElementById("body").innerHTML = "<h1>Leaderboard</h1>"+displayList;
    document.getElementById("highScore").disabled = true;
}

// DRAW HANGMAN ON CANVAS
function drawHangman(badLetters) {
    document.getElementById('body').innerHTML = '<div id="body"><canvas id="hangMan" height=200 width=150></canvas><h3>Word: </h3><h1 id="randomWord"></h1></div>';
        
    var c = document.getElementById("hangMan");
    var ctx = c.getContext("2d");
    //DO SWITCH CASE TO DRAW EACH PART
    ctx.beginPath();
    ctx.moveTo(130, 180);
    ctx.lineTo(10, 180);
    ctx.lineTo(10, 20);
    ctx.lineTo(80, 20);
    ctx.lineTo(80, 30);
    ctx.stroke();
    //head
    switch (badLetters.length){
        case 1:
            //head
            ctx.moveTo(88,45);
            ctx.arc(80,40,10,0,2*Math.PI);
            ctx.stroke();
            break;
        case 2:
            //body
            ctx.moveTo(88,45);
            ctx.arc(80,40,10,0,2*Math.PI);
            ctx.stroke();
            ctx.moveTo(80,50);
            ctx.lineTo(80, 100);
            ctx.stroke();
            break;
        case 3:
            //right arm
            ctx.moveTo(88,45);
            ctx.arc(80,40,10,0,2*Math.PI);
            ctx.stroke();
            ctx.moveTo(80,50);
            ctx.lineTo(80, 100);
            ctx.stroke();
            ctx.moveTo(80,55);
            ctx.lineTo(70,90);
            ctx.stroke();
            break;
        case 4:
            //left arm
            ctx.moveTo(88,45);
            ctx.arc(80,40,10,0,2*Math.PI);
            ctx.stroke();
            ctx.moveTo(80,50);
            ctx.lineTo(80, 100);
            ctx.stroke();
            ctx.moveTo(80,55);
            ctx.lineTo(70,90);
            ctx.stroke();
            ctx.moveTo(80,55);
            ctx.lineTo(90,90);
            ctx.stroke();
            break;
        case 5:
            //right leg
            ctx.moveTo(88,45);
            ctx.arc(80,40,10,0,2*Math.PI);
            ctx.stroke();
            ctx.moveTo(80,50);
            ctx.lineTo(80, 100);
            ctx.stroke();
            ctx.moveTo(80,55);
            ctx.lineTo(70,90);
            ctx.stroke();
            ctx.moveTo(80,55);
            ctx.lineTo(90,90);
            ctx.stroke();
            ctx.moveTo(80, 100);
            ctx.lineTo(70,140);
            ctx.stroke();
            break;
        case 6:
            //left leg
            ctx.moveTo(88,45);
            ctx.arc(80,40,10,0,2*Math.PI);
            ctx.stroke();
            ctx.moveTo(80,50);
            ctx.lineTo(80, 100);
            ctx.stroke();
            ctx.moveTo(80,55);
            ctx.lineTo(70,90);
            ctx.stroke();
            ctx.moveTo(80,55);
            ctx.lineTo(90,90);
            ctx.stroke();
            ctx.moveTo(80, 100);
            ctx.lineTo(70,140);
            ctx.stroke();
            ctx.moveTo(80, 100);
            ctx.lineTo(90,140);
            ctx.stroke();
            break;
    }
}

