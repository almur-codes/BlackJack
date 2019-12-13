import Player from './Player.store';
import { observable, action, computed } from 'mobx';

export interface PlayerScore {
    player: Player,
    name: string,
    score: number,
    rank: number
};

export class ScoreBoardStore {

    @observable private players: Array<Player> = [];

    private checkForTies(highestScoringPlayer: Player): Array<Player> {
        let tiedPlayers: Array<PlayerScore> = this.getScoreBoard.slice().filter((playerScore: PlayerScore) => {
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
    }

    private sortingFuntion(a: Player, b: Player): number {
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
    }

    @computed
    public get getPlayers(): Array<Player> {
        return this.players;
    }

    @computed
    public get getScoreBoard(): Array<PlayerScore> {
        if(this.players.length < 1) {
            return [];
        };

        let sortedBustPlayers: Array<Player> = this.players.filter((player: Player) => player.isBust).sort(this.sortingFuntion)

        let sortedUnBustPlayers: Array<Player> = this.players.filter((player: Player) => !player.isBust).sort(this.sortingFuntion);

        let sortedPlayers: Array<Player> = [...sortedUnBustPlayers, ...sortedBustPlayers];

        return sortedPlayers.map((player: Player, index: number) => {
            return {
                player: player,
                name: player.getName,
                score: player.getScore,
                rank: (index + 1)
            };
        });
    }

    @computed
    public get getWinner(): Array<Player> {
        let unBustPlayers: Array<PlayerScore> = this.getScoreBoard.filter((playerScore: PlayerScore) => playerScore.score < 22);
        if( unBustPlayers.length < 1 ){
            return [];
        }
        let highestScoringPlayer: Player = unBustPlayers[0].player;
        return this.checkForTies( highestScoringPlayer );
    }

    @action
    public reset(): void {
        this.players.forEach((player: Player) => {
            player.reset();
        });
    }
}
