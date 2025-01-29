"use client";
import { useDrag } from "react-dnd";
import { useEffect, useRef } from "react";

// Define types
interface DragItem {
  piece: string;
  position: string;
}

interface ChessPieceProps {
  piece: string | null;
  position: string;
}

const pieceImages: Record<string, string> = {
  P: "/images/white-pawn.svg",
  R: "/images/white-rook.svg",
  N: "/images/white-knight.svg",
  B: "/images/white-bishop.svg",
  Q: "/images/white-queen.svg",
  K: "/images/white-king.svg",
  p: "/images/black-pawn.svg",
  r: "/images/black-rook.svg",
  n: "/images/black-knight.svg",
  b: "/images/black-bishop.svg",
  q: "/images/black-queen.svg",
  k: "/images/black-king.svg",
};

export default function ChessPiece({ piece, position }: ChessPieceProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>(
    () => ({
      type: "PIECE",
      item: { piece: piece!, position },
      canDrag: !!piece, // Only allow dragging if there's a piece
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [piece, position]
  );

  useEffect(() => {
    if (imgRef.current) {
      drag(imgRef.current);
    }
  }, [drag]);

  if (!piece || !pieceImages[piece]) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={pieceImages[piece]}
      alt={`${piece} chess piece`}
      className={`w-full h-full object-contain cursor-grab ${
        isDragging ? "opacity-50" : ""
      }`}
      onError={(e) => {
        console.error(`Failed to load chess piece image: ${pieceImages[piece]}`);
        e.currentTarget.style.display = "none";
      }}
    />
  );
}