import Card from "../src/Card";

let card: Card = new Card('A', 'Heart');

test('New Card is an instance of class Card', () => {
    expect( card ).toBeInstanceOf(Card);
});

test('Value of card is in number format and is larger than 0 but less than 12', () => {
    expect( card.getValue() ).toBeGreaterThan(0);
    expect( card.getValue() ).toBeLessThan(12);
});

test('There shoud be 13 different card types', () => {
    expect( Card.CardTypes.length ).toBe(13);
});

test('There shoud be 4 different card suites', () => {
    expect( Card.CardSuites.length ).toBe(4);
});

test('Card letter should be found in the card types array', () => {
    expect( Card.CardTypes.indexOf(card.getLetter()) ).not.toStrictEqual(-1);
});