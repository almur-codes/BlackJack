"use strict";
// import BlackJack from './BlackJack';
// new BlackJack()
// blackjack.startGame()
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
var readline = require("readline");
// import Player from './player';
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var question1 = function () {
    return new Promise(function (resolve, reject) {
        rl.question('q1 What do you think of Node.js? ', function (answer) {
            console.log("Thank you for your valuable feedback: " + answer);
            resolve(answer);
        });
    });
};
var question2 = function () {
    return new Promise(function (resolve, reject) {
        rl.question('q2 What do you think of Node.js? ', function (answer) {
            console.log("Thank you for your valuable feedback: " + answer);
            resolve(answer);
        });
    });
};
var question3 = function (i) {
    return new Promise(function (resolve, reject) {
        rl.question("q" + i + " What is your age? ", function (answer) {
            if (isNaN(Number(answer))) {
                reject(new Error("Not a valid number"));
                return;
            }
            console.log("Thank you for your valuable feedback: " + answer);
            resolve(answer);
        });
    });
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var index, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                index = 3;
                _a.label = 1;
            case 1:
                if (!(index < 6)) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, question3(index)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.log("Invalid input...");
                return [3 /*break*/, 5];
            case 5:
                index++;
                return [3 /*break*/, 1];
            case 6:
                rl.close();
                return [2 /*return*/];
        }
    });
}); };
main();
// console.log('four')
// let read = readline.createInterface({input: process.stdin, output: process.stdout})
// read.question("what is 1+1? ", (answer) => {
//     console.log(answer)
//     read.close()
// })
// let names: string[] = []
// for (let index = 0; index < 4; index++) {
// console.log("q")
// read.question("What is your name? ", (answer) => {
//     read.pause()
//     console.log("a")
//     names.push(answer)
//     read.resume()
//     read.close()
// })
//     read.on('line', (line) => {
//         console.log(line)
//     })
// }
// // console.log(names)
// let players: Player[] = [] 
// function getNumberOfPlayers(){
//     let numPlayers: number = 0
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
//     rl.setPrompt('How many players are playing > ')
//     rl.prompt()
//     rl.on('line', (line) => {
//         if (Number.isInteger(parseFloat(line)) && Number(line) > 0) {
//             numPlayers = Number(line)
//             rl.close()
//             createPlayers(numPlayers)
//         } else {
//             console.log("Not a number or not a valid number of players, Please try again")
//             rl.prompt()
//         }
//     })
// }
// function createPlayers(numberOfPlayers: number) {
//     const read = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
//     read.setPrompt('Enter Your Name > ');
//     read.prompt();
//     read.on('line', (line) => {
//         players.push(new Player(line))
//         if( players.length > numberOfPlayers ){
//             read.close()
//         }
//         read.prompt()
//     }).on('close', () => {
//         console.log('Have a great day!');
//         console.log(players)
//         process.exit(0);
//     });
// }
// getNumberOfPlayers()
// function getInput( prompt: string, callback: (input: string) => boolean ){
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
//     rl.setPrompt( prompt )
//     rl.prompt()
//     rl.on('line', (line) => {
//         if( callback(line) ){
//             rl.close()
//         } else {
//             rl.prompt()
//         }
//     })
// }
// let num: number = 0 
// getInput("How many players are playing? ", (input) => {
//     if( Number.isInteger(parseFloat(input)) && Number(input) > 0 ){
//         num = Number(input)
//         // getInput("What is your name? ", (line) => {
//         //     players.push(new Player(line))
//         //     if( players.length > num ){
//         //         return true
//         //     }
//         //     return false
//         // })
//         return true
//     } else {
//         console.log("Not a valid number of players, Please try again")
//         return false
//     }
// })
