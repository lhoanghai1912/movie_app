---
name: karpathy-guidelines
description: >
  Behavioral guidelines để giảm lỗi phổ biến khi AI viết code. Dựa trên
  quan sát của Andrej Karpathy. Use when: viết code mới, review code, refactor,
  debug — luôn áp dụng để tránh over-engineering, surgical changes, surface assumptions.
license: MIT
metadata:
  source: https://github.com/forrestchang/andrej-karpathy-skills
  original: https://x.com/karpathy/status/2015883857489522876
---

# Karpathy Guidelines

Behavioral guidelines to reduce common LLM coding mistakes, derived from
[Andrej Karpathy's observations](https://x.com/karpathy/status/2015883857489522876) on LLM coding pitfalls.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks (obvious one-liners, typo fixes), use judgment.

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- **State assumptions explicitly.** If uncertain, ask rather than guess.
- **Present multiple interpretations** — don't pick silently when ambiguity exists.
- **Push back when warranted** — if a simpler approach exists, say so.
- **Stop when confused** — name what's unclear and ask for clarification.

### ✅ Working example

```
User: "Add validation to the form"

Agent: "I see two interpretations:
  A) Client-side only (instant feedback, no API call)
  B) Client + server-side (validated against backend rules)

  Which do you prefer? I'll assume A unless told otherwise."
```

---

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

Combat the tendency toward over-engineering:

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- No adding docstrings/comments to code you didn't change.
- If you write 200 lines and it could be 50, rewrite it.

**The test:** Would a senior engineer say this is overcomplicated? If yes, simplify.

### ❌ Over-engineered (avoid)

```tsx
// Asked: "show a loading spinner"
// Produced: generic reusable LoadingSystem with registry, strategies, and plugin architecture
class LoadingStrategyRegistry {
  private strategies: Map<string, LoadingStrategy> = new Map();
  register(name: string, strategy: LoadingStrategy) { ... }
  // ... 150 more lines
}
```

### ✅ Simple (correct)

```tsx
// Asked: "show a loading spinner"
{
  isLoading && <ActivityIndicator size="small" color={theme.primary} />;
}
```

---

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, **mention it — don't delete it**.

When your changes create orphans:

- **Remove** imports/variables/functions that **YOUR** changes made unused.
- Don't remove pre-existing dead code unless explicitly asked.

**The test:** Every changed line should trace directly to the user's request.

### ✅ Surgical change

```
User: "Fix the typo in the error message on line 42"

Agent changes: Only line 42.
Does NOT: reformat the file, rename variables, add missing types.
```

### ❌ Drive-by refactoring (avoid)

```
User: "Fix the typo in the error message on line 42"

Agent changes:
- Line 42 (typo fix ✅)
- Lines 1-10 (added missing imports that weren't needed ❌)
- Lines 50-80 (refactored adjacent function "while I was here" ❌)
- Lines 90-95 (removed dead code not related to task ❌)
```

---

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform imperative tasks into verifiable goals:

| Imperative       | Goal-Driven                                           |
| ---------------- | ----------------------------------------------------- |
| "Add validation" | "Write tests for invalid inputs, then make them pass" |
| "Fix the bug"    | "Write a test that reproduces it, then make it pass"  |
| "Refactor X"     | "Ensure tests pass before and after"                  |

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let the agent loop independently.
Weak criteria ("make it work") require constant clarification.

---

## How to Know It's Working

These guidelines are working if you see:

- **Fewer unnecessary changes in diffs** — only requested changes appear
- **Fewer rewrites due to overcomplication** — code is simple the first time
- **Clarifying questions come before implementation** — not after mistakes
- **Clean, minimal PRs** — no drive-by refactoring or "improvements"

---

## Áp dụng trong HaiAu

| Principle             | HaiAu Application                                                                      |
| --------------------- | -------------------------------------------------------------------------------------- |
| Think Before Coding   | Luôn hỏi khi yêu cầu mơ hồ. Đừng tự chọn silent.                                       |
| Simplicity First      | Ưu tiên pattern đã có (`error-handling`, `store-patterns`). Không tạo abstraction mới. |
| Surgical Changes      | Chỉ sửa file được yêu cầu. Không tự refactor code liền kề.                             |
| Goal-Driven Execution | Dùng checklist `[ ]` → `[x]` trong mỗi task. Confirm sau mỗi bước.                     |
