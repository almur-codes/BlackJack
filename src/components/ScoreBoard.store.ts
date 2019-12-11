import Player from './Player.store';
import { observable, action, computed } from 'mobx';

export interface PlayerScore {
    player: Player,
    name: string,
    score: number,
    rank: number
};

export class ScoreBoardStore {

    @observable private scoreBoard: Array<PlayerScore> = [];

    @observable private players: Array<Player> = [];

    private checkForTies(highestScoringPlayer: Player): Array<Player> {
        let tiedPlayers: Array<PlayerScore> = this.scoreBoard.slice().filter((playerScore: PlayerScore) => {
            return playerScore.player.getScore === highestScoringPlayer.getScore;
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

    public constructor(players: Array<Player>){
        this.initialize( players );
    }

    @action 
    public initialize( players: Array<Player> ): void {
        this.players = players;
        this.generateScoreBoard();
    }

    @action 
    public generateScoreBoard(): void {
        if(this.players.length < 1) {
            this.scoreBoard = [];
            // throw new Error("No players in game");
        };

        let sortedPlayers: Array<Player> = this.players.slice().sort((a: Player, b: Player) => {
            // filter by score (desc)
            if( a.getScore < b.getScore ){
                return 1;
            } else if( a.getScore > b.getScore ){
                return -1;
            } else {
                // if scores are the same filter by name (asc)
                if( a.getName.toUpperCase() > b.getName.toUpperCase() ){
                    return 1;
                } else if( a.getName.toUpperCase() < b.getName.toUpperCase() ){
                    return -1;
                } else {
                    return 0;
                }
            }
        });

        this.scoreBoard = sortedPlayers.map((player: Player, index: number) => {
            return {
                player: player,
                name: player.getName,
                score: player.getScore,
                rank: (index + 1)
            };
        });
    }

    @computed
    public get getPlayers(): Array<Player> {
        return this.players;
    }

    @computed
    public get getScoreBoard(): Array<PlayerScore> {
        return this.scoreBoard;
    }

    @computed
    public get getWinner(): Array<Player> {
        let highestScoringPlayerScore: PlayerScore | undefined = this.scoreBoard.find((player: PlayerScore) => player.rank === 1);
        if( typeof highestScoringPlayerScore === "undefined" ){
            throw new Error("Undefined variable");
            
        }
        let highestScoringPlayer: Player = highestScoringPlayerScore.player
        let winners: Array<Player> = this.checkForTies( highestScoringPlayer );
        return winners;
    }

    @action
    public reset(): void {
        this.scoreBoard = [];
        this.players.forEach((player: Player) => {
            player.reset();
        });
    }
}
