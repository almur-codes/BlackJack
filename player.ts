import Card from "./Card";

import * as readline from "readline";

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

    public hitMe(card: Card): void {
        this.hand.push(card)
        this.calculateScore()
    }

    public clearHand(): void {
        this.hand = []
    }

    public stand(): void {
        this.calculateScore()
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

    private calculateScore(): void {
        let total: number = 0

        for (let index = 0; index < this.hand.length; index++) {
            const card = this.hand[index];
            // if( card.getLetter().toUpperCase() === 'A' ){
            //     let valueOfAce: string | number
            //     if( total < 11 ){
            //         valueOfAce = await this.askQuestion("What is the value of A")
            //         valueOfAce = Number(valueOfAce)
            //     } else {
            //         valueOfAce = 1
            //     }
            //     // set value of ace
            //     card.setValue(card.getLetter().toUpperCase(), valueOfAce)
            //     total += valueOfAce
            // } else {
                total += card.getValue()
            // }
        }

        this.score = Number(total)

        if( this.score > 21 ){
            this.play.bust = true
            this.score = 0
        }
    }

    public toString(): string {
        return "Name: " + this.name + "; Hand:" + this.hand.map((card: Card) => " " + card.toString()) + "; Score: " + this.score
    }

    private askQuestion (question: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.read.question(question, (answer) => resolve(answer))
        })
    }
}