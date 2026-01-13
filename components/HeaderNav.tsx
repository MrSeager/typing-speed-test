'use client';
//Components
import { useState } from "react";
import Image from "next/image";

interface HeaderNavProps {
    bestWpm: number
}

export default function HeaderNav ({ bestWpm }: HeaderNavProps) {
    return(
        <header className="max-w-[120rem] w-full px-5 lg:px-15">
            <nav className="hidden w-full md:flex items-center justify-between">
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
                    <h1 className="text-[#727279]">Personal best: <span className="text-lg text-white">{bestWpm} WPM</span></h1>
                </div>
            </nav>
            <nav className="w-full flex md:hidden items-center justify-between">
                <Image 
                    src={'/images/logo-small.svg'}
                    alt="logo"
                    width={50}
                    height={50}
                />
                <div className="flex gap-2">
                    <Image 
                    src={'/images/icon-personal-best.svg'}
                    alt="best"
                    width={25}
                    height={25}
                    />
                    <h1 className="text-[#727279]">Best: <span className="text-lg text-white">{bestWpm} WPM</span></h1>
                </div>
            </nav>
        </header>
    );
}