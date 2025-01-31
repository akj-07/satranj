// components/NewGame.tsx
"use client";

interface NewGameProps {
  isOpen: boolean;
  message: string;
  onNewGame: () => void;
}

export default function NewGame({ isOpen, message, onNewGame }: NewGameProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-95 hover:scale-100 border border-gray-700 relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-10 blur-2xl -z-10" />

        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {message}
        </h2>
        <div className="flex justify-center">
          <button
            onClick={onNewGame}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}