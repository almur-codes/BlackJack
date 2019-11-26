"use strict";
exports.__esModule = true;
var Player = /** @class */ (function () {
    function Player(name, hand, play) {
        this.name = name;
        this.hand = hand;
        this.play = play;
        this.calculateScore();
    }
    Player.prototype.hitMe = function (card) {
        this.hand.push(card);
        this.calculateScore();
    };
    Player.prototype.stay = function () {
        this.calculateScore();
        this.play.stand = true;
    };
    Player.prototype.isBust = function () {
        return this.play.bust;
    };
    Player.prototype.isStanding = function () {
        return this.play.stand;
    };
    Player.prototype.calculateScore = function () {
        var total = 0;
        this.hand.forEach(function (card) { return total += card.value; });
        this.score = Number(total);
        if (total > 21) {
            this.play.bust = true;
            this.score = 0;
        }
    };
    Player.prototype.toString = function () {
        return "Name: " + this.name + "; Hand:" + this.hand.map(function (card) { return " " + card.toString(); }) + "; Score: " + this.score;
    };
    return Player;
}());
exports["default"] = Player;
