import Player from '../src/Player';
import Card from '../src/Card';
import Deck from '../src/Deck';

let player: Player;
let deck: Deck;

beforeEach(() => {
    player = new Player("Test");
    deck = new Deck();
});

afterEach(() => {
    player = null;
    deck = null;
})

test('New Player is instance of class Player', () => {
    expect( player ).toBeInstanceOf(Player);
    expect( player.getName() ).toBe("Test");
    expect( player.getHand().length ).toBe(0);
    expect( player.getScore() ).toBe(0);
});

test('Should increase players hand by one', () => {
    player.hitMe( deck.deal() )
    expect( player.getHand().length ).toBe(1)
    expect( player.getScore() ).toBeGreaterThan(0)
});

test('Should automatically set Ace to 1', () => {
    player.hitMe(new Card('A', 'Spade'))
    expect( player.getScore() ).toBe(11)
    player.hitMe(new Card('8', 'Heart'))
    expect( player.getScore() ).toBe(19)
    player.hitMe(new Card('10', 'Heart'))
    expect( player.getScore() ).toBe(19)
});

test('Should set one Ace to 11 and all others to 1', () => {
    player.hitMe(new Card('A', 'Spade'))
    expect( player.getScore() ).toBe(11)
    player.hitMe(new Card('A', 'Spade'))
    expect( player.getScore() ).toBe(12)
    player.hitMe(new Card('6', 'Heart'))
    expect( player.getScore() ).toBe(18)
    player.hitMe(new Card('2', 'Heart'))
    expect( player.getScore() ).toBe(20)
})

test('Should return player object to original state', () => {
    player.hitMe( deck.deal() )
    player.hitMe( deck.deal() )
    player.hitMe( deck.deal() )
    expect( player.getHand().length ).toBe(3)
    player.reset()
    expect( player.getHand().length ).toBe(0)
    expect( player.getScore() ).toBe(0)
    expect( player.getName() ).toBe("Test");
});