import React from 'react';
import { observer } from 'mobx-react';
import PlayerStore from './Player.store';
import Player from './Player';
import { ScoreBoardStore, PlayerScore } from './ScoreBoard.store';
import Deck from './Deck.store';
import "./Table.css";
import { TableProps, TableState } from '../interfaces';

@observer
export default class Table extends React.Component<TableProps, TableState> {

    constructor(props: TableProps){
        super(props);

        this.state = {
            deck: new Deck(),
            activePlayerIndex: 0,
            gameIsOver: false,
            scoreBoard: new ScoreBoardStore(this.props.players)
        }

        this.state.scoreBoard.getPlayers.forEach((player: PlayerStore) => {
            player.hitMe(this.state.deck.deal());
            player.hitMe(this.state.deck.deal());
        });
    }
    
    private getActivePlayerIndex(): number {
        if( this.state.scoreBoard.getPlayers[this.state.activePlayerIndex].isStanding || this.state.scoreBoard.getPlayers[this.state.activePlayerIndex].isBust ){
            let newActivePlayerIndex: number = this.state.activePlayerIndex + 1;
            if(newActivePlayerIndex >= this.state.scoreBoard.getPlayers.length) {
                this.setState({gameIsOver: true, activePlayerIndex: 0});
                return 0;
            }
            this.setState({
                activePlayerIndex: newActivePlayerIndex
            });
            return newActivePlayerIndex;
        }
        return this.state.activePlayerIndex;
    }

    private renderEndOfGameMessage(): JSX.Element {
        let winners: Array<PlayerStore> = this.state.scoreBoard.getWinner;
        if( winners.length > 1 ){
            return <h4>Tie! No Winner!!</h4>;
        } else if( winners.length === 1) {
            return <h4>The Winner is <b>{winners[0].getName}</b></h4>
        } else {
            return <h4>All Players are Bust. No Winner!!</h4>
        }
    }

    private renderScore(playerScore: PlayerScore, index: number): JSX.Element {
        return <div key={index} className="score-board-player">
            <h4>Rank: {playerScore.rank + ((playerScore.score > 21) ? ` (Bust!!)` : ``)}</h4>
            <h4>Name: {playerScore.player.getName}</h4>
            <h4>Score: {playerScore.score}</h4>
        </div>
    }

    public render(): JSX.Element {
        if(this.state.gameIsOver){
            return (
                <div>
                    <h3>Game Over</h3>
                    {this.renderEndOfGameMessage()}
                    {
                        this.state.scoreBoard.getScoreBoard.map((playerScore: PlayerScore, index: number) => {
                            return this.renderScore(playerScore, index);
                        })
                    }
                </div>
            );    
        }
        return (
            <div>
                <div className="table">
                    <div className="player-wrapper">
                        {
                            this.state.scoreBoard.getPlayers.map((player: PlayerStore, index: number) => {
                                return <Player key={index} isActive={(index === this.getActivePlayerIndex())} deck={this.state.deck} player={player} />
                            })
                        
                        }
                    </div>
                </div>
                <div className="table-score-board">
                    {
                        this.state.scoreBoard.getScoreBoard.map((playerScore: PlayerScore, index: number) => {
                            return this.renderScore(playerScore, index);
                        })
                    }
                </div>
            </div>
        );
    }
}