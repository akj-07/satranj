import ChessPiece from "./Chesspiece";

export default function ChessBoard() {
  const initialBoard: (string | null)[][] = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ];

  return (
    <div className="w-[90vw] max-w-[600px] mx-auto grid grid-cols-8 border-4 border-gray-800">
      {initialBoard.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`relative flex items-center justify-center w-full aspect-square ${
              (rowIndex + colIndex) % 2 === 0 ? "bg-gray-300" : "bg-gray-600"
            }`}
          >
            <ChessPiece piece={piece} />
          </div>
        ))
      )}
    </div>
  );
}
