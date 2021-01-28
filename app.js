const diceRoll = document.querySelector(".dice--reroll");
const diceHold = document.querySelector(".dice--hold");
const $btnRollDice = document.getElementById("btn--roll")


let holdArr = [];
let diceArr = [];

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

function swapdata(die, from, to){
    if(from.length + to.length === 5){
        to.push(die);
        from.splice(from.indexOf(die));
        drawDice(to, from);
    }
}

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
        
        holdArr.push(data);
        console.log(diceArr, holdArr)
        console.log(data, diceArr.indexOf(Number(data)));
        diceArr.splice(diceArr.indexOf(Number(data)), 1);
        
        
    }
    else if (ev.target.className === "dice--reroll") {
        diceArr.push(data);
        console.log(holdArr.indexOf(data));
        holdArr.splice(holdArr.indexOf(data), 1);

    }
    drawDice(diceArr, holdArr)
}

/*
----------Placeholder Comment------------
*/
