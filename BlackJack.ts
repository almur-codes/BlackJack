import Deck from "./Deck"
import Player from './Player';
import * as readline from 'readline';

export default class BlackJack {

    private players: Array<Player> = []

    private deck: Deck

    private readonly read: readline.Interface = readline.createInterface({input: process.stdin, output: process.stdout})

    public constructor(){
        this.setUpGame()
    }

    private async setUpGame(): Promise<void> {
        console.log("New Game of Black Jack!!")
        await this.addPlayersToGame()

        console.log("Start Game!!")
        await this.startGame()
    }
    
    private async addPlayersToGame(): Promise<void> {
        let numberOfPlayers: string | number = await this.askQuestion("How many players will be playing > ")
        numberOfPlayers = parseInt(numberOfPlayers)

        if(isNaN(numberOfPlayers)){
            console.log("Invalid number of players, please try again.")
            return this.addPlayersToGame()
        }
        
        for (let index = 0; index < numberOfPlayers; index++) {
            let playerName: string = await this.askQuestion(`Enter player ${index + 1}'s name > `)
            this.players.push( new Player( playerName ) )
        }
    }

    private async startGame(): Promise<void> {
        this.deck = new Deck()
    
        this.players.forEach((player: Player) => {
            player.hitMe(this.deck.deal())
            player.hitMe(this.deck.deal())
        });

        for (let index = 0; index < this.players.length; index++) {
            await this.playARound( this.players[index] )                
        }
        
        await this.getWinner()

        let playAgain: string = await this.askQuestion("Play again? (Yes, No) > ")
        playAgain = playAgain.toLocaleLowerCase()
        if( playAgain === "yes" ){
            this.resetGame()
            return this.startGame()
        }
        this.read.close()
        return
    }

    private async playARound(player: Player): Promise<void> {
        this.display( player, {info: true, warning: false, bust: false, winner: false} )

        let input: string = await this.askQuestion(player.getName() + " will you HIT or STAND > ") 

        input = input.toLocaleLowerCase()

        if( input === "hit" ){
            player.hitMe(this.deck.deal())

            if( player.isBust() ){
                this.display( player, {info: false, warning: false, bust: true, winner: false})
                return
            }
            
            return this.playARound( player )
        }

        if( input === "stand" ){
            player.stand()
            return
        }
        
        this.display( player, {info: false, warning: true, bust: false, winner: false} )
        return this.playARound( player )
    }

    private getWinner(): Promise<void> {
        if(this.players.length < 1) return

        let highestScoringPlayer: Player | null = null
        this.players.forEach((player: Player) => {
            this.display(player, {
                info: true,
                warning: false,
                bust: false,
                winner: false
            })
            if( !highestScoringPlayer ){
                highestScoringPlayer = player
            } else {
                if ( !player.isBust() ) {
                    // handle draws
                    highestScoringPlayer = ( highestScoringPlayer.getScore() > player.getScore() ) ? highestScoringPlayer : player
                }
            }
        })
        this.display( highestScoringPlayer, {info: false, warning: false, bust: false, winner: true} )
    }
    
    private resetGame(): void {
        this.deck = null
        this.players.forEach((player: Player) => {
            player.clearHand()
        })
    }

    private askQuestion (question: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.read.question(question, (answer) => resolve(answer))
        })
    }

    private display( player: Player, type: { info: boolean, warning: boolean, bust: boolean, winner: boolean } ): void {
        if( type.info ){
            console.log( player.toString() )
        }

        if( type.warning ){
            console.log( player.getName() + " invalid move. Please try again" )
        }
        
        if( type.bust ){
            console.log( player.getName() + " is bust!!\n" + player.toString() )
        }

        if( type.winner ){
            console.log( player.getName() + " is the Winner!!\n" + player.toString() )
        }
    }

    private areAllPlayersBustOrStanding(): boolean {
        let verdict: boolean = true
        this.players.forEach((player: Player) => {
            verdict = ( verdict && (player.isBust() || player.isStanding()) )
        })
        return verdict
    }
}