# Anti-Slop Cleanup

Review the code you just generated and apply these corrections. Output only the corrected code.

---

## 1. Remove Unnecessary Changes

Identify and revert any modifications that were not explicitly requested:

- Unrelated refactors
- "Improvements" to adjacent code
- Added features beyond scope
- Style changes to untouched code
- Renamed variables that didn't need renaming

If you touched it and didn't need to, undo it.

---

## 2. Simplify

Reduce the code to its minimal form:

- Inline trivial single-use variables
- Convert nested conditionals to early returns
- Remove wrapper functions that add no value
- Replace manual implementations with built-ins
- Delete dead code paths
- Collapse verbose constructs

```typescript
// Before
const isValid = validate(x);
if (isValid) {
  const result = transform(x);
  return result;
}
return null;

// After
if (!validate(x)) return null;
return transform(x);
```

---

## 3. Match Existing Patterns

Compare your code against the existing codebase. Fix any deviations in:

- Naming conventions
- File/folder structure
- Error handling approach
- Async patterns (don't mix callbacks/promises/async-await)
- Import style
- Formatting

Your code should be indistinguishable from the surrounding code.

---

## 4. Delete Obvious Comments

Remove every comment that restates what the code does:

```typescript
// DELETE THESE:
// Loop through users
// Initialize the counter
// Call the API
// Return the result
// Check if null
// Handle the error
```

Keep only comments that explain WHY or provide non-obvious context.

---

## 5. Fix Remaining Comments

For comments you kept, rewrite them to be:

- Terse (under 10 words if possible)
- Precise (specific, not vague)
- Non-conversational (no "we", "let's", "basically", "simply", "just")
- Factual (state what is, not what you intended)

```typescript
// Before
// This helper function is used to basically format the user's
// display name by combining their first and last name together

// After
// Formats "First Last" display name
```

---

## 6. Remove Unjustified Null Checks

Delete null/undefined checks where:

- The type signature guarantees presence
- A prior check already validated
- The value was just assigned
- The code path ensures existence

```typescript
// Before
function process(user: User) {
  if (!user) return;
  if (user.name) {
    return user.name.toUpperCase();
  }
  return "";
}

// After
function process(user: User) {
  return user.name.toUpperCase();
}
```

---

## 7. Remove Unnecessary Try/Catch

Delete try/catch blocks around:

- Synchronous code that cannot throw
- Pure calculations
- Property access on known objects
- Code already in a trusted internal path
- Catches that just rethrow without transformation

```typescript
// Before
function double(n: number): number {
  try {
    return n * 2;
  } catch (error) {
    console.error("Failed to double:", error);
    throw error;
  }
}

// After
function double(n: number): number {
  return n * 2;
}
```

---

## 8. Fix Type Assertions

Find and fix every `as any` and unsafe type cast:

- Replace `as any` with proper typing
- Replace `as Type` with type guards where runtime checking is needed
- Add proper interface definitions for external data
- If truly unavoidable, add a comment explaining why

```typescript
// Before
const data = response.body as any;
const name = (data as User).name;

// After
interface ApiResponse {
  user: User;
}
const data = await response.json() as ApiResponse;
const name = data.user.name;
```

---

## 9. Remove Slop Phrases

Search and eliminate these phrases from code and comments:

- "for safety" / "to be safe"
- "just in case"
- "for robustness"
- "handle edge cases" (unspecified)
- "improved error handling" (unspecified)
- "added validation" (unspecified)
- "// TODO: handle errors"
- "// TODO: add validation"

Either implement the specific handling or remove the comment entirely.

---

## 10. Final Verification

Before outputting, confirm:

- [ ] Every change relates directly to the original request
- [ ] No code can be removed while preserving functionality
- [ ] Style matches the existing codebase exactly
- [ ] No comments state the obvious
- [ ] All remaining comments are terse and precise
- [ ] Every null check guards against actual nullability
- [ ] Every try/catch wraps actually-throwing code
- [ ] No `as any` or unjustified type casts remain
- [ ] No slop phrases remain

---

## Output

Provide the corrected code with no explanation. If you made significant corrections, list them briefly after the code block:

```
Removed:
- Unnecessary null check on line X
- Try/catch around pure function Y
- 4 obvious comments
- `as any` cast, added proper interface

Simplified:
- Inlined single-use variable Z
- Converted nested conditional to early return
```
