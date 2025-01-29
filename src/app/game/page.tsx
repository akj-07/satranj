import ChessBoard from "./ChessBoard";

export default function GamePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-2xl font-bold mb-4">My Chess Game</h1>
            <ChessBoard />
        </div>
    );
}
