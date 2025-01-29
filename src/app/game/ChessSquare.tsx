"use client";
import { useDrop } from "react-dnd";
import { useEffect, useRef } from "react";
import ChessPiece from "./ChessPiece";

interface ChessSquareProps {
  rowIndex: number;
  colIndex: number;
  piece: string | null;
  onDrop: (from: string, to: string) => void; // Function to handle dropping a piece
}

export default function ChessSquare({
  rowIndex,
  colIndex,
  piece,
  onDrop,
}: ChessSquareProps) {
  const squareRef = useRef<HTMLDivElement | null>(null); // Create a ref for the square

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "PIECE",
      drop: (item: { piece: string; position: string }) => {
        const fromPosition = item.position;
        const toPosition = `${rowIndex}-${colIndex}`;
        onDrop(fromPosition, toPosition);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [rowIndex, colIndex]
  );

  // Attach the ref to the square using useEffect
  useEffect(() => {
    if (squareRef.current) {
      drop(squareRef.current);
    }
  }, [drop]);

  return (
    <div
      ref={squareRef} // Attach ref to the div
      className={`relative flex items-center justify-center w-full aspect-square ${
        (rowIndex + colIndex) % 2 === 0 ? "bg-gray-300" : "bg-gray-600"
      } ${isOver ? "bg-green-400" : ""}`} // Highlight square when a piece is over it
    >
      <ChessPiece piece={piece} position={`${rowIndex}-${colIndex}`} />
    </div>
  );
}
