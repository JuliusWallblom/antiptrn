import { useParams, Link } from "react-router-dom";

const privacyContent = {
  title: "Privacy Policy",
  effectiveDate: "January 18, 2026",
  sections: [
    {
      heading: "What We Collect",
      content: `We collect minimal data for analytics purposes:
- User agent string (browser/client type)
- Timestamp of download

That's it.`,
    },
    {
      heading: "What We Don't Collect",
      content: `We do not collect:
- Source code or file contents
- AI-generated responses
- Personal identifiers
- Usage patterns or interaction logs
- IP addresses`,
    },
    {
      heading: "How Antiptrn Works",
      content: `Antiptrn is a markdown file that runs entirely within your AI coding tool. It is static text—it does not phone home, track usage, or transmit any data.

When you run /antiptrn, the instructions are processed locally by your AI tool. We have no visibility into this process.`,
    },
    {
      heading: "Third-Party AI Tools",
      content: `Antiptrn works with Claude Code, Cursor, OpenCode, Codex, and Antigravity. Each of these tools has its own privacy policy. We have no control over their data practices.

Please review:
- Claude Code: Anthropic's privacy policy
- Cursor: Cursor's privacy policy
- OpenCode: OpenCode's privacy policy
- Codex: OpenAI's privacy policy
- Antigravity: Google's privacy policy`,
    },
    {
      heading: "Data Retention",
      content: `Download logs (user agent and timestamp only) are retained indefinitely for analytics. No other data is stored because none is collected.`,
    },
    {
      heading: "Security",
      content: `Our minimal logs are stored in secure databases with restricted access. Since we don't collect sensitive data, there's little to protect—but we protect what we have.`,
    },
    {
      heading: "Children's Privacy",
      content: `Antiptrn is not directed at children under 13. We do not knowingly collect data from minors.`,
    },
    {
      heading: "Changes",
      content: `We may update this policy. Changes will be posted here with a new effective date.`,
    },
    {
      heading: "Contact",
      content: `Questions? Email hello@antiptrn.dev`,
    },
  ],
};

const termsContent = {
  title: "Terms of Use",
  effectiveDate: "January 18, 2026",
  sections: [
    {
      heading: "What Antiptrn Is",
      content: `Antiptrn is a markdown file (antiptrn.md) that provides prompt instructions to AI coding assistants. It is not software, not an application, and not a service. It's text.`,
    },
    {
      heading: "Installation",
      content: `The installation script downloads antiptrn.md to your local machine and places it in the appropriate directory for your AI coding tool. That's all it does.`,
    },
    {
      heading: "How It Works",
      content: `When you run /antiptrn in a supported tool, the markdown content is sent as instructions to the AI. The AI processes these instructions locally. We have no access to your code, files, AI responses, or any data processed by your tool.`,
    },
    {
      heading: "Third-Party AI Tools",
      content: `Antiptrn is designed for use with Claude Code, Cursor, OpenCode, Codex, and Antigravity. We are not affiliated with Anthropic, Cursor Inc., OpenCode, OpenAI, or Google. Your use of those tools is governed by their respective terms.`,
    },
    {
      heading: "Your Code",
      content: `You retain full ownership of your code. Antiptrn does not claim any rights to your source code, generated output, or any other intellectual property.`,
    },
    {
      heading: "No Warranty",
      content: `ANTIPTRN IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE MAKE NO GUARANTEES ABOUT THE ACCURACY, USEFULNESS, OR RELIABILITY OF THE INSTRUCTIONS. AI TOOLS MAY INTERPRET THE INSTRUCTIONS DIFFERENTLY OR INCORRECTLY. USE AT YOUR OWN DISCRETION.`,
    },
    {
      heading: "Limitation of Liability",
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY DAMAGES ARISING FROM YOUR USE OF ANTIPTRN, INCLUDING BUT NOT LIMITED TO: BUGS INTRODUCED BY AI, DATA LOSS, SECURITY VULNERABILITIES, OR ANY OTHER ISSUES. OUR TOTAL LIABILITY SHALL NOT EXCEED $100.`,
    },
    {
      heading: "Indemnification",
      content: `You agree to indemnify and hold us harmless from any claims arising from your use of antiptrn or the code generated while using it.`,
    },
    {
      heading: "Governing Law",
      content: `These terms are governed by the laws of the State of New York, without regard to conflict of law principles.`,
    },
    {
      heading: "Changes",
      content: `We may update these terms. Continued use after changes constitutes acceptance.`,
    },
    {
      heading: "Contact",
      content: `Questions? Email hello@antiptrn.dev`,
    },
  ],
};

const content: Record<string, typeof privacyContent> = {
  privacy: privacyContent,
  terms: termsContent,
};

export function Legal() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? content[slug] : null;

  if (!page) {
    return (
      <div className="min-h-screen bg-black text-zinc-300">
        <div className="max-w-3xl mx-auto px-12 py-24">
          <h1 className="text-2xl mb-4">Page not found</h1>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-300">
      <div className="max-w-3xl mx-auto px-12 py-24">
        <header className="mb-16">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground text-sm mb-8 inline-block"
          >
            &larr; Back
          </Link>
          <h1 className="text-3xl font-bricolage mb-2">{page.title}</h1>
          <p className="text-muted-foreground text-sm">
            Effective: {page.effectiveDate}
          </p>
        </header>

        <div className="space-y-10">
          {page.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-lg text-white mb-3">{section.heading}</h2>
              <div className="text-muted-foreground whitespace-pre-line">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-24 pt-8 text-muted-foreground/60 text-xs">
          <span>&copy; 2026 antiptrn</span>
        </footer>
      </div>
    </div>
  );
}
