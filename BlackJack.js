"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Deck_1 = require("./Deck");
var Player_1 = require("./Player");
var readline = require("readline");
var BlackJack = /** @class */ (function () {
    function BlackJack() {
        this.players = [];
        this.read = readline.createInterface({ input: process.stdin, output: process.stdout });
        this.setUpGame();
    }
    BlackJack.prototype.setUpGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("New Game of Black Jack!!");
                        return [4 /*yield*/, this.addPlayersToGame()];
                    case 1:
                        _a.sent();
                        console.log("Start Game!!");
                        return [4 /*yield*/, this.startGame()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BlackJack.prototype.addPlayersToGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var numberOfPlayers, index, playerName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.askQuestion("How many players will be playing > ")];
                    case 1:
                        numberOfPlayers = _a.sent();
                        numberOfPlayers = parseInt(numberOfPlayers);
                        if (isNaN(numberOfPlayers)) {
                            console.log("Invalid number of players, please try again.");
                            return [2 /*return*/, this.addPlayersToGame()];
                        }
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < numberOfPlayers)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.askQuestion("Enter player " + (index + 1) + "'s name > ")];
                    case 3:
                        playerName = _a.sent();
                        this.players.push(new Player_1["default"](playerName));
                        _a.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BlackJack.prototype.startGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var index, playAgain;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.deck = new Deck_1["default"]();
                        this.players.forEach(function (player) {
                            player.hitMe(_this.deck.deal());
                            player.hitMe(_this.deck.deal());
                        });
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < this.players.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.playARound(this.players[index])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.getWinner()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.askQuestion("Play again? (Yes, No) > ")];
                    case 6:
                        playAgain = _a.sent();
                        playAgain = playAgain.toLocaleLowerCase();
                        if (playAgain === "yes") {
                            this.resetGame();
                            return [2 /*return*/, this.startGame()];
                        }
                        this.read.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    BlackJack.prototype.playARound = function (player) {
        return __awaiter(this, void 0, void 0, function () {
            var input;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.display(player, { info: true, warning: false, bust: false, winner: false });
                        return [4 /*yield*/, this.askQuestion(player.getName() + " will you HIT or STAND > ")];
                    case 1:
                        input = _a.sent();
                        input = input.toLocaleLowerCase();
                        if (input === "hit") {
                            player.hitMe(this.deck.deal());
                            if (player.isBust()) {
                                this.display(player, { info: false, warning: false, bust: true, winner: false });
                                return [2 /*return*/];
                            }
                            return [2 /*return*/, this.playARound(player)];
                        }
                        if (input === "stand") {
                            player.stand();
                            return [2 /*return*/];
                        }
                        this.display(player, { info: false, warning: true, bust: false, winner: false });
                        return [2 /*return*/, this.playARound(player)];
                }
            });
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
            if (!highestScoringPlayer) {
                highestScoringPlayer = player;
            }
            else {
                if (!player.isBust()) {
                    // handle draws
                    highestScoringPlayer = (highestScoringPlayer.getScore() > player.getScore()) ? highestScoringPlayer : player;
                }
            }
        });
        this.display(highestScoringPlayer, { info: false, warning: false, bust: false, winner: true });
    };
    BlackJack.prototype.resetGame = function () {
        this.deck = null;
        this.players.forEach(function (player) {
            player.clearHand();
        });
    };
    BlackJack.prototype.askQuestion = function (question) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.read.question(question, function (answer) { return resolve(answer); });
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
    BlackJack.prototype.areAllPlayersBustOrStanding = function () {
        var verdict = true;
        this.players.forEach(function (player) {
            verdict = (verdict && (player.isBust() || player.isStanding()));
        });
        return verdict;
    };
    return BlackJack;
}());
exports["default"] = BlackJack;
