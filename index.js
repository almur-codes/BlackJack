var cardTypes = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var cardSuites = ['Heart', 'Diamond', 'Spade', 'Club'];
var deck = [];
var players = [];
function createDeck() {
    cardTypes.forEach(function (cardType) {
        cardSuites.forEach(function (cardSuite) {
            deck.push({
                letter: cardType,
                suite: cardSuite,
                value: getCardValue(cardType)
            });
        });
    });
}
function getCardValue(cardLetter) {
    if (cardTypes.indexOf(cardLetter) > 0 && cardTypes.indexOf(cardLetter) < 10) {
        return Number(cardLetter);
    }
    if (cardTypes.indexOf(cardLetter) === 0) {
        return 1; // or 11
    }
    if (cardTypes.indexOf(cardLetter) > 9) {
        return 10;
    }
}
// start game
// -> deal two cards to each player
// -> each player has a chance to hit or stay
// -> keep repeating till either one player is bust or one player stays
// -> count each players card values
// -> winner is player with highest combined card value below 21
function resetGame() {
    deck = [];
    players = [];
}
function startGame() {
    resetGame();
    createDeck();
    addPlayersToGame();
    console.log(deck);
    players.forEach(function (player, index) {
        player.hand = [
            dealCard(),
            dealCard()
        ];
        calculateValue(index);
    });
    console.log(deck);
    while (!players[0].play.stay && !players[1].play.stay) {
        playARound(0);
        playARound(1);
    }
    console.log("Winner");
    if (players[0].score > players[1].score) {
        output(players[0]);
    }
    else {
        output(players[1]);
    }
}
function output(player) {
    console.log("Name: " + player.name + "; Hand: " + player.hand.map(function (card) { return " '" + card.letter + "' -> " + card.value; }) + "; Score: " + player.score);
}
function playARound(playerIndex) {
    output(players[playerIndex]);
    var input = prompt(players[playerIndex].name + "'s turn. Hit or Stay?");
    input = input.toLocaleLowerCase();
    console.log(deck);
    if (input === "hit") {
        players[playerIndex].hand.push(dealCard());
        calculateValue(playerIndex);
        players[playerIndex].play.hit = true;
        players[playerIndex].play.stay = false;
        if (players[playerIndex].score > 21) {
            console.log("Winner", players[1]);
            return;
        }
        playARound(playerIndex);
        return;
    }
    if (input === "stay") {
        calculateValue(playerIndex);
        players[playerIndex].play.hit = false;
        players[playerIndex].play.stay = true;
        return;
    }
    console.log("Incorrect input try again");
    playARound(playerIndex);
    return;
}
function calculateValue(playerIndex) {
    var total = 0;
    players[playerIndex].hand.forEach(function (card) {
        if (card.letter === "A") {
            var value = prompt("What is the value of A, 1 or 11?");
            total += Number(value);
        }
        else {
            total += getCardValue(card.letter);
        }
    });
    players[playerIndex].score = total;
}
function addPlayersToGame(numberOfPlayers) {
    if (numberOfPlayers === void 0) { numberOfPlayers = 2; }
    for (var index = 0; index < numberOfPlayers; index++) {
        players.push({
            name: 'Player ' + (index + 1),
            hand: [],
            score: 0,
            play: {
                hit: false,
                stay: false
            }
        });
    }
}
function dealCard() {
    // get random card type (number between (inclusive) 0 and 52)
    // remove it from deck
    // return card
    var cardIndex = Math.floor((Math.random() * (deck.length - 1)));
    var card = deck.splice(cardIndex, 1);
    return card.pop();
}
startGame();
