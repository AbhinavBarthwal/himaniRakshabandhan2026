# Project Brief — "Hello Himani" Raksha Bandhan Website

**Prepared for:** continuation in Cowork
**Prepared by:** Claude (Sonnet), in conversation with the client (the brother)
**Status:** v1 prototype built. Needs personalization, real assets, and a content pass before it ships.

---

## 1. Project Snapshot

| | |
|---|---|
| **What** | A single-page, scrollable "storybook" website — a Raksha Bandhan gift |
| **Who it's for** | Himani (the sister, recipient) |
| **Who it's from** | Her brother (the client in this conversation) |
| **Relationship** | Biological brother–sister — **not** a chosen-sibling / friend framing. See §6, Fix #1. |
| **Occasion & deadline** | Raksha Bandhan 2026 falls on **Friday, August 28, 2026** — confirmed via web search. As of this brief, that is **tomorrow**. Treat this as a hard deadline. |
| **Current file** | `himani-rakhi-site.html` — single-file HTML/CSS/JS, no build step, no dependencies besides Google Fonts |
| **Format decided by client** | Abstract, cute, Pinterest-style, maximalist ("not minimal"), heavy on graphics, text-behind-image moments, cascading scroll animations, hidden easter eggs |

**Priority for Cowork:** this is a same-day-turnaround gift. Optimize for *shipping something finished and personal* over further scope expansion. Every open question in §7 should be resolved fast (short async questions to the client, not long discovery).

---

## 2. Design System (already built into v1 — keep unless client asks to change)

**Palette**
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#FFF6EF` | page background |
| `--paper-2` | `#FFEFE2` | alternate section background |
| `--ink` | `#3D1B2E` | body text |
| `--pink` | `#FF6F91` | primary accent |
| `--pink-soft` | `#FFD3DE` | accent tint |
| `--mango` | `#FFB84D` | secondary accent |
| `--mango-soft` | `#FFE3B0` | accent tint |
| `--mint` | `#7FCFB9` | tertiary accent |
| `--mint-soft` | `#CFF0E3` | accent tint |
| `--lavender` | `#B999D9` | quaternary accent |
| `--lavender-soft` | `#E8D9F5` | accent tint |
| `--thread-red` / `--thread-gold` | `#E0435A` / `#F2B705` | the rakhi thread motif |

**Typography**
- Display: **Fredoka** (rounded, bubbly) — headings
- Script/handwritten accent: **Caveat** — captions, eyebrows, chat names, hints
- Body: **Quicksand** — paragraph text

**Layout concept:** vertical scroll "chapters," each its own mini-scene, separated by alternating background tints and generous padding. Polaroid-style photo cards scattered at slight rotation angles (scrapbook feel). Big oversized words placed *behind* photos/illustrations using z-index layering (the "text behind images" requirement).

**Signature element:** a red-gold thread (`#thread-track` + `#thread-charm`) that runs down the left edge of the page and visually tracks scroll progress — a literal rakhi thread tying the story together. Hidden on mobile (< 760px) in favor of simplicity.

**Motion principles**
- Scroll-triggered reveal (fade + rise) via `IntersectionObserver`, staggered slightly per section
- `prefers-reduced-motion` is respected — animations disable gracefully
- Three "easter egg" interactions (see §4)

---

## 3. Site Map & Content Flow

This order was specified directly by the client — **keep this sequence.**

| # | Section (id) | Purpose | Content status |
|---|---|---|---|
| 1 | `#hero` | "Hello, Himani" greeting, sets tone | Placeholder copy, needs final tagline sign-off |
| 2 | `#met` | The college bus memory | **Placeholder story — needs the real memory, see §7** |
| 3 | `#sister` | Emotional beat: "and just like that... I got a sister" | Placeholder copy — **needs tone fix, see §6 Fix #1** |
| 4 | `#foodie` | Food-themed photo gallery (6 cards) | All 6 photos are placeholders, captions are generic |
| 5 | `#chitchat` | Chat-bubble mockup of their texting dynamic | All 6 lines are invented placeholders |
| 6 | `#clicks` | Candid "random photos" gallery (4 cards) + hidden sticker easter egg | All 4 photos are placeholders |
| 7 | `#thankyou` | Closing thank-you + Raksha Bandhan message + bow easter egg | Placeholder copy, generally usable as-is |

---

## 4. Interactions Already Built

1. **Heart burst** — tapping/clicking the "I got a sister" heading fires a burst of heart/sparkle emoji from that point on screen.
2. **Hidden sticker** — a small 🐱 icon near the "random clicks" section reveals a secret tooltip message when tapped.
3. **Bow celebration** — tapping the 🎀 at the end twice triggers a full-screen confetti burst.
4. **Thread scroll-tracker** — the rakhi thread charm (🪢) moves down the page in sync with scroll position (desktop only).

All four are functional in the current file — verify they still work after any code edits.

---

## 5. Asset Checklist (what's still needed from the client)

| Asset | Quantity | Used in | Notes |
|---|---|---|---|
| Photo of Himani (hero) | 1 | `#hero` | Currently just big background type, no photo yet — confirm if one should be added |
| Bus / college-era photo or illustration | 1 | `#met` | Placeholder is a bus emoji |
| Food photos | 6 | `#foodie` | Placeholder captions: 3am maggi run, pani puri incident, cafe hopping, birthday cake, street food, dessert. Confirm which real photos map to which caption, or rewrite captions to match real photos |
| Real chat screenshots or quoted lines | 5–6 | `#chitchat` | Can be actual screenshots (styled as images) or just real quoted lines typed into the existing bubble layout |
| Candid / random photos | 4 | `#clicks` | Placeholder captions: mid-laugh, car selfie, random tuesday, unexplainable |
| Any video/voice note? | optional | anywhere | Not currently supported by the layout — flag if client wants this, it's a scope addition |

**How to swap a placeholder photo:** each `.photo` div currently uses `background: linear-gradient(...)`. Replace with `background-image: url('photo.jpg'); background-size: cover; background-position: center;` and remove the emoji character inside.

---

## 6. Fixes Needed Before Sending

1. **Relationship framing (important):** the client is Himani's **biological brother**, not a chosen/found sibling. The current `#sister` section copy says *"Not related by blood — related by chaos, chai..."* — this is factually wrong for this client and must be rewritten. Suggested direction: lean into an actual sibling memory (e.g., a moment growing up, or a specific day that changed how close they became) rather than the "chosen family" trope. **Ask the client for the real moment behind "and just like that, I got a sister"** — likely it refers to a specific memory, not literally gaining a sibling.
2. **Bus story specificity:** confirm what "met in college ki bus" actually refers to for two siblings — most likely this means a specific bonding memory/commute story from when they were both at the same college, not a first meeting. Get the real anecdote from the client so the section reads true rather than generic.

---

## 7. Open Questions for the Client (ask these directly, keep it short given the deadline)

- [ ] What's the real story behind the college bus memory? (a sentence or two is enough — it'll be rewritten to fit the design)
- [ ] What's the real moment/memory behind "I got a sister" — what should that section actually say?
- [ ] Can you send the 6 food photos + captions (or let us pick generic ones if you're short on time)?
- [ ] Can you send 4 candid/random photos?
- [ ] Any real chat lines, inside jokes, or nicknames you want included in the chat-bubble section?
- [ ] Do you want a photo of Himani in the hero section, or keep it text-only?
- [ ] How will this be delivered to her — a link sent directly, opened on your phone in front of her, or hosted somewhere with a custom domain?
- [ ] Any names/nicknames, emojis, or phrases she uses a lot that should be sprinkled in for authenticity?

---

## 8. Technical Notes

- Single HTML file, no external dependencies except Google Fonts (Fredoka, Caveat, Quicksand) loaded via `<link>` — works offline once fonts are cached, otherwise needs internet on first load.
- No build tools, frameworks, or backend — safe for Cowork or the client to hand-edit directly.
- Responsive down to mobile; rakhi thread motif is hidden below 760px width to avoid clutter.
- Accessibility: keyboard-operable easter eggs, `focus-visible` states, `prefers-reduced-motion` support, semantic heading structure.
- File currently lives at: `himani-rakhi-site.html`.

---

## 9. Definition of Done

- [ ] All placeholder photos replaced with real ones (or intentionally kept as styled placeholders if client prefers)
- [ ] Bus story and "got a sister" copy rewritten with real memories, sibling framing corrected
- [ ] Chat bubble content finalized
- [ ] Tested on a phone screen (this will very likely be viewed on Himani's phone)
- [ ] Delivered before end of day August 28, 2026
