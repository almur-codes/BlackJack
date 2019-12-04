import ScoreBoard from '../src/ScoreBoard';
import Player from '../src/Player';
import Card from '../src/Card';

let T1: Player = new Player("T1");
T1.hitMe(new Card("K", "Heart"));
T1.hitMe(new Card("2", "Heart"));

let T2: Player = new Player("T2");
T2.hitMe(new Card("7", "Heart"));
T2.hitMe(new Card("8", "Heart"));

let T3: Player = new Player("T3");
T3.hitMe(new Card("9", "Heart"));
T3.hitMe(new Card("4", "Heart"));

let T4: Player = new Player("T4");
T4.hitMe(new Card("A", "Heart"));
T4.hitMe(new Card("6", "Heart"));

let players: Array<Player> = [ T1, T2, T3, T4 ];

ScoreBoard.create( players );

test('should order players by score correctly in descending order', () => {
    expect( ScoreBoard.getScoreBoard()[0].name ).toBe("T4");
    expect( ScoreBoard.getScoreBoard()[1].name ).toBe("T2");
    expect( ScoreBoard.getScoreBoard()[2].name ).toBe("T3");
    expect( ScoreBoard.getScoreBoard()[3].name ).toBe("T1");
});

test('should order players by name if scores are equal in ascending order', () => {
    T1.hitMe(new Card("A", "Spade"));
    
    ScoreBoard.create( [ T1, T2, T3, T4 ] );

    expect( ScoreBoard.getScoreBoard()[0].name ).toBe("T4");
    expect( ScoreBoard.getScoreBoard()[1].name ).toBe("T2");
    expect( ScoreBoard.getScoreBoard()[2].name ).toBe("T1");
    expect( ScoreBoard.getScoreBoard()[3].name ).toBe("T3");
});

test('should return an array of tied players', () => {
    T2.hitMe(new Card("2", "Spade"));
    
    ScoreBoard.create( [ T1, T2, T3, T4 ] );

    expect( ScoreBoard.getScoreBoard()[0].name ).toBe("T2");
    expect( ScoreBoard.getScoreBoard()[1].name ).toBe("T4");
    expect( ScoreBoard.getScoreBoard()[2].name ).toBe("T1");
    expect( ScoreBoard.getScoreBoard()[3].name ).toBe("T3");

    expect( ScoreBoard.getWinner().length ).toBe(2);
});