import { ScoreBoard } from '../src/ScoreBoard';
import Player from '../src/Player';
import Card from '../src/Card';

let T1: Player = new Player("T1");;
let T2: Player = new Player("T2");;
let T3: Player = new Player("T3");;
let T4: Player = new Player("T4");;

let scoreBoard: ScoreBoard = new ScoreBoard();

beforeEach(() => {
    scoreBoard = new ScoreBoard();

    T1.hitMe(new Card("K", "Heart"));
    T1.hitMe(new Card("2", "Heart"));
    
    T2.hitMe(new Card("7", "Heart"));
    T2.hitMe(new Card("8", "Heart"));
    
    T3.hitMe(new Card("9", "Heart"));
    T3.hitMe(new Card("4", "Heart"));
    
    T4.hitMe(new Card("A", "Heart"));
    T4.hitMe(new Card("6", "Heart"));
});

afterEach(() => {
    scoreBoard = null;
    [ T1, T2, T3, T4 ].forEach((T: Player) => {
        T.reset();
    });
});

test('should order players by score correctly in descending order', () => {
    let players: Array<Player> = [ T1, T2, T3, T4 ];
    
    scoreBoard.create( players );

    expect( scoreBoard.getScoreBoard()[0].name ).toBe("T4");
    expect( scoreBoard.getScoreBoard()[1].name ).toBe("T2");
    expect( scoreBoard.getScoreBoard()[2].name ).toBe("T3");
    expect( scoreBoard.getScoreBoard()[3].name ).toBe("T1");
});

test('should order players by name if scores are equal in ascending order', () => {
    T1.hitMe(new Card("A", "Spade"));
    
    scoreBoard.create( [ T1, T2, T3, T4 ] );

    expect( scoreBoard.getScoreBoard()[0].name ).toBe("T4");
    expect( scoreBoard.getScoreBoard()[1].name ).toBe("T2");
    expect( scoreBoard.getScoreBoard()[2].name ).toBe("T1");
    expect( scoreBoard.getScoreBoard()[3].name ).toBe("T3");
});

test('should return an array of tied players', () => {
    T2.hitMe(new Card("2", "Spade"));
    
    scoreBoard.create( [ T1, T2, T3, T4 ] );

    expect( scoreBoard.getScoreBoard()[0].name ).toBe("T2");
    expect( scoreBoard.getScoreBoard()[1].name ).toBe("T4");
    expect( scoreBoard.getScoreBoard()[2].name ).toBe("T3");
    expect( scoreBoard.getScoreBoard()[3].name ).toBe("T1");

    expect( scoreBoard.getWinner().length ).toBe(2);
});