const cardTypes: Array<string> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

const cardSuites: Array<string> = ['Heart', 'Diamond', 'Spade', 'Club']

interface Card {
    letter: string,
    suite: string,
    value: number
}

interface Player {
    name: string,
    hand: Array<Card>,
    score: number,
    play: Plays
}

interface Plays {
    hit: boolean
    stay: boolean
}

let deck: Array<Card> = []

let players: Array<Player> = []

function createDeck(): void {
    cardTypes.forEach(cardType => {
        cardSuites.forEach(cardSuite => {
            deck.push({
                letter: cardType,
                suite: cardSuite,
                value: getCardValue(cardType)
            })
        })
    });
}

function getCardValue(cardLetter: string): number {
    if( cardTypes.indexOf(cardLetter) > 0 && cardTypes.indexOf(cardLetter) < 10 ){
        return Number(cardLetter)
    }

    if( cardTypes.indexOf(cardLetter) === 0 ){
        return 1 // or 11
    }

    if( cardTypes.indexOf(cardLetter) > 9 ){
        return 10
    }
}

// start game
// -> deal two cards to each player
// -> each player has a chance to hit or stay
// -> keep repeating till either one player is bust or one player stays
// -> count each players card values
// -> winner is player with highest combined card value below 21

function resetGame(): void {
    deck = []
    players = []
}

function startGame(): void {
    resetGame();
    
    createDeck();

    addPlayersToGame();

    players.forEach((player: Player, index: number) => {
        player.hand = [
            dealCard(),
            dealCard()
        ]

        calculateValue(index)
    });

    while ( !players[0].play.stay && !players[1].play.stay ){
        playARound(0)

        playARound(1)
    }

    console.log("Winner")
    if( players[0].score > players[1].score ){
        output( players[0] )
    } else {
        output( players[1] )
    }
}

function output(player: Player): void {
    console.log( "Name: " + player.name + "; Hand: " + player.hand.map((card: Card) =>  " '" + card.letter + "' -> " + card.value) + "; Score: " + player.score)
}

function playARound(playerIndex: number): void{
    output( players[playerIndex] )
    
    let input: string = prompt( players[playerIndex].name + "'s turn. Hit or Stay?" )

    input = input.toLocaleLowerCase()

    if( input === "hit" ){
        players[playerIndex].hand.push(dealCard())
        calculateValue(playerIndex)
        players[playerIndex].play.hit = true
        players[playerIndex].play.stay = false

        if( players[playerIndex].score > 21 ){
            console.log("Winner", players[1] )
            return
        }

        playARound(playerIndex)
        return
    }
    if( input === "stay" ){
        calculateValue(playerIndex)
        players[playerIndex].play.hit = false
        players[playerIndex].play.stay = true

        return
    }

    console.log("Incorrect input try again")
    playARound(playerIndex)
    return
}

function calculateValue(playerIndex: number): void {
    let total: number = 0
    players[playerIndex].hand.forEach((card: Card) => {
        if (card.letter === "A"){
            let value: string = prompt("What is the value of A, 1 or 11?")
            total += Number(value)
        } else {
            total += getCardValue(card.letter)
        }
    })
    players[playerIndex].score = total
}

function addPlayersToGame(numberOfPlayers: number = 2): void {
    for (let index = 0; index < numberOfPlayers; index++) {
        players.push({
            name: 'Player ' + (index + 1),
            hand: [],
            score: 0,
            play: {
                hit: false,
                stay: false
            }
        })
    }
}

function dealCard(): Card {
    // get random card type (number between (inclusive) 0 and 52)
    // remove it from deck
    // return card

    let cardIndex: number =  Math.floor((Math.random() * (deck.length - 1)))

    let card: Card[] = deck.splice(cardIndex, 1)

    return card.pop()
}

startGame()