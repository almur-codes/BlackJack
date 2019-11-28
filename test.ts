import BlackJack from './BlackJack';
let blackJack: BlackJack = new BlackJack()

// import * as readline from 'readline'
// import Player from './player'

// const read = readline.createInterface({input: process.stdin, output: null, removeHistoryDuplicates: true})

// async function mainTest (): Promise<void> {
//     let numberOfPlayers: string | number = await question("How many players > ")
//     numberOfPlayers = Number(numberOfPlayers)
//     let players: Player[] = []
//     // for (let index = 0; index < numberOfPlayers; index++) {
//         let playerName: string = await question(`What is player's name > `)
//         players.push( new Player( playerName ) )   
        
//         playerName = await question(`What is player's name > `)
//         players.push( new Player( playerName ) )   

//         playerName = await question(`What is player's name > `)
//         players.push( new Player( playerName ) )   

//         playerName = await question(`What is player's name > `)
//         players.push( new Player( playerName ) )
//     // }
//     console.log( players.map((player: Player) => player.toString()) )
//     read.close()
// }

// function question (question: string): Promise<string> {
//     // const read = readline.createInterface({input: process.stdin, output: process.stdout, removeHistoryDuplicates: true})

//     return new Promise((resolve, reject) => {
//         read.question(question, (answer) => {
//             // read.close()
//             resolve(answer)
//         })
//     })
// }

// mainTest()

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

// const main = async () => {
//     console.log('one')
//     await question1()
//     console.log('two')
//     let x = await question3()

//     try {
//         let x = await question3()
//         console.log(x)
//     } catch (error) {
//         console.log("AN ERROR OCCURRED")
//         throw error
//     }

//     console.log(x)

//     console.log('three')
//     for (let index = 3; index < 6; index++) {
//         try {
//             // await question3(index)
//         } catch (error) {
//             console.log("Invalid input...")
//         }
//     }
//     rl.close()
// }