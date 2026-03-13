# Portfolio Redesign: "The Translucent Architect"

## Vision
A dark, atmospheric glassmorphism interface floating within a photorealistic desert landscape. Deep space feeling with frosted glass tiles, organic floating spheres, and parallax depth.

---

## Design System

### Color Palette
```
--bg-deep:    #0d0c0b       /* near-black base */
--bg-mid:     #1a1714       /* section dark */
--glass-bg:   rgba(255,255,255,0.06)   /* frosted tile surface */
--glass-bg-warm: rgba(200,170,150,0.10) /* warmer glass variant */
--glass-border: rgba(255,255,255,0.13)  /* glass rim light */
--fg:         rgba(255,255,255,0.92)   /* primary text */
--muted:      rgba(255,255,255,0.44)   /* secondary text */
--ghost:      rgba(255,255,255,0.04)   /* background ghost text */
--accent:     #e8b4bc                  /* blush pink (sphere glow) */
--accent-dim: rgba(232,180,188,0.18)   /* pink ambient */
--silver:     rgba(200,198,195,0.7)    /* silver sphere */
--border:     rgba(255,255,255,0.09)
```

### Typography
- **Sans**: `Inter`, -apple-system, sans-serif (replace DM Sans)
- All heading weights stay 700–900
- All body text white/light on dark backgrounds

### Glass Card Recipe
```css
background: var(--glass-bg);
backdrop-filter: blur(24px) saturate(1.4);
-webkit-backdrop-filter: blur(24px) saturate(1.4);
border: 1px solid var(--glass-border);
border-radius: 32px;  /* ~48px for hero, 24px for smaller tiles */
box-shadow: 0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12);
```

---

## Background Layer

**Approach:** Fixed full-viewport atmospheric background using a high-quality desert/dusk Unsplash image with a dark overlay gradient. No Three.js needed for the background — use a CSS fixed background with parallax on the scroll container.

**Floating Orbs:** Pure Framer Motion + CSS. Three orbs:
- Pink orb: `#e8b4bc`, 180px, blur glow, drifts with mouse parallax
- Silver orb: `rgba(200,198,195,0.85)`, 80px, metallic gradient
- Deep pink orb: `#d4789c`, 60px, bottom-right area

All orbs use `useMotionValue` + `useSpring` to react to mouse position at different intensities.

---

## File-by-File Implementation Plan

### 1. `index.css` — Full overhaul
- New CSS variables (all above)
- Body background: `var(--bg-deep)`
- Selection color: `var(--accent)`
- Replace Inter font import in `index.html`
- Add `.glass` utility class

### 2. `index.html` — Font swap
- Remove DM Sans + Cormorant Garamond
- Add Inter (weights 400, 500, 700, 900) from Google Fonts

### 3. `App.tsx` — Add global background layer
- Wrap everything in a `<div>` with fixed desert background image
- Add `FloatingOrbs` component above sections
- Re-add `Projects` section (currently missing from App.tsx)

### 4. `Hero.tsx` — Complete rewrite
**Layout:** Centered vertically and horizontally, single large glass card (~780px wide)
**Inside card:**
- Eyebrow tag: `Full-Stack Developer · M.S. UW`
- H1: `Sierra Cheng` (large, white, Inter 900)
- Subtitle: italic, muted — "Architecting high-performance digital systems through engineering precision."
- Sub-headline paragraph
- Two CTA buttons: `View Work →` + `Get in Touch`
**Background:** Orbs drift behind card, subtle parallax on scroll

Remove: current bottom-pinned text layout, SectionStrip from hero, ghost text watermark

### 5. `About.tsx` — Bento Glass Grid rewrite
**Layout:** Responsive CSS grid of glass tiles
**Tile sizes:**
- Large tile (col-span-2): Bio text + M.S. UW callout
- Medium tile: Stats (100K+, 5+ yrs, 30+ components)
- Small tiles ×16: One per skill, each with shimmer hover effect
**Background:** Same dark atmospheric, glass tiles float above it

Remove: current two-column layout with ghost text watermark

### 6. `Experience.tsx` — Stacking glass cards
**Layout:** Vertical stack with `gap: 12px`, cards enter from below on scroll
**Each card:** Existing grid (left metric + right description) but restyled:
- Uniform glass recipe on ALL cards (no more light/dark variant logic per card)
- `border-radius: 28px`
- Metric number in blush accent color (`var(--accent)`)
- Stack pills in blush-tinted glass tags
**Animation:** stagger entrance as user scrolls, slight `scale` grow on hover

Keep: existing data, tilt effect, counter animation

### 7. `Projects.tsx` — Glass panel rewrite
**Layout:** Keep 2-col grid structure but restyle:
- Left panel: Glass tile with project image as background (CSS `background-size: cover`) + title overlay
- Right panel: Pure glass, white text
- Remove per-project `panelBg` hardcoded colors; replace with consistent glass

### 8. `Contact.tsx` — Glass form card
**Layout:** Center the form in a single large glass card
**Inputs:** Glass-styled: `background: rgba(255,255,255,0.06)`, white border on focus
**Submit button:** Blush accent background (#e8b4bc), dark text
**Left info column:** Same glass tile, stacked info rows with divider lines

Keep: existing form logic, magnetic submit, fetch to backend

### 9. `Navbar.tsx` — Glass nav
**Change:** `rgba(239...)` → `rgba(13,12,11,0.7)` base, glass blur on scroll
**Text:** White/muted white
**Logo:** `Sierra.` in white Inter 700

### 10. `CustomCursor.tsx` — Accent tint
**Change:** Cursor dot → blush accent on hover state

### 11. New `FloatingOrbs.tsx` component
```
client/src/components/ui/FloatingOrbs.tsx
```
Three Framer Motion `motion.div` orbs:
- Each listens to global mouse position from Redux `cursorX/Y`
- Different spring stiffness → parallax depth illusion
- CSS radial-gradient for glow effect
- `pointer-events: none`, `position: fixed`, `z-index: 0`

---

## What is NOT changing
- All Redux store logic (uiSlice, projectsSlice)
- All hooks (useMagneticCursor, useScrollReveal, useCounter, useTilt)
- All backend code
- Form submission logic
- Framer Motion animation triggers (useInView, useScroll)
- Component file structure / routing

---

## Dependencies to Add
```bash
# None required — no Three.js needed for this approach
# Inter font via Google Fonts (free, no install)
```

---

## Execution Order
1. `index.html` — font swap
2. `index.css` — new design tokens + glass utility
3. `FloatingOrbs.tsx` — new component
4. `App.tsx` — background + orbs integration
5. `Navbar.tsx` — glass nav
6. `Hero.tsx` — centered glass card hero
7. `About.tsx` — bento glass grid
8. `Experience.tsx` — uniform glass cards
9. `Projects.tsx` — glass panels
10. `Contact.tsx` — glass form
11. `CustomCursor.tsx` — accent tint
