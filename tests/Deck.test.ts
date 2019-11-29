import Deck from '../src/Deck';
import Card from '../src/Card'

let deck: Deck = new Deck();

test('New deck should be instance of class Deck', () => {
    expect( deck ).toBeInstanceOf( Deck );
});

test('Deck should have 13 cards of each suit', () => {
    expect( deck.getCards().filter((card: Card) => card.getSuite() === 'Heart').length ).toBe(13)
    expect( deck.getCards().filter((card: Card) => card.getSuite() === 'Diamond').length ).toBe(13)
    expect( deck.getCards().filter((card: Card) => card.getSuite() === 'Spade').length ).toBe(13)
    expect( deck.getCards().filter((card: Card) => card.getSuite() === 'Club').length ).toBe(13)
})

test('Deck should have exactly 52 (13 x 4) cards', () => {
    expect( deck.getCards().length ).toBe(52)
})

test('Should return a card and remove it from deck', () => {    
    expect( deck.deal() ).toBeInstanceOf(Card)

    expect( deck.getCards().length ).toBe(51)
})