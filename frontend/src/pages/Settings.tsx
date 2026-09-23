export function Settings() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div>
        <p className="text-sm font-medium text-violet-400">Settings</p>
        <h1 className="mt-1 text-3xl font-bold text-zinc-100">Customize your experience</h1>
      </div>

      <div className="mt-8 space-y-4">
        {[
          ['Notifications', 'Receive course reminders and progress nudges'],
          ['Dark mode', 'Use the default night theme'],
          ['Study reminders', 'Get weekly planning prompts'],
        ].map(([title, description]) => (
          <div key={title} className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
            <div>
              <p className="font-medium text-zinc-100">{title}</p>
              <p className="text-sm text-zinc-400">{description}</p>
            </div>
            <button className="h-6 w-11 rounded-full bg-violet-600/40 p-1">
              <span className="block h-4 w-4 rounded-full bg-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
