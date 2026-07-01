---
version: alpha
name: Assembly Line
description: Industrial-grade dark-mode production dashboard for AI video manufacturing — operator console precision meets cinematic darkness.
colors:
  bg-root: "#0A0A0B"
  bg-surface: "#141416"
  bg-elevated: "#1C1C1F"
  bg-hover: "#232328"
  border: "#2A2A30"
  text-primary: "#EDEDEF"
  text-secondary: "#888891"
  text-muted: "#5C5C66"
  accent-blue: "#3B82F6"
  accent-green: "#22C55E"
  accent-amber: "#F59E0B"
  accent-red: "#EF4444"
  accent-purple: "#8B5CF6"
  on-accent: "#FFFFFF"
typography:
  display:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  h2:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: Inter
    fontSize: 0.875rem
    lineHeight: 1.5
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    lineHeight: 1.5
  label-caps:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: 600
    letterSpacing: "0.06em"
  mono:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.5
  mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: 500
  stat-value:
    fontFamily: JetBrains Mono
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.2
rounded:
  sm: 6px
  md: 10px
  lg: 14px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  section: 48px
shadows:
  card: "0 1px 2px rgba(0, 0, 0, 0.4)"
  elevated: "0 4px 12px rgba(0, 0, 0, 0.5)"
components:
  sidebar:
    backgroundColor: "{colors.bg-surface}"
    borderColor: "{colors.border}"
    width: 220px
  nav-item:
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  nav-item-active:
    backgroundColor: "{colors.bg-elevated}"
    textColor: "{colors.text-primary}"
  nav-item-hover:
    backgroundColor: "{colors.bg-hover}"
    textColor: "{colors.text-primary}"
  stat-card:
    backgroundColor: "{colors.bg-surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    padding: 16px
  card:
    backgroundColor: "{colors.bg-surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
  button-primary:
    backgroundColor: "{colors.accent-blue}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.sm}"
    padding: "7px 14px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "#2563EB"
  button-secondary:
    backgroundColor: "{colors.bg-elevated}"
    textColor: "{colors.text-primary}"
    borderColor: "{colors.border}"
    rounded: "{rounded.sm}"
    padding: "7px 14px"
  button-secondary-hover:
    backgroundColor: "{colors.bg-hover}"
  badge-blue:
    backgroundColor: "rgba(59, 130, 246, 0.15)"
    textColor: "{colors.accent-blue}"
  badge-green:
    backgroundColor: "rgba(34, 197, 94, 0.15)"
    textColor: "{colors.accent-green}"
  badge-amber:
    backgroundColor: "rgba(245, 158, 11, 0.15)"
    textColor: "{colors.accent-amber}"
  status-running:
    backgroundColor: "rgba(59, 130, 246, 0.12)"
    textColor: "{colors.accent-blue}"
  status-done:
    backgroundColor: "rgba(34, 197, 94, 0.12)"
    textColor: "{colors.accent-green}"
  status-waiting:
    backgroundColor: "rgba(245, 158, 11, 0.12)"
    textColor: "{colors.accent-amber}"
  pipeline-node:
    backgroundColor: "{colors.bg-elevated}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    padding: 16px
  pipeline-node-active:
    borderColor: "{colors.accent-blue}"
  job-progress-bar:
    backgroundColor: "{colors.bg-elevated}"
    height: 4px
    rounded: 2px
  job-progress-fill:
    backgroundColor: "{colors.accent-blue}"
    height: 4px
    rounded: 2px
  asset-card:
    backgroundColor: "{colors.bg-elevated}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
  asset-card-hover:
    borderColor: "{colors.accent-blue}"
  config-panel:
    backgroundColor: "{colors.bg-elevated}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    padding: 16px
  input-field:
    backgroundColor: "{colors.bg-surface}"
    borderColor: "{colors.border}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "7px 10px"
  topbar:
    backgroundColor: "{colors.bg-surface}"
    borderColor: "{colors.border}"
    height: 52px
---

## Overview

Assembly Line is an AI video manufacturing platform for production teams and
agencies. It is **not** a creative tool — it is a factory. The interface must
feel like an operator console: dense, fast, precise, and always in control.

**Brand personality:** Industrial, trustworthy, high-precision. Think Vercel
dashboard meets GitHub Actions meets a manufacturing execution system.

**Emotional response:** Confidence. Users should feel like they're running a
production line, not playing with a toy. Every element must convey that this
is serious infrastructure that handles real money and real output.

**Target audience:** Performance marketers, creative agencies, ecommerce
brands running paid social at scale. These users live in dashboards. They
want speed, clarity, and zero fluff.

## Colors

The palette is deliberately restrained. Dark backgrounds reduce eye strain
for operators who spend hours in the dashboard. Color is used exclusively as
a **signal** — it communicates status, never decoration.

- **Root background ({colors.bg-root}):** The deepest layer — the canvas
  behind everything. Never used as a surface. Near-black to maximize contrast
  with content.
- **Surface ({colors.bg-surface}):** Cards, panels, sidebar, topbar.
  One step elevated from the root. The default container for content.
- **Elevated ({colors.bg-elevated}):** Modals, dropdowns, hover states,
  configuration panels. Two steps elevated.
- **Hover ({colors.bg-hover}):** Interactive element hover feedback.
  Three steps elevated.
- **Border ({colors.border}):** All dividers, card borders, input borders.
  Subtle but present — structure without shouting.
- **Text Primary ({colors.text-primary}):** Headlines, body text, active states.
  High contrast against all surfaces.
- **Text Secondary ({colors.text-secondary}):** Metadata, timestamps,
  supporting information. Readable but de-emphasized.
- **Text Muted ({colors.text-muted}):** Labels, placeholder text, disabled
  states. Lowest contrast that's still accessible.
- **Blue ({colors.accent-blue}):** Running jobs, active stages, primary
  actions. The platform's dominant interaction color. Use for exactly one
  primary CTA per screen.
- **Green ({colors.accent-green}):** Completed jobs, passed QC, published
  assets, success states. Positive signal only.
- **Amber ({colors.accent-amber}):** Awaiting approval, QC warnings, draft
  state. Requires attention but not alarm.
- **Red ({colors.accent-red}):** Failed jobs, rejected assets, errors,
  destructive actions. Use sparingly — red fatigue is real.
- **Purple ({colors.accent-purple}):** Secondary accent. Reserved for UGC
  Creator features, AI Avatar Studio, and creative modules to visually
  separate them from core production.

**Important:** Never introduce colors outside this palette. If a new
semantic state emerges, extend the palette in the YAML front matter
before using it in components.

## Typography

Two families: Inter for UI and JetBrains Mono for data.

**Inter** carries all interface text. Hierarchy is established through
weight and size, never through additional font families. Body text is
14px (0.875rem) — slightly larger than typical dashboards to maintain
readability at the density this platform requires.

**JetBrains Mono** is used for job IDs, costs, durations, model names,
API keys — anything that represents machine data. This creates a clear
visual distinction between "what the system says" (mono) and "what the
interface says" (sans-serif). Never use mono for body copy, labels, or
navigation.

**Label caps** (11px, 600 weight, 0.06em tracking) are for sidebar
section headers and form labels. Uppercase via CSS `text-transform`,
not via typed content.

**Stat values** (24px, 700 weight, mono) are for dashboard KPI cards.
These are the largest type on any screen and should be used exactly
four times — the stat row is always a 4-column grid.

## Layout

The layout is a permanent two-column structure: 220px sidebar + fluid
main content area. The sidebar never collapses on desktop. The topbar
is 52px tall.

**Spacing scale** uses a 4px baseline:
- `xs` (4px): Icon-to-label gaps, dot separators
- `sm` (8px): Button gaps, inline spacing
- `md` (12px): Card padding, intra-component
- `lg` (16px): Section padding, stat cards
- `xl` (24px): Content area padding, inter-section
- `xxl` (32px): Pipeline flow spacing
- `section` (48px): Major section breaks (rare)

**Grids:**
- Stats row: always 4 columns
- Asset grid: always 4 columns (responsive: 2 columns below 1024px)
- Pipeline list: single column, items separated by 1px borders

**Content max-width:** None. The platform is full-width. Dense data
displays benefit from every pixel. The sidebar and consistent padding
provide enough whitespace.

## Elevation & Depth

Depth is achieved through background layering, not shadows:

1. Root (`bg-root`) — the canvas
2. Surface (`bg-surface`) — cards, panels
3. Elevated (`bg-elevated`) — modals, config panels
4. Hover (`bg-hover`) — interactive feedback

Shadows are intentionally minimal. `card` shadow is a hairline
(0 1px 2px). `elevated` shadow (0 4px 12px) is used only for
modals and dropdowns. No shadow on hover states — background
color change is sufficient.

**Never use:** Box-shadow for decorative purposes. Glassmorphism.
Gradients on surfaces.

## Shapes

Rounded corners are modest and consistent:
- `sm` (6px): Buttons, inputs, badges, pipeline nodes
- `md` (10px): Cards, stat cards, asset cards
- `lg` (14px): Pipeline canvas, modals
- `full` (9999px): Avatars, pill badges, status dots

Border radius is never decorative. It's a function of element size —
smaller elements get smaller radius.

## Components

### Navigation
- `sidebar` is fixed 220px wide with `bg-surface` background.
- `nav-item` is 36px tall, 12px horizontal padding, 6px radius.
  Active state uses `bg-elevated`; hover uses `bg-hover`.
- Badges (`badge-blue`, `badge-green`, `badge-amber`) are 11px
  mono, 2px 7px padding, pill-shaped. Used in sidebar to show
  counts and in tables for status.

### Buttons
- `button-primary` is the only blue button on any screen. Exactly
  one per view. It answers "what's the main thing to do here?"
- `button-secondary` is for secondary actions. Border distinguishes
  it from the background.
- Destructive actions (Reject, Delete) use `accent-red` background
  at 10% opacity with red text — never a solid red button.
- Button hierarchy: Primary → Secondary → Ghost. Never more than
  three button variants on one screen.

### Status Indicators
- `status-running` (blue): Active jobs, in-progress pipeline stages
- `status-done` (green): Completed, passed, published
- `status-waiting` (amber): Awaiting approval, draft, warning
- Status is communicated through background tint + matching text
  color — never through color alone (icons or labels always accompany).

### Pipeline Nodes
- Default: `bg-elevated` background, `border` border
- Active (selected for configuration): `accent-blue` border
- Nodes are 140px minimum width, centered text, with icon + name + model

### Data Display
- Job IDs use `mono-sm` in `accent-blue`. Always prefixed with `#`.
- Costs use `mono` with `$` prefix. Always right-aligned.
- Progress bars are 4px tall, `bg-elevated` track, `accent-blue` fill.
- Asset thumbnails are 9:16 aspect ratio (vertical video format).

### Configuration Panel
- Appears below pipeline canvas when a node is selected.
- `bg-elevated` background, 16px padding, rounded `md`.
- Form fields: select and input use `bg-surface` background,
  `border` border, `text-primary` color.

## Do's and Don'ts

- **Do** use token references (`{colors.accent-blue}`) instead of
  literal hex values in component definitions.
- **Do** use JetBrains Mono for all machine data — job IDs, costs,
  durations, model names, API keys, version numbers.
- **Do** limit to exactly one `button-primary` per screen.
- **Do** use the 4-column stat grid on every overview screen.
- **Do** communicate status through color + icon + label — never
  color alone.
- **Do** maintain 220px sidebar width. Never collapse on desktop.
- **Don't** introduce colors outside the palette. Extend the YAML
  front matter first.
- **Don't** nest component variants. `button-primary-hover` is a
  sibling token, not a child.
- **Don't** use gradients, glassmorphism, or decorative shadows.
  This is an industrial tool, not a marketing site.
- **Don't** add filler content. Every data point must be real or
  clearly marked as placeholder.
- **Don't** use emoji outside of pipeline icons and feature flags.
  The interface communicates through typography and status colors.
- **Don't** make buttons under 44px touch target on mobile. This
  platform is desktop-first but responsive.
- **Don't** exceed three button variants on any single screen.
