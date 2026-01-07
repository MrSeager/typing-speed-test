'use client'
//Components
import { useState, useEffect } from "react";
import TypingSection from "./TypingSection";
import EndSection from "./EndSection";
//Types
import { DifficultyData, DifficultyProps } from "@/types/types";

interface MainPageProps {
    data: DifficultyData;
}

export default function MainPage ({ data }: MainPageProps) {
    const [difficulty, setDifficulty] = useState<DifficultyProps>('easy');
    const [textId, setTextId] = useState<number>(1);
    const [mode, setMode] = useState<string>('timed');
    const [start, setStart] = useState<boolean>(false);
    const [end, setEnd] = useState<boolean>(false);

    const [typed, setTyped] = useState<string>('');

    const [timeInSec, setTimeInSec] = useState<number>(60);
    const [elapsed, setElapsed] = useState<number>(0);

    const currentText = data[difficulty].find(item => item.id === `${difficulty}-${textId}`)?.text ?? "";

    const accuracyInPercent = typed.length
    ? Math.round(
        (typed.split("").filter((c, i) => c === currentText[i]).length / typed.length) * 100
      )
    : 100;

    const wpm = elapsed > 0
        ? Math.round((typed.length / 5) / (elapsed / 60))
        : 0;

    const handleRestart = () => {
        setStart(false);
        setEnd(false);
        setTyped("");
        setElapsed(0);

        if (mode === 'timed') { 
            setTimeInSec(60); 
        } else { 
            setTimeInSec(0); 
        }
    };

    return (
        <main className="max-w-[12orem] w-full px-15 flex flex-col">
            <TypingSection 
                handleRestart={handleRestart}
                difficulty={difficulty} setDifficulty={setDifficulty}
                setTextId={setTextId}
                mode={mode} setMode={setMode}
                start={start} setStart={setStart} 
                end={end} setEnd={setEnd}
                timeInSec={timeInSec} setTimeInSec={setTimeInSec}
                typed={typed} setTyped={setTyped}
                setElapsed={setElapsed} currentText={currentText}
                wpm={wpm} accuracyInPercent={accuracyInPercent}
            />
            <EndSection 
                mode={mode}
                end={end} 
                wpm={wpm}
                timeInSec={timeInSec}
                accuracy={accuracyInPercent}
                symbolsRight={typed.split("").filter((c, i) => c === currentText[i]).length} 
                symbolsSum={currentText.length}
                handleRestart={handleRestart}
            />
        </main>
    );
}