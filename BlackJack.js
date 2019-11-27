"use strict";
exports.__esModule = true;
var Deck_1 = require("./Deck");
var Player_1 = require("./Player");
var readline = require("readline");
var BlackJack = /** @class */ (function () {
    function BlackJack() {
        this.players = [];
        this.getNumberOfPlayers();
        this.startGame();
    }
    BlackJack.prototype.getNumberOfPlayers = function () {
        var _this = this;
        var numPlayers = 0;
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.setPrompt('How many players are playing > ');
        rl.prompt();
        rl.on('line', function (line) {
            if (Number.isInteger(parseFloat(line)) && Number(line) > 0) {
                numPlayers = Number(line);
                rl.close();
                _this.createPlayers(numPlayers);
            }
            else {
                console.log("Not a number or not a valid number of players, Please try again");
                rl.prompt();
            }
        });
    };
    BlackJack.prototype.createPlayers = function (numberOfPlayers) {
        var _this = this;
        var read = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        read.setPrompt('Enter Your Name > ');
        read.prompt();
        read.on('line', function (line) {
            _this.players.push(new Player_1["default"](line));
            if (_this.players.length > numberOfPlayers) {
                read.close();
            }
            read.prompt();
        }).on('close', function () {
            // console.log('Have a great day!');
            // console.log(this.players)
            process.exit(0);
        });
    };
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
        if (this.players.length < 1)
            return;
        var highestScoringPlayer = null;
        this.players.forEach(function (player) {
            _this.display(player, {
                info: true,
                warning: false,
                bust: false,
                winner: false
            });
            if (!player.isBust()) {
                highestScoringPlayer = (highestScoringPlayer.getScore() > player.getScore() && !highestScoringPlayer) ? highestScoringPlayer : player;
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
        var _this = this;
        this.display(player, { info: true, warning: false, bust: false, winner: false });
        // let input: string = (player.getScore() < 16) ? 'hit' : 'stay'
        // input = input.toLocaleLowerCase()
        var read = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        read.setPrompt('Hit or Stand > ');
        read.prompt();
        read.on('line', function (line) {
            line = line.toLocaleLowerCase();
            if (line === "hit") {
                player.hitMe(_this.deck.deal());
                if (player.isBust()) {
                    _this.display(player, { info: false, warning: false, bust: true, winner: false });
                    read.close();
                    return;
                }
                read.close();
                _this.playARound(player);
                return;
            }
            if (line === "stay") {
                player.stay();
                read.close();
                return;
            }
            _this.display(player, { info: false, warning: true, bust: false, winner: false });
            read.close();
            _this.playARound(player);
            return;
        }).on('close', function () {
            process.exit(0);
        });
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
