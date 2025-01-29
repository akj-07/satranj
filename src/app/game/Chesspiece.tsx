
const pieceImages: Record<string,string> = {
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

export default function ChessPiece({ piece }: { piece: string | null }) {
    if (!piece) return null;

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={pieceImages[piece]}
            alt={piece}
            className="w-full h-full object-contain"
        />
    );
}
