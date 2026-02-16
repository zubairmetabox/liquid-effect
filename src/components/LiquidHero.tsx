"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import EffectControls from "./EffectControls";

declare global {
    interface Window {
        __liquidHeroApp?: {
            dispose?: () => void;
            loadImage?: (url: string) => void;
        };
        __liquidHeroRegenerate?: (opts?: {
            bgColor?: string;
            textColor?: string;
            accentColor?: string;
            glowColor?: string;
        }) => void;
    }
}

export default function LiquidHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const initializedRef = useRef(false);
    const [panelOpen, setPanelOpen] = useState(false);

    const generateTextImage = useCallback(
        (opts?: {
            bgColor?: string;
            textColor?: string;
            accentColor?: string;
            glowColor?: string;
        }) => {
            const bgColor = opts?.bgColor ?? "#0a0a0a";
            const textColor = opts?.textColor ?? "#ffffff";
            const accentColor = opts?.accentColor ?? "#38bdf8";
            const glowColor = opts?.glowColor ?? accentColor;

            const dpr = window.devicePixelRatio || 1;
            const offscreen = document.createElement("canvas");
            const w = window.innerWidth;
            const h = window.innerHeight;
            offscreen.width = w * dpr;
            offscreen.height = h * dpr;
            const ctx = offscreen.getContext("2d");
            if (!ctx) return null;

            ctx.scale(dpr, dpr);

            /* Background */
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, w, h);

            /* Ambient glow */
            ctx.globalCompositeOperation = "screen";

            const glow1 = ctx.createRadialGradient(
                w * 0.25, h * 0.35, 0,
                w * 0.25, h * 0.35, w * 0.55
            );
            glow1.addColorStop(0, hexToRgba(glowColor, 0.14));
            glow1.addColorStop(1, hexToRgba(bgColor, 0));
            ctx.fillStyle = glow1;
            ctx.fillRect(0, 0, w, h);

            const glow2 = ctx.createRadialGradient(
                w * 0.75, h * 0.65, 0,
                w * 0.75, h * 0.65, w * 0.5
            );
            glow2.addColorStop(0, hexToRgba(glowColor, 0.1));
            glow2.addColorStop(1, hexToRgba(bgColor, 0));
            ctx.fillStyle = glow2;
            ctx.fillRect(0, 0, w, h);

            ctx.globalCompositeOperation = "source-over";

            /* Sub-text */
            ctx.fillStyle = textColor;
            ctx.globalAlpha = 0.35;
            const subFontSize = Math.max(10, Math.min(w * 0.011, 16));
            ctx.font = `600 ${subFontSize}px "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
            ctx.textAlign = "center";
            ctx.letterSpacing = "0.25em";
            ctx.fillText("INTERACTIVE UI COMPONENT", w / 2, h / 2 - w * 0.1);

            /* Main heading */
            ctx.globalAlpha = 1;
            ctx.letterSpacing = "-0.03em";
            const fontSize = Math.min(w * 0.11, h * 0.16, 140);
            ctx.font = `800 ${fontSize}px "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
            ctx.textBaseline = "middle";

            const lines = ["Liquid", "Effect"];
            const lineHeight = fontSize * 1.1;
            const totalHeight = lines.length * lineHeight;
            const startY = h / 2 - totalHeight / 2 + lineHeight / 2;

            lines.forEach((line, i) => {
                ctx.fillStyle = i === 0 ? textColor : accentColor;
                ctx.globalAlpha = 1;
                ctx.fillText(line, w / 2, startY + i * lineHeight);
            });

            /* Divider */
            ctx.globalAlpha = 0.15;
            ctx.fillStyle = accentColor;
            const dividerY = startY + lines.length * lineHeight + w * 0.018;
            ctx.fillRect(w / 2 - 40, dividerY, 80, 1);

            /* Tagline */
            ctx.globalAlpha = 0.35;
            ctx.letterSpacing = "0.04em";
            const tagFontSize = Math.max(10, Math.min(w * 0.012, 16));
            ctx.font = `400 ${tagFontSize}px "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
            ctx.fillStyle = textColor;
            ctx.fillText(
                "Built with Three.js \u2022 React \u2022 Tailwind CSS",
                w / 2,
                dividerY + w * 0.03
            );

            return offscreen.toDataURL("image/png");
        },
        []
    );

    useEffect(() => {
        if (!canvasRef.current || initializedRef.current) return;
        initializedRef.current = true;

        const dataUrl = generateTextImage();
        if (!dataUrl) return;

        window.__liquidHeroRegenerate = (opts) => {
            const newUrl = generateTextImage(opts);
            if (newUrl && window.__liquidHeroApp?.loadImage) {
                window.__liquidHeroApp.loadImage(newUrl);
            }
        };

        const script = document.createElement("script");
        script.type = "module";
        script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.30/build/backgrounds/liquid1.min.js';

      const canvas = document.getElementById('liquid-hero-canvas');
      if (canvas) {
        const app = LiquidBackground(canvas);
        app.loadImage('${dataUrl}');
        app.liquidPlane.material.metalness = 0.3;
        app.liquidPlane.material.roughness = 0.5;
        app.liquidPlane.uniforms.displacementScale.value = 2.5;
        app.setRain(false);
        window.__liquidHeroApp = app;
      }
    `;
        document.body.appendChild(script);

        return () => {
            if (window.__liquidHeroApp?.dispose) {
                window.__liquidHeroApp.dispose();
            }
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
            delete window.__liquidHeroRegenerate;
            initializedRef.current = false;
        };
    }, [generateTextImage]);

    return (
        <section id="hero" className="relative h-screen overflow-hidden">
            <canvas
                ref={canvasRef}
                id="liquid-hero-canvas"
                className="absolute inset-0 w-full h-full touch-none"
            />

            {/* Controls toggle button */}
            <button
                onClick={() => setPanelOpen((v) => !v)}
                className="absolute top-20 right-4 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[11px] font-semibold text-white/80 backdrop-blur-xl transition-all hover:bg-black/60 hover:text-white sm:px-4 sm:py-2 sm:text-xs"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                {panelOpen ? "Hide Controls" : "Customize"}
            </button>

            {/* Slide-in controls panel */}
            <div
                className={`absolute top-16 right-0 z-10 h-[calc(100vh-4rem)] w-[280px] transform transition-transform duration-300 ease-out sm:w-[340px] ${panelOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="h-full overflow-y-auto border-l border-white/10 bg-black/70 p-4 backdrop-blur-2xl sm:p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 sm:text-sm">
                            Live Controls
                        </h3>
                        <button
                            onClick={() => setPanelOpen(false)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/50 transition-colors hover:bg-white/20 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>
                    <EffectControls />
                </div>
            </div>


        </section>
    );
}

function hexToRgba(hex: string, alpha: number): string {
    const n = parseInt(hex.replace("#", ""), 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
