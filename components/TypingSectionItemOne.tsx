'use client'
//Components
import { useState } from "react";
//Types
import { DifficultyData, DifficultyProps } from "@/types/types";

interface TypingSectionItemOneProps {
    start: boolean;
    mode: string; 
    handleDifficulty: (difficulty: DifficultyProps) => void;
    handleModeChange: (mode: string) => void;
    difficulty: DifficultyProps; 
    accuracyInPercent: number;
    wpm: number; 
    timeInSec: number;
}

export default function TypingSectionItemOne ({ start, mode, handleDifficulty, handleModeChange, difficulty, accuracyInPercent, wpm, timeInSec }: TypingSectionItemOneProps) {
    const [openDiff, setOpenDiff] = useState<boolean>(false);
    const [openMode, setOpenMode] = useState<boolean>(false);
    
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between border-b py-5 gap-5">
            <div className="flex lg:gap-3">
                <h2 className="text-[#727279] flex flex-col items-center border-r px-3
                                lg:flex-row lg:gap-1 lg:border-none lg:px-0"
                >
                    WPM: <span className="text-white text-lg font-semibold">{wpm}</span>
                </h2>
                <h2 className="text-[#727279] flex flex-col items-center border-r px-3
                                lg:flex-row lg:gap-1 lg:border-none lg:px-0"
                >
                    Accuracy: <span className={`${accuracyInPercent === 100 ? 'text-[#4cd67a]' : 'text-[#d64c5a]'} duration-500 text-lg font-semibold`}>{accuracyInPercent}%</span>
                </h2>
                <h2 className="text-[#727279] flex flex-col items-center px-3
                                lg:flex-row lg:gap-1 lg:px-0"
                >
                    Time: <span className="text-white text-lg font-semibold">{Math.floor(timeInSec / 60)}:{String(timeInSec % 60).padStart(2, "0")}</span>
                </h2>
            </div>
            <div className="flex gap-3">
                {/*Desktop*/}
                <div className="hidden lg:flex gap-2">
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

                {/*Mobile*/}
                <div className="lg:hidden relative">
                    {/* Trigger */}
                    <button type="button" disabled={start === true} onClick={() => setOpenDiff((prev) => !prev)}
                        className="min-w-[100px] w-full bg-transparent border rounded-[10px] px-3 py-2 text-white flex justify-between items-center"
                    >
                        <span className="capitalize">{difficulty}</span>

                        {/* Custom arrow */}
                        <span className="text-white text-sm">▼</span>
                    </button>

                    {/* Dropdown */}
                    {openDiff && (
                        <div className="absolute left-0 right-0 mt-1 bg-[#1a1a1a] border rounded-[10px] shadow-lg z-10">
                        <div onClick={() => { handleDifficulty("easy"); setOpenDiff(false); }}
                            className="px-3 py-2 text-white hover:bg-[#333] cursor-pointer"
                        >
                            {difficulty === "easy" ? "● Easy" : "○ Easy"}
                        </div>

                        <div onClick={() => { handleDifficulty("medium"); setOpenDiff(false); }}
                            className="px-3 py-2 text-white hover:bg-[#333] cursor-pointer"
                        >
                            {difficulty === "medium" ? "● Medium" : "○ Medium"}
                        </div>

                        <div onClick={() => { handleDifficulty("hard"); setOpenDiff(false); }}
                            className="px-3 py-2 text-white hover:bg-[#333] cursor-pointer"
                        >
                            {difficulty === "hard" ? "● Hard" : "○ Hard"}
                        </div>
                    </div>
                )}
                </div>

                {/*Desktop*/}
                <div className="hidden lg:flex gap-2">
                    <h2 className="text-[#727279]">Mode:</h2>
                    <button 
                        type="button"
                        onClick={() => handleModeChange('timed')}
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
                        onClick={() => handleModeChange('passage')}
                        disabled={start === true}
                        className={`${mode === 'passage' ? 'outline-[#4da6ff]' : 'outline-transparent'} 
                                    cursor-pointer outline-2 outline-offset-3 rounded-[10px] px-2 border border-[#727279] duration-500
                                    hover:border-white
                                    focus:border-[#4da6ff] focus:text-[#4da6ff]`}
                    >
                        Passage
                    </button>
                </div>
                
                {/*Mobile*/}
                <div className="lg:hidden relative">
                    {/* Trigger */}
                    <button type="button" disabled={start === true} onClick={() => setOpenMode((prev) => !prev)}
                        className="min-w-[140px] w-full bg-transparent border rounded-[10px] px-3 py-2 text-white flex justify-between items-center"
                    >
                        <span className="capitalize">{mode}</span>

                        {/* Custom arrow */}
                        <span className="text-white text-sm">▼</span>
                    </button>

                    {/* Dropdown */}
                    {openMode && (
                        <div className="absolute left-0 right-0 mt-1 bg-[#1a1a1a] border rounded-[10px] shadow-lg z-10">
                        <div onClick={() => { handleModeChange("timed"); setOpenMode(false); }}
                            className="px-3 py-2 text-white hover:bg-[#333] cursor-pointer"
                        >
                            {mode === "timed" ? "● Timed(60s)" : "○ Timed(60s)"}
                        </div>

                        <div onClick={() => { handleModeChange("passage"); setOpenMode(false); }}
                            className="px-3 py-2 text-white hover:bg-[#333] cursor-pointer"
                        >
                            {mode === "passage" ? "● Passage" : "○ Passage"}
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}