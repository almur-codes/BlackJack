"use strict";
exports.__esModule = true;
var Constants_1 = require("./Constants");
var Card = /** @class */ (function () {
    function Card(letter, suite, valueOfA) {
        this.letter = letter;
        this.suite = suite;
        this.value = this.setCardValue(letter, valueOfA);
    }
    Card.prototype.setCardValue = function (cardLetter, valueOfA) {
        if (Constants_1["default"].CardTypes.indexOf(cardLetter) === 0) {
            if (valueOfA) {
                return Number(valueOfA);
            }
            return 11; // or 1
        }
        if (Constants_1["default"].CardTypes.indexOf(cardLetter) > 0 && Constants_1["default"].CardTypes.indexOf(cardLetter) < 10) {
            return Number(cardLetter);
        }
        if (Constants_1["default"].CardTypes.indexOf(cardLetter) > 9 && Constants_1["default"].CardTypes.indexOf(cardLetter) < 13) {
            return 10;
        }
        throw new Error("Unexpected out of bounds");
    };
    Card.prototype.toString = function () {
        return this.letter + "|" + this.suite + " => " + this.value;
    };
    return Card;
}());
exports["default"] = Card;
