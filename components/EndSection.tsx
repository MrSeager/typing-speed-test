//Components
import Image from "next/image";

interface EndSectionProps {
    end: boolean;
    wpm: number;
    accuracy: number;
    timeInSec?: number | null;
    symbolsRight: number;
    symbolsSum: number;
    handleRestart: () => void;
    mode: string;
}

export default function EndSection ({ mode, end, wpm, accuracy, timeInSec = null, symbolsRight, symbolsSum, handleRestart }: EndSectionProps) {
    const endLines = {
        firstTime: [
            'Baseline Established',
            "You've set the bar. Now the real challenge begins-time to beat it.",
            'Beat This Score'
        ],
        higerScore: [
            'High Score Smashed!',
            "You've getting faster. That was incredible typing.",
            'Beat This Score'
        ],
        lowerScore: [
            'Test Completed!',
            "Solid run. Keep pushing to beat your high score.",
            'Go Again'
        ]
    }

    return (
        <div className={`${end === true ? 'h-full py-15' : 'h-0 py-0'} flex flex-col gap-5 items-center justify-center overflow-hidden`}>
            <div className="relative">
                <span className="absolute z-0 inline-flex h-full w-full animate-ping rounded-full bg-[#4cd67a] opacity-75"></span>
                <Image 
                    src={"/images/icon-completed.svg"}
                    alt="completed"
                    width={50}
                    height={50}
                />
            </div>
            <h3 className="text-[30px] font-bold text-center text-base/7">{endLines.firstTime[0]}</h3>
            <p className="text-base/5 text-[#727279]">{endLines.firstTime[1]}</p>
            <div className={`grid ${mode === 'timed' ? 'grid-cols-3' : 'grid-cols-4'} gap-4`}>
                <div className="border border-[#262626] rounded rounded-[10px] px-4 py-2">
                    <h4 className="text-[#727279]">WPM:</h4>
                    <h4 className="font-bold text-lg">{wpm}</h4>
                </div>
                <div className="border border-[#262626] rounded rounded-[10px] px-4 py-2">
                    <h4 className="text-[#727279]">Accuracy:</h4>
                    <h4 className="text-[#d64c5a] font-bold text-lg">{accuracy}%</h4>
                </div>
                <div className="border border-[#262626] rounded rounded-[10px] px-4 py-2">
                    <h4 className="text-[#727279]">Characters:</h4>
                    <h4 className="font-bold text-[#727279] text-lg">
                        <span className="text-[#4cd67a]">{symbolsRight}</span>
                        /
                        <span className="text-[#d64c5a]">{symbolsSum}</span>
                    </h4>
                </div>
                {mode === 'passage' && timeInSec !== null ?
                    <div className="border border-[#262626] rounded rounded-[10px] px-4 py-2">
                        <h4 className="text-[#727279]">Time:</h4>
                        <h4 className="font-bold text-[#727279] text-lg">
                            <span className="text-[#4cd67a]">{Math.floor(timeInSec / 60)}:{String(timeInSec % 60).padStart(2, "0")}</span>
                        </h4>
                    </div>
                    : ''
                }
            </div>
            <button 
                type="button"
                onClick={() => handleRestart()}
                className="bg-white border border-white text-[#262626] font-bold rounded px-4 py-2 duration-500
                            hover:bg-transparent hover:text-white
                            active:bg-transparent active:text-white"
            >
                {endLines.firstTime[2]}
            </button>
        </div>
    );
}