import { useState } from "react";

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-sm font-mono">
    <code className="text-zinc-300">{children}</code>
  </pre>
);

const Section = ({
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-4">
    <h2 className="text-lg font-normal text-white">
      {title}
    </h2>
    {children}
  </section>
);

export function Home() {
  const [copied, setCopied] = useState(false);

  const installCommand = "curl -fsSL https://antiptrn.com/install | bash";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-16">
          <h1 className="text-4xl font-bricolage mb-2">antiptrn</h1>
          <p className="text-muted-foreground">
            Anti-slop cleanup for AI-generated code
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-xl mb-4">
            Installation
          </h2>
          <div
            onClick={copyToClipboard}
            className="bg-muted rounded-lg p-4 font-mono text-sm cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <code className="text-zinc-300">{installCommand}</code>
              <span className="text-zinc-500 group-hover:text-zinc-400 text-xs">
                {copied ? "Copied!" : "Click to copy"}
              </span>
            </div>
          </div>
          <p className="text-sm text-zinc-500 mt-3">
            Auto-detects Claude Code, Cursor, OpenCode, Codex, and Antigravity
          </p>
        </section>

        <div className="space-y-12 text-zinc-400">
          <Section number="1" title="Remove Unnecessary Changes">
            <p>
              Identify and revert any modifications that were not explicitly
              requested:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Unrelated refactors</li>
              <li>"Improvements" to adjacent code</li>
              <li>Added features beyond scope</li>
              <li>Style changes to untouched code</li>
              <li>Renamed variables that didn't need renaming</li>
            </ul>
            <p className="text-zinc-500 italic">
              If you touched it and didn't need to, undo it.
            </p>
          </Section>

          <Section number="2" title="Simplify">
            <p>Reduce the code to its minimal form:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Inline trivial single-use variables</li>
              <li>Convert nested conditionals to early returns</li>
              <li>Remove wrapper functions that add no value</li>
              <li>Replace manual implementations with built-ins</li>
              <li>Delete dead code paths</li>
              <li>Collapse verbose constructs</li>
            </ul>
            <CodeBlock>
              {`// Before
const isValid = validate(x);
if (isValid) {
  const result = transform(x);
  return result;
}
return null;

// After
if (!validate(x)) return null;
return transform(x);`}
            </CodeBlock>
          </Section>

          <Section number="3" title="Match Existing Patterns">
            <p>
              Compare your code against the existing codebase. Fix any
              deviations in:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Naming conventions</li>
              <li>File/folder structure</li>
              <li>Error handling approach</li>
              <li>Async patterns (don't mix callbacks/promises/async-await)</li>
              <li>Import style</li>
              <li>Formatting</li>
            </ul>
            <p className="text-zinc-500 italic">
              Your code should be indistinguishable from the surrounding code.
            </p>
          </Section>

          <Section number="4" title="Delete Obvious Comments">
            <p>Remove every comment that restates what the code does:</p>
            <CodeBlock>
              {`// DELETE THESE:
// Loop through users
// Initialize the counter
// Call the API
// Return the result
// Check if null
// Handle the error`}
            </CodeBlock>
            <p className="text-zinc-500">
              Keep only comments that explain WHY or provide non-obvious
              context.
            </p>
          </Section>

          <Section number="5" title="Fix Remaining Comments">
            <p>For comments you kept, rewrite them to be:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Terse (under 10 words if possible)</li>
              <li>Precise (specific, not vague)</li>
              <li>
                Non-conversational (no "we", "let's", "basically", "simply",
                "just")
              </li>
              <li>Factual (state what is, not what you intended)</li>
            </ul>
            <CodeBlock>
              {`// Before
// This helper function is used to basically format the user's
// display name by combining their first and last name together

// After
// Formats "First Last" display name`}
            </CodeBlock>
          </Section>

          <Section number="6" title="Remove Unjustified Null Checks">
            <p>Delete null/undefined checks where:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>The type signature guarantees presence</li>
              <li>A prior check already validated</li>
              <li>The value was just assigned</li>
              <li>The code path ensures existence</li>
            </ul>
            <CodeBlock>
              {`// Before
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
}`}
            </CodeBlock>
          </Section>

          <Section number="7" title="Remove Unnecessary Try/Catch">
            <p>Delete try/catch blocks around:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Synchronous code that cannot throw</li>
              <li>Pure calculations</li>
              <li>Property access on known objects</li>
              <li>Code already in a trusted internal path</li>
              <li>Catches that just rethrow without transformation</li>
            </ul>
            <CodeBlock>
              {`// Before
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
}`}
            </CodeBlock>
          </Section>

          <Section number="8" title="Fix Type Assertions">
            <p>
              Find and fix every <code className="text-zinc-300">as any</code>{" "}
              and unsafe type cast:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                Replace <code className="text-zinc-300">as any</code> with
                proper typing
              </li>
              <li>
                Replace <code className="text-zinc-300">as Type</code> with type
                guards where runtime checking is needed
              </li>
              <li>Add proper interface definitions for external data</li>
              <li>If truly unavoidable, add a comment explaining why</li>
            </ul>
            <CodeBlock>
              {`// Before
const data = response.body as any;
const name = (data as User).name;

// After
interface ApiResponse {
  user: User;
}
const data = await response.json() as ApiResponse;
const name = data.user.name;`}
            </CodeBlock>
          </Section>

          <Section number="9" title="Remove Slop Phrases">
            <p>Search and eliminate these phrases from code and comments:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>"for safety" / "to be safe"</li>
              <li>"just in case"</li>
              <li>"for robustness"</li>
              <li>"handle edge cases" (unspecified)</li>
              <li>"improved error handling" (unspecified)</li>
              <li>"added validation" (unspecified)</li>
              <li>{"// TODO: handle errors"}</li>
              <li>{"// TODO: add validation"}</li>
            </ul>
            <p className="text-zinc-500">
              Either implement the specific handling or remove the comment
              entirely.
            </p>
          </Section>

          <Section number="10" title="Final Verification">
            <p>Before outputting, confirm:</p>
            <ul className="space-y-2 ml-2">
              <li className="flex items-start gap-2">
                <span className="text-zinc-600">[ ]</span>
                <span>Every change relates directly to the original request</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-600">[ ]</span>
                <span>No code can be removed while preserving functionality</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-600">[ ]</span>
                <span>Style matches the existing codebase exactly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-600">[ ]</span>
                <span>No comments state the obvious</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-600">[ ]</span>
                <span>All remaining comments are terse and precise</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-600">[ ]</span>
                <span>Every null check guards against actual nullability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-600">[ ]</span>
                <span>Every try/catch wraps actually-throwing code</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-600">[ ]</span>
                <span>
                  No <code className="text-zinc-300">as any</code> or unjustified
                  type casts remain
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-600">[ ]</span>
                <span>No slop phrases remain</span>
              </li>
            </ul>
          </Section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Output</h2>
            <p>
              Provide the corrected code with no explanation. If you made
              significant corrections, list them briefly after the code block:
            </p>
            <CodeBlock>
              {`Removed:
- Unnecessary null check on line X
- Try/catch around pure function Y
- 4 obvious comments
- \`as any\` cast, added proper interface

Simplified:
- Inlined single-use variable Z
- Converted nested conditional to early return`}
            </CodeBlock>
          </section>
        </div>

        <footer className="mt-24 pt-8 border-t border-zinc-800 text-zinc-600 text-sm">
          <div className="flex justify-between items-center">
            <span>&copy; 2026</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-zinc-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-zinc-400 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-zinc-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
