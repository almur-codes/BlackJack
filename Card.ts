import Constants from './constants';

export default class Card {

    public letter: string
    public suite: string
    public value: number

    public constructor( letter: string, suite: string, valueOfA?: number | undefined ){
        this.letter = letter
        this.suite = suite
        this.value = this.setCardValue(letter, valueOfA)
    }

    public setCardValue(cardLetter: string, valueOfA?: number | undefined): number {
        if( Constants.CardTypes.indexOf(cardLetter) === 0 ){
            if( valueOfA ){
                return Number(valueOfA)
            }
            return 11 // or 1
        }

        if( Constants.CardTypes.indexOf(cardLetter) > 0 && Constants.CardTypes.indexOf(cardLetter) < 10 ){
            return Number(cardLetter)
        }
    
        if( Constants.CardTypes.indexOf(cardLetter) > 9 && Constants.CardTypes.indexOf(cardLetter) < 13 ){
            return 10
        }

        throw new Error("Unexpected out of bounds")
    }

    public toString(): string {
        return this.letter + " | " + this.suite + " => " + this.value 
    }
}