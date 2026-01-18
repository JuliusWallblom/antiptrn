# Anti-Slop Fix

Rewrite the code applying all corrections below. Output the fixed code only.

---

## 1. Revert Unnecessary Changes

Undo any modifications not explicitly requested:

- Unrelated refactors
- "Improvements" to adjacent code
- Added features beyond scope
- Style changes to untouched code
- Renamed variables that didn't need renaming

---

## 2. Simplify

Rewrite to minimal form:

- Inline trivial single-use variables
- Convert nested conditionals to early returns
- Remove wrapper functions that add no value
- Replace manual implementations with built-ins
- Delete dead code paths

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

Rewrite to match the codebase exactly:

- Naming conventions
- Error handling approach
- Async patterns
- Import style
- Formatting

---

## 4. Strip Obvious Comments

Delete every comment that restates what the code does:

```typescript
// DELETE:
// Loop through users
// Initialize the counter
// Call the API
// Return the result
// Check if null
```

Keep only comments explaining WHY or non-obvious context.

---

## 5. Rewrite Remaining Comments

Make them terse and precise:

- Under 10 words
- No filler ("basically", "simply", "just")
- No conversational tone
- Facts only

```typescript
// Before
// This helper function is used to basically format the user's
// display name by combining their first and last name together

// After
// Formats "First Last" display name
```

---

## 6. Strip Unjustified Null Checks

Remove null/undefined checks where:

- Type signature guarantees presence
- Prior check already validated
- Value was just assigned

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

## 7. Strip Unnecessary Try/Catch

Remove try/catch around:

- Synchronous code that cannot throw
- Pure calculations
- Property access on known objects
- Catches that just rethrow

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

Replace every `as any` and unsafe cast with proper types:

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

## 9. Strip Slop Phrases

Delete these from code and comments:

- "for safety" / "to be safe"
- "just in case"
- "for robustness"
- "handle edge cases" (unspecified)
- "improved error handling" (unspecified)

---

## Output

Fixed code only. After the code block, list what you changed:

```
Fixed:
- Removed null check on X
- Stripped try/catch from Y
- Deleted 4 obvious comments
- Replaced `as any` with ApiResponse interface
- Inlined variable Z
- Early return instead of nested conditional
```
