# Flamboyance Playground

A deliberately designed multi-page fixture website for testing **Flamboyance**, a tool that launches Playwright-based synthetic users ("personas") against your app to detect UX frustration signals.

## Purpose

This site serves as a **target URL** for Flamboyance testing. Each page and scenario is crafted to trigger specific frustration signals or test persona behaviors, making it ideal for:

- Demos and regression testing of Flamboyance
- Validating persona behavior patterns
- Testing frustration signal detection

## Quick Start

**Requirements:** Node.js LTS (v20+)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

**Default URL:** `http://127.0.0.1:5173`

### Docker Users

If running Flamboyance agents inside Docker containers, use:
```
http://host.docker.internal:5173
```
This allows containers to reach the host machine's dev server (macOS/Windows).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Route Table

### Main Flows

| Path | Purpose |
|------|---------|
| `/` | Hub: explains the fixture + links to all routes |
| `/shop/` | Start of purchase flow - browse products |
| `/cart/` | Mid purchase flow - review cart items |
| `/checkout/` | End state with success message |
| `/account/` | Account area index |
| `/account/settings/` | Settings: notifications, password, preferences |
| `/signup/` | Simple signup form with client-side confirmation |
| `/order-status/` | Order lookup by order number |

### Stress Test Scenarios

| Path | Purpose | Frustration Signal |
|------|---------|-------------------|
| `/stress/circular/` | A ↔ B navigation loop | `circular_navigation` |
| `/stress/circular/a/` | Loop page A | — |
| `/stress/circular/b/` | Loop page B | — |
| `/stress/rage-decoy/` | Non-interactive decoy elements | `rage_click` |
| `/stress/hidden-menu/` | Collapsed nav with `aria-expanded="false"` | Tests `tech_literacy` |
| `/stress/icon-bar/` | Icon-only vs labeled actions | Tests `prefers_visible_text` |
| `/stress/many-links/` | 40+ interactive targets | Tests 30-element sampling |
| `/stress/slow/` | 10-second delay before content | Tests `patience` |

## Personas Reference

Flamboyance includes these built-in personas:

| Name | Patience | Tech Literacy | Notes |
|------|----------|---------------|-------|
| `frustrated_exec` | 0.2 | 0.8 | Early exit ~30% of timeout |
| `non_tech_senior` | 0.5 | 0.2 | Skips `aria-expanded="false"` |
| `power_user` | 0.9 | 0.9 | Full exploration |
| `casual_browser` | 0.5 | 0.5 | Default behavior |
| `anxious_newbie` | 0.3 | 0.3 | Early exit; skips collapsed menus |
| `methodical_tester` | 0.95 | 0.6 | Up to 100 actions |
| `mobile_commuter` | 0.25 | 0.85 | 375×667 viewport; early exit |
| `accessibility_user` | 0.7 | 0.35 | Prefers visible text labels |

## Example Flamboyance Commands

Run all personas against the hub:
```bash
python -m agents.runner_local --url http://127.0.0.1:5173
```

Test a specific persona on the hidden menu scenario:
```bash
python -m agents.agent --url http://127.0.0.1:5173/stress/hidden-menu/ --persona non_tech_senior
```

Test low-patience persona on slow page:
```bash
python -m agents.agent --url http://127.0.0.1:5173/stress/slow/ --persona frustrated_exec
```

## Scenario Details

### Circular Navigation (`/stress/circular/`)
Two pages (A and B) that link to each other, designed to trigger `circular_navigation` when the agent navigates A → B → A. Both pages include an "Exit to Hub" escape route.

### Rage Decoy (`/stress/rage-decoy/`)
Contains styled `<div>` elements that look like buttons but aren't interactive. Rapid clicks on these may trigger `rage_click`. Real buttons are provided at the bottom.

### Hidden Menu (`/stress/hidden-menu/`)
Features collapsed navigation with `aria-expanded="false"`. Low tech-literacy personas skip these controls. An always-visible footer link provides an alternative path to "Secret Settings".

### Icon Bar (`/stress/icon-bar/`)
Icon-only toolbar buttons (with `aria-label` but no visible text) alongside labeled alternatives. The `accessibility_user` persona will prefer the labeled versions.

### Many Links (`/stress/many-links/`)
Contains 40+ interactive elements visible on one page. Since Flamboyance samples only the first 30 matches, some elements will never be clicked in a single pass.

### Slow Page (`/stress/slow/`)
Delays content for ~10 seconds. Low-patience personas (`patience < 0.4`) may give up before content appears. The countdown is visible during loading.

## Technical Notes

- Built with Vite + vanilla TypeScript
- Uses path-based URLs (MPA structure) for proper `circular_navigation` detection
- No external CDN dependencies - works offline after install
- Responsive design supports both 1280×720 and 375×667 viewports
- No login, API keys, or analytics blocking loads

## License

MIT
