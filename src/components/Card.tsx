import React from 'react';
import './Card.css';
import CardStore from './Card.store';
import { observer } from 'mobx-react';

interface CardProps {
    card: CardStore,
    isHidden: boolean // needs to be truthy or falsy
}

@observer
export default class Card extends React.Component<CardProps, any> {

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