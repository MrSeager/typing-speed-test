//Components
import Image from "next/image";

export default function HeaderNav () {
    return(
        <header className="max-w-[12orem] w-full px-15">
            <nav className="w-full flex items-center justify-between">
                <Image 
                    src={'/images/logo-large.svg'}
                    alt="logo"
                    width={200}
                    height={50}
                />
                <div className="flex gap-2">
                    <Image 
                    src={'/images/icon-personal-best.svg'}
                    alt="best"
                    width={25}
                    height={25}
                    />
                    <h1 className="text-[#727279]">Personal best: <span className="text-lg text-white">92 WPM</span></h1>
                </div>
            </nav>
        </header>
    );
}