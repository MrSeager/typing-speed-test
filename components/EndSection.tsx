//Components
import Image from "next/image";
//Icons
import { VscDebugRestart } from "react-icons/vsc";

interface EndSectionProps {
    end: boolean;
    wpm: number;
    accuracy: number;
    timeInSec?: number | null;
    symbolsRight: number;
    symbolsSum: number;
    handleRestart: () => void;
    mode: string;
    currentBestWpm: number | null;
}

export default function EndSection ({ 
                                        mode, end, wpm, accuracy, 
                                        timeInSec = null, 
                                        symbolsRight, symbolsSum, 
                                        handleRestart, currentBestWpm 
                                    }: EndSectionProps) {
    //Lines for last messages
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

    //Logic for last message
    const getEndMessage = () => {
        if (currentBestWpm === null || currentBestWpm === 0)
            return endLines.firstTime;
        
        if (wpm > currentBestWpm)
            return endLines.higerScore;

        return endLines.lowerScore;
    };

    const endMessages = getEndMessage();

    return (
        <div className={`absolute inset-0 w-full ${end ? "opacity-100 scale-100 py-15 z-5 top-0 " : "opacity-0 scale-95 py-0 z-0"} flex flex-col gap-5 items-center justify-center overflow-hidden`}>
            <div className="relative">
                <span className={`absolute z-0 inline-flex h-full w-full animate-ping rounded-full ${currentBestWpm === null || currentBestWpm === 0 || wpm < currentBestWpm ? 'bg-[#4cd67a]' : 'bg-[#f4dc71]'} opacity-75`}></span>
                {currentBestWpm === null || currentBestWpm === 0 || wpm < currentBestWpm ?
                    <Image 
                        src={"/images/icon-completed.svg"}
                        alt="completed"
                        width={50}
                        height={50}
                    /> 
                    :
                    <Image 
                        src={"/images/icon-new-pb.svg"}
                        alt="completed"
                        width={50}
                        height={50}
                    />
                }
            </div>
            <h3 className="text-[30px] font-bold text-center text-base/7">
                {endMessages[0]}
            </h3>
            <p className="text-base/5 text-[#727279]">{endMessages[1]}</p>
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
                className="bg-white group flex gap-2 items-center border border-white text-[#262626] font-bold rounded px-4 py-2 duration-500
                            hover:bg-transparent hover:text-white
                            active:bg-transparent active:text-white"
            >
                {endMessages[2]}
                <VscDebugRestart size={20} className="transition-transform duration-500 group-hover:-rotate-360" />
            </button>
            {currentBestWpm === null || currentBestWpm === 0 || wpm < currentBestWpm ? 
                (
                    <span>
                        <Image 
                            src={'/images/pattern-star-1.svg'}
                            alt="bg star"
                            width={50}
                            height={50}
                            className="absolute top-70 right-50"
                        />
                        <Image 
                            src={'/images/pattern-star-2.svg'}
                            alt="bg star"
                            width={50}
                            height={50}
                            className="absolute top-30 left-50"
                        />
                    </span>
                ) : (
                    <Image 
                        src={'/images/pattern-confetti.svg'}
                        alt="bg star"
                        width={2000}
                        height={500}
                        className="absolute bottom-0 z-[-5]"
                    />
                )
            }
        </div>
    );
}