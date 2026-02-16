# Liquid Effect — Implementation Memory

> Everything needed to add the liquid distortion effect to any React/Next.js project.

---

## 1. What Is It?

An interactive liquid chrome distortion effect that makes text (or images) ripple when the user hovers or touches the canvas. Built on **Three.js** via the [threejs-components](https://github.com/klevron/threejs-components) library by Kevin Levron.

- **No npm install required** — the renderer loads from a CDN at runtime
- Works with any text, image, or gradient you render onto a canvas
- Supports mouse and touch interaction out of the box

---

## 2. Core CDN Import

```js
import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.30/build/backgrounds/liquid1.min.js';
```

> **Version pinned to `0.0.30`** — this is the stable version we tested with.

---

## 3. Minimal Setup (Vanilla JS)

```js
const canvas = document.getElementById('my-canvas');
const app = LiquidBackground(canvas);

// Load an image (URL or base64 data URL)
app.loadImage('/my-image.jpg');

// Tune the material
app.liquidPlane.material.metalness = 0.3;   // 0–1, higher = more reflective
app.liquidPlane.material.roughness = 0.5;   // 0–1, lower = sharper reflections
app.liquidPlane.material.envMapIntensity = 1; // reflection strength

// Tune the displacement
app.liquidPlane.uniforms.displacementScale.value = 2.5; // ripple intensity

// Auto-ripple rain effect
app.setRain(false); // true = constant ripples without user interaction

// Cleanup
app.dispose();
```

---

## 4. React/Next.js Component Pattern

### Key Decisions
- Use `"use client"` directive (Three.js needs browser APIs)
- Load the CDN script via `document.createElement("script")` with `type="module"`
- Use `useRef` to track initialization and prevent double-init in Strict Mode
- Expose `window.__liquidHeroApp` for external control (e.g., from a controls panel)

### The Script Injection Pattern

```tsx
useEffect(() => {
  if (!canvasRef.current || initializedRef.current) return;
  initializedRef.current = true;

  const dataUrl = generateTextImage(); // your canvas-rendered content
  if (!dataUrl) return;

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
    initializedRef.current = false;
  };
}, [generateTextImage]);
```

### Canvas HTML

```tsx
<section className="relative h-screen overflow-hidden">
  <canvas
    id="liquid-hero-canvas"
    className="absolute inset-0 w-full h-full touch-none"
  />
</section>
```

> **`touch-none`** is critical — prevents mobile scroll from fighting the ripple interaction.

---

## 5. Generating Text as an Image (Offscreen Canvas)

Instead of overlaying HTML text on the canvas, we **paint text onto an offscreen canvas** and feed it as a data URL to `app.loadImage()`. This makes the text part of the liquid surface.

### Key Points
- Use `window.devicePixelRatio` for HiDPI/Retina displays
- Canvas dimensions = `window.innerWidth * dpr` × `window.innerHeight * dpr`
- Call `ctx.scale(dpr, dpr)` so text coordinates stay in CSS pixels
- Use `ctx.textAlign = "center"` and position at `w/2` for centered text
- Add ambient glow gradients (radialGradient with `globalCompositeOperation: "screen"`) for the liquid to reflect

### Font Sizing Formula (Responsive)

```js
// Sub-text (small label above heading)
const subFontSize = Math.max(10, Math.min(w * 0.011, 16));

// Main heading (large)
const fontSize = Math.min(w * 0.11, h * 0.16, 140);

// Tagline (below heading)
const tagFontSize = Math.max(10, Math.min(w * 0.012, 16));
```

### Vertical Centering Formula

```js
const lines = ["Line 1", "Line 2"];
const lineHeight = fontSize * 1.1;
const totalHeight = lines.length * lineHeight;
const startY = h / 2 - totalHeight / 2 + lineHeight / 2;

lines.forEach((line, i) => {
  ctx.fillText(line, w / 2, startY + i * lineHeight);
});
```

### Ambient Glow (Makes the Liquid Look Chrome-like)

```js
ctx.globalCompositeOperation = "screen";

const glow = ctx.createRadialGradient(
  w * 0.25, h * 0.35, 0,
  w * 0.25, h * 0.35, w * 0.55
);
glow.addColorStop(0, "rgba(56, 189, 248, 0.14)"); // accent color
glow.addColorStop(1, "rgba(10, 10, 10, 0)");       // bg color, transparent
ctx.fillStyle = glow;
ctx.fillRect(0, 0, w, h);

ctx.globalCompositeOperation = "source-over"; // reset
```

---

## 6. Image Mode (Instead of Text)

Skip the offscreen canvas entirely:

```js
const app = LiquidBackground(canvas);
app.loadImage('/your-image.jpg'); // any image from /public
```

Works with photos, logos, gradients, illustrations — anything.

---

## 7. Live Controls Panel (EffectControls)

A slide-in panel that lets users tweak the effect in real-time.

### Properties You Can Control Live

| Property | Access Path | Range | Description |
|----------|-------------|-------|-------------|
| Metalness | `app.liquidPlane.material.metalness` | 0–1 | Chrome-like reflectivity |
| Roughness | `app.liquidPlane.material.roughness` | 0–1 | Surface smoothness |
| Reflection | `app.liquidPlane.material.envMapIntensity` | 0–3 | Environment map strength |
| Displacement | `app.liquidPlane.uniforms.displacementScale.value` | 0–10 | Ripple intensity |
| Rain | `app.setRain(bool)` | true/false | Auto-ripple effect |

### Color Changes (Require Canvas Regeneration)

Colors are baked into the offscreen canvas image, so changing them requires:
1. Re-render the offscreen canvas with new colors
2. Call `app.loadImage(newDataUrl)` to reload

We expose `window.__liquidHeroRegenerate(opts)` for this:

```tsx
window.__liquidHeroRegenerate = (opts) => {
  const newUrl = generateTextImage(opts);
  if (newUrl && window.__liquidHeroApp?.loadImage) {
    window.__liquidHeroApp.loadImage(newUrl);
  }
};
```

### Presets We Built

| Preset | Metalness | Roughness | Reflection | Displacement | Rain | BG | Text | Accent |
|--------|-----------|-----------|------------|--------------|------|----|------|--------|
| Chrome Ocean | 0.3 | 0.5 | 1.0 | 2.5 | off | #0a0a0a | #ffffff | #38bdf8 |
| Warm Sunset | 0.5 | 0.3 | 1.5 | 3.0 | off | #1a0a00 | #fbbf24 | #f97316 |
| Neon Pulse | 0.8 | 0.15 | 2.0 | 4.0 | on | #0a001a | #e879f9 | #22d3ee |
| Calm Lake | 0.2 | 0.7 | 0.8 | 1.5 | off | #0a1628 | #94a3b8 | #38bdf8 |

### Debounced Color Updates

Color picker changes are debounced at 120ms to avoid flooding `loadImage`:

```tsx
const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

// In update handler:
if (debounceRef.current) clearTimeout(debounceRef.current);
debounceRef.current = setTimeout(() => {
  window.__liquidHeroRegenerate?.({ bgColor, textColor, accentColor, glowColor });
}, 120);
```

---

## 8. TypeScript Declarations

```tsx
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
```

---

## 9. Responsive Design Notes

- **Canvas**: `absolute inset-0 w-full h-full` fills the parent container
- **Controls panel**: `w-[280px] sm:w-[340px]` for mobile vs desktop
- **Font sizes**: Use `Math.min(w * factor, maxPx)` to cap on large screens, `Math.max(minPx, ...)` for mobile
- **Hero section**: `h-screen` for full viewport height
- **Customize button**: Responsive padding `px-3 py-1.5 sm:px-4 sm:py-2`

---

## 10. Project Structure (Final)

```
src/
├── app/
│   ├── globals.css          # scroll-padding-top: 4rem (for fixed navbar)
│   ├── layout.tsx           # metadata, fonts, dark bg (#0a0a0a)
│   └── page.tsx             # Hero + About sections
├── components/
│   ├── LiquidHero.tsx       # Full-screen liquid canvas + controls panel
│   ├── EffectControls.tsx   # Sliders, color pickers, presets
│   ├── Navbar.tsx           # Brand only
│   └── Footer.tsx           # metabox.mu credit
```

---

## 11. Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| Next.js | 16.1.6 | Framework |
| React | 19.2.3 | UI |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| threejs-components | 0.0.30 (CDN) | Liquid effect renderer |

---

## 12. Gotchas & Lessons Learned

1. **No npm package needed** — `threejs-components` loads from CDN via dynamic `<script type="module">`. No build-time Three.js dependency.

2. **Strict Mode double-init** — React 19 Strict Mode runs effects twice in dev. Guard with `initializedRef.current` boolean.

3. **`touch-none` on canvas** — Without this, mobile browsers will scroll instead of letting the user interact with the liquid.

4. **Data URL size** — `offscreen.toDataURL("image/png")` can be large. For production, consider `toDataURL("image/webp", 0.8)` if browser support allows.

5. **Color changes ≠ material changes** — Material properties (metalness, roughness) are instant. Colors require re-rendering the offscreen canvas and calling `loadImage()` again.

6. **PowerShell + git** — PowerShell treats git stderr output as errors. `exit code: 1` doesn't always mean failure — check the actual output.

7. **Vercel project naming** — The Vercel CLI picks up the project name from `.vercel/project.json`. To rename, delete `.vercel/`, then `vercel link --project <new-name>`.

8. **`letterSpacing` on canvas** — The 2D canvas API supports `ctx.letterSpacing` in modern browsers. Set it before `fillText()`.

---

## 13. Quick-Start Checklist (New Project)

1. Create Next.js app: `npx -y create-next-app@latest ./ --ts --tailwind --app --eslint`
2. Copy `LiquidHero.tsx` and (optionally) `EffectControls.tsx` into `src/components/`
3. Import `<LiquidHero />` in your page
4. Set the parent container to `relative h-screen overflow-hidden`
5. Customize text in `generateTextImage()` — change the `lines` array, colors, fonts
6. Tune material properties in the script injection block
7. Add `touch-none` to the canvas class
8. Deploy — no extra dependencies needed

---

## 14. Git Branch Reference

| Branch | Content |
|--------|---------|
| `main` | Minimal 2-section page (Hero + About), controls panel, no credits |
| `showcase` | Full 9-section showcase (How It Works, API, Examples, Browser Support, Credits, etc.) |

---

## 15. Deployment

- **Repo**: https://github.com/zubairmetabox/liquid-effect
- **Live**: https://liquid-effect-blush.vercel.app
- **Deploy command**: `npx vercel --yes --prod`
