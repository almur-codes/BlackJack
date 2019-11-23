import Card from "./Card";

interface Plays {
    hit: boolean
    stay: boolean
}

export default class Player {

    public name: string
    public hand: Array<Card>
    public score: number
    public play: Plays

    public constructor(name: string, hand: Array<Card>, play: Plays){
        this.name = name
        this.hand = hand
        this.play = play
        this.calculateScore()
    }

    public calculateScore(): void {
        let total: number = 0

        this.hand.forEach((card: Card) => {
            if (card.letter === "A"){
                let value: string = prompt("What is the value of A, 1 or 11?")
                total += Number(value)
            } else {
                total += getCardValue(card.letter)
            }
        })

        this.score = Number(total)
    }

    public toString(): string {
        return "Name: " + this.name + "; Hand: " + this.hand.map((card: Card) => card.toString) + "; Score: " + this.score
    }
}