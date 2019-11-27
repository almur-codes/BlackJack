"use strict";
exports.__esModule = true;
var BlackJack_1 = require("./BlackJack");
var blackJack = new BlackJack_1["default"]();
// blackJack.startGame()
// import * as readline from 'readline'
// import Player from './player';
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
// const question1 = () => {
//     return new Promise((resolve, reject) => {
//         rl.question('q1 What do you think of Node.js? ', (answer) => {
//             console.log(`Thank you for your valuable feedback: ${answer}`)
//             resolve(answer)
//         })
//     })
// }
// const question2 = () => {
//     return new Promise((resolve, reject) => {
//         rl.question('q2 What do you think of Node.js? ', (answer) => {
//             console.log(`Thank you for your valuable feedback: ${answer}`)
//             resolve(answer)
//         })
//     })
// }
// const question3 = (i: number): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         rl.question(`q${i} What is your age? `, (answer) => {
//             if( isNaN(Number(answer)) ){
//                 reject(new Error("Not a valid number"))
//                 return
//             }
//             console.log(`Thank you for your valuable feedback: ${answer}`)
//             resolve(answer)
//         })
//     })
// }
// const read = readline.createInterface({input: process.stdin, output: process.stdout})
// const main = async () => {
// console.log('one')
// await question1()
// console.log('two')
// let x = await question3()
// try {
//     let x = await question3()
//     console.log(x)
// } catch (error) {
//     console.log("AN ERROR OCCURRED")
//     throw error
// }
// console.log(x)
// console.log('three')
// for (let index = 3; index < 6; index++) {
//     try {
//         // await question3(index)
//     } catch (error) {
//         console.log("Invalid input...")
//     }
// }
// rl.close()
//     let numberOfPlayers: string | number = await question("How many players > ")
//     numberOfPlayers = Number(numberOfPlayers)
//     let players: Player[] = []
//     for (let index = 0; index < numberOfPlayers; index++) {
//         players.push( new Player( await question("What is your name > ") ) )        
//     }
//     console.log(players)
// }
// function question (question: string): Promise<string> {
//     return new Promise((resolve, reject) => {
//         read.question(question, (answer) => resolve(answer))
//     })
// }
// main()
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
