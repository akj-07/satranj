"use client";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ChessSquare from "./ChessSquare";

// Define types
type Piece = string | null;
type Board = Piece[][];
interface Position {
  row: number;
  col: number;
}

export default function ChessBoard() {
  const [board, setBoard] = useState<Board>([
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isValidMove = (from: Position, to: Position, _piece: Piece): boolean => {
    // Basic validation
    if (
      to.row < 0 ||
      to.row > 7 ||
      to.col < 0 ||
      to.col > 7 ||
      from.row < 0 ||
      from.row > 7 ||
      from.col < 0 ||
      from.col > 7
    ) {
      return false;
    }

    // Add more complex chess rules here
    return true;
  };

  const handleMove = (from: string, to: string) => {
    const [fromRow, fromCol] = from.split("-").map(Number);
    const [toRow, toCol] = to.split("-").map(Number);

    const piece = board[fromRow][fromCol];
    const fromPos = { row: fromRow, col: fromCol };
    const toPos = { row: toRow, col: toCol };

    if (!piece || !isValidMove(fromPos, toPos, piece)) {
      return;
    }

    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      newBoard[toRow][toCol] = piece;
      newBoard[fromRow][fromCol] = null;
      return newBoard;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-[90vw] max-w-[600px] mx-auto grid grid-cols-8 border-4 border-gray-800">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <ChessSquare
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              piece={piece}
              onDrop={handleMove}
            />
          ))
        )}
      </div>
    </DndProvider>
  );
}