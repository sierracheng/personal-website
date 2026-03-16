# Portfolio Redesign: "The Queen" — Editorial Light Mode

## Vision
A clean, high-impact editorial layout inspired by *The Queen* by glocreativedesign.com. The signature look combines:
- **Giant ghost/marquee section text** — huge teal letters filling the full viewport width, with content cards overlaid on top (the most distinctive element)
- **Mixed typography** — italic Cormorant Garamond + black DM Sans in the same heading line
- **Full-bleed rounded image cards** — photos fill the card, overlay text sits on top with gradient scrim
- **Editorial split layouts** — image left, content right (or reversed) with generous whitespace
- **Clean flat cards** — no heavy glassmorphism, white/cream solid panels with a soft border
- **Teal accent** used generously: as background color for footer CTA, ghost text color, badge/tag color

---

## Design System

### Color Palette
```
--bg:            #ede9de       /* warm cream base */
--bg-mid:        #e5e1d6       /* slightly deeper cream */
--card-bg:       rgba(255,255,255,0.60)   /* clean frosted white card */
--card-border:   rgba(0,0,0,0.08)         /* subtle dark rim */
--fg:            #1a1917       /* near-black charcoal text */
--muted:         rgba(26,25,23,0.50)      /* secondary text */
--ghost:         rgba(26,25,23,0.04)      /* ghost elements */
--accent:        #4a6e64       /* deep muted teal */
--accent-light:  #6a9188       /* lighter teal for hover states */
--accent-dim:    rgba(74,110,100,0.10)    /* teal ambient fill */
--border:        rgba(0,0,0,0.07)         /* subtle dark divider */
```

### Typography — "The Queen" mixed editorial style
- **Primary font**: `DM Sans` — body, labels, sans headings
- **Display serif**: `Cormorant Garamond` — italic accent words in headings (weights 300–400 italic)
- **Heading pattern**: DM Sans 900 bold + Cormorant Garamond 300 italic **mixed in the same line**
  - Example: `<span class="serif-italic">Virtual</span> Pilates +` or `Sierra <span class="serif-italic">Cheng</span>`
- **Ghost section labels**: DM Sans 900, huge (`clamp(8rem, 20vw, 22rem)`), color `var(--accent)`, opacity 0.13–0.16, `letter-spacing: -0.04em`, `pointer-events: none`
- **Body**: DM Sans 400, line-height 1.78
- **Small caps labels**: DM Sans 500, `0.18–0.22em` letter-spacing, all-caps, 9–10px

### Card Style — Clean Editorial (NOT glassmorphism)
```css
/* .card — flat editorial card, no blur */
background: rgba(255, 255, 255, 0.58);
border: 1px solid rgba(0, 0, 0, 0.08);
border-radius: 24px;
box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03);

/* Full-bleed image card (hero, projects) */
border-radius: 28px;
overflow: hidden;
/* image fills 100% width/height, gradient overlay on top */
background: linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.65) 100%);
```

### Ghost Section Text — THE signature element
Large viewport-spanning text in teal placed absolutely behind content:
```css
position: absolute;
font-family: var(--display);
font-weight: 900;
font-size: clamp(8rem, 18vw, 22rem);
letter-spacing: -0.04em;
line-height: 0.88;
color: var(--accent);
opacity: 0.13;
white-space: nowrap;
pointer-events: none;
user-select: none;
```

### Background
- **Base**: Solid `#ede9de` (no blobs — clean editorial, not watercolor)
- No color orbs — the ghost text provides the visual interest
- Navbar frosted: `rgba(237,233,222,0.88)` on scroll, `backdrop-filter: blur(16px)`

---

## Section-by-Section Layout

### 1. Hero (`Hero.tsx`)
**Layout**: Two-column — left: editorial text (NOT in a card) | right: tall rounded full-bleed image card
- Left column (55%):
  - Section label: `01 — Portfolio` in small caps, teal
  - Headline: DM Sans 900 `"Sierra"` + Cormorant 300 italic `"Cheng"` on next line — mixing weights/fonts
  - Subheadline in DM Sans 400 muted
  - Two CTAs: primary teal pill button + ghost outline button
- Right column (45%):
  - Tall rounded card (`border-radius: 28px`, `height: 520px`)
  - Full-bleed image (`/water-bg.jpg`, `object-fit: cover`)
  - Gradient overlay scrim (dark at bottom)
  - Overlay text inside card (role + eyebrow badge) at the bottom

### 2. About (`About.tsx`)
**Layout**: Keep bento grid but update card style from glass → clean editorial `.card`
- Bio tile: Change "Architect. Engineer. Builder." so "Architect." uses Cormorant italic
- Stats tile: keep, update colors to teal
- Education tile: teal badge
- Skills: clean `.card` style, teal hover

### 3. Experience (`Experience.tsx`)
**Layout**: Clean vertical card list (keep current layout)
- Section heading: "Professional" DM Sans 900 + "*Experience*" Cormorant italic in teal
- Card style: clean `.card` instead of glass
- Stack tags: teal accent

### 4. Projects (`Projects.tsx`) — THE QUEEN SIGNATURE SECTION
**Layout**: Giant ghost text behind bento grid
- Behind the bento: absolutely positioned `"SELECTED · WORK"` in two lines, teal, huge (18–20vw per line), fills the section vertically
- Bento cards remain on top (`position: relative; z-index: 2`)
- Card image scrim: gradient bottom overlay (lighter than before — `rgba(0,0,0,0.55)` → `rgba(0,0,0,0.45)`)
- Impact tag at bottom of card: teal color, `var(--accent)`

### 5. Contact (`Contact.tsx`)
**Layout**: Split two-panel — left info, right form — on a **teal background section**
- Section background: `var(--accent)` (#4a6e64) — fills the full viewport, white text
- Heading: "Let's Build" DM Sans 900 white + "*Something Great*" Cormorant italic, off-white/cream
- Info rows: white text on teal
- Form card: white/cream solid card on teal background
- Submit button: white bg, teal text
- Footer bar: teal or near-black

---

## CSS Changes

### `index.css`
```css
/* Replace .glass with .card (flat editorial) */
.card {
  background: rgba(255, 255, 255, 0.58);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 24px;
  box-shadow: 0 2px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03);
}
/* Keep .glass/.glass-sm as aliases pointing to .card tokens */
```

---

## Removed from previous design
- All `backdrop-filter: blur()` glassmorphism
- Color blob background layer (App.tsx orbs)
- Heavy taupe-tinted panel tinting
- Taupe `#8c7e6e` accent — replaced by teal `#4a6e64`
