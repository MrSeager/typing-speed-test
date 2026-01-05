'use client'
//Components
import { useState, useRef } from "react";
import Image from "next/image";
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
    const inputRef = useRef<HTMLInputElement>(null);

    const [wpm, setWpm] = useState<number>(0);
    const [timeInSec, setTimeInSec] = useState<number>(60);

    const currentText = data[difficulty].find(item => item.id === `${difficulty}-${textId}`)?.text ?? "";

    const startTest = () => {
        setStart(true);
        setTimeout(() => inputRef.current?.focus(), 50);
    }

    const handleDifficulty = ( diff: DifficultyProps ) => {
        setDifficulty(diff);
        setTextId(Math.floor(Math.random() * 10) + 1);
    }

    const accuracy = typed.length
    ? Math.round(
        (typed.split("").filter((c, i) => c === currentText[i]).length / typed.length) * 100
      )
    : 100;

    return (
        <main className="max-w-[12orem] w-full px-15 flex">
            <div className={`${end === false ? 'w-full' : 'w-0 h-0'} duration-500 overflow-hidden`}>
                <div className="flex items-center justify-between border-b py-5">
                    <div className="flex gap-3">
                        <h2 className="text-[#727279]">WPM: <span className="text-white text-lg font-semibold">{wpm}</span></h2>
                        <h2 className="text-[#727279]">Accuracy: <span className={`${accuracy === 100 ? 'text-[#4cd67a]' : 'text-[#d64c5a]'} duration-500 text-lg font-semibold`}>{accuracy}%</span></h2>
                        <h2 className="text-[#727279]">Time: <span className="text-white text-lg font-semibold">0:46</span></h2>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex gap-2">
                            <h2 className="text-[#727279]">Difficulty:</h2>
                            <button 
                                type="button"
                                onClick={() => handleDifficulty('easy')}
                                disabled={start === true}
                                className={`${difficulty === 'easy' ? 'outline-[#4da6ff]' : 'outline-transparent'} 
                                            cursor-pointer outline-2 outline-offset-3 rounded-[10px] px-2 border border-[#727279] duration-500
                                            hover:border-white
                                            focus:border-[#4da6ff] focus:text-[#4da6ff]`}
                            >
                                Easy
                            </button>
                            <button 
                                type="button"
                                onClick={() => handleDifficulty('medium')}
                                disabled={start === true}
                                className={`${difficulty === 'medium' ? 'outline-[#4da6ff]' : 'outline-transparent'} 
                                            cursor-pointer outline-2 outline-offset-3 rounded-[10px] px-2 border border-[#727279] duration-500
                                            hover:border-white
                                            focus:border-[#4da6ff] focus:text-[#4da6ff]`}
                            >
                                Medium
                            </button>
                            <button 
                                type="button"
                                onClick={() => handleDifficulty('hard')}
                                disabled={start === true}
                                className={`${difficulty === 'hard' ? 'outline-[#4da6ff]' : 'outline-transparent'} 
                                            cursor-pointer outline-2 outline-offset-3 rounded-[10px] px-2 border border-[#727279] duration-500
                                            hover:border-white
                                            focus:border-[#4da6ff] focus:text-[#4da6ff]`}
                            >
                                Hard
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <h2 className="text-[#727279]">Mode:</h2>
                            <button 
                                type="button"
                                onClick={() => setMode('timed')}
                                disabled={start === true}
                                className={`${mode === 'timed' ? 'outline-[#4da6ff]' : 'outline-transparent'} 
                                            cursor-pointer outline-2 outline-offset-3 rounded-[10px] px-2 border border-[#727279] duration-500
                                            hover:border-white
                                            focus:border-[#4da6ff] focus:text-[#4da6ff]`}
                            >
                                Timed(60s)
                            </button>
                            <button 
                                type="button"
                                onClick={() => setMode('passage')}
                                disabled={start === true}
                                className={`${mode === 'passage' ? 'outline-[#4da6ff]' : 'outline-transparent'} 
                                            cursor-pointer outline-2 outline-offset-3 rounded-[10px] px-2 border border-[#727279] duration-500
                                            hover:border-white
                                            focus:border-[#4da6ff] focus:text-[#4da6ff]`}
                            >
                                Passage
                            </button>
                        </div>
                    </div>
                </div>
                <div className="relative py-5 min-h-130">
                    <p onClick={() => inputRef.current?.focus()} className="text-[35px] text-base/12 leading-[1.2] font-mono flex flex-wrap">
                        {currentText.split("").map((char, i) => {
                            let color = "";

                            if (i < typed.length) { 
                                color = typed[i] === char ? "text-[#4cd67a]" : "text-[#d64c5a] decoration-[2px] underline underline-offset-6"; 
                            } else { 
                                color = "text-white"; 
                            }

                            return (
                                <span key={i} className={`${color} duration-300`}>
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            );
                        })}
                    </p>
                    <input 
                        ref={inputRef}
                        autoFocus
                        type="text"
                        value={typed}
                        onChange={(e) => setTyped(e.target.value)}
                        className="absolute opacity-0 pointer-events-none"
                        disabled={!start}
                        aria-hidden='true'
                        tabIndex={-1}
                    />
                    <div className="py-5 flex items-center justify-center border-t mt-5">
                        <button 
                            type="button"
                            className="bg-[#262626] cursor-pointer px-3 py-2 rounded-[5px]"
                        >
                            Restart Test
                        </button>
                    </div>
                    <div onClick={startTest} className={`absolute flex flex-col gap-2 items-center justify-center top-0 w-full ${start === false ? 'h-full' : 'h-0'} overflow-hidden backdrop-blur-md duration-500`}>
                        <button 
                            type="button"
                            onClick={startTest}
                            className="bg-[#1a7dff] px-5 py-2 outline-2 outline-offset-3 outline-[#4da6ff] rounded-[5px] duration-500
                                        hover:outline-transparent hover:bg-[#4da6ff]"
                        >
                            Start Typing Text
                        </button>
                        <p className="text-center">Or click the text and start typing</p>
                    </div>
                </div>
            </div>
            <EndSection 
                end={end} 
                wpm={wpm}
                accuracy={accuracy}
            />
        </main>
    );
}