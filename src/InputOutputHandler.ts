import Player from './Player';
import * as readline from 'readline';
import ScoreBoard from './ScoreBoard';
import PlayerScore from './ScoreBoard';

export default class InputOutputHandler {

    private read: readline.Interface;

    private readonly questions: object = {
        getNumberOfPlayers: "How many players will be playing > ",
        getPlayerName: "Please enter your name player",
        getPlayersMove: " will you HIT or STAND > ",
        getUsersPlayAgainResponse: "Would you like to play again > "
    };
    
    public constructor() {
        this.read = readline.createInterface({
            input: process.stdin, 
            output: process.stdout
        });
    }

    private askQuestion (question: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.read.question(question, (answer) => resolve(answer));
        });
    }

    public close(): void {
        this.read.close();
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

    public static displayInfo(player: Player): void {
        console.log( player.toString() );
    }

    public static displayWarning(player: Player): void {
        console.log( player.getName() + " invalid move. Please try again" );
    }

    public static displayAlert(player: Player): void {
        console.log( player.getName() + " is bust!!\n" + player.toString() );
    }

    public static displayWinner(player: Player): void {
        console.log( player.getName() + " is the Winner!!\n" + player.toString() );
    }

    public static displayBoard(): void {
        console.log("\n\nBoard");
        ScoreBoard.getScoreBoard().forEach((playerScore: PlayerScore) => {
            console.log(`Rank: ${playerScore.rank}`)
            this.displayInfo( playerScore.player )
        })
        console.log("\n\n");
    }
}