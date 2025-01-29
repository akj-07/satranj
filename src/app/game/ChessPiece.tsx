/* eslint-disable @next/next/no-img-element */
"use client";
import { useDrag } from "react-dnd";
import { useRef } from "react";

interface ChessPieceProps {
  piece: string | null;
  color: "w" | "b" | null;
  position: string;
}

const pieceImages: Record<string, Record<"w" | "b", string>> = {
  p: {
    w: "/images/white-pawn.svg",
    b: "/images/black-pawn.svg",
  },
  r: {
    w: "/images/white-rook.svg",
    b: "/images/black-rook.svg",
  },
  n: {
    w: "/images/white-knight.svg",
    b: "/images/black-knight.svg",
  },
  b: {
    w: "/images/white-bishop.svg",
    b: "/images/black-bishop.svg",
  },
  q: {
    w: "/images/white-queen.svg",
    b: "/images/black-queen.svg",
  },
  k: {
    w: "/images/white-king.svg",
    b: "/images/black-king.svg",
  },
};

export default function ChessPiece({
  piece,
  color,
  position,
}: ChessPieceProps) {
  // Create a ref for the img element
  const pieceRef = useRef<HTMLImageElement>(null);

  // Use useDrag hook and connect it with our ref
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "PIECE",
      item: { position },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [position]
  );

  // Connect the drag ref to our piece ref
  dragRef(pieceRef);

  if (!piece || !color) return null;

  return (
    <img
      ref={pieceRef}
      src={pieceImages[piece][color]}
      alt={`${color === "w" ? "White" : "Black"} ${piece}`}
      className={`w-full h-full object-contain ${
        isDragging ? "opacity-50" : ""
      }`}
    />
  );
}
