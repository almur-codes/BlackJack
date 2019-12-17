import { autorun } from "mobx";

// import BlackJack from './src/BlackJack';
import Player from './src/Player';
import Deck from './src/Deck';
// new BlackJack();

let deck: Deck = new Deck();
// deck.
let player: Player = new Player("Alex", deck.deal);
autorun(() => {
    console.log(deck.getCards.length)
})
console.log(player)
player.hitMe()
player.hitMe()
player.hitMe()
player.hitMe()
player.hitMe()