import { Badge } from "@/components/ui/badge";
import { Check, Copy } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="bg-card rounded-md p-4 overflow-x-auto text-sm font-mono">
    <code className="text-muted-foreground">{children}</code>
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
  const [installs, setInstalls] = useState<number | null>(null);

  const installCommand = "curl -fsSL https://antiptrn.dev/install | bash";

  useEffect(() => {
    fetch("/api/count")
      .then((res) => res.json())
      .then((data) => setInstalls(data.count))
      .catch(() => { });
  }, []);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300">
      <div className="max-w-3xl mx-auto px-12 py-24">
        <header className="mb-12">

          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bricolage">/antiptrn</h1>
            <Badge variant="secondary">
              <NumberFlow value={installs ?? 0} /> installs
            </Badge>
          </div>
          <p className="text-muted-foreground max-w-xl">
            A proactive & retroactive guard that catches AI slop. Enforces precision, removes bloat, and makes AI-generated code indistinguishable from human-written. Works with <a href="https://claude.com/claude-code" target="_blank" className="underline underline-offset-3 decoration-[1px] decoration-muted-foreground/40 hover:decoration-foreground text-muted-foreground hover:text-foreground transition-colors">Claude Code</a>, <a href="https://cursor.sh" target="_blank" className="underline underline-offset-3 decoration-[1px] decoration-muted-foreground/40 hover:decoration-foreground text-muted-foreground hover:text-foreground transition-colors">Cursor</a>, <a href="https://opencode.dev" target="_blank" className="underline underline-offset-3 decoration-[1px] decoration-muted-foreground/40 hover:decoration-foreground text-muted-foreground hover:text-foreground transition-colors">OpenCode</a>, <a href="https://github.com/openai/codex" target="_blank" className="underline underline-offset-3 decoration-[1px] decoration-muted-foreground/40 hover:decoration-foreground text-muted-foreground hover:text-foreground transition-colors">Codex</a>, and <a href="https://developers.google.com/gemini/gemini-cli" target="_blank" className="underline underline-offset-3 decoration-[1px] decoration-muted-foreground/40 hover:decoration-foreground text-muted-foreground hover:text-foreground transition-colors">Antigravity</a>.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-xl mb-4">
            Installation
          </h2>
          <div
            onClick={copyToClipboard}
            className="bg-card rounded-md p-4 font-mono text-sm cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <code className="text-muted-foreground"><span className="text-muted-foreground/50 mr-2">$</span>{installCommand}</code>
              <span className="transition-colors group-hover:text-foreground text-muted-foreground">
                {
                  copied ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )
                }
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground/60 mt-3">
            Auto-detects your coding agent.
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

          <Section number="5" title="Fix and Add Comments">
            <p>Rewrite kept comments to be terse and precise. Add comments where they clarify non-obvious logic:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Terse (under 10 words if possible)</li>
              <li>Precise (specific, not vague)</li>
              <li>
                Non-conversational (no "we", "let's", "basically", "simply",
                "just")
              </li>
              <li>Factual (state what is, not what you intended)</li>
              <li>Add comments for complex algorithms, business logic, or non-obvious decisions</li>
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
            </ul>
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
            <h2 className="text-lg text-white">Output</h2>
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

        <footer className="mt-24 pt-8 text-muted-foreground/60 text-xs">
          <div className="flex justify-between items-center">
            <span>&copy; 2026 antiptrn</span>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-muted-foreground transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-muted-foreground transition-colors">
                Terms
              </a>
              <a href="mailto:hello@antiptrn.dev" className="hover:text-muted-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
