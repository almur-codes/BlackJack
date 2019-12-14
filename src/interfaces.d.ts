export interface PlayerNameFormState {
    playerNames: Array<string>
}

export interface PlayerNameFormProps {
    handleSubmit: (playerNames: Array<string>) => void
}

export interface BlackJackState {
    startGame: boolean,
    players: Array<PlayerStore>
}

export interface TableProps {
    players: Array<PlayerStore>
}

export interface TableState {
    deck: Deck,
    activePlayerIndex: number,
    gameIsOver: boolean,
    scoreBoard: ScoreBoardStore
}

export interface PlayerProps{
    deck: Deck,
    player: PlayerStore,
    isActive: boolean
}

export interface CardProps {
    card: CardStore,
    isHidden: boolean // needs to be truthy or falsy
}