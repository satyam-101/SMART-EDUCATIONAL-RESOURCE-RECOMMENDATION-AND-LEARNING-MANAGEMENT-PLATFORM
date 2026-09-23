import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { SentIcon, SparklesIcon, BookmarkIcon } from '../components/icons';
import { mockAIPrompts } from '../data';

type Msg = { id: number; role: 'user' | 'ai'; text: string; saved?: boolean };

export function AITutor() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 1,
      role: 'ai',
      text: 'Welcome back! I can explain concepts, help you practice, and suggest a study plan for your next milestone.',
    },
  ]);
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useLocalStorage<string[]>('zuno:aiSaves', []);
  const prompts = mockAIPrompts.filter((prompt) => !query || prompt.toLowerCase().includes(query.toLowerCase())).slice(0, 6);

  const send = () => {
    const t = input.trim();
    if (!t) return;

    const userMessage: Msg = { id: Date.now(), role: 'user', text: t };
    const aiMessage: Msg = {
      id: Date.now() + 1,
      role: 'ai',
      text: 'Great question! Let’s break this down so it sticks.\n\n1) Start from first principles — what is the core idea really about?\n2) Relate it to something you already know.\n3) Solve one small example by hand, then scale.\n\nTry applying that pattern to what you just asked, and I’ll help you take the next step.',
    };

    setMessages((m) => [...m, userMessage, aiMessage]);
    setInput('');
  };

  const toggleSaved = (prompt: string) => {
    setSaved((current) =>
      current.includes(prompt) ? current.filter((item) => item !== prompt) : [...current, prompt]
    );
  };

  return (
    <div className="mx-auto flex max-w-5xl gap-6 p-6">
      <aside className="hidden w-64 shrink-0 flex-col lg:flex">
        <h2 className="text-sm font-semibold text-zinc-300">Suggested questions</h2>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search prompts"
          className="mt-3 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-200 outline-none ring-0 placeholder:text-zinc-500"
        />
        <div className="mt-3 space-y-2">
          {prompts.map((prompt) => {
            const isSaved = saved.includes(prompt);
            return (
              <div key={prompt} className="group flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 p-1 transition hover:border-violet-500/50 hover:bg-zinc-900/90">
                <button onClick={() => setInput(prompt)} className="min-w-0 flex-1 rounded-lg px-3 py-2 text-left text-sm text-zinc-300 outline-none transition group-hover:text-white focus-visible:ring-2 focus-visible:ring-violet-300">
                  {prompt}
                </button>
                <button
                  type="button"
                  onClick={() => toggleSaved(prompt)}
                  className="mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-zinc-500 transition hover:bg-violet-500/10 hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
                  aria-label={isSaved ? 'Remove from saved prompts' : 'Save prompt'}
                >
                  <BookmarkIcon className={cn('h-4 w-4', isSaved && 'fill-violet-400 text-violet-400')} />
                </button>
              </div>
            );
          })}
        </div>
        <button className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700 py-3 text-sm text-zinc-400 hover:border-violet-700">
          <BookmarkIcon className="h-4 w-4" /> Saved ({saved.length})
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
            <SparklesIcon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-zinc-100">AI Tutor</h1>
            <p className="text-xs text-zinc-500">Zuno’s assistant — explain, quiz and coach.</p>
          </div>
        </div>

        <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
          {messages.map((m) => (
            <div key={m.id} className={cn('flex gap-3', m.role === 'user' && 'flex-row-reverse')}>
              <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold', m.role === 'user' ? 'bg-violet-600' : 'bg-zinc-800')}>
                {m.role === 'user' ? 'U' : <SparklesIcon className="h-4 w-4" />}
              </div>
              <div className={cn('max-w-[75%] rounded-2xl px-4 py-3 text-sm', m.role === 'user' ? 'bg-violet-600 text-white' : 'bg-zinc-900 text-zinc-200 border border-zinc-800')}>
                {m.text.split('\n').map((line, index) => (
                  <p key={`${m.id}-${index}`} className={line ? 'mb-2 last:mb-0' : 'mb-2'}>
                    {line || '\u00A0'}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-end gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3">
          <Textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask anything about your course…"
            className="min-h-10 flex-1 resize-none border-none bg-transparent focus:ring-0"
          />
          <Button onClick={send} size="icon" className="h-10 w-10 shrink-0 rounded-xl">
            <SentIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
