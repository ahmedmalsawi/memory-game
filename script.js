let time = document.querySelector('.time span');
let duration = 1000; // milliseconds
let cardsContainer = document.getElementById("memory-game-blocks");

let allMatchedCount = cardsContainer.getElementsByClassName("has-match");
let allCardsCount = cardsContainer.getElementsByClassName("game-block");


function increaseTime() {
    time.innerHTML = parseInt(time.innerHTML) + 1;
}

let startTimer ;
//get username
document.querySelector(".control-buttons span").onclick = function() {
    let yourName = prompt("Please enter your name");
    if(yourName == null || yourName == ""){
        document.querySelector('.name span').innerHTML = "Unknown";
    }else{
        document.querySelector('.name span').innerHTML = yourName;
    }
    document.querySelector('.control-buttons').classList.add('hide');
    startTimer = setInterval(increaseTime, duration);
    var timesRun = 0;
	var interval = setInterval(function () {
		timesRun += 1;
		if (allMatchedCount.length === allCardsCount.length) {
			clearInterval(interval);
            console.log("stopped");
            let failedCount = parseInt(
							document.querySelector(".tries span").innerHTML
						);
            document.getElementById("control-buttons").classList.remove("hide");
            document.getElementById("control-buttons").innerHTML = `
    <span class="flex-1">Great Job ${yourName},you have finished in ${timesRun} s with ${failedCount} tries wrong. Click <a href="#" onclick="reloadPage()"> Here </a> for a new game</span>
                
            `;
		}
		//do whatever here..
		}, 1000);
	flipall();
	setTimeout(() => { flipall();},1000);
}

function reloadPage(){
window.location.reload();
}

//set variables
let blocksContainer = document.querySelector(".memory-game-blocks");
// join all blocks together
let blocks = Array.from(blocksContainer.children);
// console.log(blocks);

let orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

//Add order Css Property to Game Blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    //add click event to flip the block
    block.addEventListener('click', function (){
        flipBlock(block);
        });
    });


// set filp function
function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    //collect all flipped cards
    let allFlippedCards = blocks.filter(flipedBlock =>	flipedBlock.classList.contains("is-flipped"));
    
    // if there  is Two selected blocks
    if (allFlippedCards.length === 2){
        console.log("Two slected");
        //Stop clicking
        stopClick();
        // check if matched
        matchBlocks(allFlippedCards[0], allFlippedCards[1]);
    }
}

//Stop clicking function
function stopClick(){
    //Add a class to the main container to stop clicking 
    blocksContainer.classList.add("no-clicking");
    //Reomve click strict from Blocks
    setTimeout(()=>{
        blocksContainer.classList.remove("no-clicking");
    },duration);
};


//shuffle function
function shuffle(array){
    //Setting Variables
    let current = array.length,
    temp,
    random;
    while(current > 0){
        //Get random value
        random = Math.floor(Math.random() * current);
        //Decrease length by One
        current--;
        // swap values
        // save current value to a temp storage to be replaced with in destination
        temp = array[current];
        // save current value from a new random value
        array[current]=array[random];
        //set removed index with the stored value
        array[random]= temp;
    }
    return array;
}
//check matched blocks
function matchBlocks(firstBlock,secondBlock){
    let tries = document.querySelector('.tries span');
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
			//remove is flipped class
			firstBlock.classList.remove("is-flipped");
			secondBlock.classList.remove("is-flipped");
			//add has-match class
			firstBlock.classList.add("has-match");
			secondBlock.classList.add("has-match");
        document.getElementById('success').play();
    }else{
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        document.getElementById('fail').play();
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
            }, duration);
		}
};

function flipall()
{
    let getAll = document.querySelectorAll('.game-block');
    getAll.forEach((element) => element.classList.toggle("is-flipped"));
};


	
