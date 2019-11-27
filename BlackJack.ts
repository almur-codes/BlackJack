import Deck from "./Deck"
import Player from './Player';
import * as readline from 'readline';

export default class BlackJack {

    private players: Array<Player> = []

    private deck: Deck

    // private rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // })

    // private question = (question: string) => {
    //     return new Promise((resolve, reject) => {
    //         this.rl.question(question, (answer) => {
    //             console.log('Okay')
    //             resolve()
    //             return answer
    //         })
    //     })
    // }

    // private async askQuestion(question: string) {
    //     this.question(question).then((ans) => {
    //         return ans
    //     })
    // }

    public constructor(){
        this.getNumberOfPlayers()

        this.startGame()
    }

    private getNumberOfPlayers(){
        let numPlayers: number = 0
    
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        rl.setPrompt('How many players are playing > ')
        rl.prompt()
        rl.on('line', (line) => {
            if (Number.isInteger(parseFloat(line)) && Number(line) > 0) {
                numPlayers = Number(line)
                rl.close()
                this.createPlayers(numPlayers)
            } else {
                console.log("Not a number or not a valid number of players, Please try again")
                rl.prompt()
            }
        })
    }
    
    private createPlayers(numberOfPlayers: number) {
        const read = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        read.setPrompt('Enter Your Name > ');
        read.prompt();
        read.on('line', (line) => {
            this.players.push(new Player(line))
            if( this.players.length > numberOfPlayers ){
                read.close()
            }
            read.prompt()
        }).on('close', () => {
            // console.log('Have a great day!');
            // console.log(this.players)
            process.exit(0);
        });
    }

    public startGame(): void {
        this.deck = new Deck()
    
        this.players.forEach((player: Player) => {
            player.hitMe(this.deck.deal())
            player.hitMe(this.deck.deal())
        });
    
        while ( !this.areAllPlayersBustOrStanding() ){
            this.players.forEach((player: Player) => {
                this.playARound( player )
            })
        }
        
        this.getWinner()
    }

    public resetGame(): void {
        this.deck = null
        this.players = []
    }

    private addPlayersToGame(playerNames: Array<string>): void {
        playerNames.forEach((name: string) => {
            this.players.push(new Player(name))
        })
    }

    private getWinner(): void {
        if(this.players.length < 1) return

        let highestScoringPlayer: Player | null = null
        this.players.forEach((player: Player) => {
            this.display(player, {
                info: true,
                warning: false,
                bust: false,
                winner: false
            })
            if ( !player.isBust() ) {
                highestScoringPlayer = ( highestScoringPlayer.getScore() > player.getScore() && !highestScoringPlayer ) ? highestScoringPlayer : player
            }
        })
        this.display( highestScoringPlayer, {info: false, warning: false, bust: false, winner: true} )
    }

    private areAllPlayersBustOrStanding(): boolean {
        let verdict: boolean = true
        this.players.forEach((player: Player) => {
            verdict = ( verdict && (player.isBust() || player.isStanding()) )
        })
        return verdict
    }
    
    private playARound(player: Player): void {
        this.display( player, {info: true, warning: false, bust: false, winner: false} )
        
        let input: string = (player.getScore() < 16) ? 'hit' : 'stay'

        // input = input.toLocaleLowerCase()

        const read = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        read.setPrompt('Hit or Stand > ');
        read.prompt();
        read.on('line', (line) => {
            line = line.toLocaleLowerCase()

            if( line === "hit" ){
                player.hitMe(this.deck.deal())
    
                if( player.isBust() ){
                    this.display( player, {info: false, warning: false, bust: true, winner: false})
                    read.close()
                    return
                }
                
                read.close()
                this.playARound( player )
                return
            }
    
            if( line === "stay" ){
                player.stay()
                read.close()
                return
            }
            
            this.display( player, {info: false, warning: true, bust: false, winner: false} )
            read.close()
            this.playARound( player )
            return
        }).on('close', () => {
            process.exit(0);
        });
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
}

let bj = new BlackJack()