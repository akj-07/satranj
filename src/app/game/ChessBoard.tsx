// ChessBoard.tsx
"use client";
import { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ChessSquare from "./ChessSquare";
import { Chess } from "chess.js";

export default function ChessBoard() {
  // Initialize chess.js game instance
  const [game] = useState(new Chess());
  // State to track the current board position
  const [position, setPosition] = useState(game.board());
  // State to track the selected square for click-to-move
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  // State to track whose turn it is
  const [turn, setTurn] = useState<"w" | "b">("w");

  // Convert chess.js coordinate to our board coordinate
  const convertToSquare = (row: number, col: number): string => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
    return files[col] + ranks[row];
  };

  // Handle both click and drag moves
  const handleMove = useCallback(
    (from: string, to: string) => {
      try {
        // Attempt to make the move using chess.js
        const move = game.move({
          from: from,
          to: to,
          promotion: "q", // Always promote to queen for simplicity
        });

        if (move) {
          // Update the board position
          setPosition(game.board());
          // Update turn
          setTurn(game.turn() as "w" | "b");
          // Clear selected square
          setSelectedSquare(null);

          // Check for game end conditions
          if (game.isGameOver()) {
            let gameOverMessage = "Game Over! ";
            if (game.isCheckmate()) gameOverMessage += "Checkmate!";
            else if (game.isDraw()) gameOverMessage += "Draw!";
            else if (game.isStalemate()) gameOverMessage += "Stalemate!";
            alert(gameOverMessage);
          }
        }
      } catch (e) {
        console.error("Invalid move:", e);
      }
    },
    [game]
  );

  // Handle square clicks for click-to-move
  const handleSquareClick = useCallback(
    (row: number, col: number) => {
      const square = convertToSquare(row, col);
      const piece = position[row][col];

      // If no square is selected and clicked square has a piece of the current turn
      if (
        !selectedSquare &&
        piece &&
        ((piece.color === "w" && turn === "w") ||
          (piece.color === "b" && turn === "b"))
      ) {
        setSelectedSquare(square);
      }
      // If a square is already selected, attempt to make a move
      else if (selectedSquare) {
        handleMove(selectedSquare, square);
        setSelectedSquare(null);
      }
    },
    [selectedSquare, position, turn, handleMove]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-[90vw] max-w-[600px] mx-auto grid grid-cols-8 border-4 border-gray-800">
        {position.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            // Extract piece type and color from the chess.js piece object
            const pieceType = piece ? piece.type : null;
            const pieceColor = piece ? piece.color : null;

            return (
              <ChessSquare
                key={`${rowIndex}-${colIndex}`}
                rowIndex={rowIndex}
                colIndex={colIndex}
                piece={pieceType}
                pieceColor={pieceColor} // Changed from color to pieceColor
                isSelected={
                  selectedSquare === convertToSquare(rowIndex, colIndex)
                }
                onDrop={handleMove}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              />
            );
          })
        )}
      </div>
      <div className="text-center mt-4">
        {`Current turn: ${turn === "w" ? "White" : "Black"}`}
      </div>
    </DndProvider>
  );
}
