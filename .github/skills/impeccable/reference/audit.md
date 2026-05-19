# Audit

Run a technical UI audit. Focus on measurable implementation quality, not taste alone.

## Dimensions
1. Accessibility
2. Performance
3. Theming and token usage
4. Responsive behavior
5. Anti-pattern detection

## Severity
- **P0** blocking
- **P1** major
- **P2** minor
- **P3** polish

## Report format
- health summary
- top issues by severity
- systemic patterns
- positive findings
- recommended next actions

## What to verify
- contrast, labeling, keyboard/focus support
- layout thrash or render-heavy UI mistakes
- hardcoded colors vs theme tokens
- breakpoints, overflow, touch-target sizing
- repetitive AI-style UI tropes and weak hierarchy

Do not fix issues in this mode unless the user explicitly asks.
