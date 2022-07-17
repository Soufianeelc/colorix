
const Colors = {
    //White: 'FFFFFF',
    Red: 'FF0000',
    Blue: '0000FF',
    Green: '11eba2',
    Orange: 'FF6600',
    Yellow: 'FFFF00',
    Purple: 'A020F0',
    Pink: 'FFC0CB'
};

// Variables
let CurrentColorName, FalseColorName,SecondFalseColorName; // to store colors names
let CurrentColorHexValue, FalseColorHexValue; // to store colors hex values
let AnswerButton, AnswerButtonId;
const Buttons = ['right-btn','left-btn'];

// DOM elements
let ColorBox = document.getElementById('colorBox');
let ButtonAtRight = document.getElementById('right-btn');
let ButtonAtLeft = document.getElementById('left-btn');
let controlButton = document.getElementById('control-btn')
let audio = new Audio('../sounds/sound-effect.mp3');
let intervalID;

let PlayerScore = new class{
    constructor(){
        this.currentScore = 0
        this.scoreCounterContainer = document.querySelector('span')
    }
    update(){
        this.currentScore = parseInt(this.scoreCounterContainer.innerText, 10) + 1 
        this.scoreCounterContainer.innerText = this.currentScore;
    }
}(); // Use of singelton class to limit class instanciations

// Functions
function GenereateRandomColor() {
    const ColorNamesList = Object.keys(Colors);
    let ColorName = ColorNamesList[Math.floor(Math.random() * ColorNamesList.length)];
    return ColorName;
}
// Searches the color hexadecimal color by name
function GetColorHexValue(ColorName){
     return '#' + Colors[ColorName];
}

// Choose three Random different Colors
function ChooseColors(){
    CurrentColorName = GenereateRandomColor()
    FalseColorName = GenereateRandomColor()
    SecondFalseColorName = GenereateRandomColor()

    // re-generate a different color if the two colors are the same
    while(FalseColorName === CurrentColorName){
        FalseColorName = GenereateRandomColor()
    }
    // re-generate a third random color if it's eqaual to  one of the two other generated colors
    while (SecondFalseColorName === CurrentColorName || SecondFalseColorName === FalseColorName) {
        SecondFalseColorName = GenereateRandomColor()
    }

    CurrentColorHexValue = GetColorHexValue(CurrentColorName)
    FalseColorHexValue = GetColorHexValue(FalseColorHexValue)

}

//This function generates randomly an HTML id of Answer Button
function ChooseRandomButton(){
    AnswerButtonId = Buttons[Math.floor(Math.random() * Buttons.length)]
    AnswerButton = document.getElementById(AnswerButtonId)
}

function setColorsOnPage(){
    ColorBox.style.backgroundColor = CurrentColorHexValue
    
    AnswerButton.innerText = CurrentColorName
    AnswerButton.style.backgroundColor = GetColorHexValue(FalseColorName)

    if(AnswerButtonId === 'right-btn')
    {
        ButtonAtLeft.style.backgroundColor = GetColorHexValue(SecondFalseColorName)
        ButtonAtLeft.innerText = FalseColorName
    }
    else
    {
        ButtonAtRight.style.backgroundColor = GetColorHexValue(SecondFalseColorName)
        ButtonAtRight.innerText = FalseColorName
    }
}

function resetButtons(){
    AnswerButton = null
    AnswerButtonId = null
}

function disableButtons(state){
    for (let i = 0; i < Buttons.length; i++) {
        document.getElementById(Buttons[i]).disabled = state
    }
}

function checkAnswer(){

    AnswerButton.onclick = () => {
        PlayerScore.update()
        audio.play()
        // disable the button once the user clicked on the answer button 
        // to avoid multi-clicks
        AnswerButton.disabled = true 
    }
}
function play() {
    intervalID = setInterval(function () {
        disableButtons(true)
        ChooseColors();
        ChooseRandomButton();
        setColorsOnPage()
        AnswerButton.disabled = false
        checkAnswer()
    }, 2000)
}

controlButton.onclick = () => {
    if(controlButton.innerText === 'Play'){
        controlButton.innerText = 'Pause';
        play()
        console.log(intervalID)
    }
    else{
        disableButtons(true)
        clearInterval(intervalID);
        controlButton.innerText = 'Play';
    }
}
