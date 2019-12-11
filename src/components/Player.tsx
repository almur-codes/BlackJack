import React from 'react';
import PlayerStore from './Player.store';
import CardStore from './Card.store';
import Card from './Card';
import './Player.css';
import { observer } from 'mobx-react';

interface PlayerProps{
    player: PlayerStore,
    isActive: boolean
}

@observer
export default class Player extends React.Component<PlayerProps> {
    private renderActions(): any {
        if(this.props.isActive){
            return (
                <div className="player-actions">
                    <button>Hit Me!!</button>
                    <button>Stand</button>
                </div>
            );
        }
    }

    private renderScore(): any {
        let score: number | string = "**";
        if( this.props.isActive ){
            score = this.props.player.getScore;
        }
        return (
            <h5>Score: {score}</h5>
        );
    }

    public render(): any {
        return (
            <div className="player">
                <div className="player-header">
                    <h3>Player: {this.props.player.getName}</h3>
                    { this.renderScore() }
                </div>
                <div className="player-hand">
                    {
                        this.props.player.getHand.map((card: CardStore) => {
                            return <Card isHidden={!this.props.isActive} card={card} />
                        })
                    }
                </div>
                { this.renderActions() }
            </div>
        );
    }
}