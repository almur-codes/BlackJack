import { observable, computed, action } from "mobx";

export default class CardStore {
    public static readonly CardTypes: Array<string> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    public static readonly CardSuites: Array<string> = ['Heart', 'Diamond', 'Spade', 'Club'];

    private readonly CardNames: Array<string> = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];

    @observable private letter: string;
    @observable private suite: string;
    @observable private value: number;
    @observable private className: string;

    public constructor( letter: string, suite: string ){
        this.letter = letter;
        this.suite = suite;
        this.value = 0;
        this.className = "";
        this.setClassName();
        this.setValue();
    }

    @computed public get getClassName(): string {
        return this.className;
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
    private setClassName(): void {
        let cardNameIndex: number = CardStore.CardTypes.findIndex((cardType: string) => cardType === this.letter)
        if( cardNameIndex < 0 ){
            throw new Error("Unexpected index out of bounds error");
        }
        let cardName: string = this.CardNames[cardNameIndex];
        let suiteName: string = this.suite.toLowerCase();
        this.className = `${cardName}-of-${suiteName}s`;
    }
    
    @action
    public setValue(valueOfAce?: number | undefined): void {
        if( this.isAce ){
            if( valueOfAce ){
                this.value = Number(valueOfAce);
                return;
            }
            this.value = 11; // or 1
            return;
        }

        if( CardStore.CardTypes.indexOf(this.letter) > 0 && CardStore.CardTypes.indexOf(this.letter) < 10 ){
            this.value = Number(this.letter);
            return;
        }
    
        if( CardStore.CardTypes.indexOf(this.letter) > 9 && CardStore.CardTypes.indexOf(this.letter) < 13 ){
            this.value = 10;
            return;
        }

        throw new Error("Unexpected out of bounds");
    }

    @computed public get toDisplayString(): string {
        return `${this.letter}|${this.suite} => ${this.value}`; 
    }
}