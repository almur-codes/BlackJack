import Player from '../src/Player';
import Card from '../src/Card';
import Deck from '../src/Deck';

let player: Player = new Player("Alex");

let deck: Deck = new Deck()

test('New Player is instance of class Player', () => {
    expect( player ).toBeInstanceOf(Player);
    expect( player.getName() ).toBe("Alex");
    expect( player.getHand().length ).toBe(0);
    expect( player.getScore() ).toBe(0);
});

test('Should increase players hand by one', () => {
    player.hitMe( deck.deal() )
    expect( player.getHand().length ).toBe(1)
    expect( player.getScore() ).toBeGreaterThan(0)
});

test('should ', () => {
    
})
