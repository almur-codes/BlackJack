"use strict";
exports.__esModule = true;
var Deck_1 = require("./Deck");
var Player_1 = require("./Player");
var readline = require("readline");
var BlackJack = /** @class */ (function () {
    // private rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // })
    // private question = (question: string) => {
    //     return new Promise((resolve, reject) => {
    //         this.rl.question(question, (answer) => {
    //             console.log('Okay')
    //             resolve()
    //             return answer
    //         })
    //     })
    // }
    // private async askQuestion(question: string) {
    //     this.question(question).then((ans) => {
    //         return ans
    //     })
    // }
    function BlackJack() {
        this.players = [];
        // this.question("New Game of Black Jack\nHow Many Players\n").then((ans) => {
        //     console.log(ans)
        // })
        var numberOfPlayers;
        var read = readline.createInterface({ input: process.stdin, output: process.stdout });
        read.question("New Game of Black Jack\nHow Many Players?", function (answer) {
            numberOfPlayers = answer;
            console.log(numberOfPlayers);
        });
        return;
        // let numberOfPlayers: number | string = prompt("New Game of Black Jack\nHow Many Players")
        numberOfPlayers = Number(numberOfPlayers);
        var playerNames = [];
        for (var index = 0; index < numberOfPlayers; index++) {
            var name_1 = prompt("Enter player " + (index + 1) + "'s name");
            // let name: string = "Player " + (index + 1)
            playerNames.push(name_1);
        }
        this.addPlayersToGame(playerNames);
    }
    BlackJack.prototype.startGame = function () {
        var _this = this;
        this.deck = new Deck_1["default"]();
        this.players.forEach(function (player) {
            player.hitMe(_this.deck.deal());
            player.hitMe(_this.deck.deal());
        });
        while (!this.areAllPlayersBustOrStanding()) {
            this.players.forEach(function (player) {
                _this.playARound(player);
            });
        }
        this.getWinner();
    };
    BlackJack.prototype.resetGame = function () {
        this.deck = null;
        this.players = [];
    };
    BlackJack.prototype.addPlayersToGame = function (playerNames) {
        var _this = this;
        playerNames.forEach(function (name) {
            _this.players.push(new Player_1["default"](name));
        });
    };
    BlackJack.prototype.getWinner = function () {
        var _this = this;
        var highestScoringPlayer = this.players[0];
        this.players.forEach(function (player) {
            _this.display(player, {
                info: true,
                warning: false,
                bust: false,
                winner: false
            });
            if (!player.isBust()) {
                highestScoringPlayer = (highestScoringPlayer.getScore() > player.getScore()) ? highestScoringPlayer : player;
            }
        });
        this.display(highestScoringPlayer, { info: false, warning: false, bust: false, winner: true });
    };
    BlackJack.prototype.areAllPlayersBustOrStanding = function () {
        var verdict = true;
        this.players.forEach(function (player) {
            verdict = (verdict && (player.isBust() || player.isStanding()));
        });
        return verdict;
    };
    BlackJack.prototype.playARound = function (player) {
        this.display(player, { info: true, warning: false, bust: false, winner: false });
        // let input: string = prompt( player.name + "'s turn. Hit or Stay?" )
        var input = (player.getScore() < 16) ? 'hit' : 'stay';
        input = input.toLocaleLowerCase();
        if (input === "hit") {
            player.hitMe(this.deck.deal());
            if (player.isBust()) {
                this.display(player, { info: false, warning: false, bust: true, winner: false });
                return;
            }
            this.playARound(player);
            return;
        }
        if (input === "stay") {
            player.stay();
            return;
        }
        this.display(player, { info: false, warning: true, bust: false, winner: false });
        this.playARound(player);
        return;
    };
    BlackJack.prototype.display = function (player, type) {
        if (type.info) {
            console.log(player.toString());
        }
        if (type.warning) {
            console.log(player.getName() + " invalid move. Please try again");
        }
        if (type.bust) {
            console.log(player.getName() + " is bust!!\n" + player.toString());
        }
        if (type.winner) {
            console.log(player.getName() + " is the Winner!!\n" + player.toString());
        }
    };
    return BlackJack;
}());
exports["default"] = BlackJack;
var bj = new BlackJack();
