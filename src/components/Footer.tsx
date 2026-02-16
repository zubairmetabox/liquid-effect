const REPO_URL = "https://github.com/StarKnightt/liquid-effect-animation";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#0a0a0a]">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-4 text-center">
                    <span className="text-lg font-extrabold tracking-tight text-white">
                        Liquid<span className="text-[#38bdf8]">Effect</span>
                    </span>

                    <p className="max-w-md text-sm text-slate-500">
                        An interactive liquid distortion effect component for React.
                        Built on{" "}
                        <a
                            href="https://github.com/klevron/threejs-components"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#38bdf8] hover:underline"
                        >
                            threejs-components
                        </a>{" "}
                        by Kevin Levron.
                    </p>

                    <div className="flex items-center gap-4">
                        <a
                            href={REPO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
                        >
                            GitHub Repository
                        </a>
                        <span className="text-slate-700">·</span>
                        <a
                            href="https://www.npmjs.com/package/threejs-components"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
                        >
                            npm
                        </a>
                        <span className="text-slate-700">·</span>
                        <a
                            href="https://codepen.io/soju22/pen/myVWBGa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
                        >
                            Original CodePen
                        </a>
                    </div>

                    <p className="mt-4 text-xs text-slate-600">
                        MIT License &copy; {new Date().getFullYear()} &mdash;
                        Built to showcase liquid-effect-animation
                    </p>
                    <p className="mt-2 text-xs text-slate-600">
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
            </div>
        </footer>
    );
}
