import Deck from "./Deck";
import Player from './Player';
import InputOutputHandler from './InputOutputHandler';
import { ScoreBoard } from './ScoreBoard';

export default class BlackJack {

    private deck: Deck;

    private inputOutputHandler: InputOutputHandler;

    private scoreBoard: ScoreBoard;

    public constructor(){
        this.inputOutputHandler = new InputOutputHandler();
        this.setUpGame();
    }

    private async setUpGame(): Promise<void> {
        this.inputOutputHandler.displayCustomMessage("New Game of Black Jack!!");
        await this.addPlayersToGame();

        this.inputOutputHandler.displayCustomMessage("Start Game!!");
        await this.startGame();
    }
    
    private async addPlayersToGame(): Promise<void> {
        let numberOfPlayers: number = Number( await this.inputOutputHandler.getInitialNumberOfPlayers() )

        if(isNaN(numberOfPlayers) || numberOfPlayers < 2){
            this.inputOutputHandler.displayCustomMessage("Invalid number of players, please try again.");
            return this.addPlayersToGame();
        }
        
        let players: Array<Player> = [];
        
        for (let index = 0; index < numberOfPlayers; index++) {
            let playerName: string = await this.inputOutputHandler.getPlayersName( index + 1 )
            players.push( new Player( playerName ) );
        }

        this.scoreBoard = new ScoreBoard( players );
    }

    private async startGame(): Promise<void> {
        this.deck = new Deck();
        
        for (let i = 0; i < this.scoreBoard.getPlayers().length; i++) {
            const player: Player = this.scoreBoard.getPlayers()[i];
            this.playerMove(player, "hit");
            this.playerMove(player, "hit");
        }
        
        for (let index = 0; index < this.scoreBoard.getPlayers().length; index++) {
            const player: Player = this.scoreBoard.getPlayers()[index];
            await this.playARound( player );
        }
        
        this.inputOutputHandler.displayCustomMessage("\nEnd of the Game\n");
        let winners: Array<Player> = this.scoreBoard.getWinner();
        if( winners.length > 1 ){
            this.inputOutputHandler.displayCustomMessage("Tie! Nobody wins");
        } else {
            this.inputOutputHandler.displayWinner( winners.pop() );
        }

        this.inputOutputHandler.displayBoard( this.scoreBoard.getScoreBoard() );

        let playAgain: string = await this.inputOutputHandler.getUsersPlayAgainResponse();

        if( playAgain === "yes" ){
            this.resetGame();
            return this.startGame();
        }
        this.inputOutputHandler.close();
        return;
    }

    private playerMove(player: Player, type: string): void {
        if( type === "hit" ){
            player.hitMe( this.deck.deal() );
        } else if( type === "stand" ){
            player.stand();
        }
        this.scoreBoard.generateScoreBoard();
    }

    private async playARound(player: Player): Promise<void> {
        this.inputOutputHandler.displayInfo( player );

        let input: string = await this.inputOutputHandler.getPlayersMove( player );

        if( input === "hit" ){
            this.playerMove(player, input);

            if( player.isBust() ){
                this.inputOutputHandler.displayAlert( player );
                return;
            }
            
            return this.playARound( player );
        }

        if( input === "stand" ){
            this.playerMove(player, input);
            return;
        }
        
        this.inputOutputHandler.displayWarning( player );
        return this.playARound( player );
    }
    
    private resetGame(): void {
        this.deck = null;
        this.scoreBoard.reset();
        this.scoreBoard.create( this.scoreBoard.getPlayers() );
    }
}