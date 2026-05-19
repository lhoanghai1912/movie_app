---
name: impeccable
description: Use when the user wants to shape, critique, audit, polish, clarify, typeset, lay out, adapt, animate, or otherwise improve a frontend interface with a very high craft bar. Best for websites, landing pages, dashboards, app UI, forms, onboarding, settings, and design-system alignment. Not for backend-only work.
user-invocable: true
argument-hint: "[shape|craft|audit|critique|polish|layout|typeset|clarify|adapt|animate|delight|distill|harden|optimize|quieter|bolder|colorize|onboard] [target]"
---

# Impeccable

Design and iterate frontend interfaces with a high craft bar: strong information hierarchy, design-system alignment, meaningful motion, accessible states, and production-grade polish.

This global version is adapted for cross-project use. It does **not** require local `.github/skills/impeccable/scripts/*` tooling. Instead, it works from the current codebase, and optionally from project context files such as `PRODUCT.md` and `DESIGN.md` when present.

## Optional project context

If the current project has these files, read and use them before major UI work:
- `PRODUCT.md`: audience, positioning, tone, product purpose, anti-goals
- `DESIGN.md`: tokens, typography, spacing, components, visual direction

If they do not exist, infer conventions from:
1. existing shared components
2. theme/token files
3. adjacent screens and routes
4. current copy and UX patterns

Never invent a design system when the codebase already has one.

## Core rules

### 1. Design-system discovery is mandatory
- Find the project's design tokens, shared components, layout patterns, and motion conventions before making visual changes.
- For every visual mismatch, classify the root cause:
  - missing token
  - shared component not reused
  - conceptual/flow misalignment
- Fix the root cause, not just the symptom.

### 2. Polish comes last
- Do not spend time polishing incomplete or unstable work first.
- Confirm functional completeness, then improve craft.

### 3. Visual work must stay structural
- Do not apply decoration on top of poor hierarchy or confusing flow.
- Information architecture, task flow, and content order matter more than surface aesthetics.

### 4. Avoid obvious AI-design tells
- No gradient text.
- No lazy card-grid repetition.
- No decorative glassmorphism by default.
- No generic SaaS hero-metric templates.
- No overuse of arbitrary accent borders.
- No hardcoded colors when tokens exist.
- Do not ship unmodified library defaults as finished design.
- Avoid uniform spacing, radius, and shadows across every surface unless the product intentionally calls for that restraint.

### 5. Keep frontend quality holistic
Review and improve:
- spacing and alignment
- hierarchy and readability
- copy and labels
- loading, empty, success, and error states
- responsive behavior
- accessibility and focus states
- animation quality
- performance of render-heavy surfaces

### 6. Pick a real visual direction
- For meaningful UI work, choose a concrete visual direction instead of vague defaults like "clean" or "modern".
- Ground the direction in product context, existing brand cues, and nearby screens.
- If the project is visually underdefined, use a restrained but intentional system rather than generic template styling.

### 7. Required qualities for visible surfaces
Every important surface should demonstrate several of these on purpose:
- strong hierarchy through scale contrast
- spacing rhythm instead of uniform padding everywhere
- depth, layering, or surface distinction when appropriate
- typography with real character and clear roles
- semantic color usage, not decorative accents only
- interaction states that feel designed, not default

## Command routing

If invoked with no subcommand, treat this as the command menu:

| Command | Use when |
|---|---|
| `shape` | plan UI/UX direction before coding |
| `craft` | build a feature end-to-end with strong UX/UI quality |
| `critique` | evaluate UX and visual quality |
| `audit` | run technical UI checks: a11y, responsiveness, performance, theming |
| `polish` | do a final pre-ship detail pass |
| `layout` | fix spacing, composition, and hierarchy |
| `typeset` | improve typography and readability |
| `clarify` | improve labels, microcopy, and error messages |
| `adapt` | improve responsiveness and device fit |
| `animate` | add purposeful motion and micro-interactions |
| `delight` | add personality and memorable touches |
| `distill` | simplify a noisy or cluttered UI |
| `harden` | strengthen edge cases, empty states, and resilience |
| `optimize` | improve UI performance |
| `quieter` | tone down a visually aggressive design |
| `bolder` | make a bland design more distinctive |
| `colorize` | add intentional color strategy to a flat UI |
| `onboard` | improve first-run, empty, and activation flows |

If a subcommand is provided, apply the matching reference:
- [shape](./reference/shape.md)
- [craft](./reference/craft.md)
- [audit](./reference/audit.md)
- [polish](./reference/polish.md)
- [layout](./reference/layout.md)
- [typeset](./reference/typeset.md)
- [clarify](./reference/clarify.md)

If the subcommand is not listed above, still apply the core rules and interpret the request as a high-craft frontend improvement task.

## Shared design laws

### Color
- Use project tokens first.
- Avoid pure black/white if the system already uses tinted neutrals.
- Pick a deliberate color strategy: restrained, committed, full palette, or drenched.
- Keep semantic colors consistent.

### Typography
- Build hierarchy with contrast in size and weight.
- Keep line length readable.
- Avoid flat type scales and accidental wrapping.

### Layout
- Use spacing rhythm, not uniform monotony.
- Prefer intentional structure over wrapping every area in cards.
- Nested cards are almost always a sign to rethink the layout.

### Motion
- Use motion to improve orientation and feedback, not just decoration.
- Prefer transform/opacity animations.
- Respect reduced motion.
- Avoid bounce/elastic motion unless the product language truly calls for it.

### Copy
- Remove redundant text.
- Use consistent terminology.
- Favor direct, useful, product-appropriate language.

## Output expectations

When using this skill:
- be concrete, not vague
- point to specific files/components/surfaces
- explain the highest-value changes first
- separate structural UX issues from cosmetic issues
- preserve maintainability while improving craft

When implementing:
- follow the existing tech stack and conventions
- prefer real code over abstract design advice
- keep edits surgical unless the user asked for a broader redesign
