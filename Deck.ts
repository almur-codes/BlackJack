import Card from './Card';

export default class Deck {

    private cards: Array<Card> = []

    public constructor() {
        Card.CardTypes.forEach(cardType => {
            Card.CardSuites.forEach(cardSuite => {
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
    
        return this.cards.splice(cardIndex, 1).pop()
    }
}