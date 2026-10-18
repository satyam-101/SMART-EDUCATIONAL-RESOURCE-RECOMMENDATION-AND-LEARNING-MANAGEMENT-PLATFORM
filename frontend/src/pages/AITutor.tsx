import { useRef, useEffect, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { SentIcon, SparklesIcon, RefreshCwIcon } from '../components/icons';

import api from '../api';

type Msg = {
  id: number;
  role: 'user' | 'ai';
  text: string;
  isError?: boolean;
};

const MAX_HISTORY = 20;

function CodeBlock({ children, className, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const codeString = String(children).replace(/\n$/, '');
  const language = className?.replace('language-', '') || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-3 rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden font-mono text-xs shadow-md">
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/80 px-3.5 py-1.5 text-zinc-400">
        <span className="text-[11px] font-sans uppercase font-medium tracking-wider text-zinc-500">
          {language || 'Code'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-[11px] text-zinc-400 hover:text-white transition cursor-pointer font-sans flex items-center gap-1"
        >
          {copied ? <span className="text-emerald-400 font-semibold">✓ Copied!</span> : 'Copy code'}
        </button>
      </div>
      <pre className="p-3.5 overflow-x-auto text-zinc-200">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
}

export function AITutor() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 1,
      role: 'ai',
      text: "Hello! I'm ZUNO AI, your interactive coding and computer science tutor. Ask me to break down concepts, walk through algorithms step-by-step, review code, or test your understanding with a mini-quiz.",
    },
  ]);
  const [input, setInput] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [failedQuestion, setFailedQuestion] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = useCallback(async (textToSend?: string) => {
    const questionText = (textToSend ?? input).trim();
    if (!questionText || loading) return;

    setFailedQuestion(null);
    setInput('');

    // If textToSend wasn't passed directly, it's a new question from input
    const userMessage: Msg = { id: Date.now(), role: 'user', text: questionText };
    setMessages((m) => [...m, userMessage]);
    setLoading(true);

    // Build history from recent messages (limit to MAX_HISTORY)
    const allMessages = [...messages, userMessage].filter((m) => !m.isError);
    const recentMessages = allMessages.slice(-MAX_HISTORY);
    const history = recentMessages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.text,
    }));

    try {
      const res = await api.askAiTutor({
        question: questionText,
        history,
      });

      const aiMessage: Msg = {
        id: Date.now() + 1,
        role: 'ai',
        text: res.answer,
      };
      setMessages((m) => [...m, aiMessage]);
    } catch (err: any) {
      setFailedQuestion(questionText);
      const errorMessage: Msg = {
        id: Date.now() + 1,
        role: 'ai',
        isError: true,
        text: `Unable to get a response: ${err?.message || 'Network error'}. You can try sending the question again.`,
      };
      setMessages((m) => [...m, errorMessage]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const retryLast = () => {
    if (!failedQuestion) return;
    // Remove the error message before retrying
    setMessages((prev) => prev.filter((m) => !m.isError));
    send(failedQuestion);
  };

  return (
    <div className="mx-auto flex max-w-5xl gap-6 p-4 sm:p-6">
      {/* Sidebar with suggested questions */}
      

      {/* Main chat interface */}
      <div className="flex min-w-0 flex-1 flex-col h-[calc(100vh-8rem)]">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md">
            <SparklesIcon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-zinc-100">AI Tutor Assistant</h1>
            <p className="text-xs text-zinc-400">Context-aware programming coach & explanation guide</p>
          </div>
        </div>

        {/* Message feed */}
        <div className="mt-4 flex-1 space-y-4 overflow-y-auto pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn('flex gap-3', m.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
            >
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-sm',
                  m.role === 'user'
                    ? 'bg-violet-600 text-white'
                    : m.isError
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-zinc-800 text-violet-300'
                )}
              >
                {m.role === 'user' ? 'U' : <SparklesIcon className="h-4 w-4" />}
              </div>

              <div
                className={cn(
                  'max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm',
                  m.role === 'user'
                    ? 'bg-violet-600 text-white'
                    : m.isError
                    ? 'bg-red-950/30 text-red-200 border border-red-500/30'
                    : 'bg-zinc-900 text-zinc-200 border border-zinc-800'
                )}
              >
                {m.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{m.text}</p>
                ) : m.isError ? (
                  <div>
                    <p className="text-red-300">{m.text}</p>
                    {failedQuestion && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={retryLast}
                        className="mt-3 border-red-500/40 text-red-200 hover:bg-red-500/20"
                      >
                        <RefreshCwIcon className="h-3.5 w-3.5" /> Retry Question
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none text-xs sm:text-sm space-y-2">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ node, ...props }) => <h1 className="text-base font-bold text-zinc-100 mt-3 mb-1" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-sm font-bold text-violet-300 mt-3 mb-1" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xs sm:text-sm font-semibold text-zinc-200 mt-2 mb-1" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed text-zinc-300" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2 space-y-1 text-zinc-300" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-2 space-y-1 text-zinc-300" {...props} />,
                        li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-semibold text-zinc-100" {...props} />,
                        code: ({ node, className, children, ...props }: any) => {
                          const isInline = !className && !String(children).includes('\n');
                          return isInline ? (
                            <code className="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-[11px] text-violet-300" {...props}>
                              {children}
                            </code>
                          ) : (
                            <CodeBlock className={className} {...props}>
                              {children}
                            </CodeBlock>
                          );
                        },
                        table: ({ node, ...props }) => (
                          <div className="my-2.5 overflow-x-auto rounded-lg border border-zinc-800">
                            <table className="w-full text-left text-xs text-zinc-300" {...props} />
                          </div>
                        ),
                        thead: ({ node, ...props }) => <thead className="bg-zinc-800/60 text-zinc-100" {...props} />,
                        th: ({ node, ...props }) => <th className="border-b border-zinc-700/60 px-3 py-2 font-semibold" {...props} />,
                        td: ({ node, ...props }) => <td className="border-b border-zinc-800/60 px-3 py-2" {...props} />,
                      }}
                    >
                      {m.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing/loading indicator */}
          {loading && (
            <div className="flex gap-3 items-center">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-violet-400">
                <SparklesIcon className="h-4 w-4" />
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-zinc-400 mr-2">ZUNO is thinking</span>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="inline-block h-2 w-2 animate-bounce rounded-full bg-violet-400"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input box */}
        <div className="mt-3 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-2 shadow-lg">
          <div className="flex items-end gap-2">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask anything about coding, DSA, or course concepts…"
              disabled={loading}
              className="min-h-[44px] flex-1 resize-none rounded-xl bg-zinc-800/50 px-4 py-3 text-xs sm:text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:bg-zinc-800/80 disabled:opacity-50"
            />
            <Button
              onClick={() => send()}
              size="icon"
              disabled={loading || !input.trim()}
              className="h-11 w-11 shrink-0 rounded-xl disabled:opacity-40"
              title="Send question"
            >
              <SentIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-1.5 flex items-center justify-between px-2 text-[11px] text-zinc-500">
            <span>Press Enter to send · Shift+Enter for new line</span>
            {loading && <span className="text-violet-400">Generating explanation...</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
