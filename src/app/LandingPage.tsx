import { useState } from 'react';
import ChessBoard from './game/ChessBoard';
import { Puzzle } from './lockedItems/Puzzles/Puzzle';
import { Learn } from './lockedItems/Learn/Learn';

export function LandingPage() {
  const [showChessBoard, setShowChessBoard] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [showLearn, setShowLearn] = useState(false);

  return (
    <div className='flex flex-row min-h-screen bg-zinc-800 text-white'>
      {/* Sidebar */}
      <div className='w-1/6 bg-zinc-900 p-4 rounded-2xl'>
        <button className='text-2xl font-bold pl-4 p-8'>Satranj</button>
        <button
          className='text-xl font-bold p-8 text-zinc-400 hover:text-white transform transition-all duration-300 scale-95 hover:scale-100'
          onClick={() => setShowChessBoard(false)}>
          Home
        </button>
        <button
          className='text-xl font-bold p-8 text-zinc-400 hover:text-white transform transition-all duration-300 scale-95 hover:scale-100'
          onClick={() => setShowLearn(true)}>
          Learn
        </button>
        <button
          className='text-xl font-bold p-8 text-zinc-400 hover:text-white transform transition-all duration-300 scale-95 hover:scale-100'
          onClick={() => setShowPuzzle(true)}>
          Puzzle
        </button>
      </div>

      {/* Main content */}
      <div className='flex flex-1 flex-col items-center justify-center'>
        {!showChessBoard ? (
          <div className='flex flex-col space-y-4'>
            <button
              onClick={() => setShowChessBoard(true)}
              className='bg-green-800 text-white p-3 px-4 rounded-lg font-semibold text-lg hover:bg-green-500 transition-all duration-200 transform hover:scale-105 active:scale-95'>
              Play
            </button>
            <button
              onClick={() => alert('Login feature coming soon!')}
              className='bg-zinc-600 text-white p-3 px-4 rounded-lg font-semibold text-lg hover:bg-zinc-700 transition-all duration-200 transform hover:scale-105 active:scale-95'>
              Log in
            </button>
          </div>
        ) : (
          <ChessBoard />
        )}
      </div>

      {/* Puzzle Modal */}
      {showPuzzle && <Puzzle onClose={() => setShowPuzzle(false)} />}
      {/* Learn Modal */}
      {showLearn && <Learn onClose={() => setShowLearn(false)} />}
    </div>
  );
}
