import React from 'react';
import Table from './Table';
import { ScoreBoardStore } from './ScoreBoard.store';
import { observer } from 'mobx-react';
import PlayerStore from './Player.store';
import PlayerNameForm from './PlayerNameForm';

interface BlackJackState {
    scoreBoard: ScoreBoardStore,
    startGame: boolean
}

@observer
export default class BlackJack extends React.Component<any, BlackJackState> {
    
    constructor(props: any){
        super(props);
        this.state = {
            scoreBoard: new ScoreBoardStore([]),
            startGame: false
        }
    }


    private initializeGame = (playerNames: Array<string>): void => {
        let players: Array<PlayerStore> = playerNames.map((name: string) => {
            return new PlayerStore(name);
        });
        
        this.setState({
            scoreBoard: new ScoreBoardStore( players ),
            startGame: true
        });
    }

    private reset = (): void => {
        this.setState({startGame: false});
    }

    public render(): JSX.Element {
        if( this.state.startGame ){
            return (
                <div>
                    <h1>Black Jack</h1>
                    <button onClick={this.reset}>Reset Game</button>
                    <Table scoreBoard={this.state.scoreBoard}/>
                </div>
            );    
        }
        return (
            <div>
                <h1>Black Jack</h1>
                <PlayerNameForm handleSubmit={this.initializeGame}/>
            </div>
        );
    }
}