// app/page.tsx
"use client"; // Add this to enable client-side interactivity

import { useState } from "react";
import ChessBoard from "../app/game/ChessBoard"; // Import the ChessBoard component

export default function Home() {
  const [showChessBoard, setShowChessBoard] = useState(false); // State to control ChessBoard visibility

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Chess Game!</h1>

      {!showChessBoard ? (
        <div className="flex flex-col space-y-4">
          {/* Play Game Button */}
          <button
            onClick={() => setShowChessBoard(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Play Game
          </button>

          {/* Login and Play Button (Placeholder) */}
          <button
            onClick={() => alert("Login feature coming soon!")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Login and Play
          </button>
        </div>
      ) : (
        <ChessBoard /> // Render the ChessBoard component when showChessBoard is true
      )}
    </div>
  );
}