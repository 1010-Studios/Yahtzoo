`use strict`

const diceRoll = document.querySelector(".dice--reroll");
const diceHold = document.querySelector(".dice--hold");
const $btnRollDice = document.getElementById("btn--roll")


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

$btnRollDice.addEventListener("click", function(){
    diceArr = roll(); //TODO Replace later
    // console.log(roll(5));
});


/*
----------Drag and Drop Functionality------------
*/

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

//TODO dragging to same space creates duplicates
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
function determineScores() {
    const scoreArr = holdArr.concat(...diceArr).sort();
    let score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    console.log(scoreArr);

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
        console.log(`sequence: ${sequence}, ${seqArr}`);
        tempArr.push(count)
        console.log(tempArr)

    }

    //Scoring Conditions
    //3x Kind + 4x Kind -- Add all dice
    if (tempArr.includes(3) || tempArr.includes(4) || tempArr.includes(5)) {
        console.log(`3x Kind!`)
        score[6] = scoreArr.reduce(function(a,b) {return a+b});

    }
    if (tempArr.includes(4) || tempArr.includes(5)) {
        console.log(`4x Kind!`)
        score[7] = scoreArr.reduce(function(a,b) {return a+b});

    }
    //Full House -- 25 Points
    if(tempArr.sort() === [2,3]){
        console.log(`Full House!`);
        score[8] = 25;
    }
    //Small and Large Straights -- 30 + 40 points
    if(seqArr.includes(5)){
        console.log(`Large Straight!`)
        score[10] = 40;
    } 
    if(seqArr.includes(4)){
        console.log(`Small Straight!`)
        score[9] = 30;
    }
    //Yahtzee! -- 100 points
    if (tempArr.includes(5)) {
        console.log(`Yahtzee!`)
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