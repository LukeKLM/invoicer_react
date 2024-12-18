"use client";
import { useRouter } from 'next/navigation';

export const Button = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push('/')}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
            Home
        </button>
    );
}
