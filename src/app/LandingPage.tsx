import { useState } from 'react';
import ChessBoard from './game/ChessBoard';

export function LandingPage() {
  const [showChessBoard, setShowChessBoard] = useState(false);

  const onHomeClicked = () => {
    setShowChessBoard(false)
  }
  return (
    <div className='flex flex-row min-h-screen bg-zinc-800 text-white'>
      <div className='w-1/6 bg-zinc-900 p-4 rounded-2xl'>
        <button className='text-2xl font-bold pl-4 p-8'>Satranj</button>
        <button className='text-xl font-bold p-8 text-zinc-400 hover:text-white' onClick={()=>onHomeClicked()}>Home</button>
        <button className='text-xl font-bold p-8 text-zinc-400 hover:text-white'>Learn</button>
        <button className='text-xl font-bold p-8 text-zinc-400 hover:text-white'>Puzzle</button>
      </div>

      {/* Main content */}
      <div className='flex flex-1 flex-col items-center justify-center'>
        {!showChessBoard ? (
          <div className='flex flex-col space-y-4'>
            {/* Play Game Button */}
            <button
              onClick={() => setShowChessBoard(true)}
              className='bg-green-800 text-white p-3 px-4 rounded-lg font-semibold text-lg hover:bg-green-500 transition-all duration-200 transform hover:scale-105 active:scale-95'>
              Play
            </button>

            {/* Login and Play Button */}
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
    </div>
  );
}
