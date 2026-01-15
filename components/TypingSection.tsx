'use client'
//Components
import { useEffect, useRef } from "react";
import TypingSectionItemOne from "./TypingSectionItemOne";
//Types
import { DifficultyProps } from "@/types/types";
//Icons
import { VscDebugRestart } from "react-icons/vsc";

interface TypingSectionProps {
    handleRestart: () => void; 
    difficulty: DifficultyProps;
    setDifficulty: (difficulty: DifficultyProps) => void;
    setTextId: (textId: number) => void;
    currentText: string;
    mode: string; 
    setMode: (mode: string) => void;
    start: boolean;
    setStart: (start: boolean) => void;
    end: boolean;
    setEnd: (end: boolean) => void;
    timeInSec: number;
    setTimeInSec: React.Dispatch<React.SetStateAction<number>>;
    typed: string;
    setTyped: (typed: string) => void;
    setElapsed: React.Dispatch<React.SetStateAction<number>>;
    wpm: number;
    accuracyInPercent: number;
    bestWpm: number; 
    setBestWpm: (bestWpm: number) => void;
}

export default function TypingSection ({ 
                                        handleRestart,
                                        difficulty, setDifficulty,
                                        setTextId,
                                        mode, setMode,
                                        start, setStart, 
                                        end, setEnd,
                                        timeInSec, setTimeInSec,
                                        typed, setTyped,
                                        setElapsed, currentText,
                                        wpm, accuracyInPercent,
                                        bestWpm, setBestWpm
                                    }: TypingSectionProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const activeCharRef = useRef<HTMLSpanElement | null>(null);

    let globalIndex = 0;

    //Logic for starting typing test
    const startTest = () => {
        setStart(true);

        if (mode === 'timed') { 
            setTimeInSec(60); 
        } else { 
            setTimeInSec(0); 
        }

        setTimeout(() => inputRef.current?.focus(), 50);
    };

    //Setting difficlty and random text from that difficulty
    const handleDifficulty = ( diff: DifficultyProps ) => {
        setDifficulty(diff);
        setTextId(Math.floor(Math.random() * 10) + 1);
        localStorage.setItem("difficulty", diff);
    };

    //Setting mode 
    const handleModeChange = (newMode: string) => {
        setMode(newMode);
        if (newMode === 'timed') {
            setTimeInSec(60);
        } else {
            setTimeInSec(0);
        };
        localStorage.setItem("mode", newMode);
    };

    //Logic for typing test to end
    const finishTest = () => {
        setEnd(true);

        if (wpm > bestWpm) {
            setBestWpm(wpm);
            localStorage.setItem("bestWpm", String(wpm));
        }
    };

    //Logic typing
    const handleTyping = (value: string) => {
        if (value.length > currentText.length) return;
        setTyped(value);
    };

    useEffect(() => {
        if (!start || end) return;

        const finishedByTyping = typed.length === currentText.length;
        const finishedByTimer = mode === "timed" && timeInSec === 0;

        if (finishedByTyping || finishedByTimer) {
            finishTest();
        }
    }, [typed, timeInSec, start, end, mode, currentText.length]);

    useEffect(() => {
        if (!start || end) return;

        const interval = setInterval(() => {
            setElapsed(prev => prev + 1);

            setTimeInSec(prev => {
            if (mode === "timed") {
                return prev > 0 ? prev - 1 : 0;
            }
            return prev + 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [start, end, mode]);

    useEffect(() => {
        const el = activeCharRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const topSafeZone = 80;   // px from top where it's allowed
        const bottomSafeZone = 120; // px from bottom where it's allowed

        const isAbove = rect.top < topSafeZone;
        const isBelow = rect.bottom > viewportHeight - bottomSafeZone;

        if (isAbove || isBelow) {
            el.scrollIntoView({
            behavior: "auto",    // or "smooth" if it feels ok
            block: "nearest",     // minimal scroll needed
            inline: "nearest",
            });
        }
    }, [typed]);

    return (
        <div className={`absolute mx-5 lg:mx-15 ${end ? "opacity-0 scale-95 z-0" : "opacity-100 scale-100 z-5"} duration-500`}>
            <TypingSectionItemOne 
                start={start} 
                mode={mode} 
                handleDifficulty={handleDifficulty}
                handleModeChange={handleModeChange} 
                difficulty={difficulty}
                accuracyInPercent={accuracyInPercent}
                wpm={wpm}
                timeInSec={timeInSec}
            />
            <div className="relative py-5">
                <p
                    onClick={() => inputRef.current?.focus()}
                    className="text-[20px] md:text-[35px] leading-[1.2] font-mono flex flex-wrap"
                >
                    {currentText.split(" ").map((word, wordIndex) => {
                        const wordSpans = word.split("").map((char, charIndex) => {
                        const index = globalIndex++;

                        const isActive = index === typed.length;

                        let color = "";
                        if (index < typed.length) {
                            color =
                            typed[index] === char
                                ? "text-[#4cd67a]"
                                : "text-[#d64c5a] decoration-[2px] underline underline-offset-6";
                        } else {
                            color = "text-white";
                        }

                            return (
                                <span key={charIndex} ref={isActive ? activeCharRef : null} className={`${color} duration-300`}>
                                    {char}
                                </span>
                            );
                        });

                        // Handle the space after the word
                        const spaceIndex = globalIndex++;

                        let spaceColor = "";
                        if (spaceIndex < typed.length) {
                            spaceColor =
                                typed[spaceIndex] === " "
                                ? "text-[#4cd67a]"
                                : "text-[#d64c5a] decoration-[2px] underline underline-offset-6";
                        } else {
                            spaceColor = "text-white";
                        }

                        return (
                        <span key={wordIndex} className="whitespace-nowrap flex">
                            {wordSpans}
                            <span className={`${spaceColor} duration-300`}>&nbsp;</span>
                        </span>
                        );
                    })}
                </p>
                <input 
                    ref={inputRef}
                    autoFocus
                    type="text"
                    value={typed}
                    onChange={(e) => handleTyping(e.target.value)}
                    className="absolute opacity-0 pointer-events-none"
                    disabled={!start}
                    aria-hidden='true'
                    tabIndex={-1}
                />
                <div className="py-5 flex items-center justify-center border-t mt-5">
                    <button 
                        type="button"
                        onClick={() => handleRestart()}
                        className="bg-[#262626] group flex gap-2 items-center cursor-pointer px-3 py-2 rounded-[5px]"
                    >
                        Restart Test
                        <VscDebugRestart size={20} className="transition-transform duration-500 group-hover:-rotate-360" />
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
    );
}