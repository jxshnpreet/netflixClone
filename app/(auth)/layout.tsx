import { ReactNode } from "react";
import Image from "next/image";
import BgImg from "../../public/login_background.jpg";
import logo from "../../public/netflix_logo.svg";

export default function AuthLayout({children}: {children: ReactNode}) {
    return (
        <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
            <Image src={BgImg} alt="bg img" className="hidden sm:flex sm:object-cover -z-10 brightness-50"
            priority
            fill 
            />

            <Image src={logo} alt="Logo"
            width={120} height={120} className="absolute left-4 object-contain md:left-10 md: top-6" 
            priority
            />
            {children}
        </div>
    )
}