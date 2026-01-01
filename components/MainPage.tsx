'use client'
//Components
import { useState } from "react";
//Types
import { DifficultyData, TextItem, DifficultyProps } from "@/types/types";

interface MainPageProps {
    data: DifficultyData;
}

export default function MainPage ({ data }: MainPageProps) {
    const [difficulty, setDifficulty] = useState<DifficultyProps>('easy');
    const [textId, setTextId] = useState<number>(1);

    const currentText = data[difficulty].find(
        (item: TextItem) => item.id === `${difficulty}-${textId}`
    )?.text;

    return (
        <main className="max-w-[12orem] w-full px-15">
            <div className="flex items-center justify-between border-b">
                <div className="flex gap-3">
                    <h2>WPM: <span>40</span></h2>
                    <h2>Accuracy: <span>94%</span></h2>
                    <h2>Time: <span>0:46</span></h2>
                </div>
                <div className="flex gap-3">
                    <div className="flex gap-2">
                        <h2>Difficulty:</h2>
                        <button type="button">Easy</button>
                        <button type="button">Medium</button>
                        <button type="button">Hard</button>
                    </div>
                    <div className="flex gap-2">
                        <h2>Mode:</h2>
                        <button type="button">Timed(60s)</button>
                        <button type="button">Passage</button>
                    </div>
                </div>
            </div>
            <div>{currentText}</div>
        </main>
    );
}