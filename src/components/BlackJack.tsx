import React from 'react';
import Table from './Table';
import { ScoreBoardStore } from './ScoreBoard.store';
import { observer } from 'mobx-react';
import PlayerStore from './Player.store';
// import Deck from './Deck';

interface BlackJackState {
    scoreBoard: ScoreBoardStore,
    startGame: boolean
}

@observer
export default class BlackJack extends React.Component<any, BlackJackState> {

    state = {
        scoreBoard: new ScoreBoardStore([]),
        startGame: false
    }

    private initializeGame(): void {
        let players: Array<PlayerStore> = [
            new PlayerStore("Alex"),
            new PlayerStore("Blex"),
            new PlayerStore("Clex"),
            new PlayerStore("Dlex")
        ];
        
        this.setState({
            scoreBoard: new ScoreBoardStore( players ),
            startGame: true
        });
    }

    private reset(): void {
        this.setState({startGame: false});
    }

    public render(): JSX.Element {
        if( this.state.startGame ){
            return (
                <div>
                    <h1>Black Jack</h1>
                    <button onClick={() => this.reset()}>Reset Game</button>
                    <Table scoreBoard={this.state.scoreBoard}/>
                </div>
            );    
        }
        return (
            <div>
                <h1>Black Jack</h1>
                <button onClick={() => this.initializeGame()}>Start new game</button>
            </div>
        );
    }
}