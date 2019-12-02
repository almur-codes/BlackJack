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

test('Should automatically set Ace to 1', async () => {
    let player: Player = new Player("Test")
    await player.hitMe(new Card('A', 'Spade'))
    await player.hitMe(new Card('J', 'Heart'))
    await player.hitMe(new Card('2', 'Heart'))
    expect( player.getScore() ).toBe(13)
})

test('Should set one Ace to 11 and all others to 1', async () => {
    let player: Player = new Player("Test")
    await player.hitMe(new Card('A', 'Spade'))
    await player.hitMe(new Card('A', 'Spade'))
    await player.hitMe(new Card('6', 'Heart'))
    await player.hitMe(new Card('2', 'Heart'))
    expect( player.getScore() ).toBe(20)
})