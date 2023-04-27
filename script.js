// https://developer.mozilla.org/en-US/docs/Glossary/Global_object
var currentSelection = "try0circle0";
var circle0 = "try0circle0";
var circle1 = "try0circle1";
var circle2 = "try0circle2";
var circle3 = "try0circle3";
var submitButtonClicked = 0;

var guess = [];
var code = [];

function startGame() {
    generateCode();
    
    document.getElementById("try0circle0").disabled = false;
    document.getElementById("try0circle1").disabled = false;
    document.getElementById("try0circle2").disabled = false;
    document.getElementById("try0circle3").disabled = false;

    circ0();
}

function generateCode() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(1);
    max = Math.floor(6);

    for (let i = 0; i < 4; i++) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1) + min).toString();
        code.push(randomNumber);
    }
}

function compare([peg0, peg1, peg2, peg3]) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    let copyOfCode = Array.from(code);

    let correctIndices = [];
    let blackPegs = 0;
    let whitePegs = 0;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] == copyOfCode[i]) {
            correctIndices.push(i);
            
            blackPegs++;
        }
    }

    if (blackPegs != 4) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        for (let i = correctIndices.length - 1; i >= 0; i--) {
            copyOfCode.splice(correctIndices[i], 1);
            guess.splice(correctIndices[i], 1);
        }

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
        for (let i = 0; i < guess.length; i++) {
            if (copyOfCode.includes(guess[i])) {
                copyOfCode.splice(copyOfCode.indexOf(guess[i]), 1);
                whitePegs++;
            }
        }
    }

    displayPegs([peg0, peg1, peg2, peg3], blackPegs, "black");
    displayPegs([peg0, peg1, peg2, peg3], whitePegs, "white");
    guess = [];

    if (blackPegs == 4) {
        // Display the code
        displayCode();

        resetCurrentRow();

        disableColourSelection();
        disableSubmitButton();

        // Terminates the program
        throw "";
    }
}

// Can display black pegs and white pegs
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for...of_statement
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break
function displayPegs([peg0, peg1, peg2, peg3], pegCount, colour) {
    if (pegCount != 0) {  // At least one peg
        for (const i of [peg0, peg1, peg2, peg3]) {
            if (document.getElementById(i).style.backgroundColor == "" && pegCount != 0) {
                document.getElementById(i).style.backgroundColor = colour;
                pegCount--;

                if (pegCount == 0) {
                    break;
                }
            }
        }
    }
}

function displayCode() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
    document.getElementById("correct_circle0").style.backgroundColor = stringToColour(code[0]);
    document.getElementById("correct_circle1").style.backgroundColor = stringToColour(code[1]);
    document.getElementById("correct_circle2").style.backgroundColor = stringToColour(code[2]);
    document.getElementById("correct_circle3").style.backgroundColor = stringToColour(code[3]);
}

function stringToColour(string) {
    if (string == "1") {
        return "red";
    }
    else if (string == "2") {
        return "blue";
    }
    else if (string == "3") {
        return "white";
    }
    else if (string == "4") {
        return "green";
    }
    else if (string == "5") {
        return "black";
    }
    else if (string == "6") {
        return "yellow";
    }
}

// Circle functions

function circ0() {
    document.getElementById(this.circle0).style.borderColor="aqua";
    document.getElementById(this.circle1).style.borderColor="black";
    document.getElementById(this.circle2).style.borderColor="black";
    document.getElementById(this.circle3).style.borderColor="black";
    currentSelection = this.circle0;
}

function circ1() {
    document.getElementById(this.circle0).style.borderColor="black";
    document.getElementById(this.circle1).style.borderColor="aqua";
    document.getElementById(this.circle2).style.borderColor="black";
    document.getElementById(this.circle3).style.borderColor="black";
    currentSelection = this.circle1;
}

function circ2() {
    document.getElementById(this.circle0).style.borderColor="black";
    document.getElementById(this.circle1).style.borderColor="black";
    document.getElementById(this.circle2).style.borderColor="aqua";
    document.getElementById(this.circle3).style.borderColor="black";
    currentSelection = this.circle2;
}

function circ3() {
    document.getElementById(this.circle0).style.borderColor="black";
    document.getElementById(this.circle1).style.borderColor="black";
    document.getElementById(this.circle2).style.borderColor="black";
    document.getElementById(this.circle3).style.borderColor="aqua";
    currentSelection = this.circle3;
}

function red() {
    document.getElementById(currentSelection).style.backgroundColor = "red";
    checkSelection();
    checkColoursInGuess();
}

function blue() {
    document.getElementById(currentSelection).style.backgroundColor = "blue";
    checkSelection();
    checkColoursInGuess();
}

function white() {
    document.getElementById(currentSelection).style.backgroundColor = "white";
    checkSelection();
    checkColoursInGuess();
}

function green() {
    document.getElementById(currentSelection).style.backgroundColor = "green";
    checkSelection();
    checkColoursInGuess();
}

function black() {
    document.getElementById(currentSelection).style.backgroundColor = "black";
    checkSelection();
    checkColoursInGuess();
}

function yellow() {
    document.getElementById(currentSelection).style.backgroundColor = "yellow";
    checkSelection();
    checkColoursInGuess();
}

function submit() {
    if (submitButtonClicked == 0) { // Button clicked on Try 0
        guess = getGuess().split("");
        compare(["try0peg0", "try0peg1", "try0peg2", "try0peg3"]);

        submitButtonClicked++;
        resetCurrentRow();

        // New row
        reassignCircles("try1circle0", "try1circle1", "try1circle2", "try1circle3");
        activateRow();
        circ0();

        disableSubmitButton();
    }
    else if (submitButtonClicked == 1) { // Button clicked on Try 1
        guess = getGuess().split("");
        compare(["try1peg0", "try1peg1", "try1peg2", "try1peg3"]);

        submitButtonClicked++;
        resetCurrentRow();

        // New row
        reassignCircles("try2circle0", "try2circle1", "try2circle2", "try2circle3");
        activateRow();
        circ0();
        
        disableSubmitButton();
    }
    else if (submitButtonClicked == 2) { // Button clicked on Try 2
        guess = getGuess().split("");
        compare(["try2peg0", "try2peg1", "try2peg2", "try2peg3"]);

        submitButtonClicked++;
        resetCurrentRow();

        // New row
        reassignCircles("try3circle0", "try3circle1", "try3circle2", "try3circle3");
        activateRow();
        circ0();
        
        disableSubmitButton();
    }
    else if (submitButtonClicked == 3) { // Button clicked on Try 3
        guess = getGuess().split("");
        compare(["try3peg0", "try3peg1", "try3peg2", "try3peg3"]);

        submitButtonClicked++;
        resetCurrentRow();

        // New row
        reassignCircles("try4circle0", "try4circle1", "try4circle2", "try4circle3");
        activateRow();
        circ0();
        
        disableSubmitButton();
    }
    else if (submitButtonClicked == 4) { // Button clicked on Try 4
        guess = getGuess().split("");
        compare(["try4peg0", "try4peg1", "try4peg2", "try4peg3"]);

        submitButtonClicked++;
        resetCurrentRow();

        // New row
        reassignCircles("try5circle0", "try5circle1", "try5circle2", "try5circle3");
        activateRow();
        circ0();
        
        disableSubmitButton();
    }
    else if (submitButtonClicked == 5) { // Button clicked on Try 5
        guess = getGuess().split("");
        compare(["try5peg0", "try5peg1", "try5peg2", "try5peg3"]);

        submitButtonClicked++;
        resetCurrentRow();

        // New row
        reassignCircles("try6circle0", "try6circle1", "try6circle2", "try6circle3");
        activateRow();
        circ0();
        
        disableSubmitButton();
    }
    else if (submitButtonClicked == 6) { // Button clicked on Try 6
        guess = getGuess().split("");
        compare(["try6peg0", "try6peg1", "try6peg2", "try6peg3"]);

        submitButtonClicked++;
        resetCurrentRow();

        // New row
        reassignCircles("try7circle0", "try7circle1", "try7circle2", "try7circle3");
        activateRow();
        circ0();
        
        disableSubmitButton();
    }
    else if (submitButtonClicked == 7) { // Button clicked on Try 7
        guess = getGuess().split("");
        compare(["try7peg0", "try7peg1", "try7peg2", "try7peg3"]);

        submitButtonClicked++;
        resetCurrentRow();

        // New row
        reassignCircles("try8circle0", "try8circle1", "try8circle2", "try8circle3");
        activateRow();
        circ0();
        
        disableSubmitButton();
    }
    else if (submitButtonClicked == 8) { // Button clicked on Try 8
        guess = getGuess().split("");
        compare(["try8peg0", "try8peg1", "try8peg2", "try8peg3"]);

        submitButtonClicked++;
        resetCurrentRow();

        // New row
        reassignCircles("try9circle0", "try9circle1", "try9circle2", "try9circle3");
        activateRow();
        circ0();
        
        disableSubmitButton();
    }
    else if (submitButtonClicked == 9) { // Button clicked on Try 9
        guess = getGuess().split("");
        compare(["try9peg0", "try9peg1", "try9peg2", "try9peg3"]);

        // The code was not guessed, display the code
        // Display the code
        displayCode();

        resetCurrentRow();

        disableColourSelection();
        disableSubmitButton();
    }
}

function resetCurrentRow() {
    document.getElementById(circle0).style.borderColor="black";
    document.getElementById(circle1).style.borderColor="black";
    document.getElementById(circle2).style.borderColor="black";
    document.getElementById(circle3).style.borderColor="black";

    document.getElementById(circle0).disabled = true;
    document.getElementById(circle1).disabled = true;
    document.getElementById(circle2).disabled = true;
    document.getElementById(circle3).disabled = true;
}

function reassignCircles(circle0, circle1, circle2, circle3) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    this.circle0 = circle0;
    this.circle1 = circle1;
    this.circle2 = circle2;
    this.circle3 = circle3;
}

function activateRow() {
    document.getElementById(circle0).disabled = false;
    document.getElementById(circle1).disabled = false;
    document.getElementById(circle2).disabled = false;
    document.getElementById(circle3).disabled = false;
}

function checkSelection() {
    if (currentSelection == this.circle0) {
        circ1();
    }
    else if (currentSelection == this.circle1) {
        circ2();
    }
    else if (currentSelection == this.circle2) {
        circ3();
    }
}

function checkColoursInGuess() {
    let coloursInGuess = 0;

    if (document.getElementById(this.circle0).style.backgroundColor != "") {
        coloursInGuess++;
    }

    if (document.getElementById(this.circle1).style.backgroundColor != "") {
        coloursInGuess++;
    }

    if (document.getElementById(this.circle2).style.backgroundColor != "") {
        coloursInGuess++;
    }

    if (document.getElementById(this.circle3).style.backgroundColor != "") {
        coloursInGuess++;
    }

    if (coloursInGuess == 4) {
        enableSubmitButton();
    }
}

function disableColourSelection() {
    document.getElementById("red").disabled = true;
    document.getElementById("blue").disabled = true;
    document.getElementById("white").disabled = true;
    document.getElementById("green").disabled = true;
    document.getElementById("black").disabled = true;
    document.getElementById("yellow").disabled = true;
}

function enableSubmitButton() {
    document.getElementById("submit").disabled = false;
    document.getElementById("submit").style.cursor = "pointer";
}

function disableSubmitButton() {
    document.getElementById("submit").disabled = true;
    document.getElementById("submit").style.cursor = "not-allowed";
}

function getGuess() {
    let guess = "";

    guess += colourToString(document.getElementById(circle0).style.backgroundColor);
    guess += colourToString(document.getElementById(circle1).style.backgroundColor);
    guess += colourToString(document.getElementById(circle2).style.backgroundColor);
    guess += colourToString(document.getElementById(circle3).style.backgroundColor);

    return guess;
}

function colourToString(colour) {
    if (colour == "red") {
        return "1";
    }
    else if (colour == "blue") {
        return "2";
    }
    else if (colour == "white") {
        return "3";
    }
    else if (colour == "green") {
        return "4";
    }
    else if (colour == "black") {
        return "5";
    }
    else if (colour == "yellow") {
        return "6";
    }
}
