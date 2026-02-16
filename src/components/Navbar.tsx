import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-extrabold tracking-tight text-white">
                        Liquid<span className="text-[#38bdf8]">Effect</span>
                    </span>
                </Link>
            </div>
        </nav>
    );
}
