import React from 'react';
import './Card.css';
import { observer } from 'mobx-react';
import { CardProps } from '../interfaces';

@observer
export default class Card extends React.Component<CardProps> {

    private getClassName(): string {
        let className: string = "card";
        className += ( this.props.isHidden ) ? " flipped" : "";
        className += ` ${this.props.card.getClassName}`;
        return className;
    }
    
    public render(): JSX.Element {
        return (
            <div className={this.getClassName()}></div>
        );
    }
}