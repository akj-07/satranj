export default function ChessBoard() {

    console.log("ChessBoard");
    return (
        <div className="grid grid-cols-8 w-96 h-96">
            {/* Creating a simple 8x8 grid for the chessboard */}
            {Array.from({ length: 8 }).map((_, rowIndex) =>
                Array.from({ length: 8 }).map((_, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`w-12 h-12 ${ (rowIndex + colIndex) % 2 === 0 ? 'bg-gray-300' : 'bg-gray-600'}`}
                    ></div>
                ))
            )}-
        </div>
    );
}