import React from 'react';
import Table from './Table';
import { ScoreBoardStore } from './ScoreBoard.store';
import { observer } from 'mobx-react';
import PlayerStore from './Player.store';
import { isNull } from 'util';
// import Deck from './Deck';

interface BlackJackState {
    scoreBoard: ScoreBoardStore | null,
    // deck: Deck
}

@observer
export default class BlackJack extends React.Component<{}, BlackJackState> {

    state = {
        scoreBoard: null
    }

    constructor(props: any){
        super(props);

        let players: Array<PlayerStore> = [
            new PlayerStore("Alex"),
            new PlayerStore("Blex")
        ];
        
        this.setState({
            scoreBoard: new ScoreBoardStore( players )
        });

        // this.initializeGame();
    }

    private initializeGame(): void {
        let players: Array<PlayerStore> = [
            new PlayerStore("Alex"),
            new PlayerStore("Blex")
        ];
        
        this.setState({
            scoreBoard: new ScoreBoardStore( players )
        });
    }

    private renderTable(): any {
        if( !isNull(this.state.scoreBoard) ){
            return (
                <Table scoreBoard={this.state.scoreBoard}/>
            );
        }
        return (
            <p>Start game by clicking button above</p>
        )
    }
   

    public render() {
        return (
            <div>
                <h1>Black Jack</h1>
                <button onClick={() => this.initializeGame()}>Start new game</button>
                {this.renderTable()}
            </div>
        );
    }
}