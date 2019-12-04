import Player from './Player';
import Card from './Card';

export default interface PlayerScore {
    player: Player,
    name: string,
    score: number,
    rank: number
};

export default class ScoreBoard {

    private static scoreBoard: Array<PlayerScore>;

    private static players: Array<Player> = [];

    private static checkForTies(highestScoringPlayer: Player): Array<Player> {
        let tiedPlayers: Array<PlayerScore> = this.scoreBoard.slice().filter((playerScore: PlayerScore) => {
            return playerScore.player.getScore() === highestScoringPlayer.getScore()
        });

        if( tiedPlayers.length < 1 ) {
            // unexpected error. Should always return at least one player
            throw new Error("Unexpected Error");
        }
        if( tiedPlayers.length > 1 ){
            // if there is a tie nobody wins
            return tiedPlayers.map((playerScore: PlayerScore) => playerScore.player);
        }

        // no tie
        return [ highestScoringPlayer ];
    }

    public static create( players: Array<Player> ): void {
        this.players = players;
        this.generateScoreBoard();
    }

    public static generateScoreBoard(): void {
        if(this.players.length < 1) {
            this.scoreBoard = [];
            // throw new Error("No players in game");
        };

        let sortedPlayers: Array<Player> = this.players.slice().sort((a: Player, b: Player) => {
            // filter by score (desc)
            if( a.getScore() < b.getScore() ){
                return 1;
            } else if( a.getScore() > b.getScore() ){
                return -1;
            } else {
                // if scores are the same filter by name (asc)
                if( a.getName().toUpperCase() > b.getName().toUpperCase() ){
                    return 1;
                } else if( a.getName().toUpperCase() < b.getName().toUpperCase() ){
                    return -1;
                } else {
                    return 0;
                }
            }
        });

        this.scoreBoard = sortedPlayers.map((player: Player, index: number) => {
            return {
                player: player,
                name: player.getName(),
                score: player.getScore(),
                rank: (index + 1)
            };
        });
    }

    public static getPlayers(): Array<Player> {
        return this.players;
    }

    public static getScoreBoard(): Array<PlayerScore> {
        return this.scoreBoard;
    }

    public static getWinner(): Array<Player> {
        let highestScoringPlayer: Player = this.scoreBoard.find((player: PlayerScore) => player.rank === 1).player;
        let winners: Array<Player> = this.checkForTies( highestScoringPlayer );
        return winners;
    }

    public static reset(): void {
        this.scoreBoard = [];
        this.players.forEach((player: Player) => {
            player.reset();
        });
    }
}