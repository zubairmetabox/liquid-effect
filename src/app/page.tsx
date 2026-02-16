import LiquidHero from "@/components/LiquidHero";

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <LiquidHero />

      {/* 2 — What Is This */}
      <section id="about" className="scroll-mt-16">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            What Is <span className="text-[#38bdf8]">Liquid Effect?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            An interactive liquid distortion effect component for React. Hover
            or touch the canvas and watch the text ripple like liquid chrome.
          </p>

          {/* Tech badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              "Three.js",
              "React 19",
              "Next.js 16",
              "Tailwind CSS v4",
              "TypeScript",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-300 sm:px-4 sm:py-1.5 sm:text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
