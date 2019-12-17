import React from 'react';
import CardStore from './Card.store';
import Card from './Card';
import './Player.css';
import { observer } from 'mobx-react';
import { PlayerProps } from '../interfaces';

@observer
export default class Player extends React.Component<PlayerProps> {
    
    private renderActions(): JSX.Element {
        if(this.props.isActive){
            return (
                <div className="player-actions">
                    <button onClick={() => this.props.player.hitMe(this.props.deck.deal())}>Hit Me!!</button>
                    <button onClick={this.props.player.stand}>Stand</button>
                </div>
            );
        }
        return <div></div>;
    }

    private renderScore(): JSX.Element {
        let score: number | string = "**";
        if( this.props.isActive || this.props.player.isBust ){
            score = this.props.player.getScore;
        }
        return (
            <h5>Score: {score}</h5>
        );
    }

    public render(): JSX.Element {
        return (
            <div className="player">
                <div className="player-header">
                    <h3>Player: {this.props.player.getName}</h3>
                    { this.renderScore() }
                </div>
                <div className="player-hand">
                    {
                        this.props.player.getHandValuation.map((card: CardStore, index: number) => {
                            return <Card key={index} isHidden={!this.props.isActive} card={card} />
                        })
                    }
                </div>
                { this.renderActions() }
            </div>
        );
    }
}