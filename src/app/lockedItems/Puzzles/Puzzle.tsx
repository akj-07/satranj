import { useState } from 'react';
import { Locked } from '../Locked';

export function Puzzle({ onClose }: { onClose: () => void }) {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div>
      {isSignIn ? <div className='text-white'>ShowPuzzle</div> : <Locked onClose={onClose} />}
    </div>
  );
}
