import Card from "./Card";
import * as readline from "readline";
import { ADDRCONFIG } from "dns";

interface Plays {
    bust: boolean
    stand: boolean
}

export default class Player {

    private name: string
    private hand: Array<Card>
    private score: number
    private play: Plays

    private readonly read: readline.Interface = readline.createInterface({input: process.stdin, output: process.stdout})

    public constructor(name: string){
        this.name = name
        this.hand = []
        this.play = { bust: false, stand: false }
        this.score = 0
    }

    public async hitMe(card: Card): Promise<void> {
        this.hand.push(card)
        this.calculateScore()
    }

    public clearHand(): void {
        this.hand = []
    }

    public stand(): void {
        this.play.stand = true
    }

    public isBust(): boolean {
        return this.play.bust
    }

    public isStanding(): boolean {
        return this.play.stand
    }

    public getName(): string {
        return this.name
    }

    public getScore(): number {
        return this.score
    }

    public getHand(): Array<Card> {
        return this.hand
    }

    private async calculateScore(): Promise<void> {
        let handWithoutAces: Array<Card> = this.hand.filter((card: Card) => card.getLetter().toUpperCase() !== 'A')
        let newHand: Array<Card> = handWithoutAces.slice()
        
        // calculate value of hand with out aces
        let totalWithoutAces: number = 0
        handWithoutAces.forEach((card: Card) => {
            totalWithoutAces += card.getValue()
        });
        
        // if totalWithoutAces > 10 all aces must have a value of 1
        let acesInHand: Array<Card> = this.hand.filter((card: Card) => card.getLetter().toUpperCase() === 'A')
        if( totalWithoutAces > 10 ){
            acesInHand.forEach((ace: Card) => {
                ace.setValue( 1 )
                newHand.push( ace )
            });
        } else {
            // if totalWithoutAces < 11 only one ace value can be chosen the rest have values of 1 by default
            let hasAnAceBeenSetAsEleven: boolean = false
            for (let index = 0; index < acesInHand.length; index++) {
                const ace: Card = acesInHand[index];
                if( !hasAnAceBeenSetAsEleven ){
                    let value: number = await this.askQuestion("What is the value of Ace (11 or 1) > ")
                    ace.setValue( value )
                    hasAnAceBeenSetAsEleven = (value === 11)
                } else {
                    ace.setValue( 1 )
                }
                newHand.push( ace )
            }
        }

        this.hand = newHand

        let total: number = 0
        
        this.hand.forEach((card: Card) => {
            total += card.getValue()
        })

        this.score = Number(total)

        if( this.score > 21 ){
            this.play.bust = true
            this.score = 0
        }
    }

    public toString(): string {
        return "Name: " + this.name + "; Hand:" + this.hand.map((card: Card) => " " + card.toString()) + "; Score: " + this.score
    }

    private async askQuestion (question: string): Promise<number> {
        let answer: string | number = await new Promise((resolve, reject) => {
            this.read.question(question, (answer) => resolve(answer))
        })

        answer = Number(answer)
        if(answer === 11 || answer === 1){
            return answer
        }
        return this.askQuestion(question)
    }
}