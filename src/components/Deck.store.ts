import Card from './Card.store';
import { observable, computed, action } from 'mobx';

export default class Deck {

    @observable private cards: Array<Card>;

    public constructor() {
        this.cards = [];
        Card.CardTypes.forEach(cardType => {
            Card.CardSuites.forEach(cardSuite => {
                this.cards.push(new Card(cardType, cardSuite));
            });
        });
    }

    @computed public get getCards(): Array<Card> {
        return this.cards;
    }

    /**
     * Randomly chooses a card from the deck
     * Removes the chosen card from the deck
     * @returns Card
     */
    @action
    public deal(): Card {    
        let cardIndex: number =  Math.floor((Math.random() * (this.cards.length - 1)));

        return this.cards.splice(cardIndex, 1)[0];
    }
}