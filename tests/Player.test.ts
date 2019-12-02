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

test('should automatically set Ace to 1', () => {
    let player: Player = new Player("Test")
    player.hitMe(new Card('A', 'Spade'))
    player.hitMe(new Card('J', 'Heart'))
    player.hitMe(new Card('2', 'Heart'))
    expect( player.getScore() ).toBe(13)
})

test('should ask player to set value of Ace', () => {
    let player: Player = new Player("Test")
    player.hitMe(new Card('A', 'Spade'))
    player.hitMe(new Card('8', 'Heart'))
    player.hitMe(new Card('2', 'Heart'))
    expect( player.getScore() ).toBeGreaterThan(10)
    expect( player.getScore() ).toBeLessThan(22)
})
