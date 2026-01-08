'use client';
//Components
import { useState, useEffect } from "react";
import HeaderNav from "@/components/HeaderNav";
import MainPage from "@/components/MainPage";
import typingData from "@/public/data/data.json";
//Types
import { DifficultyData } from "@/types/types";

export default function Home() {
  const data: DifficultyData = typingData;
  const [bestWpm, setBestWpm] = useState<number>(0);

  useEffect(() => {
      const saved = localStorage.getItem("bestWpm");
      if (saved) {
          setBestWpm(Number(saved));
      }
  }, []);

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-start py-5 bg-[hsl(0, 0%, 7%)] font-sans">
      <HeaderNav 
        bestWpm={bestWpm}
      />
      <MainPage 
        data={data}
        bestWpm={bestWpm}
        setBestWpm={setBestWpm}
      />
    </div>
  );
}
