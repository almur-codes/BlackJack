import Card from './Card';
import Constants from "./Constants";

export default class Deck {

    private cards: Array<Card> = []

    public constructor() {
        Constants.CardTypes.forEach(cardType => {
            Constants.CardSuites.forEach(cardSuite => {
                this.cards.push(new Card(cardType, cardSuite))
            })
        });
    }

    /**
     * Randomly chooses a card from the deck
     * Removes the chosen card from the deck
     * @returns Card
     */
    public deal(): Card {    
        let cardIndex: number =  Math.floor((Math.random() * (this.cards.length - 1)))
    
        let card: Array<Card> = this.cards.splice(cardIndex, 1)
    
        return card.pop()
    }
}