export default class Card {
    public static readonly CardTypes: Array<string> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    public static readonly CardSuites: Array<string> = ['Heart', 'Diamond', 'Spade', 'Club'];

    private letter: string;
    private suite: string;
    private value: number;

    public constructor( letter: string, suite: string ){
        this.letter = letter;
        this.suite = suite;
        this.setValue();
    }

    public getLetter(): string {
        return this.letter;
    }
    
    public getSuite(): string {
        return this.suite;
    }
    
    public isAce(): boolean {
        return this.letter.toUpperCase() === "A";
    }
    
    public getValue(): number {
        return Number(this.value);
    }
    
    public setValue(valueOfAce?: number | undefined): number {
        if( this.isAce() ){
            if( valueOfAce ){
                this.value = Number(valueOfAce);
                return;
            }
            this.value = 11; // or 1
            return;
        }

        if( Card.CardTypes.indexOf(this.letter) > 0 && Card.CardTypes.indexOf(this.letter) < 10 ){
            this.value = Number(this.letter);
            return;
        }
    
        if( Card.CardTypes.indexOf(this.letter) > 9 && Card.CardTypes.indexOf(this.letter) < 13 ){
            this.value = 10;
            return;
        }

        throw new Error("Unexpected out of bounds");
    }

    public toDisplayString(): string {
        return `${this.letter}|${this.suite} => ${this.value}`; 
    }
}