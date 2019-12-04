import Deck from "./Deck";
import Player from './Player';
import InputOutputHandler from './InputOutputHandler';
import ScoreBoard from './ScoreBoard';

export default class BlackJack {

    private deck: Deck;

    private inputOutputHandler: InputOutputHandler;

    public constructor(){
        this.inputOutputHandler = new InputOutputHandler();
        this.setUpGame();
    }

    private async setUpGame(): Promise<void> {
        console.log("New Game of Black Jack!!");
        await this.addPlayersToGame();

        console.log("Start Game!!");
        await this.startGame();
    }
    
    private async addPlayersToGame(): Promise<void> {
        let numberOfPlayers: number = Number( await this.inputOutputHandler.getInitialNumberOfPlayers() )

        if(isNaN(numberOfPlayers) || numberOfPlayers < 2){
            console.log("Invalid number of players, please try again.");
            return this.addPlayersToGame();
        }
        
        let players: Array<Player> = [];
        
        for (let index = 0; index < numberOfPlayers; index++) {
            let playerName: string = await this.inputOutputHandler.getPlayersName( index + 1 )
            players.push( new Player( playerName, ScoreBoard.generateScoreBoard ) );
        }

        ScoreBoard.create( players );
    }

    private async startGame(): Promise<void> {
        this.deck = new Deck();
        
        for (let i = 0; i < ScoreBoard.getPlayers().length; i++) {
            const player: Player = ScoreBoard.getPlayers()[i];
            player.hitMe(this.deck.deal());
            player.hitMe(this.deck.deal());
        }
        
        for (let index = 0; index < ScoreBoard.getPlayers().length; index++) {
            const player: Player = ScoreBoard.getPlayers()[index];
            console.log("");
            await this.playARound( player );
        }
        
        console.log("\nEnd of the Game\n");
        let winners: Array<Player> = ScoreBoard.getWinner();
        if( winners.length > 1 ){
            console.log("Tie! Nobody wins");
        } else {
            InputOutputHandler.displayWinner( winners.pop() );
        }

        InputOutputHandler.displayBoard();

        let playAgain: string = await this.inputOutputHandler.getUsersPlayAgainResponse();

        if( playAgain === "yes" ){
            this.resetGame();
            return this.startGame();
        }
        this.inputOutputHandler.close();
        return;
    }

    private async playARound(player: Player): Promise<void> {
        InputOutputHandler.displayInfo( player );

        let input: string = await this.inputOutputHandler.getPlayersMove( player );

        if( input === "hit" ){
            player.hitMe(this.deck.deal());

            if( player.isBust() ){
                InputOutputHandler.displayAlert( player );
                return;
            }
            
            return this.playARound( player );
        }

        if( input === "stand" ){
            player.stand();
            return;
        }
        
        InputOutputHandler.displayWarning( player );
        return this.playARound( player );
    }
    
    private resetGame(): void {
        this.deck = null;
        ScoreBoard.reset();
        ScoreBoard.create( ScoreBoard.getPlayers() )
    }
}