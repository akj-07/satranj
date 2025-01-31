// ChessBoard.tsx
"use client";
import { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ChessSquare from "./ChessSquare";
import { Chess, Square } from "chess.js"; // Import Square type from chess.js

export default function ChessBoard() {
  const [game] = useState(new Chess());
  const [position, setPosition] = useState(game.board());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null); // Use Square type
  const [turn, setTurn] = useState<"w" | "b">("w");
  const [legalMoves, setLegalMoves] = useState<Square[]>([]); // Use Square type for legal moves

  const convertToSquare = (row: number, col: number): Square => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
    return (files[col] + ranks[row]) as Square; // Cast to Square type
  };

  const handleMove = useCallback(
    (from: Square, to: Square) => {
      try {
        const move = game.move({
          from: from,
          to: to,
          promotion: "q", // Always promote to queen for simplicity
        });

        if (move) {
          setPosition(game.board());
          setTurn(game.turn() as "w" | "b");
          setSelectedSquare(null);
          setLegalMoves([]);

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

  const handleSquareClick = useCallback(
    (row: number, col: number) => {
      const square = convertToSquare(row, col);
      const piece = position[row][col];

      if (
        !selectedSquare &&
        piece &&
        ((piece.color === "w" && turn === "w") ||
          (piece.color === "b" && turn === "b"))
      ) {
        setSelectedSquare(square);
        const moves = game.moves({ square: square, verbose: true }); // Use verbose: true
        setLegalMoves(moves.map((move) => move.to as Square)); // Extract 'to' squares and cast to Square type
      } else if (selectedSquare) {
        handleMove(selectedSquare, square);
        setSelectedSquare(null);
        setLegalMoves([]);
      }
    },
    [selectedSquare, position, turn, handleMove, game]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-[90vw] max-w-[600px] mx-auto grid grid-cols-8 border-4 border-gray-800">
        {position.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const square = convertToSquare(rowIndex, colIndex);
            const pieceType = piece ? piece.type : null;
            const pieceColor = piece ? piece.color : null;
            const isLegalMove = legalMoves.includes(square);

            return (
              <ChessSquare
                key={`${rowIndex}-${colIndex}`}
                rowIndex={rowIndex}
                colIndex={colIndex}
                piece={pieceType}
                pieceColor={pieceColor}
                isSelected={selectedSquare === square}
                isLegalMove={isLegalMove}
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