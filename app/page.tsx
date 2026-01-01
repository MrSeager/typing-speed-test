//Components
import HeaderNav from "@/components/HeaderNav";
import MainPage from "@/components/MainPage";
import typingData from "@/public/data/data.json";
//Types
import { DifficultyData } from "@/types/types";

export default function Home() {
  const data: DifficultyData = typingData;

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center bg-[hsl(0, 0%, 7%)] font-sans">
      <HeaderNav />
      <MainPage 
        data={data}
      />
    </div>
  );
}
