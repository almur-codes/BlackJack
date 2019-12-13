import React from 'react';
import './PlayerNameForm.css';

interface PlayerNameFormState {
    playerNames: Array<string>
}

interface PlayerNameFormProps {
    handleSubmit: (playerNames: Array<string>) => void
}

export default class PlayerNameForm extends React.Component<PlayerNameFormProps, PlayerNameFormState> {
    constructor(props: any){
        super(props);
        
        this.state = {
            playerNames: ["", ""]
        }
    }

    handleSubmit = (event: any): void => {
        event.preventDefault();
        this.props.handleSubmit(this.state.playerNames);
    }

    onChangeHandler = (event: any): void => {
        let newPlayerNames: Array<string> = this.state.playerNames.slice();
        newPlayerNames[event.target.attributes['data-index'].value] = event.target.value;
        this.setState({
            playerNames: newPlayerNames
        });
    }

    addPlayer = (): void => {
        this.setState({
            playerNames: [...this.state.playerNames, ""]
        });
    }

    // removePlayer = (event: any): void => {
    //     console.log(event.target.attributes);
    //     const playerNames: Array<string> = [...this.state.playerNames];
    //     playerNames.splice(event.target.attributes['data-index'].value, 1);
    //     this.setState({ playerNames });
    // }
    
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