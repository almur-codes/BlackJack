import Player from './Player';
import * as readline from 'readline';
import { ScoreBoard, PlayerScore } from './ScoreBoard';

export default class InputOutputHandler {

    private inputOutput: readline.Interface;

    private readonly questions: object = {
        getNumberOfPlayers: "How many players will be playing > ",
        getPlayerName: "Please enter your name player",
        getPlayersMove: " will you HIT or STAND > ",
        getUsersPlayAgainResponse: "Would you like to play again > "
    };
    
    public constructor() {
        this.inputOutput = readline.createInterface({
            input: process.stdin, 
            output: process.stdout
        });
    }

    private askQuestion (question: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.inputOutput.question(question, (answer) => resolve(answer));
        });
    }

    public close(): void {
        this.inputOutput.close();
    }

    public async getInitialNumberOfPlayers(): Promise<string> {
        return await this.askQuestion( this.questions['getNumberOfPlayers'] );
    }

    public async getPlayersName( index: number ): Promise<string> {
        return await this.askQuestion( `${this.questions['getPlayerName']} ${index} > ` );
    }

    public async getPlayersMove(player: Player): Promise<string> {
        return (await this.askQuestion( `${player.getName()} ${this.questions['getPlayersMove']}` )).toLowerCase();
    }

    public async getUsersPlayAgainResponse(): Promise<string> {
        return (await this.askQuestion( this.questions['getUsersPlayAgainResponse'] )).toLowerCase();
    }

    public displayCustomMessage( message: string ): void {
        this.inputOutput.write( message );
        this.inputOutput.write("\n");
    }

    public displayInfo(player: Player): void {
        this.inputOutput.write( player.toDisplayString() );
        this.inputOutput.write("\n");
    }

    public displayWarning(player: Player): void {
        this.inputOutput.write("\n");
        this.inputOutput.write( player.getName() + " invalid move. Please try again" );
        this.inputOutput.write("\n");
    }

    public displayAlert(player: Player): void {
        this.inputOutput.write("\n");
        this.inputOutput.write( player.getName() + " is bust!!\n" + player.toDisplayString() );
        this.inputOutput.write("\n");
    }

    public displayWinner(player: Player): void {
        this.inputOutput.write( player.getName() + " is the Winner!!\n" + player.toDisplayString() );
    }

    public displayBoard(scoreBoard: Array<PlayerScore>): void {
        this.inputOutput.write("\n\nBoard");
        scoreBoard.forEach((playerScore: PlayerScore) => {
            this.displayCustomMessage(`\nRank: ${playerScore.rank}`);
            this.displayInfo( playerScore.player );
        });
        this.inputOutput.write("\n\n");
    }
}