`use strict`

const diceRoll = document.querySelector(".dice--reroll");
const diceHold = document.querySelector(".dice--hold");
const $btnRollDice = document.getElementById("btn--roll")
const $btnCheckScore = document.getElementById("btn--score");
const $btnCloseScreen = document.getElementById("btn--close");

const $windowScores = document.querySelector(".score--container");

// const game => (() {
let holdArr = [];
let diceArr = [];

/*
----------Dice Rolling and Drawing------------
*/

function roll(){
    diceArr = [];
    for(let i = 0; i < 5-holdArr.length; i++){
        diceArr.push(Math.floor(Math.random()*6+1))
    }
    drawDice(diceArr, holdArr);

    return diceArr;
}




/*
----------Buttons n Sich------------
*/

$btnCloseScreen.addEventListener("click", toggleScoreScreen);

//TODO Replace later - currently only for functionality
$btnRollDice.addEventListener("click", function(){
    diceArr = roll(); 
    // console.log(roll(5));
});

$btnCheckScore.addEventListener("click", function() {
    console.log(determineScores(diceArr, holdArr));
    toggleScoreScreen(determineScores(diceArr, holdArr));
})

/*
----------Rendering------------
*/

function drawDice(diceArr, holdArr) {
    diceRoll.innerHTML = "";
    const diceHold = document.querySelector(".dice--hold");
    diceHold.innerHTML ="";
    for(die of diceArr){
        const diceNo = document.createElement("img");
        diceNo.className = `dice--img ${die}`;
        diceNo.id = `${die}`;
        diceNo.draggable = true;
        diceNo.src=`res/dice-${die}.png`;
        diceRoll.appendChild(diceNo);
    }
    for(die of holdArr) {
        const diceNo = document.createElement("img");
        diceNo.className = `dice--img ${die}`;
        diceNo.id = `${die}`;
        diceNo.draggable = true;
        diceNo.src=`res/dice-${die}.png`;
        diceHold.appendChild(diceNo); 
    }
    const diceIMG = document.querySelectorAll(".dice--img")
    diceIMG.forEach(die => {
        this.addEventListener(`dragstart`, function() {
            drag(event),
            false;
        });
    });
    
}

function toggleScoreScreen(scoreArr) {
    const __scoreBTN = document.querySelectorAll(".btn--score");
    for(let i = 0; i < __scoreBTN.length; i++){
        __scoreBTN[i].value = scoreArr[i];
        __scoreBTN[i].innerHTML = `${__scoreBTN[i].value} Points`;
    }

    $windowScores.classList.toggle("hidden");
}

/*
----------Drag and Drop Dice Functionality------------
*/

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev){
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    
    if(ev.target.className === "dice--hold"){
        if(diceArr.indexOf(Number(data))!== -1){
        holdArr.push(...diceArr.splice(diceArr.indexOf(Number(data)), 1));
        }
    }

    else if (ev.target.className === "dice--reroll") {
        if(holdArr.indexOf(Number(data)) !== -1) {
        diceArr.push(...holdArr.splice(holdArr.indexOf(Number(data)), 1));
        }
    }
    drawDice(diceArr, holdArr)
}

/*
----------Scoring------------
*/
function determineScores(hold, dice) {
    const scoreArr = hold.concat(...dice).sort();
    drawDice([], []);
    let score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    //Upper Board Scores
    for(let i = 1; i <=5; i++){
        for(let j = 0; j < scoreArr.length; j++) {
            if (scoreArr[j] === i) score[i-1] += i;
        }
    }
    
    //Sequencing and Multiples
    let count =1;
    let sequence = 1;
    let tempArr = [];
    let seqArr = [];

    for(let i=0;i<scoreArr.length; i++){
        if(scoreArr[i] === scoreArr[i-1]) count++;
        else count = 1;
        if(scoreArr[i] === scoreArr[i-1]+1) {
            sequence++;
            if(sequence >= 4) seqArr.push(sequence);
        }
        else if(scoreArr[i] === scoreArr[i-1]){}
        else sequence = 1;
        tempArr.push(count)

    }

    //Scoring Conditions

    //3x Kind + 4x Kind -- Add all dice
    if (tempArr.includes(3)){
        score[6] = scoreArr.reduce(function(a,b) {return a+b});

    }
    if (tempArr.includes(4)) {
        score[7] = scoreArr.reduce(function(a,b) {return a+b});

    }
    //Full House -- 25 Points
    if(tempArr.sort() === [2,3]){
        score[8] = 25;
    }
    //Small / Large Straights -- 30 / 40 points
    if(seqArr.includes(4)){
        score[9] = 30;
    }

    if(seqArr.includes(5)){
        score[10] = 40;
    } 

    //Yahtzee! -- 100 points
    if (tempArr.includes(5)) {
        score[11] = 100;
    }


    return score;
}

/*
----------Players------------
*/


/*
----------Game Loop------------
*/
