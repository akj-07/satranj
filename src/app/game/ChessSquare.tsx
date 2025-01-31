// components/ChessSquare.tsx
"use client";
import { useDrop } from "react-dnd";
import ChessPiece from "./ChessPiece";
import { useRef } from "react";
import { Square } from "chess.js";

interface ChessSquareProps {
  rowIndex: number;
  colIndex: number;
  piece: string | null;
  pieceColor: "w" | "b" | null;
  isSelected: boolean;
  isLegalMove: boolean;
  isKingInCheck: boolean;
  onDrop: (from: Square, to: Square) => void;
  onClick: () => void;
}

export default function ChessSquare({
  rowIndex,
  colIndex,
  piece,
  pieceColor,
  isSelected,
  isLegalMove,
  isKingInCheck,
  onDrop,
  onClick,
}: ChessSquareProps) {
  const squareRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: "PIECE",
      drop: (item: { position: string }) => {
        const toPosition = `${String.fromCharCode(97 + colIndex)}${
          8 - rowIndex
        }` as Square;
        onDrop(item.position as Square, toPosition);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [rowIndex, colIndex, onDrop]
  );

  dropRef(squareRef);

  const backgroundColor = (() => {
    if (isSelected) return "bg-yellow-300";
    if (isLegalMove) return "bg-green-200";
    if (isOver) return "bg-green-300";
    return (rowIndex + colIndex) % 2 === 0 ? "bg-gray-300" : "bg-gray-600";
  })();

  return (
    <div
      ref={squareRef}
      className={`relative flex items-center justify-center w-full aspect-square cursor-pointer transition-all duration-300 ${backgroundColor} ${
        isKingInCheck ? "bg-red-500" : ""
      }`}
      onClick={onClick}
    >
      <ChessPiece
        piece={piece}
        color={pieceColor}
        position={`${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`}
      />
      {isLegalMove && !piece && (
        <div className="w-1/4 h-1/4 bg-green-500 rounded-full opacity-50"></div>
      )}
    </div>
  );
}
