export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#0a0a0a]">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <p className="text-center text-xs text-slate-500 sm:text-sm">
                    Page built by{" "}
                    <a
                        href="https://metabox.mu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#38bdf8] hover:underline"
                    >
                        metabox.mu
                    </a>
                </p>
            </div>
        </footer>
    );
}
