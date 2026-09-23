import { mockCommunityMembers, mockCommunityPosts } from '../data';

export function Community() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-violet-400">Community</p>
          <h1 className="mt-1 text-3xl font-bold text-zinc-100">Learn with peers</h1>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_0.8fr]">
        <div className="space-y-4">
          {mockCommunityPosts.map((post) => (
            <article key={post.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600/20 text-sm font-bold text-violet-200">
                  {post.initials}
                </div>
                <div>
                  <p className="font-medium text-zinc-100">{post.author}</p>
                  <p className="text-xs text-zinc-500">{post.time}</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-zinc-300">{post.content}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-zinc-800 px-2 py-1 text-[10px] uppercase tracking-wide text-zinc-400">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-6 text-xs text-zinc-500">
                <span>♥ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </article>
          ))}
        </div>

        <aside className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <h2 className="text-lg font-semibold text-zinc-100">Top learners</h2>
          <div className="mt-4 space-y-3">
            {mockCommunityMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3 rounded-xl bg-zinc-950/50 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-200">
                  {member.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-100">{member.name}</p>
                  <p className="text-xs text-zinc-500">{member.xp} XP · {member.streak}-day streak</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
