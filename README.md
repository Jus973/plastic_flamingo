# Flamboyance Playground

A deliberately designed multi-page fixture website for testing **Flamboyance**, a tool that launches Playwright-based synthetic users ("personas") against your app to detect UX frustration signals.

## Purpose

This site serves as a **target URL** for Flamboyance testing. Each page and scenario is crafted to trigger specific frustration signals or test persona behaviors, making it ideal for:

- Demos and regression testing of Flamboyance
- Validating persona behavior patterns
- Testing frustration signal detection
- **Persona-targeted friction testing** - each persona encounters unique frustration points

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

### Main Flows (with Persona-Targeted Friction)

| Path | Purpose | Target Persona |
|------|---------|----------------|
| `/` | Hub with persona quick reference | — |
| `/shop/` | Competing CTAs, confusing categories | `casual_browser` |
| `/cart/` | Mid purchase flow | — |
| `/checkout/shipping/` | Multi-step checkout (step 1) | `frustrated_exec` |
| `/checkout/payment/` | Payment with modal & 3s delay (step 2) | `frustrated_exec` |
| `/checkout/` | Order confirmation (step 3) | `frustrated_exec` |
| `/account/` | Nested hidden menus, icon-only bar | `non_tech_senior`, `accessibility_user` |
| `/account/settings/` | Basic/Advanced mode, nested disclosures | `non_tech_senior` |
| `/signup/` | Aggressive validation, countdown timer | `anxious_newbie` |
| `/order-status/` | Mobile-hostile layout, 4s delay | `mobile_commuter` |

### Stress Test Scenarios

| Path | Purpose | Target Persona |
|------|---------|----------------|
| `/stress/circular/` | A ↔ B navigation loop | Any (triggers `circular_navigation`) |
| `/stress/circular/a/` | Loop page A | — |
| `/stress/circular/b/` | Loop page B | — |
| `/stress/rage-decoy/` | Non-interactive decoy elements | Any (triggers `rage_click`) |
| `/stress/hidden-menu/` | Collapsed nav with `aria-expanded="false"` | `non_tech_senior`, `anxious_newbie` |
| `/stress/icon-bar/` | Critical icon-only actions, few labeled | `accessibility_user` |
| `/stress/many-links/` | 40+ interactive targets | `methodical_tester` |
| `/stress/slow/` | 10-second delay before content | `frustrated_exec`, `mobile_commuter` |
| `/stress/edge-cases/` | Inconsistent behaviors, dead ends | `power_user` |
| `/stress/broken-forms/` | Subtly broken form elements | `methodical_tester` |

## Personas Reference

Each persona has specific weaknesses. The site includes targeted friction for each:

| Name | Patience | Tech | Target Frustration Page |
|------|----------|------|------------------------|
| `frustrated_exec` | 0.2 | 0.8 | `/checkout/` (multi-step, 3s delay) |
| `non_tech_senior` | 0.5 | 0.2 | `/account/` (nested aria-expanded menus) |
| `power_user` | 0.9 | 0.9 | `/stress/edge-cases/` (dead ends, bugs) |
| `casual_browser` | 0.5 | 0.5 | `/shop/` (competing CTAs) |
| `anxious_newbie` | 0.3 | 0.3 | `/signup/` (scary validation, timer) |
| `methodical_tester` | 0.95 | 0.6 | `/stress/broken-forms/` (subtle bugs) |
| `mobile_commuter` | 0.25 | 0.85 | `/order-status/` (mobile-hostile, 4s delay) |
| `accessibility_user` | 0.7 | 0.35 | `/stress/icon-bar/` (icon-only critical actions) |

## Example Flamboyance Commands

Run all personas against the hub:
```bash
python -m agents.runner_local --url http://127.0.0.1:5173
```

Test specific personas against their target frustration pages:
```bash
# frustrated_exec vs multi-step checkout
python -m agents.agent --url http://127.0.0.1:5173/checkout/shipping/ --persona frustrated_exec

# non_tech_senior vs hidden menus
python -m agents.agent --url http://127.0.0.1:5173/account/ --persona non_tech_senior

# power_user vs edge cases
python -m agents.agent --url http://127.0.0.1:5173/stress/edge-cases/ --persona power_user

# anxious_newbie vs scary signup
python -m agents.agent --url http://127.0.0.1:5173/signup/ --persona anxious_newbie

# methodical_tester vs broken forms
python -m agents.agent --url http://127.0.0.1:5173/stress/broken-forms/ --persona methodical_tester

# mobile_commuter vs mobile-hostile order status
python -m agents.agent --url http://127.0.0.1:5173/order-status/ --persona mobile_commuter

# accessibility_user vs icon-only actions
python -m agents.agent --url http://127.0.0.1:5173/stress/icon-bar/ --persona accessibility_user
```

## Scenario Details

### frustrated_exec: Multi-Step Checkout
The checkout flow now requires 3 pages (shipping → payment → confirmation) with:
- Full shipping address form
- Full payment form with a "Special Offer!" modal popup
- 3-second "processing" delay before confirmation

### non_tech_senior: Hidden Menus
The account page buries settings behind:
- Nested `aria-expanded="false"` disclosures
- Technical jargon ("SSO/SAML", "API Tokens", "2FA/MFA")
- A misleading "Quick Settings" link that goes to a dead end
- An always-visible "easy path" footer link as escape hatch

### power_user: Edge Cases (`/stress/edge-cases/`)
Contains intentionally broken behaviors:
- Button that changes label but does nothing
- Links to non-existent pages (404)
- Form that silently fails validation
- Dropdown that resets when you click away
- "Load More" that loads duplicates
- Toggle that reverts after saving

### casual_browser: Confusing Shop
The shop page now includes:
- Competing CTAs: "Add to Cart", "Quick View", "Compare", wishlist
- Categories sidebar where all links go to the same page
- Promotional banner that looks like navigation

### anxious_newbie: Scary Signup (`/signup/`)
The signup form intimidates users with:
- Session countdown timer ("Your session expires in 5:00")
- Aggressive real-time validation with scary red errors
- Password requirements shown one-by-one as they fail
- Fake CAPTCHA with 2-second verification delay
- "This email may already be registered" warning on every email
- Scary legal warnings about data sharing

### methodical_tester: Broken Forms (`/stress/broken-forms/`)
Subtly broken form elements:
- Mismatched `for`/`id` labels (clicking label doesn't focus input)
- Submit button disabled until you scroll to bottom
- Required field with no visual indicator
- Checkboxes that uncheck themselves after 1 second
- Select with "-- Select --" placeholder that submits as empty
- Radio buttons with broken grouping (different name attributes)

### mobile_commuter: Mobile-Hostile Order Status
The order status page frustrates mobile users with:
- 4-second loading delay before showing content
- Wide table requiring horizontal scroll on 375px viewport
- Tiny 32px touch targets for buttons
- Important content pushed below the fold
- Promotional banner taking precious screen space

### accessibility_user: Icon-Only Actions (`/stress/icon-bar/`)
Critical actions without text labels:
- Submit, Next, Approve, Reject, Cancel are icon-only
- Only Save, Open, Help have labeled alternatives
- Document editor toolbar entirely icon-based
- Quick actions panel with no text

### Circular Navigation (`/stress/circular/`)
Two pages (A and B) that link to each other, designed to trigger `circular_navigation` when the agent navigates A → B → A. Both pages include an "Exit to Hub" escape route.

### Rage Decoy (`/stress/rage-decoy/`)
Contains styled `<div>` elements that look like buttons but aren't interactive. Rapid clicks on these may trigger `rage_click`. Real buttons are provided at the bottom.

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
