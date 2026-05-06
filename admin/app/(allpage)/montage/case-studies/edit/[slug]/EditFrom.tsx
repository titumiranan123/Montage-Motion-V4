/* eslint-disable react-hooks/incompatible-library */
'use client';

import { Plus, Trash2, ChevronLeft, ChevronRight, CheckCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { api_url } from '@/hook/Apiurl';
import toast from 'react-hot-toast';
import ImageUploader from '@/component/ImageUploader';

type CaseType = 'client_success' | 'product' | 'research' | 'business';
type StatusType = 'draft' | 'published' | 'archived';

interface FormData {
    id?: string;
  slug:             string;
  type:             CaseType;
  status:           StatusType;
  title:            string;
  description:      string;
  image_url:        string;
  image_alt:        string;
  client_name:      string;
  client_logo:      string;
  client_industry:  string;
  client_domain:    string;
  client_employees: number | undefined;
  client_desc:      string;
  challenge_intro:  string;
  solution_intro:   string;
  outcome_desc:     string;
  outcome_video:    string;
  meta_title:       string;
  meta_desc:        string;
  meta_keywords:    string;
  calendly_url:     string;
  tag_slugs:        string[];
  client_tags:      string[];
  hero_stats:       { value: string; label: string }[];
  metrics:          { value: string; label: string; sub: string }[];
  challenge_items:  { title: string; desc: string }[];
  solution_phases:  { phase: string; time_range: string; desc: string }[];
  testimonials:     { quote: string; name: string; role: string; avatar_url: string }[];
}



const steps = [
  { id: 1, name: 'Header & Meta' },
  { id: 2, name: 'Client Info' },
  { id: 3, name: 'Challenge, Solution & Results' },
];

const typeOptions: { id: CaseType; title: string; desc: string }[] = [
  { id: 'client_success', title: 'Client Success', desc: 'Real client outcomes' },
  { id: 'product',        title: 'Product',        desc: 'Feature deep-dive'   },
  { id: 'research',       title: 'Research',       desc: 'Data-backed study'   },
  { id: 'business',       title: 'Business',       desc: 'Problem & solution'  },
];

const inp     = 'w-full bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]';
const inpSm   = 'w-full bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]';
const lbl     = 'block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2';
const errMsg  = 'text-[11px] text-red-400 mt-1';
const trashBtn= 'w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all shrink-0';
const addBtn  = 'w-full flex items-center justify-center gap-2 border border-dashed border-[#1fb5dd]/40 text-[#1fb5dd] py-3 rounded-xl text-[12px] font-medium hover:bg-[#1fb5dd]/10 transition-all';
const card    = 'bg-[#151b24]/80 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8 shadow-xl';

export default function EditCaseStudyForm({initialData}: { initialData?: FormData }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [done, setDone] = useState(false);

  const {
    register, control, handleSubmit,
    watch, setValue, getValues, 
    formState: { errors,isSubmitting },
  } =useForm<FormData>({
    defaultValues: {
  id:               initialData?.id               ?? '',
  slug:             initialData?.slug             ?? '',
  type:             initialData?.type             ?? 'client_success',
  status:           initialData?.status           ?? 'draft',
  title:            initialData?.title            ?? '',
  description:      initialData?.description      ?? '',
  image_url:        initialData?.image_url        ?? '',
  image_alt:        initialData?.image_alt        ?? '',
  client_name:      initialData?.client_name      ?? '',
  client_logo:      initialData?.client_logo      ?? '',
  client_industry:  initialData?.client_industry  ?? '',
  client_domain:    initialData?.client_domain    ?? '',
  client_employees: initialData?.client_employees ?? undefined,
  client_desc:      initialData?.client_desc      ?? '',
  challenge_intro:  initialData?.challenge_intro  ?? '',
  solution_intro:   initialData?.solution_intro   ?? '',
  outcome_desc:     initialData?.outcome_desc     ?? '',
  outcome_video:    initialData?.outcome_video    ?? '',
  meta_title:       initialData?.meta_title       ?? '',
  meta_desc:        initialData?.meta_desc        ?? '',
  meta_keywords:    initialData?.meta_keywords    ?? '',
  calendly_url:     initialData?.calendly_url     ?? '',
  tag_slugs:        initialData?.tag_slugs        ?? [],
  client_tags:      initialData?.client_tags      ?? [],
  hero_stats:       initialData?.hero_stats       ?? [],
  metrics:          initialData?.metrics          ?? [],
  challenge_items:  initialData?.challenge_items  ?? [],
  solution_phases:  initialData?.solution_phases  ?? [],
  testimonials:     initialData?.testimonials     ?? [],
},
    mode: 'onChange',
  });

  const heroStats      = useFieldArray({ control, name: 'hero_stats' });
  const metrics        = useFieldArray({ control, name: 'metrics' });
  const challengeItems = useFieldArray({ control, name: 'challenge_items' });
  const solutionPhases = useFieldArray({ control, name: 'solution_phases' });
  const testimonials   = useFieldArray({ control, name: 'testimonials' });

  

  const goTo = (s: number) => {
    setCurrentStep(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTag = (arr: 'tag_slugs' | 'client_tags', tag: string) => {
    const cur = getValues(arr);
    setValue(arr, cur?.includes(tag) ? cur.filter((t: string) => t !== tag) : [...cur, tag], { shouldValidate: true });
  };

  const addCustomTag = (inputId: string, arr: 'tag_slugs' | 'client_tags') => {
    const el = document.getElementById(inputId) as HTMLInputElement | null;
    const v  = el?.value.trim();
    if (!v) return;
    const cur = getValues(arr);
    if (!cur?.includes(v)) setValue(arr, [...cur, v], { shouldValidate: true });
    if (el) el.value = '';
  };

  const onSubmit = async (data: FormData) => {
    const clean = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, v === '' ? undefined : v])
    );
console.log("Submitting data =========>", clean);
    try {
      const res = await api_url.patch(`/api/case-studies/${data?.id}`, clean);
      console.log("API response =========>", res);
      setDone(true);
      toast.success('Published!');
    } catch(error) {
      console.error("API error =========>", error);
      toast.error('Failed to publish');
    } 
  };

  const watchType   = watch('type');
  const watchStatus = watch('status');
  const watchTags   = watch('tag_slugs');
  const watchCtags  = watch('client_tags');

  const show = (s: number) => currentStep === s ? 'block' : 'hidden';

  const CardHeader = ({ emoji, title, sub }: { emoji: string; title: string; sub: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(255,255,255,0.08)]">
      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] flex items-center justify-center shadow-lg shadow-[#1fb5dd]/20">
        <span className="text-white text-lg">{emoji}</span>
      </div>
      <div>
        <h2 className="font-semibold text-white text-lg">{title}</h2>
        <p className="text-[12px] text-[#7a8899]">{sub}</p>
      </div>
    </div>
  );

  const Section = ({ title }: { title: string }) => (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-1 h-5 bg-linear-to-b from-[#1fb5dd] to-[#0d8eb0] rounded-full" />
      <h3 className="text-[13px] font-semibold text-white">{title}</h3>
    </div>
  );

  const NavRow = ({ prev, next, nextLabel = 'Continue', isSubmit = false }: {
    prev?: number; next?: number; nextLabel?: string; isSubmit?: boolean;
  }) => (
    <div className="flex justify-between mt-8 pt-4 border-t border-[rgba(255,255,255,0.08)]">
      {prev ? (
        <button type="button" onClick={() => goTo(prev)}
          className="flex items-center gap-2 border border-[rgba(255,255,255,0.08)] text-[#7a8899] px-6 py-2.5 rounded-xl text-[14px] hover:border-white/20 hover:text-[#e8edf5] transition-all">
          <ChevronLeft size={16} /> Back
        </button>
      ) : <div />}
      {isSubmit ? (
        <button type="submit" disabled={isSubmitting}
          className="flex items-center gap-2 bg-linear-to-r from-[#1fb5dd] to-[#0d8eb0] text-white px-10 py-2.5 rounded-xl text-[14px] font-semibold shadow-lg shadow-[#1fb5dd]/30 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
          {isSubmitting ? 'Publishing...' : 'Publish'} {!isSubmitting && <Send size={16} />}
        </button>
      ) : next ? (
        <button type="button" onClick={() => goTo(next)}
          className="flex items-center gap-2 bg-linear-to-r from-[#1fb5dd] to-[#0d8eb0] text-white px-8 py-2.5 rounded-xl text-[14px] font-semibold shadow-lg shadow-[#1fb5dd]/30 hover:scale-[1.02] transition-all">
          {nextLabel} <ChevronRight size={16} />
        </button>
      ) : null}
    </div>
  );

  if (done) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className={`${card} text-center max-w-lg w-full`}>
        <div className="w-20 h-20 rounded-full bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={36} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Published!</h2>
        <p className="text-[#7a8899] text-sm mb-8">Your case study is live.</p>
      
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0e14] via-[#0f141c] to-[#0a0e14] text-[#e8edf5]">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-white mb-1">Create Case Study</h1>
          <p className="text-[14px] text-[#7a8899]">Auto-saves to browser storage.</p>
        </div>

        {/* Steps */}
        <div className="relative mb-10">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#1c2534]" />
          <div className="relative flex justify-between">
            {steps?.map(s => (
              <button key={s.id} type="button"
                onClick={() => s.id < currentStep && goTo(s.id)}
                className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all
                  ${s.id < currentStep   ? 'bg-[#1fb5dd] text-white' :
                    s.id === currentStep ? 'bg-[#1fb5dd] text-white ring-4 ring-[#1fb5dd]/30 scale-110' :
                    'bg-[#1c2534] text-[#7a8899] border border-[#2a3545]'}`}>
                  {s.id < currentStep ? <CheckCircle size={16} /> : s.id}
                </div>
                <span className={`text-[11px] text-center ${s.id === currentStep ? 'text-[#1fb5dd]' : 'text-[#7a8899]'}`}>
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* ── STEP 1: Header & Meta ── */}
          <div className={show(1)}>
            <div className={card}>
              <CardHeader emoji="📝" title="Header & Metadata" sub="Title, slug, description and type" />

              {/* Type Dropdown */}
              <div className="mb-6">
                <label className={lbl}>Type <span className="text-[#1fb5dd]">*</span></label>
                <div className="relative">
                  <select
                    value={watchType}
                    onChange={(e) => setValue('type', e.target.value as CaseType, { shouldValidate: true })}
                    className="w-full bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 pr-10 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] appearance-none cursor-pointer"
                  >
                    {typeOptions.map(t => (
                      <option key={t.id} value={t.id} className="bg-[#1c2534] text-[#e8edf5]">
                        {t.title} — {t.desc}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7a8899]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className={lbl}>Normal <span className="text-[#1fb5dd]">*</span></label>
                  <input
                    className={`${inp} ${errors.title ? 'border-red-500' : ''}`}
                    placeholder="How We Helped"
                    {...register('title', { required: 'Required' })}
                  />
                  {errors.title && <p className={errMsg}>{errors.title.message}</p>}
                </div>
              
              </div>

              {/* Slug */}
              <div className="mb-4">
                <label className={lbl}>Slug <span className="text-[#1fb5dd]">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#7a8899] font-mono">/case-study/</span>
                  <input
                    className={`${inp} pl-28 font-mono ${errors.slug ? 'border-red-500' : ''}`}
                    placeholder="technova-saas-3x"
                    {...register('slug', {
                      required: 'Required',
                      onChange: (e) => {
                        e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
                      },
                    })}
                  />
                </div>
                {errors.slug && <p className={errMsg}>{errors.slug.message}</p>}
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className={lbl}>Description</label>
                <textarea rows={3} className={`${inp} resize-vertical`} placeholder="A deep dive into..." {...register('description')} />
                <div className="text-right text-[11px] text-[#7a8899] mt-1">{watch('description')?.length ?? 0} / 200</div>
              </div>

              {/* Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <ImageUploader title='Image URL' onChange={(url:string)=>setValue("image_url",url)}  value={watch("image_url")} />
                </div>
                <div>
                  <label className={lbl}>Image Alt</label>
                  <input className={inp} placeholder="Alt text" {...register('image_alt')} />
                </div>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <label className={lbl}>Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {['saas', 'growth', 'marketing', 'b2b', 'startup', 'fintech', 'ecommerce'].map(t => (
                    <span key={t} onClick={() => toggleTag('tag_slugs', t)}
                      className={`cursor-pointer px-3 py-1.5 rounded-full text-[12px] font-medium transition-all
                        ${watchTags?.includes(t) ? 'bg-[#1fb5dd] text-white' : 'bg-[#1fb5dd]/10 text-[#1fb5dd] hover:bg-[#1fb5dd]/20'}`}>
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input id="customTag" type="text" placeholder="Custom tag..."
                    className="flex-1 max-w-48 bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none focus:border-[#1fb5dd]"
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomTag('customTag', 'tag_slugs'); } }} />
                  <button type="button" onClick={() => addCustomTag('customTag', 'tag_slugs')}
                    className="border border-[rgba(255,255,255,0.08)] text-[#7a8899] px-4 py-2 rounded-xl text-[13px] hover:border-white/20 hover:text-white transition-all">
                    Add
                  </button>
                </div>
              </div>

              {/* SEO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className={lbl}>Meta Title</label>
                  <input className={inp} placeholder="SEO title..." {...register('meta_title')} />
                </div>
                <div>
                  <label className={lbl}>Meta Keywords</label>
                  <input className={inp} placeholder="saas, growth..." {...register('meta_keywords')} />
                </div>
                <div>
                  <label className={lbl}>Calendly URL</label>
                  <input className={inp} placeholder="https://calendly.com/..." {...register('calendly_url')} />
                </div>
              </div>
              <div className="mb-4">
                <label className={lbl}>Meta Description</label>
                <textarea rows={2} className={`${inp} resize-vertical`} placeholder="SEO description..." {...register('meta_desc')} />
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t border-[rgba(255,255,255,0.08)]">
               
                <button type="button" onClick={() => goTo(2)}
                  className="flex items-center gap-2 bg-linear-to-r from-[#1fb5dd] to-[#0d8eb0] text-white px-8 py-2.5 rounded-xl text-[14px] font-semibold shadow-lg shadow-[#1fb5dd]/30 hover:scale-[1.02] transition-all">
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* ── STEP 2: Client Info ── */}
          <div className={show(2)}>
            <div className={card}>
              <CardHeader emoji="🏢" title="Client Info" sub="Company details and tags" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={lbl}>Client Name</label>
                  <input className={inp} placeholder="TechNova Inc." {...register('client_name')} />
                </div>
                <div>
                <ImageUploader title='Logo URL' onChange={(url:string)=>setValue("client_logo",url)}  value={watch("client_logo")} />
                </div>
                <div>
                  <label className={lbl}>Industry</label>
                  <input className={inp} placeholder="B2B SaaS" {...register('client_industry')} />
                </div>
                <div>
                  <label className={lbl}>Domain</label>
                  <input className={inp} placeholder="Project Management" {...register('client_domain')} />
                </div>
                <div>
                  <label className={lbl}>Employees</label>
                  <input type="number" className={inp} placeholder="45"
                    {...register('client_employees', { valueAsNumber: true })} />
                </div>
              </div>

              <div className="mb-4">
                <label className={lbl}>Client Description</label>
                <textarea rows={3} className={`${inp} resize-vertical`} placeholder="About the client..." {...register('client_desc')} />
              </div>

              <div>
                <label className={lbl}>Client Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {['b2b', 'b2c', 'enterprise', 'startup', 'smb'].map(t => (
                    <span key={t} onClick={() => toggleTag('client_tags', t)}
                      className={`cursor-pointer px-3 py-1.5 rounded-full text-[12px] font-medium transition-all
                        ${watchCtags?.includes(t) ? 'bg-[#1fb5dd] text-white' : 'bg-[#1fb5dd]/10 text-[#1fb5dd] hover:bg-[#1fb5dd]/20'}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input id="customCtag" type="text" placeholder="Custom tag..."
                    className="flex-1 max-w-48 bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none focus:border-[#1fb5dd]"
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomTag('customCtag', 'client_tags'); } }} />
                  <button type="button" onClick={() => addCustomTag('customCtag', 'client_tags')}
                    className="border border-[rgba(255,255,255,0.08)] text-[#7a8899] px-4 py-2 rounded-xl text-[13px] hover:border-white/20 hover:text-white transition-all">
                    Add
                  </button>
                </div>
              </div>

              <NavRow prev={1} next={3} />
            </div>
          </div>

          {/* ── STEP 3: Challenge, Solution & Results ── */}
          <div className={show(3)}>
            <div className={card}>
              <CardHeader emoji="🎯" title="Challenge, Solution & Results" sub="Problem, approach, stats and testimonials" />

              {/* Challenge */}
              <div className="mb-8">
                <Section title="Challenge" />
                <div className="mb-3">
                  <label className={lbl}>Intro</label>
                  <input className={inp} placeholder="TechNova faced three compounding problems..." {...register('challenge_intro')} />
                </div>
                <div className="space-y-3">
                  {challengeItems.fields.map((f, i) => (
                    <div key={f.id} className="bg-[#1c2534]/50 border border-[rgba(255,255,255,0.08)] rounded-xl p-4">
                      <div className="flex gap-3 mb-3">
                        <input className={`${inpSm} flex-1`} placeholder="Challenge title" {...register(`challenge_items.${i}.title`)} />
                        <button type="button" onClick={() => challengeItems.remove(i)} className={trashBtn}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <input className={inpSm} placeholder="Description" {...register(`challenge_items.${i}.desc`)} />
                    </div>
                  ))}
                  <button type="button" onClick={() => challengeItems.append({ title: '', desc: '' })} className={addBtn}>
                    <Plus size={14} /> Add Challenge Item
                  </button>
                </div>
              </div>

              {/* Solution */}
              <div className="mb-8">
                <Section title="Solution" />
                <div className="mb-3">
                  <label className={lbl}>Intro</label>
                  <input className={inp} placeholder="We deployed a three-phase intervention..." {...register('solution_intro')} />
                </div>
                <div className="space-y-3">
                  {solutionPhases.fields.map((f, i) => (
                    <div key={f.id} className="bg-[#1c2534]/50 border border-[rgba(255,255,255,0.08)] rounded-xl p-4">
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <input className={inpSm} placeholder="Phase (e.g. Diagnose)" {...register(`solution_phases.${i}.phase`)} />
                        <div className="flex gap-2">
                          <input className={`${inpSm} flex-1`} placeholder="Weeks 1-6" {...register(`solution_phases.${i}.time_range`)} />
                          <button type="button" onClick={() => solutionPhases.remove(i)} className={trashBtn}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <input className={inpSm} placeholder="Description" {...register(`solution_phases.${i}.desc`)} />
                    </div>
                  ))}
                  <button type="button" onClick={() => solutionPhases.append({ phase: '', time_range: '', desc: '' })} className={addBtn}>
                    <Plus size={14} /> Add Phase
                  </button>
                </div>
              </div>

              {/* Hero Stats */}
              <div className="mb-8">
                <Section title="Hero Stats" />
                <div className="space-y-2">
                  {heroStats.fields.map((f, i) => (
                    <div key={f.id} className="grid grid-cols-[1fr,1fr,40px] gap-2">
                      <input className={inpSm} placeholder="3×" {...register(`hero_stats.${i}.value`)} />
                      <input className={inpSm} placeholder="ARR Growth" {...register(`hero_stats.${i}.label`)} />
                      <button type="button" onClick={() => heroStats.remove(i)} className={trashBtn}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => heroStats.append({ value: '', label: '' })}
                    className="text-[#1fb5dd] text-[12px] flex items-center gap-1 hover:underline">
                    <Plus size={12} /> Add Stat
                  </button>
                </div>
              </div>

              {/* Metrics */}
              <div className="mb-8">
                <Section title="Metrics" />
                <div className="space-y-2">
                  {metrics.fields.map((f, i) => (
                    <div key={f.id} className="grid grid-cols-[1fr,1fr,1.5fr,40px] gap-2">
                      <input className={inpSm} placeholder="$2.4M" {...register(`metrics.${i}.value`)} />
                      <input className={inpSm} placeholder="Annual Revenue" {...register(`metrics.${i}.label`)} />
                      <input className={inpSm} placeholder="up from $800K" {...register(`metrics.${i}.sub`)} />
                      <button type="button" onClick={() => metrics.remove(i)} className={trashBtn}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => metrics.append({ value: '', label: '', sub: '' })}
                    className="text-[#1fb5dd] text-[12px] flex items-center gap-1 hover:underline">
                    <Plus size={12} /> Add Metric
                  </button>
                </div>
              </div>

              {/* Outcome */}
              <div className="mb-8">
                <Section title="Outcome" />
                <div className="mb-3">
                  <label className={lbl}>Description</label>
                  <textarea rows={2} className={`${inp} resize-vertical`}
                    placeholder="By end of Q2 2025, TechNova crossed $2.4M ARR..."
                    {...register('outcome_desc')} />
                </div>
                <div>
                  <label className={lbl}>Video URL</label>
                  <input className={inp} placeholder="https://youtu.be/..." {...register('outcome_video')} />
                </div>
              </div>

              {/* Testimonials */}
              <div className="mb-8">
                <Section title="Testimonials" />
                {testimonials.fields.map((f, i) => (
                  <div key={f.id} className="bg-[#1c2534]/50 border border-[rgba(255,255,255,0.08)] rounded-xl p-4 mb-3">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input className={inpSm} placeholder="Ayaan Khan" {...register(`testimonials.${i}.name`)} />
                      <input className={inpSm} placeholder="CEO, TechNova" {...register(`testimonials.${i}.role`)} />
                    </div>
                    <div className="flex gap-3 mb-3">
                   
                       <ImageUploader title='Avatar URL' onChange={(url:string)=>setValue(`testimonials.${i}.avatar_url`,url)}  value={watch(`testimonials.${i}.avatar_url`)} />
                      <button type="button" onClick={() => testimonials.remove(i)} className={trashBtn}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <textarea rows={2} className={`${inpSm} w-full resize-vertical`}
                      placeholder="Working with this team was..."
                      {...register(`testimonials.${i}.quote`)} />
                  </div>
                ))}
                <button type="button" onClick={() => testimonials.append({ quote: '', name: '', role: '', avatar_url: '' })}
                  className="text-[#1fb5dd] text-[12px] flex items-center gap-1 hover:underline">
                  <Plus size={12} /> Add Testimonial
                </button>
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className={lbl}>Status</label>
                <div className="flex gap-2">
                  {(['draft', 'published', 'archived'] as StatusType[]).map(s => (
                    <div key={s} onClick={() => setValue('status', s, { shouldValidate: true })}
                      className={`cursor-pointer px-4 py-2 rounded-full border text-[12px] font-medium transition-all capitalize
                        ${watchStatus === s
                          ? s === 'published' ? 'bg-green-500/20 border-green-500/50 text-green-400'
                          : s === 'archived'  ? 'bg-red-500/20 border-red-500/50 text-red-400'
                          : 'bg-gray-500/20 border-gray-500/50 text-gray-400'
                          : 'border-[rgba(255,255,255,0.08)] text-[#7a8899] hover:border-white/20'}`}>
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <NavRow prev={2} isSubmit />
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}