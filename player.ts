import Card from "./Card";

interface Plays {
    bust: boolean
    stand: boolean
}

export default class Player {

    private name: string
    private hand: Array<Card>
    private score: number
    private play: Plays

    public constructor(name: string){
        this.name = name
        this.hand = []
        this.play = { bust: false, stand: false }
        this.calculateScore()
    }

    public hitMe(card: Card): void {
        this.hand.push(card)
        this.calculateScore()
    }

    public stay(): void {
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

    private calculateScore(): void {
        let total: number = 0

        this.hand.forEach((card: Card) => total += card.getValue() )

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