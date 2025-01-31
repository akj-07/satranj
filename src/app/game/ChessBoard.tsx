// components/ChessBoard.tsx
"use client";
import { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ChessSquare from "./ChessSquare";
import { Chess, Square } from "chess.js";
import NewGame from "./NewGame";

export default function ChessBoard() {
  const [game] = useState(new Chess());
  const [position, setPosition] = useState(game.board());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [turn, setTurn] = useState<"w" | "b">("w");
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [kingInCheckSquare, setKingInCheckSquare] = useState<Square | null>(null);

  // Convert row/col to chess notation (e.g., "a1")
  const convertToSquare = (row: number, col: number): Square => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
    return (files[col] + ranks[row]) as Square;
  };

  // Find the square of the king in check
  const findKingSquare = (color: "w" | "b"): Square | null => {
    for (let row = 0; row < position.length; row++) {
      for (let col = 0; col < position[row].length; col++) {
        const piece = position[row][col];
        if (piece?.type === "k" && piece.color === color) {
          return convertToSquare(row, col);
        }
      }
    }
    return null;
  };

  // Handle piece moves
  const handleMove = useCallback(
    (from: Square, to: Square) => {
      try {
        const move = game.move({ from, to, promotion: "q" });
        if (move) {
          setPosition(game.board());
          setTurn(game.turn() as "w" | "b");
          setSelectedSquare(null);
          setLegalMoves([]);

          // Check if the OPPONENT'S king is in check
          const opponentColor = game.turn() === "w" ? "w" : "b";
          if (game.inCheck()) {
            const kingSquare = findKingSquare(opponentColor);
            setKingInCheckSquare(kingSquare);
          } else {
            setKingInCheckSquare(null);
          }

          // Handle game over conditions
          if (game.isGameOver()) {
            let message = "Game Over! ";
            if (game.isCheckmate()) message += "Checkmate!";
            else if (game.isDraw()) message += "Draw!";
            else if (game.isStalemate()) message += "Stalemate!";
            setGameOverMessage(message);
            setIsGameOver(true);
          }
        }
      } catch (e) {
        console.error("Invalid move:", e);
      }
    },
    [game, position]
  );

  // Handle square clicks
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
        const moves = game.moves({ square: square, verbose: true });
        setLegalMoves(moves.map((move) => move.to as Square));
      } else if (selectedSquare) {
        handleMove(selectedSquare, square);
        setSelectedSquare(null);
        setLegalMoves([]);
      }
    },
    [selectedSquare, position, turn, handleMove, game]
  );

  // Reset game state for new game
  const handleNewGame = () => {
    game.reset();
    setPosition(game.board());
    setTurn("w");
    setSelectedSquare(null);
    setLegalMoves([]);
    setIsGameOver(false);
    setGameOverMessage("");
    setKingInCheckSquare(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center">
        <div className="w-[90vw] max-w-[600px] mx-auto grid grid-cols-8 border-4 border-gray-800">
          {position.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const square = convertToSquare(rowIndex, colIndex);
              const isKingInCheck = square === kingInCheckSquare;

              return (
                <ChessSquare
                  key={`${rowIndex}-${colIndex}`}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  piece={piece?.type || null}
                  pieceColor={piece?.color || null}
                  isSelected={selectedSquare === square}
                  isLegalMove={legalMoves.includes(square)}
                  isKingInCheck={isKingInCheck}
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

        <NewGame
          isOpen={isGameOver}
          message={gameOverMessage}
          onNewGame={handleNewGame}
        />
      </div>
    </DndProvider>
  );
}