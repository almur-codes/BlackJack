import Card from "./Card";

interface Plays {
    bust: boolean
    stand: boolean
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

    public hitMe(card: Card): void {
        this.hand.push(card)
        this.calculateScore()
    }

    public stay(): void {
        this.calculateScore();
        this.play.stand = true
    }

    public isBust(): boolean {
        return this.play.bust
    }

    public isStanding(): boolean {
        return this.play.stand
    }

    private calculateScore(): void {
        let total: number = 0

        this.hand.forEach((card: Card) => total += card.value )

        this.score = Number(total)

        if( total > 21 ){
            this.play.bust = true
            this.score = 0
        }
    }

    public toString(): string {
        return "Name: " + this.name + "; Hand:" + this.hand.map((card: Card) => " " + card.toString()) + "; Score: " + this.score
    }
}