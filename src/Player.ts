import Card from "./Card";
import { observable, action, computed } from "mobx";

export default class Player {

    @observable private name: string;
    @observable private hand: Array<Card>;
    // @observable private score: number;
    @observable private move: {
        bust: boolean,
        stand: boolean
    };

    public constructor(name: string){
        this.name = name;
        this.hand = [];
        this.move = { bust: false, stand: false };
        // this.score = 0;
    }

    @action
    public hitMe(card: Card): void {
        this.hand.push(card);
        // this.calculateScore();
    }

    @action
    public reset(): void {
        this.hand = [];
        // this.score = 0;
        this.move = { bust: false, stand: false };
    }

    @action
    public stand(): void {
        this.move.stand = true;
    }
    
    @computed public get isBust(): boolean {
        // if( this.score > 21 ){
        //     this.move.bust = true;
        //     // this.score = 0;
        // }
        // return this.move.bust;

        return this.getScore > 21;
    }

    @computed public get isStanding(): boolean {
        return this.move.stand;
    }

    @computed public get getName(): string {
        return this.name;
    }

    @computed public get getScore(): number {
        let total: number = 0;
        
        this.getHandValuation.forEach((card: Card) => {
            total += card.getValue;
        });

        // this.score = Number(total);
        return Number(total);
    }

    @computed public get getHandValuation(): Array<Card> {
        let handWithoutAces: Array<Card> = this.hand.filter((card: Card) => !card.isAce);
        let valuatedHand: Array<Card> = handWithoutAces.slice();
        
        // calculate value of hand with out aces
        let totalWithoutAces: number = 0;
        handWithoutAces.forEach((card: Card) => {
            totalWithoutAces += card.getValue;
        });
        
        // if totalWithoutAces > 10 all aces must have a value of 1
        let acesInHand: Array<Card> = this.hand.filter((card: Card) => card.isAce);
        if( totalWithoutAces > 10 ){
            acesInHand.forEach((ace: Card) => {
                let newAce: Card = new Card(ace.getLetter, ace.getSuite, 1)
                // ace.setValue( 1 );
                valuatedHand.push( newAce );
            });
        } else {
            // if totalWithoutAces < 11 only one ace value can be 11 the rest have values of 1 by default
            let hasAnAceBeenSetAsEleven: boolean = false;
            for (let index = 0; index < acesInHand.length; index++) {
                const ace: Card = acesInHand[index];
                if( !hasAnAceBeenSetAsEleven ){
                    let newAce: Card = new Card(ace.getLetter, ace.getSuite, 11)
                    // ace.setValue( 11 );
                    hasAnAceBeenSetAsEleven = true;
                } else {
                    let newAce: Card = new Card(ace.getLetter, ace.getSuite, 1)
                    // ace.setValue( 1 );
                }
                valuatedHand.push( newAce );
            }
        }

        return valuatedHand;
    }

    @computed public get toDisplayString(): string {
        return `Name: ${this.name}; Hand:${this.hand.map((card: Card) => " " + card.toDisplayString)}; Score: ${this.getScore}`;
    }
}