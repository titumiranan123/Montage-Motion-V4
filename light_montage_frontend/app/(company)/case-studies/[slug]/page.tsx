/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import VideoPlayer from './VideoPlayer';
import Image from 'next/image';
import TableOfContents from './TableOfContents';

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let caseStudyData;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/case-studies/slug/${slug}`);
    const result = await response.json();
    caseStudyData = result?.data;
  } catch (error) {
    console.error('Error fetching case study data:', error);
  }
  // console.log(caseStudyData, "caseStudyData =========================?");
  if (!caseStudyData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Case study not found</p>
      </div>
    );
  }
  const {
    metrics,
    client
  } = caseStudyData;


  const metricsList = metrics ?? [];
  ;

  return (
    <>
      {/* HERO */}
      <header
        className="lg:pt-36 pt-32 pb-4 lg:pb-16 lg:px-6 relative overflow-hidden bg-[#f0fbfe]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(31,181,221,0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 10% 80%, rgba(31,181,221,0.10) 0%, transparent 60%), radial-gradient(ellipse 30% 30% at 50% 50%, rgba(255,255,255,0.9) 0%, transparent 80%)',
        }}
      >
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full opacity-10 bg-[#1fb5dd]" />
        <div className="absolute right-40 top-10 w-32 h-32 rounded-full opacity-5 bg-[#1fb5dd]" />
        <div className="flex flex-col justify-center items-center sectionarea">
          <div className="max-w-5xl mx-auto flex justify-center items-center flex-col">
            <h1 className="text-4xl md:text-5xl text-gray-900 leading-tight mb-6 font-extrabold text-center">
              {caseStudyData?.title}
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg text-center">
              {caseStudyData?.description}
            </p>
            {caseStudyData?.tag_slugs?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {caseStudyData?.tag_slugs?.map((tag: any, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-[rgba(31,181,221,0.1)] text-[#0d8faf] border border-[rgba(31,181,221,0.25)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="relative max-w-7xl mx-auto w-full lg:mt-8 mt-0 px-2 pb-8 pt-6">
            {/* Image */}
            {caseStudyData?.image_url ? (
              <Image
                src={caseStudyData?.image_url}
                className="rounded-2xl aspect-video w-full shadow-2xl bg-linear-to-br from-[#e0f8fd] via-[#b8eefa] to-[#e0f8fd]"
                alt={caseStudyData?.title}
                width={1240}
                height={698}
              />
            ) : (
              <div className="rounded-2xl aspect-video w-full shadow-2xl bg-linear-to-br from-[#e0f8fd] via-[#b8eefa] to-[#e0f8fd]" />
            )}

            {/* Stat Card 1 - Bottom Left */}
            {caseStudyData?.hero_stats[0] && (
              <div className="absolute hidden bottom-0 left-0 md:-bottom-5 md:-left-5 bg-white rounded-2xl shadow-xl p-3 md:p-4 md:flex items-center gap-2 md:gap-3 border border-gray-100 max-w-40 md:max-w-none">
                <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-xl flex items-center justify-center bg-[rgba(31,181,221,0.12)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 12h-4l-3 9L9 3l-3 9H2"
                      stroke="#1fb5dd"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-sm md:text-xl font-bold text-[#1fb5dd] truncate">
                    {caseStudyData?.hero_stats[0].value}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {caseStudyData?.hero_stats[0].label}
                  </div>
                </div>
              </div>
            )}

            {/* Stat Card 2 - Top Right */}
            {caseStudyData?.hero_stats[1] && (
              <div className="absolute top-0 right-0 md:-top-4 md:-right-4 bg-white rounded-2xl shadow-xl p-3 md:p-4 hidden md:flex items-center gap-2 md:gap-3 border border-gray-100 max-w-40 md:max-w-none">
                <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-xl flex items-center justify-center bg-[rgba(31,181,221,0.12)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                      stroke="#1fb5dd"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="9" cy="7" r="4" stroke="#1fb5dd" strokeWidth="2" />
                    <path
                      d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                      stroke="#1fb5dd"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-sm md:text-xl font-bold text-[#1fb5dd] truncate">
                    {caseStudyData?.hero_stats[1].value}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {caseStudyData?.hero_stats[1].label}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* METRICS STRIP */}
      {metricsList.length > 0 && (
        <section className="lg:py-12 py-2 px-6 bg-gray-50 border-y border-gray-100 mt-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {metricsList.map((metric: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ease-[cubic-bezier(.34,1.56,.64,1)]"
                >
                  <div className="text-3xl mb-1 font-extrabold text-[#1fb5dd]">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">{metric.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{metric.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 lg:py-16 py-8">
        {/* FIX: Use relative positioning context for sticky sidebar */}
        <div className="lg:grid lg:grid-cols-[1fr_280px] gap-16 items-start">
          <article className="min-w-0">
 {/* About the client */}
            {!client && (
              <>
                <section className="mb-16">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="mt-1 w-1 h-8 rounded-full bg-[#1fb5dd] shrink-0" />
                    <h2 className="text-2xl text-gray-900 font-bold">About the Client</h2>
                  </div>
                  <div className="flex items-center gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-100 mb-6">
                    {caseStudyData?.client_logo ? <Image src={caseStudyData?.client_logo} alt={caseStudyData?.client_name} width={60} height={60} className="w-12 h-12 rounded-xl object-cover" /> : <div className="w-12 h-12 rounded-xl bg-[rgba(31,181,221,0.1)] flex items-center justify-center text-[#0d8faf] border border-[rgba(31,181,221,0.25)]" />}
                    <div>
                      <div className="text-lg text-gray-900 font-bold">{caseStudyData?.client_name }</div>

                      <div className="text-sm text-gray-500"><span>{caseStudyData?.client_industry } <span> &bull;</span></span> {caseStudyData?.client_domain}  <span>&bull;</span> <span>{caseStudyData?.client_employees} employees</span></div>
                      {!caseStudyData?.client_tags && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {caseStudyData?.client_tags.map((tag: any, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-0.5 rounded-full bg-[rgba(31,181,221,0.1)] text-[#0d8faf] border border-[rgba(31,181,221,0.25)]"
                            >
                              {tag ??"No tag"}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-base">{caseStudyData?.client_desc ?? "No description available."}</p>
                </section>
                <div className="h-px mb-16 bg-linear-to-r from-transparent via-[rgba(31,181,221,0.3)] to-transparent" />
              </>
            )}
            {/* Challenge */}
            <section className="mb-16" id="challenge">
              <div className="flex items-start gap-4 mb-8">
                <div className="mt-1 w-1 h-8 rounded-full bg-[#1fb5dd] shrink-0" />
                <h2 className="text-2xl text-gray-900 font-bold">The Challenge</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">{caseStudyData?.challenge_intro}</p>
              <div className="space-y-4 mb-6">
                {caseStudyData?.challenge_items?.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-5 rounded-xl border-l-4 border-[#1fb5dd] bg-[rgba(31,181,221,0.04)]"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white text-sm font-bold bg-[#1fb5dd]">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 mb-1">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>



            {/* Solution — FIX: timeline line now correctly anchored */}
            <section className="mb-16" id="solution">
              <div className="flex items-start gap-4 mb-8">
                <div className="mt-1 w-1 h-8 rounded-full bg-[#1fb5dd] shrink-0" />
                <h2 className="text-2xl text-gray-900 font-bold">Our Solution</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-8">{caseStudyData?.solution_intro}</p>

              {/* FIX: relative container with explicit left padding; line starts at dot center */}
              <div className="relative">
                {/* Vertical line — positioned to run through dot centers (left-[11px]) */}
                {caseStudyData?.solution_phases.length > 1 && (
                  <div className="absolute left-1.75 top-3 bottom-3 w-px bg-gray-200" />
                )}
                <div className="space-y-10 pl-8">
                  {caseStudyData?.solution_phases.map((item: any, idx: number) => (
                    <div key={idx} className="relative">
                      {/* Dot — sits at left edge of the outer relative div */}
                      <div className="absolute -left-8 top-1 w-3.5 h-3.5 rounded-full bg-[#1fb5dd] border-2 border-white shadow-[0_0_0_2px_#1fb5dd] shrink-0" />
                      <div className="text-gray-900 mb-1 font-bold">
                        {item.phase}
                        {item.time && (
                          <span className="text-sm text-gray-400 ml-2 font-normal">{item.time}</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>



            {/* Outcome — FIX: grid properly structured */}
            <section className="mb-16" id="outcome">
              <div className="flex items-start gap-4 mb-8">
                <div className="mt-1 w-1 h-8 rounded-full bg-[#1fb5dd] shrink-0" />
                <h2 className="text-2xl text-gray-900 font-bold">The Outcome</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">{caseStudyData?.outcome_description}</p>
              <VideoPlayer url={caseStudyData?.outcome_video} />


            </section>

            <div className="h-px mb-16 bg-linear-to-r from-transparent via-[rgba(31,181,221,0.3)] to-transparent" />

            {/* Testimonial */}
            <section className="mb-4 lg:mb-8" id="testimonial">
              <div className="relative lg:p-8 p-3 rounded-2xl overflow-hidden bg-[rgba(31,181,221,0.06)] border border-[rgba(31,181,221,0.2)]">
                <div className="absolute top-4 left-6 select-none text-8xl leading-[.7] text-[#1fb5dd] opacity-25 pointer-events-none">
                  &quot;
                </div>
                <p className="text-gray-700 lg:text-xl text-lg leading-relaxed relative z-10 mb-8 mt-8 lg:mt-4 font-light">
                  {caseStudyData?.testimonials?.[0]?.quote}
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  {
                    caseStudyData?.testimonials?.[0]?.avatar_url ? (
                      <Image
                        src={caseStudyData?.testimonials?.[0]?.avatar_url }
                        alt={caseStudyData?.testimonials?.[0]?.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full shrink-0 bg-linear-to-br from-[#e0f8fd] via-[#b8eefa] to-[#e0f8fd]" />
                    )
                  }
                  <div>
                    <div className="font-medium text-gray-900">{caseStudyData?.testimonials?.[0]?.name}</div>
                    <div className="text-sm text-gray-500">{caseStudyData?.testimonials?.[0]?.role}</div>
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

          {/* SIDEBAR — FIX: sticky needs a proper top + self-start on the parent grid cell */}
          <aside className="hidden lg:block self-start sticky top-24 ">
            <div className=" space-y-6">
              {/* Table of contents */}
              <TableOfContents />
              {/* CTA */}
              <div className="rounded-2xl p-6 text-white relative overflow-hidden bg-[#1fb5dd]">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white opacity-10 pointer-events-none" />
                <div className="relative z-10 text-lg mb-2 font-bold">Want similar results?</div>
                <p className="text-sm opacity-80 mb-5 relative z-10">
                  Let&apos;s talk about your growth challenges.
                </p>
                <a
                  href={caseStudyData?.calendly_url}
                  target='_blank'
                  className="block w-full text-center bg-white text-sm font-medium py-2.5 rounded-xl hover:opacity-90 transition-opacity relative z-10 text-[#0d8faf]"
                >
                  Book a Free Call
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>


    </>
  );
}