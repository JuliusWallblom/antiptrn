# Anti-Slop Coding Guidelines

These guidelines apply to all code generation, modification, and review tasks. Follow them precisely.

## Core Principle

Make the minimal change necessary. Every line added or modified must be justified by the task requirements.

---

## 1. Surgical Changes Only

- Touch only what the task requires
- Do not refactor adjacent code unless explicitly asked
- Do not "improve" unrelated code
- Do not add features beyond the scope
- If fixing a bug, fix only that bug

**Bad:**
```typescript
// Task: Fix typo in error message
function validate(input: string): boolean {
  // Added input trimming for safety
  const trimmed = input.trim();
  // Added length check
  if (trimmed.length === 0) {
    throw new Error("Input cannot be empty"); // Fixed: was "emtpy"
  }
  return trimmed.length > 0;
}
```

**Good:**
```typescript
// Task: Fix typo in error message
throw new Error("Input cannot be empty"); // was "emtpy"
```

---

## 2. Code Simplicity

Prefer the simplest working solution. Reduce abstraction unless it serves a clear purpose.

- Use early returns over nested conditionals
- Inline trivial one-use variables
- Avoid wrapper functions that add no value
- Prefer built-in methods over manual implementations
- Remove dead code paths

**Bad:**
```typescript
const isValid = checkValidity(data);
if (isValid) {
  const result = processData(data);
  return result;
}
return null;
```

**Good:**
```typescript
if (!checkValidity(data)) return null;
return processData(data);
```

---

## 3. Match Existing Patterns

Before writing, observe the codebase conventions for:

- Naming: `camelCase` vs `snake_case`, prefixes, suffixes
- File structure: where things live, how they're organized
- Error handling: how errors are thrown, caught, logged
- Async patterns: callbacks vs promises vs async/await
- Import style: named vs default, absolute vs relative paths
- Formatting: spacing, braces, line length

Do not introduce new patterns. Mirror what exists.

---

## 4. Comment Discipline

Delete comments that:
- Restate what the code obviously does
- Describe basic language features
- Add no information beyond the code itself

**Delete these:**
```typescript
// Loop through the array
for (const item of items) {
  // Call the process function
  process(item); // Process the item
}

// Initialize counter to zero
let count = 0;
```

**Keep these:**
```typescript
// Skip soft-deleted records per GDPR compliance
for (const item of items.filter(i => !i.deleted)) {

// Offset by 1 because the API uses 1-based indexing
let count = 1;
```

---

## 5. Comment Formatting

When comments are necessary, and add them where they clarify non-obvious logic:

- Be terse and precise
- No filler words ("basically", "simply", "just", "actually")
- No conversational tone
- State facts, not intentions or feelings
- Use imperative mood for instructions
- Add comments for complex algorithms, business logic, or non-obvious decisions

**Bad:**
```typescript
// This function is basically responsible for handling the user
// authentication flow. It simply takes the credentials and
// validates them against our database.
```

**Good:**
```typescript
// Validates credentials against the auth database.
```

---

## 6. Null/Undefined Checks

Remove defensive checks when:
- TypeScript types guarantee the value exists
- The value was just assigned or validated
- The code path already ensures presence
- The check is redundant with a prior check

**Bad:**
```typescript
function processUser(user: User) {
  if (!user) return; // User is required by type
  if (user.name) {   // name is non-optional in User type
    console.log(user.name);
  }
}
```

**Good:**
```typescript
function processUser(user: User) {
  console.log(user.name);
}
```

Only add null checks when:
- The type explicitly includes `null` or `undefined`
- External/untyped data is involved
- Runtime conditions could produce nullish values

---

## 7. Try/Catch Hygiene

Remove try/catch blocks when:
- The wrapped code cannot throw
- Errors should propagate to a higher handler
- The catch block just rethrows
- You're in an already-trusted internal path

**Bad:**
```typescript
function add(a: number, b: number): number {
  try {
    return a + b;
  } catch (error) {
    console.error("Failed to add numbers:", error);
    throw error;
  }
}
```

**Good:**
```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

Keep try/catch when:
- Calling external APIs or I/O operations
- Parsing untrusted input
- You need to transform or handle specific errors
- Resource cleanup is required (finally)

---

## 8. Type Integrity

Never use `as any` or unsafe casts to silence type errors. Fix the underlying type issue instead.

**Bad:**
```typescript
const data = response.body as any;
const user = data.user as User;
```

**Good:**
```typescript
interface ApiResponse {
  user: User;
}
const data: ApiResponse = await response.json();
const user = data.user;
```

Acceptable casts:
- Narrowing with type guards: `if (isUser(data)) { ... }`
- Const assertions: `as const`
- Discriminated unions after checking the discriminant
- When interfacing with genuinely untyped external code (document it)

---

## 9. No Slop Phrases

Never include these in code or comments:
- "for safety"
- "to be safe"
- "just in case"
- "for robustness"
- "handle edge cases" (without specifying which)
- "improved error handling" (without specifying how)
- "added validation" (without specifying what)

---

## 10. Review Checklist

Before submitting any change:

- [ ] Does every modified line relate to the task?
- [ ] Can any added code be removed while still completing the task?
- [ ] Do new patterns match existing codebase conventions?
- [ ] Are all comments necessary and precise?
- [ ] Are null checks justified by actual nullability?
- [ ] Are try/catch blocks around actually-throwing code?
- [ ] Are all type assertions backed by runtime guarantees?
- [ ] Is this the simplest solution that works?

---

## Application

When reviewing or modifying code:

1. First, identify slop (using criteria above)
2. Remove it completely—do not soften or comment it out
3. Verify functionality is preserved
4. Make no other changes

When generating new code:

1. Write the minimal implementation first
2. Add only what is explicitly required
3. Match the surrounding code exactly
4. Omit comments unless they add non-obvious information
