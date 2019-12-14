import { autorun } from "mobx";

// import BlackJack from './src/BlackJack';
import Player from './src/Player';
import Deck from './src/Deck';
// new BlackJack();

let deck: Deck = new Deck();
let player: Player = new Player("Alex", deck);
autorun(() => {
    console.log(deck.getCards.length)
})

player.hitMe()
player.hitMe()
player.hitMe()
player.hitMe()
player.hitMe()