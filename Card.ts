export default class Card {
    public static readonly CardTypes: Array<string> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

    public static readonly CardSuites: Array<string> = ['Heart', 'Diamond', 'Spade', 'Club']

    private letter: string
    private suite: string
    private value: number

    public constructor( letter: string, suite: string ){
        this.letter = letter
        this.suite = suite
        this.value = this.setValue(letter)
    }

    public getValue(): number {
        return Number(this.value)
    }

    public getLetter(): string {
        return this.letter
    }

    public setValue(cardLetter: string, valueOfA?: number | undefined): number {
        if( Card.CardTypes.indexOf(cardLetter) === 0 ){
            if( valueOfA ){
                return Number(valueOfA)
            }
            return 11 // or 1
        }

        if( Card.CardTypes.indexOf(cardLetter) > 0 && Card.CardTypes.indexOf(cardLetter) < 10 ){
            return Number(cardLetter)
        }
    
        if( Card.CardTypes.indexOf(cardLetter) > 9 && Card.CardTypes.indexOf(cardLetter) < 13 ){
            return 10
        }

        throw new Error("Unexpected out of bounds")
    }

    public toString(): string {
        return this.letter + "|" + this.suite + " => " + this.value 
    }
}