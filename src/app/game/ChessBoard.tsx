export default function ChessBoard() {
  return (
    <>
      <div className="w-[90vh] h-[90vh] bg-zinc-500 ">
        <div className="border-gray-800 border-4 grid grid-cols-8 w-full h-full">
          {/* Creating a simple 8x8 grid for the chessboard */}
          {Array.from({ length: 8 }).map((_, rowIndex) =>
            Array.from({ length: 8 }).map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-[100%] h-[100%] ${
                  (rowIndex + colIndex) % 2 === 0
                    ? "bg-gray-300"
                    : "bg-gray-600"
                }`}
              ></div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
