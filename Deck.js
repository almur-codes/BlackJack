"use strict";
exports.__esModule = true;
var Card_1 = require("./Card");
var Constants_1 = require("./Constants");
var Deck = /** @class */ (function () {
    function Deck() {
        var _this = this;
        Constants_1["default"].CardTypes.forEach(function (cardType) {
            Constants_1["default"].CardSuites.forEach(function (cardSuite) {
                _this.cards.push(new Card_1["default"](cardType, cardSuite));
            });
        });
    }
    /**
     * Randomly chooses a card from the deck
     * Removes the chosen card from the deck
     * @returns Card
     */
    Deck.prototype.deal = function () {
        var cardIndex = Math.floor((Math.random() * (this.cards.length - 1)));
        var card = this.cards.splice(cardIndex, 1);
        return card.pop();
    };
    return Deck;
}());
exports["default"] = Deck;
