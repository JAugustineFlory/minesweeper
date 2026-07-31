import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Board from './components/board/Board.jsx'

function App() {
  const [difficulty, setDifficulty] = useState('')

  return (
    <div className="body">
     <Router >
      <header>
        <Link to="/"><h1>MineSweeper</h1></Link>
        <h3>By Augustine Inc!</h3>
      <h3>Select a Difficulty: </h3>
      </header>
      <Link to="/easy" onClick={() => setDifficulty('easy')}>easy</Link>
      <Routes>
        <Route path="/" element={
          <div className="landingPage">
            <h2>Rules:
            On each turn, the user clicks on a square to uncover it. If the square:
            </h2>
            <ol>
              <li>
                If the selected tile contains a mine, the user loses, and the game is over!
              </li>
              <li>
                If the selected tile is adjacent to a mine, the square displays the total number of mines in the 8 squares around it.
              </li>
              <li>
                If the selected tile is not adjacent to a mine, the square is blank and should behave as if the 8 adjacent squares were also clicked. 
                - For each of those squares, their neighboring squares continue to be revealed in each direction (i.e., this step is applied recursively to all neighboring squares) until the edge of the board is reached or until a square is reached that is adjacent to a mine, in which case the previous rule applies.
              </li>
              <li>
                The user wins when they uncover all squares that don’t have mines.<p>
                *This rule winds up uncovering large areas of the board in one turn. This helps speed up gameplay.*
              </p>
              </li>
            </ol>
          </div>
          }
          />
        <Route path="/easy" element={<Board data={{ difficulty }} />} />
      </Routes>
     </Router>
    </div>
  )
}

export default App
