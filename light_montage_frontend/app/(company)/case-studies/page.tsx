'use client'

import { caseStudyData } from './data' // adjust the import path as needed

export default function CaseStudyPage() {
  const { hero, metrics, client, challenge, solution, outcome, testimonial, more } = caseStudyData

  return (
    <>
      {/* HERO */}
      <header className="pt-36 pb-16 px-6 relative overflow-hidden bg-[#f0fbfe]"
        style={{
          backgroundImage: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(31,181,221,0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 10% 80%, rgba(31,181,221,0.10) 0%, transparent 60%), radial-gradient(ellipse 30% 30% at 50% 50%, rgba(255,255,255,0.9) 0%, transparent 80%)'
        }}>
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full opacity-10 bg-[#1fb5dd]" />
        <div className="absolute right-40 top-10 w-32 h-32 rounded-full opacity-5 bg-[#1fb5dd]" />
        <div className="flex flex-col justify-center items-center sectionarea">
          <div className="max-w-5xl mx-auto flex justify-center items-center flex-col">
            <h1 className="text-4xl md:text-5xl text-gray-900 leading-tight mb-6 font-extrabold text-center">
              {hero.title.normal}
              <span className="text-[#1fb5dd]">{hero.title.highlight}</span>
              {hero.title.suffix}
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {hero.tags.map((tag, idx) => (
                <span key={idx} className="text-xs font-medium px-3 py-1 rounded-full bg-[rgba(31,181,221,0.1)] text-[#0d8faf] border border-[rgba(31,181,221,0.25)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto w-full">
            <div className="rounded-2xl aspect-video w-full shadow-2xl bg-linear-to-br from-[#e0f8fd] via-[#b8eefa] to-[#e0f8fd]" />
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(31,181,221,0.12)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#1fb5dd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-xl font-bold text-[#1fb5dd]">{hero.stats[0].value}</div>
                <div className="text-xs text-gray-400">{hero.stats[0].label}</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(31,181,221,0.12)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#1fb5dd" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="9" cy="7" r="4" stroke="#1fb5dd" strokeWidth="2" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#1fb5dd" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="text-xl font-bold text-[#1fb5dd]">{hero.stats[1].value}</div>
                <div className="text-xs text-gray-400">{hero.stats[1].label}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* METRICS STRIP */}
      <section className="py-12 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ease-[cubic-bezier(.34,1.56,.64,1)]">
                <div className="text-3xl mb-1 font-extrabold text-[#1fb5dd]">{metric.value}</div>
                <div className="text-sm text-gray-500 font-medium">{metric.label}</div>
                <div className="text-xs text-gray-400 mt-1">{metric.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="lg:grid lg:grid-cols-[1fr_280px] gap-16">
          <article className="min-w-0">
            {/* About the client */}
            <section className="mb-16">
              <div className="flex items-start gap-4 mb-8">
                <div className="mt-1 w-0.75 h-8 rounded-full bg-[#1fb5dd]" />
                <h2 className="text-2xl text-gray-900 font-bold">About the Client</h2>
              </div>
              <div className="flex items-center gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-100 mb-6">
                <div className="w-16 h-16 rounded-xl shrink-0 bg-linear-to-br from-[#e0f8fd] via-[#b8eefa] to-[#e0f8fd]" />
                <div>
                  <div className="text-lg text-gray-900 font-bold">{client.name}</div>
                  <div className="text-sm text-gray-500">{client.meta}</div>
                  <div className="flex gap-2 mt-2">
                    {client.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-[rgba(31,181,221,0.1)] text-[#0d8faf] border border-[rgba(31,181,221,0.25)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-base">
                {client.description}
              </p>
            </section>

            <div className="h-px mb-16 bg-linear-to-r from-transparent via-[rgba(31,181,221,0.3)] to-transparent" />

            {/* Challenge */}
            <section className="mb-16" id="challenge">
              <div className="flex items-start gap-4 mb-8">
                <div className="mt-1 w-0.75 h-8 rounded-full bg-[#1fb5dd]" />
                <h2 className="text-2xl text-gray-900 font-bold">The Challenge</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {challenge.intro}
              </p>
              <div className="space-y-4 mb-6">
                {challenge.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-5 rounded-xl border-l-4 border-[#1fb5dd] bg-[rgba(31,181,221,0.04)]">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white text-sm font-bold bg-[#1fb5dd]">{idx + 1}</div>
                    <div>
                      <div className="font-medium text-gray-800 mb-1">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="h-px mb-16 bg-linear-to-r from-transparent via-[rgba(31,181,221,0.3)] to-transparent" />

            {/* Solution */}
            <section className="mb-16" id="solution">
              <div className="flex items-start gap-4 mb-8">
                <div className="mt-1 w-0.75 h-8 rounded-full bg-[#1fb5dd]" />
                <h2 className="text-2xl text-gray-900 font-bold">Our Solution</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-8">
                {solution.intro}
              </p>

              <div className="relative pl-8">
                <div className="absolute left-3 top-2 bottom-2 w-px bg-gray-200" />
                {solution.phases.map((item, idx) => (
                  <div key={idx} className={`relative ${idx < solution.phases.length - 1 ? 'mb-10' : ''}`}>
                    <div className="absolute -left-5 top-1 w-3 h-3 rounded-full shrink-0 bg-[#1fb5dd] border-3 border-white shadow-[0_0_0_2px_#1fb5dd]" />
                    <div className="text-gray-900 mb-1 font-bold">
                      {item.phase} <span className="text-sm text-gray-400 ml-2 font-normal">{item.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="h-px mb-16 bg-linear-to-r from-transparent via-[rgba(31,181,221,0.3)] to-transparent" />

            {/* Results image */}
            <div className="mb-16">
              <div className="rounded-2xl h-64 w-full mb-4 bg-linear-to-br from-[#e0f8fd] via-[#b8eefa] to-[#e0f8fd]" />
              <p className="text-sm text-gray-400 text-center">TechNova dashboard showing ARR growth trajectory, Q1–Q2 2025</p>
            </div>

            {/* Outcome */}
            <section className="mb-16" id="outcome">
              <div className="flex items-start gap-4 mb-8">
                <div className="mt-1 w-0.75 h-8 rounded-full bg-[#1fb5dd]" />
                <h2 className="text-2xl text-gray-900 font-bold">The Outcome</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {outcome.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Before</div>
                  <div className="space-y-2 text-sm text-gray-600">
                    {outcome.before.map((row, i) => (
                      <div key={i} className="flex justify-between">
                        <span>{row.label}</span>
                        <span className="font-medium text-gray-800">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-[rgba(31,181,221,0.05)] border border-[rgba(31,181,221,0.2)]">
                  <div className="text-xs mb-1 uppercase tracking-wide text-[#1fb5dd]">After</div>
                  <div className="space-y-2 text-sm text-gray-600">
                    {outcome.after.map((row, i) => (
                      <div key={i} className="flex justify-between">
                        <span>{row.label}</span>
                        <span className="text-[#1fb5dd] font-bold">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <div className="h-px mb-16 bg-linear-to-r from-transparent via-[rgba(31,181,221,0.3)] to-transparent" />

            {/* Testimonial */}
            <section className="mb-16" id="testimonial">
              <div className="relative p-8 rounded-2xl overflow-hidden bg-[rgba(31,181,221,0.06)] border border-[rgba(31,181,221,0.2)]">
                <div className="absolute top-4 left-6 select-none text-8xl leading-[.7] text-[#1fb5dd] opacity-25">&quot;</div>
                <p className="text-gray-700 text-xl leading-relaxed relative z-10 mb-8 mt-4 font-light">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full shrink-0 bg-linear-to-br from-[#e0f8fd] via-[#b8eefa] to-[#e0f8fd]" />
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#1fb5dd">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </article>

          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky space-y-6 top-24">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">On this page</div>
                <nav className="space-y-2 text-sm">
                  <a href="#challenge" className="flex items-center gap-2 transition-colors py-1 text-gray-500 hover:text-gray-900">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-gray-300" />
                    The Challenge
                  </a>
                  <a href="#solution" className="flex items-center gap-2 transition-colors py-1 font-medium text-[#1fb5dd]">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#1fb5dd]" />
                    Our Solution
                  </a>
                  <a href="#outcome" className="flex items-center gap-2 transition-colors py-1 text-gray-500 hover:text-gray-900">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-gray-300" />
                    The Outcome
                  </a>
                  <a href="#testimonial" className="flex items-center gap-2 transition-colors py-1 text-gray-500 hover:text-gray-900">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-gray-300" />
                    Testimonial
                  </a>
                </nav>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">Client</div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl shrink-0 bg-linear-to-br from-[#e0f8fd] via-[#b8eefa] to-[#e0f8fd]" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{client.name}</div>
                    <div className="text-xs text-gray-400">B2B SaaS</div>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Industry</span>
                    <span className="text-gray-700">{client.sidebar.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Team size</span>
                    <span className="text-gray-700">{client.sidebar.teamSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stage</span>
                    <span className="text-gray-700">{client.sidebar.stage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location</span>
                    <span className="text-gray-700">{client.sidebar.location}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6 text-white relative overflow-hidden bg-[#1fb5dd]">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white opacity-10" />
                <div className="relative z-10 text-lg mb-2 font-bold">Want similar results?</div>
                <p className="text-sm opacity-80 mb-5 relative z-10">Let's talk about your growth challenges.</p>
                <a href="#" className="block w-full text-center bg-white text-sm font-medium py-2.5 rounded-xl hover:opacity-90 relative z-10 text-[#0d8faf]">Book a Free Call</a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* MORE CASE STUDIES */}
      <section className="bg-gray-50 border-t border-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl text-gray-900 font-bold">More Case Studies</h2>
            <a href="#" className="text-sm font-medium hover:opacity-80 text-[#1fb5dd]">View all →</a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {more.map((card, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="h-44 w-full group-hover:opacity-90 transition-opacity bg-linear-to-br from-[#e0f8fd] via-[#b8eefa] to-[#e0f8fd]" />
                <div className="p-5">
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(31,181,221,0.1)] text-[#0d8faf] border border-[rgba(31,181,221,0.25)]">{card.tag}</span>
                  </div>
                  <div className="text-gray-900 text-base leading-snug mb-2 font-bold">{card.title}</div>
                  <div className="text-xs text-gray-400">{card.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </>
  )
}