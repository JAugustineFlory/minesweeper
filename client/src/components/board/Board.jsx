import { useState, useEffect } from 'react';
import './Board.css';


function generate(difficulty) {
    let gridSize = 10;
    let boardArray = [];
    let bombCount = gridSize;
    let cellsRemaining = gridSize * gridSize;
    let bombCells = [];
    
    //Generates row and tile properties
    for (let rowNum = 0; rowNum < gridSize; rowNum++){
        let rowArray = [];
        //Generates column and reassigns properties, sets bombs
        for (let colNum = 0; colNum < gridSize; colNum++) {
            let props = {row: 0, col: 0, isBomb: false, isRevealed: false, adjacentCount: 0};
            props.row = rowNum;
            props.col = colNum;
            if (bombCount > 0) {
                let bombChance = bombCount / cellsRemaining;
                // console.log(`bomb chance: ${bombChance}`);
                if( Math.random() < bombChance) {
                    props.isBomb = true;
                    bombCount-=1;
                    console.log(`bomb in x: ${props.col} y: ${props.row}`);
                    let cell = {x: props.col, y: props.row};
                    bombCells.push(cell);
                }
            }
            rowArray.push(props);
            cellsRemaining--;
        }
        boardArray.push(rowArray);
    }
                                          //row col
                                          // \/ \/
    // console.log(`board array: ${boardArray[1][4]}`)
    return adjacency(boardArray, bombCells, gridSize);
}


function adjacency(boardArray, bombCells, gridSize) {
    bombCells.forEach(bomb => {
        //Iterate through columns 3x3, based on bomb coordinates
        for (let row = bomb.y - 1; row <= bomb.y + 1; row++){
            //Ensure coordinates are not 0
            if (row < 0 || row >= gridSize) continue;
            //Iterate through rows 3x3, base on bomb coordinates
            for (let col = bomb.x - 1; col <= bomb.x + 1; col++){
                if (col < 0 || col >= gridSize) continue;
                if (boardArray[row][col].isBomb) continue;
                boardArray[row][col].adjacentCount += 1;
            }
        }
    })
    return boardArray;
}

//Handles the whole "all nearby empty tiles reveal" thing
function revealBlank( board, row, col, gridSize) {
    const cell = board[row][col];
    //Safety catch
    if (cell.isRevealed || cell.isBomb) return;
    
    cell.isRevealed = true;


    if (cell.adjacentCount === 0) {
        //Same double-iteration pattern used above
        //iterate through row
        for (let r = row - 1; r <= row + 1; r++) {
            if (r < 0 || r >= gridSize) continue;
            //iterate through columns
            for (let c = col - 1; c <= col + 1; c++) {
                if (c < 0 || c >= gridSize) continue;
                if (r === row && c === col) continue;
                revealBlank(board, r, c, gridSize);
            }
        }
    }
}

function checkWin(board) {
    return board.every(row =>
        row.every(cell => cell.isBomb || cell.isRevealed)
    );
}

//generates board
function Board(props) {
    const [won, setWon] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [board, setBoard] = useState(() => {
        const saved = localStorage.getItem("minesweeper-board");
        
        return saved ? JSON.parse(saved) : generate(props.data.difficulty);
    });


    // When board updates, save
    useEffect(()  => {
        localStorage.setItem("minesweeper-board", JSON.stringify(board));
    }, [board])
    //When retry button is pressed, removes our previous save and generate()s and new board
    
    
    const handleRetry = () => {
        localStorage.removeItem("minesweeper-board");
        setBoard(generate(props.data.difficulty));
        setGameOver(false);
        setWon(false);
    }

    const handleClick = (clickedRow, clickedCol) => {
        if (gameOver || won) return;
        const clickedCell = board[clickedRow][clickedCol];

        if (clickedCell.isBomb) {
            setGameOver(true);
            setBoard(prevBoard =>
                prevBoard.map(row =>
                    row.map(cell => ({ ...cell, isRevealed: true}))
                )
            );
            return;
        }

        const newBoard = structuredClone(board);
        revealBlank(newBoard, clickedRow, clickedCol, newBoard.length);
        setBoard(newBoard);

        if (checkWin(newBoard)) {
            setWon(true);
        }
    };
    

    return (
        <div className="main">
            {gameOver && <div className="failedMessage">You Failed!</div>}
            {won && <div className="failedMessage">You Won!</div>}
            <button href="" className="retry link-btn" onClick={handleRetry}>Retry</button>
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((cell) => (
                            <div
                            key={`${cell.row}-${cell.col}`}
                            className={`cell ${cell.isRevealed ? "revealed" : "unclicked"} ${cell.isBomb && cell.isRevealed ? "bomb" : ""} ${cell.isRevealed && cell.adjacentCount == 0 ? "blank" : ""}`}
                            onClick={() => {handleClick(cell.row, cell.col, cell.isBomb)}}
                            >
                                {cell.isRevealed && !cell.isBomb && cell.adjacentCount > 0 ? (cell.adjacentCount).toString() : null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}



export default Board