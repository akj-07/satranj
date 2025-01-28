import ChessBoard from "./ChessBoard";

// src/app/game/page.tsx
export default function GamePage() {
    return (
        <>
        <div className="bg-zinc-500 w-screen h-screen" >
            <ChessBoard />
        </div>
        </>
        
    );
}
