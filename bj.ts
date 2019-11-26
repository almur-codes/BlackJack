// import BlackJack from './BlackJack';

import * as readline from 'readline'

// let blackjack = new BlackJack()
// blackjack.startGame()

// function getUserInpput(question: string): string {

// }

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const question1 = () => {
    return new Promise((resolve, reject) => {
        rl.question('q1 What do you think of Node.js? ', (answer) => {
            console.log(`Thank you for your valuable feedback: ${answer}`)
            resolve()
        })
    })
}

const question2 = () => {
    return new Promise((resolve, reject) => {
        rl.question('q2 What do you think of Node.js? ', (answer) => {
            console.log(`Thank you for your valuable feedback: ${answer}`)
            resolve()
        })
    })
}


const question3 = (index: number) => {
    return new Promise((resolve, reject) => {
        rl.question(`q${index} What is your name? `, (answer) => {
            console.log(`Thank you for your valuable feedback: ${answer}`)
            resolve()
        })
    })
}

const question4 = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        rl.question(`q What is your age? `, (answer) => {
            resolve()
            // return answer
        })
    })
}

const main = async () => {
    // await question1()
    // await question2()
    // for (let index = 3; index < 5; index++) {
    //     await question3(index)        
    // }
    let age = await question4()
    rl.close()
    console.log("AGE::: " + age)
}

main()