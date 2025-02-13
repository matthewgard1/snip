import { Check, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface SnippetCardProps {
  title: string;
  description: string;
  language: string;
  code: string;
}

const languageEmojis: Record<string, string> = {
  bash: '🐚',
  typescript: '💙',
  javascript: '💛',
  python: '🐍',
  rust: '⚙️',
  go: '🦫',
};

export function SnippetCard({ title, description, language, code }: SnippetCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = code.split('\n');
  const firstLine = codeLines[0];
  const hasMoreLines = codeLines.length > 1;
  const emoji = languageEmojis[language.toLowerCase()] || '📝';

  return (
    <div className="bg-gray-800 rounded overflow-hidden border border-gray-700">
      <div className="px-1 py-0.5 bg-gray-700">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded hover:bg-gray-600 transition-colors group"
            title="Copy code"
          >
            <span className="text-sm group-hover:scale-110 transition-transform">
              {copied ? '✓' : emoji}
            </span>
          </button>
          <div className="flex-1 min-w-0 flex items-baseline gap-1.5">
            <h3 className="text-sm font-semibold text-white whitespace-nowrap">{title}</h3>
            <p className="text-gray-300 text-xs truncate">— {description}</p>
          </div>
          <span className="flex-shrink-0 text-xs font-mono text-gray-400 bg-gray-600 px-1.5 py-0.5 rounded">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex-shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-600 hover:bg-gray-500 text-white text-xs transition-colors"
          >
            {copied ? (
              <>
                <Check size={12} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="bg-gray-800">
        <div className="flex items-start">
          <pre className="flex-1 p-1.5 overflow-x-auto font-mono text-xs">
            <code className="text-gray-100 whitespace-pre">{firstLine}</code>
          </pre>
          {hasMoreLines && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-0.5 p-1.5 text-xs text-gray-400 hover:text-gray-300"
            >
              {expanded ? (
                <>
                  <span>Show less</span>
                  <ChevronUp size={12} />
                </>
              ) : (
                <>
                  <span>Show more</span>
                  <ChevronDown size={12} />
                </>
              )}
            </button>
          )}
        </div>
        {expanded && hasMoreLines && (
          <pre className="px-1.5 pb-1.5 overflow-x-auto font-mono text-xs">
            <code className="text-gray-100 whitespace-pre">
              {codeLines.slice(1).join('\n')}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
}