import Card from "./Card.store";
import { observable, action, computed } from "mobx";

export default class PlayerStore {

    @observable private name: string;
    @observable private hand: Array<Card>;
    @observable private score: number;
    @observable private move: {
        bust: boolean,
        stand: boolean
    };

    public constructor(name: string){
        this.name = name;
        this.hand = [];
        this.move = { bust: false, stand: false };
        this.score = 0;
    }

    @action
    public hitMe(card: Card): void {
        this.hand.push(card);
        this.calculateScore();
    }

    @action
    public reset(): void {
        this.hand = [];
        this.score = 0;
        this.move = { bust: false, stand: false };
    }

    @action
    public stand(): void {
        this.move.stand = true;
    }
    
    @computed public get isBust(): boolean {
        return this.move.bust;
    }

    @computed public get isStanding(): boolean {
        return this.move.stand;
    }

    @computed public get getName(): string {
        return this.name;
    }

    @computed public get getScore(): number {
        return this.score;
    }

    @computed public get getHand(): Array<Card> {
        return this.hand;
    }

    private calculateScore(): void {
        let handWithoutAces: Array<Card> = this.hand.filter((card: Card) => !card.isAce);
        let newHand: Array<Card> = handWithoutAces.slice();
        
        // calculate value of hand with out aces
        let totalWithoutAces: number = 0;
        handWithoutAces.forEach((card: Card) => {
            totalWithoutAces += card.getValue;
        });
        
        // if totalWithoutAces > 10 all aces must have a value of 1
        let acesInHand: Array<Card> = this.hand.filter((card: Card) => card.isAce);
        if( totalWithoutAces > 10 ){
            acesInHand.forEach((ace: Card) => {
                ace.setValue( 1 );
                newHand.push( ace );
            });
        } else {
            // if totalWithoutAces < 11 only one ace value can be 11 the rest have values of 1 by default
            let hasAnAceBeenSetAsEleven: boolean = false;
            for (let index = 0; index < acesInHand.length; index++) {
                const ace: Card = acesInHand[index];
                if( !hasAnAceBeenSetAsEleven ){
                    ace.setValue( 11 );
                    hasAnAceBeenSetAsEleven = true;
                } else {
                    ace.setValue( 1 );
                }
                newHand.push( ace );
            }
        }

        this.hand = newHand;

        let total: number = 0;
        
        this.hand.forEach((card: Card) => {
            total += card.getValue;
        });

        this.score = Number(total);

        if( this.score > 21 ){
            this.move.bust = true;
            this.score = 0;
        }
    }

    @computed public get toDisplayString(): string {
        return `Name: ${this.name}; Hand:${this.hand.map((card: Card) => " " + card.toDisplayString)}; Score: ${this.score}`;
    }
}