import React from 'react';
import Table from './Table';
import { observer } from 'mobx-react';
import PlayerStore from './Player.store';
import PlayerNameForm from './PlayerNameForm';
import { BlackJackState } from '../interfaces';

@observer
export default class BlackJack extends React.Component<any, BlackJackState> {
    
    constructor(props: any){
        super(props);
        this.state = {
            startGame: false,
            players: []
        }
    }

    private initializeGame = (playerNames: Array<string>): void => {
        let players: Array<PlayerStore> = playerNames.map((name: string) => {
            return new PlayerStore(name);
        });
        
        this.setState({
            startGame: true,
            players: players
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
                    <Table players={this.state.players}/>
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