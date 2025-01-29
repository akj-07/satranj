"use client";
import { useDrop } from "react-dnd";
import ChessPiece from "./ChessPiece";
import { useRef } from "react";

interface ChessSquareProps {
  rowIndex: number;
  colIndex: number;
  piece: string | null;
  pieceColor: "w" | "b" | null;
  isSelected: boolean;
  onDrop: (from: string, to: string) => void;
  onClick: () => void;
}

export default function ChessSquare({
  rowIndex,
  colIndex,
  piece,
  pieceColor,
  isSelected,
  onDrop,
  onClick,
}: ChessSquareProps) {
  // Create a ref for the div element
  const squareRef = useRef<HTMLDivElement>(null);

  // Use useDrop hook and connect it with our ref
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: "PIECE",
      drop: (item: { position: string }) => {
        const toPosition = `${String.fromCharCode(97 + colIndex)}${
          8 - rowIndex
        }`;
        onDrop(item.position, toPosition);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [rowIndex, colIndex, onDrop]
  );

  // Connect the drop ref to our square ref
  dropRef(squareRef);

  const backgroundColor = (() => {
    if (isSelected) return "bg-yellow-300";
    if (isOver) return "bg-green-300";
    return (rowIndex + colIndex) % 2 === 0 ? "bg-gray-300" : "bg-gray-600";
  })();

  return (
    <div
      ref={squareRef}
      className={`relative flex items-center justify-center w-full aspect-square cursor-pointer ${backgroundColor}`}
      onClick={onClick}
    >
      <ChessPiece
        piece={piece}
        color={pieceColor}
        position={`${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`}
      />
    </div>
  );
}
