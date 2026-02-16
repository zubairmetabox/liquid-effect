"use client";

import { useState, useCallback, useRef } from "react";

/* ── Types ── */

interface ControlValue {
    metalness: number;
    roughness: number;
    displacement: number;
    rain: boolean;
    reflectionStrength: number;
    bgColor: string;
    textColor: string;
    accentColor: string;
    glowColor: string;
}

interface LiquidApp {
    liquidPlane: {
        material: {
            metalness: number;
            roughness: number;
            envMapIntensity: number;
        };
        uniforms: { displacementScale: { value: number } };
    };
    setRain: (v: boolean) => void;
}

/* ── Defaults ── */

const DEFAULTS: ControlValue = {
    metalness: 0.3,
    roughness: 0.5,
    displacement: 2.5,
    rain: false,
    reflectionStrength: 1,
    bgColor: "#0a0a0a",
    textColor: "#ffffff",
    accentColor: "#38bdf8",
    glowColor: "#38bdf8",
};

const TIPS: Record<string, string> = {
    metalness: "0 = matte, 1 = chrome mirror.",
    roughness: "Low = sharp reflections, High = frosted.",
    displacement: "Ripple wave intensity on hover/touch.",
    rain: "Auto-ripple rain effect.",
    reflectionStrength: "Environment reflection brightness.",
    bgColor: "Hero canvas background.",
    textColor: "Main heading colour.",
    accentColor: "Accent text & divider colour.",
    glowColor: "Radial glow behind text.",
};

const PRESETS: { name: string; emoji: string; values: Partial<ControlValue> }[] = [
    { name: "Default", emoji: "⚪", values: { ...DEFAULTS } },
    {
        name: "Chrome Ocean", emoji: "🌊",
        values: {
            metalness: 0.9, roughness: 0.1, displacement: 4, reflectionStrength: 2,
            rain: true, bgColor: "#020617", textColor: "#e2e8f0",
            accentColor: "#22d3ee", glowColor: "#0891b2",
        },
    },
    {
        name: "Warm Sunset", emoji: "🌅",
        values: {
            metalness: 0.5, roughness: 0.3, displacement: 3, reflectionStrength: 1.5,
            rain: false, bgColor: "#1c1917", textColor: "#fef3c7",
            accentColor: "#f97316", glowColor: "#dc2626",
        },
    },
    {
        name: "Neon Pulse", emoji: "💜",
        values: {
            metalness: 0.7, roughness: 0.2, displacement: 5, reflectionStrength: 2.5,
            rain: true, bgColor: "#0a0a0a", textColor: "#ffffff",
            accentColor: "#a855f7", glowColor: "#ec4899",
        },
    },
    {
        name: "Calm Lake", emoji: "🏔️",
        values: {
            metalness: 0.15, roughness: 0.7, displacement: 1, reflectionStrength: 0.5,
            rain: false, bgColor: "#0c1524", textColor: "#cbd5e1",
            accentColor: "#6366f1", glowColor: "#4338ca",
        },
    },
];

/* ── Main Component ── */

export default function EffectControls() {
    const [values, setValues] = useState<ControlValue>(DEFAULTS);
    const [copied, setCopied] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const getApp = (): LiquidApp | undefined =>
        (window as unknown as Record<string, unknown>)
            .__liquidHeroApp as LiquidApp | undefined;

    const apply = useCallback(
        (next: ControlValue, regenerate = false) => {
            setValues(next);
            const app = getApp();
            if (app) {
                app.liquidPlane.material.metalness = next.metalness;
                app.liquidPlane.material.roughness = next.roughness;
                app.liquidPlane.material.envMapIntensity = next.reflectionStrength;
                app.liquidPlane.uniforms.displacementScale.value = next.displacement;
                app.setRain(next.rain);
            }
            if (regenerate) {
                if (debounceRef.current) clearTimeout(debounceRef.current);
                debounceRef.current = setTimeout(() => {
                    window.__liquidHeroRegenerate?.({
                        bgColor: next.bgColor,
                        textColor: next.textColor,
                        accentColor: next.accentColor,
                        glowColor: next.glowColor,
                    });
                }, 120);
            }
        },
        []
    );

    const updateMaterial = <K extends keyof ControlValue>(
        key: K, value: ControlValue[K]
    ) => apply({ ...values, [key]: value }, false);

    const updateColor = <K extends keyof ControlValue>(
        key: K, value: ControlValue[K]
    ) => apply({ ...values, [key]: value }, true);

    const reset = () => apply({ ...DEFAULTS }, true);
    const applyPreset = (preset: Partial<ControlValue>) =>
        apply({ ...values, ...preset }, true);

    const copyConfig = () => {
        const config = {
            metalness: values.metalness,
            roughness: values.roughness,
            displacementScale: values.displacement,
            reflectionStrength: values.reflectionStrength,
            rain: values.rain,
            bgColor: values.bgColor,
            textColor: values.textColor,
            accentColor: values.accentColor,
            glowColor: values.glowColor,
        };
        navigator.clipboard.writeText(JSON.stringify(config, null, 2)).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="space-y-5">
            {/* Presets */}
            <div>
                <SectionLabel>Presets</SectionLabel>
                <div className="flex flex-wrap gap-1.5">
                    {PRESETS.map((p) => (
                        <button
                            key={p.name}
                            onClick={() => applyPreset(p.values)}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300 transition-colors hover:bg-[#38bdf8]/20 hover:text-white"
                        >
                            {p.emoji} {p.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Surface */}
            <div>
                <SectionLabel>Surface</SectionLabel>
                <SliderControl label="Metalness" tip={TIPS.metalness}
                    value={values.metalness} min={0} max={1} step={0.01}
                    onChange={(v) => updateMaterial("metalness", v)} />
                <SliderControl label="Roughness" tip={TIPS.roughness}
                    value={values.roughness} min={0} max={1} step={0.01}
                    onChange={(v) => updateMaterial("roughness", v)} />
                <SliderControl label="Reflection" tip={TIPS.reflectionStrength}
                    value={values.reflectionStrength} min={0} max={3} step={0.05}
                    onChange={(v) => updateMaterial("reflectionStrength", v)} />
            </div>

            {/* Liquid */}
            <div>
                <SectionLabel>Liquid</SectionLabel>
                <SliderControl label="Ripple Intensity" tip={TIPS.displacement}
                    value={values.displacement} min={0} max={8} step={0.1}
                    onChange={(v) => updateMaterial("displacement", v)} />
                <ToggleControl label="Auto-Ripple (Rain)" tip={TIPS.rain}
                    checked={values.rain}
                    onChange={(v) => updateMaterial("rain", v)} />
            </div>

            {/* Colours */}
            <div>
                <SectionLabel>Colours</SectionLabel>
                <ColorControl label="Background" tip={TIPS.bgColor}
                    value={values.bgColor} onChange={(v) => updateColor("bgColor", v)} />
                <ColorControl label="Text" tip={TIPS.textColor}
                    value={values.textColor} onChange={(v) => updateColor("textColor", v)} />
                <ColorControl label="Accent" tip={TIPS.accentColor}
                    value={values.accentColor} onChange={(v) => updateColor("accentColor", v)} />
                <ColorControl label="Glow" tip={TIPS.glowColor}
                    value={values.glowColor} onChange={(v) => updateColor("glowColor", v)} />
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
                <button onClick={reset}
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10">
                    Reset
                </button>
                <button onClick={copyConfig}
                    className="flex-1 rounded-lg bg-[#38bdf8] py-2 text-xs font-semibold text-[#0a0a0a] transition-colors hover:bg-[#7dd3fc]">
                    {copied ? "✓ Copied!" : "Copy Config"}
                </button>
            </div>
        </div>
    );
}

/* ── Sub-components ── */

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
            {children}
        </h4>
    );
}

function LabelWithTip({ label, tip }: { label: string; tip: string }) {
    return (
        <span className="group relative flex items-center gap-1 text-xs text-slate-300">
            {label}
            <span className="inline-flex h-3.5 w-3.5 shrink-0 cursor-help items-center justify-center rounded-full bg-white/10 text-[9px] font-bold text-slate-500 transition-colors group-hover:bg-[#38bdf8]/30 group-hover:text-[#38bdf8]">
                ?
            </span>
            <span className="pointer-events-none absolute bottom-full left-0 z-10 mb-1.5 w-48 rounded-lg border border-white/10 bg-slate-900 p-2 text-[10px] leading-relaxed text-slate-300 opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                {tip}
            </span>
        </span>
    );
}

function SliderControl({ label, tip, value, min, max, step, onChange }: {
    label: string; tip: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
    return (
        <div className="mt-2">
            <div className="flex items-center justify-between">
                <LabelWithTip label={label} tip={tip} />
                <span className="font-mono text-[10px] text-[#38bdf8]">{value.toFixed(2)}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="mt-0.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#38bdf8]" />
        </div>
    );
}

function ToggleControl({ label, tip, checked, onChange }: {
    label: string; tip: string; checked: boolean; onChange: (v: boolean) => void;
}) {
    return (
        <div className="mt-2 flex items-center justify-between">
            <LabelWithTip label={label} tip={tip} />
            <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" checked={checked}
                    onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
                <div className="h-5 w-9 rounded-full bg-white/10 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-slate-400 after:transition-all peer-checked:bg-[#38bdf8] peer-checked:after:translate-x-full peer-checked:after:bg-[#0a0a0a]" />
            </label>
        </div>
    );
}

function ColorControl({ label, tip, value, onChange }: {
    label: string; tip: string; value: string; onChange: (v: string) => void;
}) {
    return (
        <div className="mt-1.5 flex items-center justify-between">
            <LabelWithTip label={label} tip={tip} />
            <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-slate-500">{value}</span>
                <input type="color" value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-6 w-7 cursor-pointer rounded border border-white/10 bg-transparent" />
            </div>
        </div>
    );
}
