import React from 'react';
import './PlayerNameForm.css';
import { PlayerNameFormProps, PlayerNameFormState } from '../interfaces';
import { isNull } from 'util';

export default class PlayerNameForm extends React.Component<PlayerNameFormProps, PlayerNameFormState> {
    constructor(props: any){
        super(props);
        
        this.state = {
            playerNames: ["", ""]
        }
    }

    private handleSubmit = (event: any): void => {
        event.preventDefault();
        this.props.handleSubmit(this.state.playerNames);
    }

    private onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let newPlayerNames: Array<string> | undefined = this.state.playerNames.slice();
        let newPlayerNameAttribute: Attr | null = event.target.attributes.getNamedItem('data-index')
        if( isNull(newPlayerNameAttribute) ){
            return
        }
        newPlayerNames[Number(newPlayerNameAttribute.value)] = event.target.value;
        this.setState({
            playerNames: newPlayerNames
        });
    }

    private addPlayer = (): void => {
        this.setState({
            playerNames: [...this.state.playerNames, ""]
        });
    }

    private removePlayer = (event: any): void => {
        const playerNames: Array<string> = [...this.state.playerNames];
        playerNames.splice(event.target.attributes['data-index'].value, 1);
        this.setState({ playerNames });
    }
    
    public render(): JSX.Element {
        return (
            <form className="form" onSubmit={(event) => event.preventDefault()}>
                {
                    this.state.playerNames.map((playerName: string, index: number) => {
                        return (
                            <div key={index} >
                                <input 
                                    type="text" 
                                    placeholder="Enter player's name" 
                                    data-index={index} 
                                    onChange={this.onChangeHandler}/>
                                    <span data-index={index} onClick={this.removePlayer}>&times;</span>
                            </div>
                        );
                    })
                }
                <button onClick={this.addPlayer}>Add Player</button>
                <button type="submit" onClick={this.handleSubmit}>Start Game</button>
            </form>
        );
    }
}