import ChessBoard from "./ChessBoard";

// src/app/game/page.tsx
export default function GamePage() {
    return (
        <div className="bg-neutral-500 w-full h-full" >
            <h2 className="text-xl font-bold">My Chess Game</h2>
            <ChessBoard />
            <footer>Shatranj</footer>
        </div>
    );
}
