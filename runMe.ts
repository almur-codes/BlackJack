// import BlackJack from './src/BlackJack';
import Card from './src/Card';
import * as readline from 'readline';
import Deck from './src/Deck';
// let blackJack: BlackJack = new BlackJack()

async function handleQuestion(question: string): Promise<number> {
    let value: string | number = await askQuestion(question)
    value = parseInt(value)
    if(value === 11 || value === 1){
        return value
    }
    return handleQuestion(question)
}

const read: readline.Interface = readline.createInterface({input: process.stdin, output: process.stdout})

function askQuestion (question: string): Promise<string> {
    return new Promise((resolve, reject) => {
        read.question(question, (answer) => resolve(answer))
    })
}

async function handlingAces(hand: Card[]): Promise<Card[]> {
    // calculate value of hand with out aces
    let handWithoutAces: Card[] = hand.filter((card: Card) => card.getLetter() !== 'A')
    let totalWithoutAces: number = 0
    handWithoutAces.forEach((card: Card) => {
        totalWithoutAces += card.getValue()
    });
    
    // if totalWithoutAces > 10 all aces must have a value of 1
    let acesInHand: Card[] = hand.filter((card: Card) => card.getLetter() === 'A')
    if( totalWithoutAces > 10 ){
        let newHand: Card[] = handWithoutAces.slice()
        acesInHand.forEach((card: Card) => {
            card.setValue( 1 )
            newHand.push( card )
        });
        // read.close()
        return newHand
    }

    // if totalWithoutAces < 11 only one ace value can be chosen the rest have values of 1 by default
    let hasMultipleAcesInHand: boolean = false
    let returnHand: Card[] = handWithoutAces.slice()
    for (let index = 0; index < acesInHand.length; index++) {
        const card: Card = acesInHand[index];
        if( !hasMultipleAcesInHand ){
            let value: number = await handleQuestion("What is the value of Ace > ")
            card.setValue( value )
            returnHand.push( card )
            hasMultipleAcesInHand = value === 11
        } else {
            card.setValue( 1 )
            returnHand.push( card )
        }
    }
    // read.close()
    return returnHand
}

function displayHand(hand: Card[]): void {
    let total: number = 0
    hand.forEach((card: Card) => {
        total += card.getValue()
    })
    console.log(hand)
    console.log(`total = ${total}`)
}

async function test(): Promise<void> {
    let testHands: Array<Array<Card>> = [
        [new Card('A', 'Heart'), new Card('A', 'Spade')],
        [new Card('A', 'Heart'), new Card('J', 'Spade'), new Card('A', 'Spade')],
        [new Card('K', 'Heart'), new Card('8', 'Spade'), new Card('A', 'Spade')],
    ]
    
    for (let index = 0; index < testHands.length; index++) {
        const hand = testHands[index];
        displayHand( await handlingAces( hand ) )  
    }
}

testTwo().then()

async function testTwo(){
    let playerHand: Card[] = []
    let score: number = 0
    let deck: Deck = new Deck()
    while ( score < 22 ){
        score = 0

        playerHand.push( deck.deal() )

        playerHand = await handlingAces( playerHand )

        displayHand( playerHand )

        playerHand.forEach((card: Card) => {
            score += card.getValue()
        })
    }
    read.close()
}

