/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying, prevScore, maxScore;
init();

function generateDiceNumber() {
    return Math.floor(Math.random()*6) + 1;
}

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        // Generate a random number
        var dice = generateDiceNumber();
        var dice2 = generateDiceNumber();
        // Display the result
        let diceDOM = document.querySelector(".dice");
        let diceDOM2 = document.querySelector(".dice2");
        diceDOM.style.display = "block";
        diceDOM2.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";
        diceDOM2.src = "dice-" + dice2 + ".png";
        console.log(prevScore);
        console.log(dice);
        // Update the round score IF the rolled number is different from 1
        if (dice === 6 && prevScore === 6){
            scores[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }
        else if (dice !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            //Next Player turn
            nextPlayer();
        }
        prevScore = dice;
    }
})

function nextPlayer() {
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    document.querySelector("#current-" + activePlayer).textContent = 0;
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
    document.querySelector(".dice").style.none = "none";
}

document.querySelector(".btn-hold").addEventListener("click", function (){
    if (gamePlaying){
        // Add current score to player global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        maxScore = document.getElementById("frm1").value;
        if (!maxScore) {
            maxScore = 100;
        }
        //Check if the player won the game
        if (scores[activePlayer] >= maxScore) {
            document.querySelector("#name-" + activePlayer). textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

})

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active"); 
    gamePlaying = true;
}
