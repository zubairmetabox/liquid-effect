import LiquidHero from "@/components/LiquidHero";

const REPO_URL = "https://github.com/StarKnightt/liquid-effect-animation";

export default function HomePage() {
  return (
    <>
      {/* 1 ─ Hero */}
      <LiquidHero />

      {/* 2 ─ What Is This */}
      <section id="about" className="scroll-mt-16">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            What Is <span className="text-[#38bdf8]">Liquid Effect?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            An interactive liquid distortion effect component for React. Built on
            top of{" "}
            <a href="https://github.com/klevron/threejs-components" target="_blank"
              rel="noopener noreferrer" className="text-[#38bdf8] hover:underline">
              threejs-components
            </a>{" "}
            by{" "}
            <a href="https://codepen.io/soju22" target="_blank"
              rel="noopener noreferrer" className="text-[#38bdf8] hover:underline">
              Kevin Levron
            </a>
            , designed for the shadcn/ui ecosystem.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
            Hover or touch the canvas and watch the text ripple like liquid chrome.
          </p>

          {/* Tech badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {[
              "Three.js",
              "React 19",
              "Next.js 16",
              "Tailwind CSS v4",
              "TypeScript",
              "shadcn/ui",
            ].map((tech) => (
              <span key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-300">
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#38bdf8] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#0a0a0a] transition-all hover:bg-[#7dd3fc] hover:scale-105">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 17.07 3.633 16.7 3.633 16.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* 3 ─ How It Works */}
      <section id="how-it-works" className="scroll-mt-16 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-500">
            Four-step pipeline from text to liquid chrome.
          </p>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Offscreen Canvas",
                desc: "Text is rendered onto an offscreen <canvas> at the device\u2019s native pixel ratio (HiDPI-ready).",
              },
              {
                step: "02",
                title: "Ambient Gradients",
                desc: "Soft ambient lighting gradients are painted into the background to give the liquid surface something to reflect.",
              },
              {
                step: "03",
                title: "Three.js Liquid Plane",
                desc: "The rendered image is passed to threejs-components/liquid1 which creates a Three.js scene with a liquid plane mesh.",
              },
              {
                step: "04",
                title: "Mouse / Touch Ripple",
                desc: "Mouse and touch interaction displaces the liquid surface in real time, creating the ripple distortion effect.",
              },
            ].map((item) => (
              <div key={item.step}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#38bdf8]/30">
                <span className="text-4xl font-black text-[#38bdf8]/20">
                  {item.step}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 ─ Props / API */}
      <section id="api" className="scroll-mt-16 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Props &amp; API
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
            Drop it in as a single React component.
          </p>

          <div className="mt-12 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03]">
                <tr>
                  <th className="px-6 py-3 font-semibold text-[#38bdf8]">Prop</th>
                  <th className="px-6 py-3 font-semibold text-[#38bdf8]">Type</th>
                  <th className="px-6 py-3 font-semibold text-[#38bdf8]">Default</th>
                  <th className="px-6 py-3 font-semibold text-[#38bdf8]">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { prop: "text", type: "string[]", def: '["Liquid", "Effect"]', desc: "Array of lines for the heading" },
                  { prop: "subText", type: "string", def: '"Interactive UI Component"', desc: "Smaller text above the heading" },
                  { prop: "tagline", type: "string", def: '"Built with Three.js…"', desc: "Tagline text below the heading" },
                  { prop: "backgroundColor", type: "string", def: '"#fafafa"', desc: "Background colour of the canvas" },
                  { prop: "textColor", type: "string", def: '"#1d1d1f"', desc: "Colour of the heading text" },
                ].map((row) => (
                  <tr key={row.prop} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-3 font-mono text-[#38bdf8]">{row.prop}</td>
                    <td className="px-6 py-3 font-mono text-slate-400">{row.type}</td>
                    <td className="px-6 py-3 font-mono text-slate-500">{row.def}</td>
                    <td className="px-6 py-3 text-slate-400">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5 ─ Customization */}
      <section className="scroll-mt-16 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Customization
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
            Tweak the liquid behaviour by modifying these values inside the component.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Liquid parameters */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">
                Liquid Parameters
              </h3>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <pre className="overflow-x-auto text-sm leading-relaxed">
                  <code className="text-slate-300">
                    {`app.liquidPlane.material.metalness = 0.35;
// 0-1, higher = more reflective

app.liquidPlane.material.roughness = 0.45;
// 0-1, lower = sharper reflections

app.liquidPlane.uniforms.displacementScale.value = 2;
// ripple intensity

app.setRain(false);
// set true for auto-ripple rain effect`}
                  </code>
                </pre>
              </div>
            </div>

            {/* Image mode */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">
                Background Image Mode
              </h3>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <pre className="overflow-x-auto text-sm leading-relaxed">
                  <code className="text-slate-300">
                    {`// Replace generateTextImage() with
// a direct image URL:

app.loadImage('/your-image.jpg');

// Place the image in your /public folder.
// Any image works — photos, logos,
// gradients, illustrations.`}
                  </code>
                </pre>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                No additional npm dependencies required. The Three.js liquid
                renderer is loaded from a CDN at runtime.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 7 ─ Code Examples */}
      <section id="examples" className="scroll-mt-16 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Code Examples
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
            Drop-in usage patterns straight from the README.
          </p>

          <div className="mt-12 space-y-8">
            <CodeExample title="Dark Mode" code={`<LiquidEffectAnimation
  text={["Hello", "World"]}
  subText="Dark Theme"
  tagline="Sleek and minimal"
  backgroundColor="#0a0a0a"
  textColor="#ffffff"
/>`} />
            <CodeExample title="Single Line Heading" code={`<LiquidEffectAnimation
  text={["Portfolio"]}
  subText="John Doe"
  tagline="Design • Code • Create"
/>`} />
            <CodeExample title="Custom Colours" code={`<LiquidEffectAnimation
  text={["Launch", "Soon"]}
  subText="Coming 2026"
  tagline=""
  backgroundColor="#0f172a"
  textColor="#e2e8f0"
/>`} />
          </div>
        </div>
      </section>

      {/* 8 ─ Browser Support */}
      <section className="scroll-mt-16 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Browser Support
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
            Works in all modern browsers that support WebGL.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { name: "Chrome / Edge", version: "80+" },
              { name: "Firefox", version: "80+" },
              { name: "Safari", version: "15+" },
              { name: "Mobile (iOS / Android)", version: "✓" },
            ].map((b) => (
              <div key={b.name}
                className="flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
                <span className="text-2xl font-black text-[#38bdf8]">
                  {b.version}
                </span>
                <span className="mt-2 text-sm text-slate-400">
                  {b.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 ─ Credits & License */}
      <section className="scroll-mt-16 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Credits &amp; License
          </h2>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-base leading-relaxed text-slate-400">
              The liquid distortion effect is powered by{" "}
              <a href="https://github.com/klevron/threejs-components"
                target="_blank" rel="noopener noreferrer"
                className="text-[#38bdf8] hover:underline">
                threejs-components
              </a>
              , created by{" "}
              <a href="https://codepen.io/soju22" target="_blank"
                rel="noopener noreferrer"
                className="text-[#38bdf8] hover:underline">
                Kevin Levron (@soju22)
              </a>
              . The original liquid shader and Three.js implementation are entirely
              his work. This project wraps it into a React component with text
              rendering, customizable props, and shadcn/ui integration.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
              <a href="https://codepen.io/soju22/pen/myVWBGa" target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors">
                Original CodePen ↗
              </a>
              <span className="text-slate-700">·</span>
              <a href="https://www.npmjs.com/package/threejs-components" target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors">
                npm ↗
              </a>
              <span className="text-slate-700">·</span>
              <a href="https://www.framer.com/@kevin-levron/" target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors">
                Kevin Levron on Framer ↗
              </a>
            </div>

            <p className="mt-6 text-sm font-semibold text-[#38bdf8]">
              MIT License
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Code Example Block ── */

function CodeExample({ title, code }: { title: string; code: string }) {
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <div className="border-b border-white/10 bg-white/[0.03] px-5 py-3">
        <span className="text-sm font-semibold text-white">{title}</span>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed">
        <code className="text-slate-300">{code}</code>
      </pre>
    </div>
  );
}
