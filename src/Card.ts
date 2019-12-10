import { observable, computed, action } from "mobx";

export default class Card {
    public static readonly CardTypes: Array<string> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    public static readonly CardSuites: Array<string> = ['Heart', 'Diamond', 'Spade', 'Club'];

    @observable private letter: string;
    @observable private suite: string;
    @observable private value: number;

    public constructor( letter: string, suite: string ){
        this.letter = letter;
        this.suite = suite;
        this.setValue();
    }

    @computed public get getLetter(): string {
        return this.letter;
    }
    
    @computed public get getSuite(): string {
        return this.suite;
    }
    
    @computed public get isAce(): boolean {
        return this.letter.toUpperCase() === "A";
    }
    
    @computed public get getValue(): number {
        return Number(this.value);
    }
    
    @action
    public setValue(valueOfAce?: number | undefined): number {
        if( this.isAce ){
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

    @computed public get toDisplayString(): string {
        return `${this.letter}|${this.suite} => ${this.value}`; 
    }
}