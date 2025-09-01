import { useState } from 'react';
import { Locked } from '../Locked';

export function Learn({ onClose }: { onClose: () => void }) {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div>
      {isSignIn ? <div className='text-white'>Learn</div> : <Locked onClose={onClose} />}
    </div>
  );
}
