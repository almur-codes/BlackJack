"use strict";
exports.__esModule = true;
var Player = /** @class */ (function () {
    function Player(name) {
        this.name = name;
        this.hand = [];
        this.play = { bust: false, stand: false };
        this.calculateScore();
    }
    Player.prototype.hitMe = function (card) {
        this.hand.push(card);
        this.calculateScore();
    };
    Player.prototype.clearHand = function () {
        this.hand = [];
    };
    Player.prototype.stand = function () {
        this.calculateScore();
        this.play.stand = true;
    };
    Player.prototype.isBust = function () {
        return this.play.bust;
    };
    Player.prototype.isStanding = function () {
        return this.play.stand;
    };
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.getScore = function () {
        return this.score;
    };
    Player.prototype.calculateScore = function () {
        var total = 0;
        this.hand.forEach(function (card) { return total += card.getValue(); });
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
