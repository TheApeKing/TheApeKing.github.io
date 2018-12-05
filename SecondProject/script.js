const canvas = document.querySelector("#canvas");
const betTxt = document.querySelector("#betTxt");
const betAmount = document.querySelector("#betAmount");
const ctx = canvas.getContext("2d");
const cardValues = ['A',2,3,4,5,6,7,8,9,10, 'J', 'Q', 'K'];
const cardTypes = ['♥', '♦', '♣', "♠"];
var computerScore = 0;
var playerScore = 0;
var computerAceValue = [];
var playerAceValue = [];
var deck = generateDeck();
var howMuchBet = 0;
var betMade = false;

const cardSpots = {
    cSpot1: { x: 300, y: 100, txtX: 305, txtY: 120, typeX: 335, typeY: 190 },
    pSpot1: { x: 300, y: 550, txtX: 305, txtY: 570, typeX: 335, typeY: 640 }
}

function play() {
    betAmount.innerHTML = 100;

    var card1 = dealCard(deck);
    var card2 = dealCard(deck);
    var card3 = dealCard(deck);
    var card4 = dealCard(deck);
    
    card(card1, "computer");
    card(card2, "player");
    cardBackside("dont", card3);
    card(card4, "player");
    
    countScore(card1.values, "computer");
    countScore(card2.values, "player");
    countScore(card4.values, "player");

    document.querySelector("#hit").addEventListener("click", (event) => {
        event.preventDefault();
        if(betCheck() == false) {
            return;
        }
        var item = dealCard(deck);
        card(item, "player");
        countScore(item.values, "player");
        checkWinner();
    });
    
    document.querySelector("#stand").addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#hit").style.visibility = "hidden";
        document.querySelector("#stand").style.visibility = "hidden";
        cardBackside("remove", card3);
        if(betCheck() == false) {
            return;
        }

        var tick = setInterval(() => {
            if(computerScore == 21) {
                clearInterval(tick);
                checkWinner();
            }
            else if(computerScore > 21) {
                clearInterval(tick);
                checkWinner();
            }
            else if(computerScore >= playerScore) {
                clearInterval(tick);
                checkWinner();
            }
            else {
                var item = dealCard(deck);
                card(item, "computer");
                countScore(item.values, "computer");
            }
        }, 500);
    });
}

function betCheck() {
    var checkInput = parseInt(betTxt.value);
    //pressed++;
    
    if(betMade == true) {
        //Returns true so the game can go on but does not change the bet amount
        return true;
    }

    if(!isNaN(checkInput) && checkInput <= betAmount.innerHTML && checkInput > 0) {
        howMuchBet = checkInput;
        betAmount.innerHTML -= checkInput;
        betMade = true;
        return true;
    }
    else if(!isNaN(checkInput) && checkInput > betAmount.innerHTML) {
        alert("You cant bet more than you have!");
        return false;
    }
    else if(!isNaN(checkInput) && checkInput <= 0) {
        alert("You have to bet something!");
        return false;
    }
    else {
        return false;
    }
}

function cardBackside(remove, myCard) {
    var color; 
    if(remove == "remove") {
        if(myCard.types == "♥" || myCard.types == "♦") {
            color = "red";
        }
        else {
            color = "black";
        }
        ctx.clearRect(400, 100, 100, 150);
        //Card frame
        ctx.strokeStyle = "black";
        ctx.strokeRect(400, 100, 100, 150);
        ctx.fillStyle = "white";
        ctx.fillRect(400, 100, 100, 150);

        //Card text txtX: 305, txtY: 120, typeX: 335, typeY: 190
        ctx.fillStyle = color;
        ctx.font = "48px Verdana";
        ctx.fillText(myCard.types, 435, 190);
        ctx.font = "18px Verdana";
        ctx.fillText(myCard.values, 405, 120);

        countScore(myCard.values, "computer");
        computerCardPosition();
    }
    else {
        var img = document.createElement('img');
        img.src = 'backside.jpg';
        img.onload = function () {
        ctx.drawImage(img, 400, 100, 100, 150);
        }
    }
}

function checkWinner() {
    if(computerScore == 21) {
        document.querySelector("#hit").style.visibility = "hidden";
        document.querySelector("#stand").style.visibility = "hidden";
        ctx.fillStyle = "white";
        ctx.font = "28px Verdana";
        ctx.fillText("You have lost!", 350, 400);
        outOfMoney();

        setTimeout(() => {
            resetAll();
        }, 2000);
    }
    else if(computerScore > 21) {
        ctx.fillStyle = "white";
        ctx.font = "28px Verdana";
        ctx.fillText("You won!", 350, 400);

        var amount = parseInt(betAmount.innerHTML);
        betAmount.innerHTML = amount + (howMuchBet * 2);

        setTimeout(() => {
            resetAll();
        }, 2000);
    }
    else if(computerScore >= playerScore) {
        document.querySelector("#hit").style.visibility = "hidden";
        document.querySelector("#stand").style.visibility = "hidden";
        ctx.fillStyle = "white";
        ctx.font = "28px Verdana";
        ctx.fillText("You have lost!", 350, 400);
        outOfMoney();

        setTimeout(() => {
            resetAll();
        }, 2000);
    }
    else if(playerScore > 21) {
        document.querySelector("#hit").style.visibility = "hidden";
        document.querySelector("#stand").style.visibility = "hidden";
        ctx.fillStyle = "white";
        ctx.font = "28px Verdana";
        ctx.fillText("You have lost!", 350, 400);
        outOfMoney();

        setTimeout(() => {
            resetAll();
        }, 2000);
    }
}

function resetAll() {
    deck = generateDeck();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    cardSpots.cSpot1.x = 300;
    cardSpots.cSpot1.txtX = 305;
    cardSpots.cSpot1.typeX = 335;
    
    cardSpots.pSpot1.x = 300;
    cardSpots.pSpot1.txtX = 305;
    cardSpots.pSpot1.typeX = 335;
    
    computerScore = 0;
    playerScore = 0;

    computerAceValue = [];
    playerAceValue = [];

    betMade = false;
    
    var card1 = dealCard(deck);
    var card2 = dealCard(deck);
    var card3 = dealCard(deck);
    var card4 = dealCard(deck);   
    
    cardBackside("dont", card3);

    card(card1, "computer");
    card(card2, "player");
    //card(card3, "computer");
    card(card4, "player");
    
    countScore(card1.values, "computer");
    countScore(card2.values, "player");
    countScore(card4.values, "player");

    document.querySelector("#hit").style.visibility = "visible";
    document.querySelector("#stand").style.visibility = "visible";
    //location.reload();
}

function outOfMoney() {
    if(parseInt(betAmount.innerHTML) == 0) {
        ctx.clearRect(0, 250, canvas.width, 200);
        ctx.fillStyle = "white";
        ctx.font = "28px Verdana";
        ctx.fillText("You have lost!", 350, 400);
        ctx.fillText("And have no money left!", 350, 450);
    }
}

function card(card, turn) {
    //Pick a card color depending on the card type
    var color;
    if(card.types == "♥" || card.types == "♦") {
        color = "red";
    }
    else {
        color = "black";
    }

    if(turn == "player") {
        playerCards(card, color);
    }
    else if(turn == "computer") {
        computerCards(card, color);
    }
}

function computerCards(deck, color) {
    //Card frame
    ctx.strokeStyle = "black";
    ctx.strokeRect(cardSpots.cSpot1.x, cardSpots.cSpot1.y, 100, 150);
    ctx.fillStyle = "white";
    ctx.fillRect(cardSpots.cSpot1.x, cardSpots.cSpot1.y, 100, 150);

    //Card text
    ctx.fillStyle = color;
    ctx.font = "48px Verdana";
    ctx.fillText(deck.types, cardSpots.cSpot1.typeX, cardSpots.cSpot1.typeY);
    ctx.font = "18px Verdana";
    ctx.fillText(deck.values, cardSpots.cSpot1.txtX, cardSpots.cSpot1.txtY);
    computerCardPosition();
}

function computerCardPosition() {
    cardSpots.cSpot1.x += 100;
    cardSpots.cSpot1.txtX += 100;
    cardSpots.cSpot1.typeX += 100;
}

function playerCardPosition() {
    cardSpots.pSpot1.x += 100;
    cardSpots.pSpot1.txtX += 100;
    cardSpots.pSpot1.typeX += 100;
}

function playerCards(deck, color) {
    //Card frame
    ctx.strokeStyle = "black";
    ctx.strokeRect(cardSpots.pSpot1.x, cardSpots.pSpot1.y, 100, 150);
    ctx.fillStyle = "white";
    ctx.fillRect(cardSpots.pSpot1.x, cardSpots.pSpot1.y, 100, 150);

    //Card text
    ctx.fillStyle = color;
    ctx.font = "48px Verdana";
    ctx.fillText(deck.types, cardSpots.pSpot1.typeX, cardSpots.pSpot1.typeY);
    ctx.font = "18px Verdana";
    ctx.fillText(deck.values, cardSpots.pSpot1.txtX, cardSpots.pSpot1.txtY);
    playerCardPosition();
}


function countScore(score, turn) {
    if(turn == "computer") {
        if(score == "J" || score =="Q" || score == "K") {
            computerScore += 10;
        }
        else if(score == "A") {
            if((computerScore + 11) > 21) {
                computerScore += 1;
                computerAceValue.push(1);
            }
            else {
                computerAceValue.push(11);
                computerScore += 11;
            }
        }
        else {
            computerScore += score;
        }

        if(computerScore > 21) {
            for(let i = 0; i < computerAceValue.length; i++) {
                if(computerAceValue[i] == 11) {
                    computerScore -= 10;
                    computerAceValue.splice(i, 1);
                }
            }
        }
        ctx.clearRect(0, 0, canvas.width, 90);
        ctx.fillStyle = "white";
        ctx.font = "18px Verdana";
        ctx.fillText(`COMPUTER: ${computerScore}`, 430, 50);
    }
    else if(turn == "player") {
        if(score == "J" || score =="Q" || score == "K") {
            playerScore += 10;
        }
        else if(score == "A") {
            if((playerScore + 11) > 21) {
                playerScore += 1;
                playerAceValue.push(1);
            }
            else {
                playerScore += 11;
                playerAceValue.push(11);
            }
        }
        else {
            playerScore += score;
        }

        if(playerScore > 21) {
            for(let i = 0; i <= playerAceValue.length; i++) {
                if(playerAceValue[i] == 11) {
                    playerScore -= 10;
                    playerAceValue.splice(i, 1);
                }
            }
        }       
        ctx.clearRect(0, 710, canvas.width, 90);
        ctx.fillStyle = "white";
        ctx.font = "18px Verdana";
        ctx.fillText(`PLAYER: ${playerScore}`, 430, 750);
    }
}

function dealCard(deck) {
    return deck.shift();
}

function generateDeck() {
    let deck = []; // will contain array of card objects.

    for(let i = 0; i < cardValues.length; i++) {
        for(let j = 0; j < cardTypes.length; j++) {
            // if the values is special then dont parseInt.
            if(cardValues[i] !== 'J' && cardValues[i] !== 'K' && cardValues[i] !== 'Q' && cardValues[i] !== 'A') {
                deck.push({values: parseInt(cardValues[i]), types: cardTypes[j]});
            }
            else {
                deck.push({values: cardValues[i], types: cardTypes[j]});
            }
        }
    }
    return shuffleDeck(deck);
}

function shuffleDeck(deck) {
    let shuffledDeck = deck.slice();
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = shuffledDeck[i];
        shuffledDeck[i] = shuffledDeck[j];
        shuffledDeck[j] = temp;
    }
    return shuffledDeck;
}

play(); 