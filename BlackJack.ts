import Deck from "./Deck"
import Player from './Player';

export default class BlackJack {

    private players: Array<Player> = []

    private deck: Deck

    public constructor(){
        // let numberOfPlayers: number | string = prompt("New Game of Black Jack\nHow Many Players")
        // numberOfPlayers = Number(numberOfPlayers)
        let playerNames: Array<string> = []
        for (let index: number = 0; index < 4; index++) {
            // let name: string = prompt("Enter player " + (index + 1) + "'s name")
            let name: string = "Player " + (index + 1)
            playerNames.push(name)
        }
        this.addPlayersToGame(playerNames)
    }

    public startGame(): void {
        // this.resetGame()
        
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
            this.players.push(new Player(name, [], { bust: false, stand: false }))
        })
    }

    private getWinner(): void {
        let highestScoringPlayer: Player = this.players[0]
        this.players.forEach((player: Player) => {
            this.display(player, {
                info: true,
                warning: false,
                bust: false,
                winner: false
            })
            if ( !player.isBust() ) {
                highestScoringPlayer = ( highestScoringPlayer.score > player.score ) ? highestScoringPlayer : player
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
        
        // let input: string = prompt( player.name + "'s turn. Hit or Stay?" )
        let input: string = (player.score < 16) ? 'hit' : 'stay'
        
        input = input.toLocaleLowerCase()
        
        if( input === "hit" ){
            player.hitMe(this.deck.deal())

            if( player.isBust() ){
                this.display( player, {info: false, warning: false, bust: true, winner: false})
                return
            }
            
            this.playARound( player )
            return
        }

        if( input === "stay" ){
            player.stay()
            return
        }
        
        this.display( player, {info: false, warning: true, bust: false, winner: false} )
        this.playARound( player )
        return
    }

    private display( player: Player, type: { info: boolean, warning: boolean, bust: boolean, winner: boolean } ): void {
        if( type.info ){
            console.log( player.toString() )
        }

        if( type.warning ){
            console.log( player.name + " invalid move. Please try again" )
        }
        
        if( type.bust ){
            console.log( player.name + " is bust!!\n" + player.toString() )
        }

        if( type.winner ){
            console.log( player.name + " is the Winner!!\n" + player.toString() )
        }
    }
}