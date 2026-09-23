import { mockProjects } from '../data';

export function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div>
        <p className="text-sm font-medium text-violet-400">Project studio</p>
        <h1 className="mt-1 text-3xl font-bold text-zinc-100">Build portfolio-ready work</h1>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {mockProjects.map((project) => (
          <div key={project.id} className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60">
            <div className="h-24 bg-violet-600" />
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-300">{project.category}</span>
                <span className="text-xs text-zinc-500">{project.status}</span>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-zinc-100">{project.title}</h2>
              <p className="mt-2 text-sm text-zinc-400">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-zinc-700 px-2 py-1 text-[10px] uppercase tracking-wide text-zinc-400">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full rounded-full bg-violet-500" style={{ width: `${project.progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
