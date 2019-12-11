import React from 'react';
import { observer } from 'mobx-react';
import PlayerStore from './Player.store';
import Player from './Player';
import { ScoreBoardStore } from './ScoreBoard.store';
import { isNull } from 'util';

interface TableProps {
    scoreBoard: ScoreBoardStore | null
    activePlayerIndex?: number
}

@observer
export default class Table extends React.Component<TableProps> {
    public render(): any {
        let sb = this.props.scoreBoard
        if( isNull(this.props.scoreBoard) ){
            sb = new ScoreBoardStore([])
        }
        return (
            <div>
                {
                    sb.getPlayers.map((player: PlayerStore, index: number) => {
                        return (index === 0) 
                        ? <Player isActive={true} player={player}/> 
                        : <Player isActive={false} player={player} />
                    })
                }
            </div>
        );
    }
}