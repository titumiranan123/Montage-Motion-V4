/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/case-studies/create/page.tsx
'use client';

import { BarChart3, Monitor, Search, Users, Save, Eye, Send, Plus, Trash2, ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api_url } from '@/hook/Apiurl';

// Validation Schema
const caseStudySchema = z.object({
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  title_normal: z.string().min(1, 'Normal title is required'),
  title_highlight: z.string().optional(),
  title_suffix: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').max(200, 'Description must be at most 200 characters'),
  type: z.enum(['client_success', 'product', 'research', 'business']),
  status: z.enum(['draft', 'review', 'published', 'archived']),
  published_at: z.string(),
  read_time_min: z.number().min(1).max(60),
  tag_slugs: z.array(z.string()),
  
  hero_stats: z.array(z.object({
    value: z.string().min(1, 'Value is required'),
    label: z.string().min(1, 'Label is required'),
  })),
  
  metrics: z.array(z.object({
    value: z.string().min(1, 'Value is required'),
    label: z.string().min(1, 'Label is required'),
    sub: z.string().optional(),
  })),
  
  challenge: z.object({
    intro: z.string().min(1, 'Challenge intro is required'),
    items: z.array(z.object({
      title: z.string().min(1, 'Challenge title is required'),
      desc: z.string().min(1, 'Challenge description is required'),
    })).min(1, 'At least one challenge item is required'),
  }),
  
  solution: z.object({
    intro: z.string().min(1, 'Solution intro is required'),
    phases: z.array(z.object({
      phase: z.string().min(1, 'Phase name is required'),
      time: z.string().min(1, 'Time frame is required'),
      desc: z.string().min(1, 'Description is required'),
    })).min(1, 'At least one solution phase is required'),
  }),
  
  outcome: z.object({
    description: z.string().min(1, 'Outcome description is required'),
    before: z.array(z.object({
      label: z.string().min(1, 'Metric label is required'),
      value: z.string().min(1, 'Metric value is required'),
    })),
    after: z.array(z.object({
      label: z.string().min(1, 'Metric label is required'),
      value: z.string().min(1, 'Metric value is required'),
    })),
  }),
  
  testimonials: z.array(z.object({
    quote: z.string().min(1, 'Quote is required'),
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    avatar: z.string().url('Must be a valid URL').optional(),
  })),
  
  related: z.array(z.object({
    tag: z.string().min(1, 'Tag is required'),
    title: z.string().min(1, 'Title is required'),
    meta: z.string().min(1, 'Meta description is required'),
  })),
  
  media: z.array(z.object({
    type: z.enum(['image', 'video']),
    url: z.string().url('Must be a valid URL'),
    alt: z.string().min(1, 'Alt text is required'),
    caption: z.string().optional(),
  })),
  
  seo: z.object({
    meta_title: z.string().max(70, 'Meta title must be at most 70 characters').optional(),
    meta_description: z.string().max(160, 'Meta description must be at most 160 characters').optional(),
    og_image: z.string().url('Must be a valid URL').optional(),
    canonical: z.string().url('Must be a valid URL').optional(),
    calendly_url: z.string().url('Must be a valid URL').optional(),
  }),
});

type CaseStudyFormData = z.infer<typeof caseStudySchema>;
type CaseType = CaseStudyFormData['type'];
type StatusType = CaseStudyFormData['status'];



// Helper functions
const saveToLocalStorage = (data: CaseStudyFormData) => {
  try {
    localStorage.setItem('caseStudyDraft', JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Failed to save draft:', e);
    return false;
  }
};

const loadFromLocalStorage = (): CaseStudyFormData | null => {
  try {
    const draft = localStorage.getItem('caseStudyDraft');
    if (draft) {
      return JSON.parse(draft);
    }
  } catch (e) {
    console.error('Failed to load draft:', e);
  }
  return null;
};

const defaultFormData: CaseStudyFormData = {
  slug: '',
  title_normal: '',
  title_highlight: '',
  title_suffix: '',
  description: '',
  type: 'client_success',
  status: 'draft',
  published_at: new Date().toISOString().split('T')[0],
  read_time_min: 6,
  tag_slugs: [],
  
  hero_stats: [
    { value: '250%', label: 'Sales Growth' },
    { value: '3x', label: 'Conversion Rate' }
  ],
  
  metrics: [
    { value: '$120K', label: 'Revenue', sub: 'in 3 months' },
    { value: '45%', label: 'Retention', sub: 'repeat customers' }
  ],
  
  challenge: {
    intro: '',
    items: [
      { title: '', desc: '' },
      { title: '', desc: '' }
    ]
  },
  
  solution: {
    intro: '',
    phases: [
      { phase: '', time: '', desc: '' },
      { phase: '', time: '', desc: '' }
    ]
  },
  
  outcome: {
    description: '',
    before: [{ label: '', value: '' }],
    after: [{ label: '', value: '' }]
  },
  
  testimonials: [
    { quote: '', name: '', role: '', avatar: '' }
  ],
  
  related: [
    { tag: '', title: '', meta: '' }
  ],
  
  media: [
    { type: 'image', url: '', alt: '', caption: '' }
  ],
  
  seo: {
    meta_title: '',
    meta_description: '',
    og_image: '',
    canonical: '',
    calendly_url: ''
  }
};

// Step configuration
const steps = [
  { id: 1, name: 'Header & Meta', icon: '📝', description: 'Basic information and metadata' },
  { id: 2, name: 'Challenge & Solution', icon: '🎯', description: 'Define problem and approach' },
  { id: 3, name: 'Results & Media', icon: '📊', description: 'Metrics and visual content' },
  { id: 4, name: 'SEO & Settings', icon: '🔧', description: 'Meta tags and configuration' },
  { id: 5, name: 'Review', icon: '✓', description: 'Final review and publish' }
];

export default function CreateCaseStudyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid },
    reset
  } = useForm<CaseStudyFormData>({
    resolver: zodResolver(caseStudySchema),
    defaultValues: defaultFormData,
    mode: 'onChange'
  });

  // Field arrays for dynamic fields
  const { fields: heroStatFields, append: appendHeroStat, remove: removeHeroStat } = useFieldArray({
    control,
    name: 'hero_stats'
  });

  const { fields: metricFields, append: appendMetric, remove: removeMetric } = useFieldArray({
    control,
    name: 'metrics'
  });

  const { fields: challengeItemFields, append: appendChallengeItem, remove: removeChallengeItem } = useFieldArray({
    control,
    name: 'challenge.items'
  });

  const { fields: solutionPhaseFields, append: appendSolutionPhase, remove: removeSolutionPhase } = useFieldArray({
    control,
    name: 'solution.phases'
  });

  const { fields: beforeFields, append: appendBefore, remove: removeBefore } = useFieldArray({
    control,
    name: 'outcome.before'
  });

  const { fields: afterFields, append: appendAfter, remove: removeAfter } = useFieldArray({
    control,
    name: 'outcome.after'
  });

  const { fields: testimonialFields, append: appendTestimonial, remove: removeTestimonial } = useFieldArray({
    control,
    name: 'testimonials'
  });

  const { fields: relatedFields, append: appendRelated, remove: removeRelated } = useFieldArray({
    control,
    name: 'related'
  });

  const { fields: mediaFields, append: appendMedia, remove: removeMedia } = useFieldArray({
    control,
    name: 'media'
  });

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      reset(savedData);
      showToastMessage('Draft loaded successfully', 'success');
    }
  }, [reset]);

  // Auto-save to localStorage
  useEffect(() => {
    const subscription = watch((value) => {
      const timeoutId = setTimeout(() => {
        if (value && Object.keys(value).length > 0) {
          saveToLocalStorage(getValues());
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    });
    return () => subscription.unsubscribe();
  }, [watch, getValues]);

  const showToastMessage = (message: string, type: 'success' | 'error' | 'info') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const formatSlug = (value: string) => {
    return value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
  };

  const toggleTag = (tag: string) => {
    const currentTags = getValues('tag_slugs');
    if (currentTags.includes(tag)) {
      setValue('tag_slugs', currentTags.filter(t => t !== tag), { shouldValidate: true });
    } else {
      setValue('tag_slugs', [...currentTags, tag], { shouldValidate: true });
    }
  };

  const addCustomTag = () => {
    const input = document.getElementById('customTag') as HTMLInputElement;
    const val = input?.value.trim();
    if (val && !getValues('tag_slugs').includes(val)) {
      setValue('tag_slugs', [...getValues('tag_slugs'), val], { shouldValidate: true });
      input.value = '';
      showToastMessage(`Tag "${val}" added`, 'success');
    }
  };

  const saveDraft = () => {
    const data = getValues();
    const success = saveToLocalStorage(data);
    showToastMessage(success ? 'Draft saved successfully' : 'Failed to save draft', success ? 'success' : 'error');
  };

  const clearDraft = () => {
    localStorage.removeItem('caseStudyDraft');
    reset(defaultFormData);
    showToastMessage('Draft cleared', 'info');
  };

  const onSubmit = async (data: CaseStudyFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      const res = await api_url.post("/api/case-studies",data)
      console.log("rest ===========>",res)
      console.log('Published Case Study:', data);
      showToastMessage('Case study published successfully!', 'success');
      setCurrentStep(6);
      // Clear draft after successful publish
      localStorage.removeItem('caseStudyDraft');
    } catch (error:any) {
        console.log(error)
      showToastMessage('Failed to publish. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = async () => {
    // Validate current step fields
    let fieldsToValidate: (keyof CaseStudyFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['slug', 'title_normal', 'description', 'type'];
        break;
      case 2:
        fieldsToValidate = ['challenge', 'solution'];
        break;
      case 3:
        fieldsToValidate = ['hero_stats', 'metrics', 'outcome'];
        break;
      case 4:
        fieldsToValidate = ['seo'];
        break;
    }
    
    const isValidStep = await trigger(fieldsToValidate as any);
    if (isValidStep) {
      goToStep(currentStep + 1);
    } else {
      showToastMessage('Please fill in all required fields', 'error');
    }
  };

  const typeCards = [
    { id: 'client_success' as CaseType, title: 'Client Success', desc: 'Real client outcomes', icon: Users, gradient: 'from-blue-500/20 to-cyan-500/20' },
    { id: 'product' as CaseType, title: 'Product', desc: 'Feature deep-dive', icon: Monitor, gradient: 'from-purple-500/20 to-pink-500/20' },
    { id: 'research' as CaseType, title: 'Research', desc: 'Data-backed study', icon: Search, gradient: 'from-green-500/20 to-emerald-500/20' },
    { id: 'business' as CaseType, title: 'Business', desc: 'Problem & solution', icon: BarChart3, gradient: 'from-orange-500/20 to-red-500/20' }
  ];

  const watchTitleNormal = watch('title_normal');
  const watchTitleHighlight = watch('title_highlight');
  const watchTitleSuffix = watch('title_suffix');
  const watchSlug = watch('slug');
  const watchType = watch('type');
  const watchStatus = watch('status');
  const watchTagSlugs = watch('tag_slugs');

  const { trigger } = useForm();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0e14] via-[#0f141c] to-[#0a0e14] text-[#e8edf5]">
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1fb5dd]/10 border border-[#1fb5dd]/20 text-[#1fb5dd] text-[11px] uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1fb5dd] animate-pulse"></span>
            New Case Study
          </div>
          <h1 className="font-['Syne',sans-serif] font-bold text-3xl md:text-4xl text-white mb-2 bg-linear-to-r from-white to-[#1fb5dd] bg-clip-text">
            Create Case Study
          </h1>
          <p className="text-[14px] text-[#7a8899]">Fill in all sections following the XYZ Store case study format. Auto-saves to browser storage.</p>
        </div>

        {/* Progress Bar with Steps */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-0.5 bg-[#1c2534] rounded-full"></div>
            </div>
            <div className="relative flex justify-between">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => step.id <= currentStep && goToStep(step.id)}
                  className={`flex flex-col items-center group ${step.id <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  disabled={step.id > currentStep}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                    ${step.id < currentStep ? 'bg-[#1fb5dd] text-white shadow-lg shadow-[#1fb5dd]/30' : 
                      step.id === currentStep ? 'bg-[#1fb5dd] text-white ring-4 ring-[#1fb5dd]/30 scale-110' : 
                      'bg-[#1c2534] text-[#7a8899] border border-[#2a3545]'}
                    ${step.id <= currentStep ? 'hover:scale-110' : ''}
                  `}>
                    {step.id < currentStep ? <CheckCircle size={18} /> : step.id}
                  </div>
                  <div className="absolute -bottom-6 text-center mt-2">
                    <div className={`text-[11px] font-medium ${step.id === currentStep ? 'text-[#1fb5dd]' : 'text-[#7a8899]'}`}>
                      {step.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* STEP 1: Header & Meta */}
          <div className={`transition-all duration-500 ${currentStep === 1 ? 'block animate-fadeIn' : 'hidden'}`}>
            <div className=" backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(255,255,255,0.08)]">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] flex items-center justify-center shadow-lg shadow-[#1fb5dd]/20">
                  <span className="text-white text-lg">📝</span>
                </div>
                <div>
                  <h2 className="font-['Syne',sans-serif] font-semibold text-white text-lg">Header & Metadata</h2>
                  <p className="text-[12px] text-[#7a8899]">Title structure, slug, description and type</p>
                </div>
              </div>

              {/* Case Type */}
              <div className="mb-6">
                <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-3">
                  Case Study Type <span className="text-[#1fb5dd]">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {typeCards.map(type => {
                    const IconComponent = type.icon;
                    const isSelected = watchType === type.id;
                    return (
                      <div 
                        key={type.id}
                        onClick={() => setValue('type', type.id, { shouldValidate: true })}
                        className={`
                          relative group cursor-pointer rounded-xl p-4 transition-all duration-300
                          ${isSelected 
                            ? 'bg-linear-to-br border-2 border-[#1fb5dd] shadow-lg shadow-[#1fb5dd]/20 scale-[1.02]' 
                            : 'bg-[#1c2534] border border-[rgba(255,255,255,0.08)] hover:border-[#1fb5dd]/50 hover:scale-[1.01]'}
                        `}
                      >
                        <div className={`absolute inset-0 rounded-xl bg-linear-to-br ${type.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        <div className="relative flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isSelected ? 'bg-[#1fb5dd] shadow-lg' : 'bg-[#1fb5dd]/10 group-hover:bg-[#1fb5dd]/20'}`}>
                            <IconComponent size={18} className={isSelected ? 'text-white' : 'text-[#1fb5dd]'} />
                          </div>
                          <div>
                            <div className="text-[14px] font-semibold text-white mb-0.5">{type.title}</div>
                            <div className="text-[11px] text-[#7a8899]">{type.desc}</div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle size={16} className="text-[#1fb5dd]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {errors.type && (
                  <p className="text-[11px] text-red-400 mt-2">{errors.type.message}</p>
                )}
              </div>

              {/* Title Parts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">
                    Normal Text <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <input 
                    type="text" 
                    className={`w-full bg-[#1c2534] border rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.title_normal ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                    placeholder="How We Helped"
                    {...register('title_normal')}
                  />
                  {errors.title_normal && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.title_normal.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">Highlight Text</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]"
                    placeholder="XYZ Store"
                    {...register('title_highlight')}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">Suffix</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]"
                    placeholder="Increase Sales by 250%"
                    {...register('title_suffix')}
                  />
                </div>
              </div>
              
              {/* Title Preview */}
              <div className="mb-5 p-4 bg-linear-to-r from-[#1fb5dd]/5 to-transparent rounded-xl border-l-3 border-[#1fb5dd]">
                <div className="text-[10px] text-[#7a8899] uppercase tracking-wider mb-1">Preview</div>
                <div className="text-[15px] font-semibold">
                  {watchTitleNormal} <span className="text-[#1fb5dd]">{watchTitleHighlight}</span> {watchTitleSuffix}
                </div>
              </div>

              {/* Slug */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">
                  URL Slug <span className="text-[#1fb5dd]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[12px] text-[#7a8899] font-mono">/case-study/</span>
                  <input 
                    type="text" 
                    className={`w-full bg-[#1c2534] border rounded-xl p-3 pl-26.25 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] font-mono ${errors.slug ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                    placeholder="boosting-ecommerce-sales-xyz"
                    {...register('slug', {
                      onChange: (e) => {
                        const formatted = formatSlug(e.target.value);
                        e.target.value = formatted;
                      }
                    })}
                  />
                </div>
                {errors.slug && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.slug.message}</p>
                )}
                {watchSlug && (
                  <p className="text-[11px] text-[#7a8899] mt-1 font-mono">https://yourdomain.com/case-study/{watchSlug}</p>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">
                  Description <span className="text-[#1fb5dd]">*</span>
                </label>
                <textarea 
                  rows={3} 
                  className={`w-full bg-[#1c2534] border rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] resize-vertical ${errors.description ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                  placeholder="A complete growth strategy case study for an eCommerce brand..."
                  {...register('description')}
                />
                <div className="flex justify-between mt-1">
                  {errors.description && (
                    <p className="text-[11px] text-red-400">{errors.description.message}</p>
                  )}
                  <div className="text-right text-[11px] text-[#7a8899] ml-auto">
                    {watch('description')?.length || 0} / 200
                  </div>
                </div>
              </div>

              {/* Read Time & Publish Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">Read Time (minutes)</label>
                  <input 
                    type="number" 
                    className="w-full bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]"
                    {...register('read_time_min', { valueAsNumber: true })}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">Publish Date</label>
                  <input 
                    type="date" 
                    className="w-full bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]"
                    {...register('published_at')}
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {['ecommerce', 'growth', 'marketing', 'saas', 'fintech', 'b2b', 'startup'].map(tag => (
                    <span 
                      key={tag} 
                      onClick={() => toggleTag(tag)} 
                      className={`inline-flex items-center gap-1.5 rounded-full py-1.5 px-3 text-[12px] font-medium cursor-pointer transition-all duration-200
                        ${watchTagSlugs?.includes(tag) 
                          ? 'bg-[#1fb5dd] text-white shadow-md shadow-[#1fb5dd]/30' 
                          : 'bg-[#1fb5dd]/10 text-[#1fb5dd] hover:bg-[#1fb5dd]/20'}`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    id="customTag" 
                    type="text" 
                    placeholder="Add custom tag..." 
                    className="flex-1 max-w-50 bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]"
                    onKeyDown={(e) => e.key === 'Enter' && addCustomTag()} 
                  />
                  <button 
                    type="button"
                    onClick={addCustomTag} 
                    className="bg-transparent border border-[rgba(255,255,255,0.08)] text-[#7a8899] px-5 py-2 rounded-xl text-[13px] font-medium hover:border-white/20 hover:text-[#e8edf5] transition-all"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <button 
                  type="button"
                  onClick={clearDraft} 
                  className="flex items-center gap-2 bg-transparent border border-red-500/30 text-red-400 px-5 py-2.5 rounded-xl text-[13px] font-medium hover:bg-red-500/10 transition-all"
                >
                  <Trash2 size={16} />
                  Clear Draft
                </button>
                <button 
                  type="button"
                  onClick={nextStep} 
                  className="flex items-center gap-2 bg-linear-to-r from-[#1fb5dd] to-[#0d8eb0] text-white px-8 py-2.5 rounded-xl text-[14px] font-semibold font-['Syne',sans-serif] shadow-lg shadow-[#1fb5dd]/30 hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  Continue
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* STEP 2: Challenge & Solution */}
          <div className={`transition-all duration-500 ${currentStep === 2 ? 'block animate-fadeIn' : 'hidden'}`}>
            <div className="bg-[#151b24]/80 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(255,255,255,0.08)]">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] flex items-center justify-center shadow-lg shadow-[#1fb5dd]/20">
                  <span className="text-white text-lg">🎯</span>
                </div>
                <div>
                  <h2 className="font-['Syne',sans-serif] font-semibold text-white text-lg">Challenge & Solution</h2>
                  <p className="text-[12px] text-[#7a8899]">Define the problem and your approach</p>
                </div>
              </div>

              {/* Challenge Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] rounded-full"></div>
                  <h3 className="text-[15px] font-semibold text-white">Challenge</h3>
                </div>
                <div className="mb-3">
                  <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">
                    Intro <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <input 
                    type="text" 
                    className={`w-full bg-[#1c2534] border rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.challenge?.intro ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                    placeholder="The client struggled with low conversion and high cart abandonment."
                    {...register('challenge.intro')}
                  />
                  {errors.challenge?.intro && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.challenge.intro.message}</p>
                  )}
                </div>
                <div className="space-y-3">
                  {challengeItemFields.map((field, idx) => (
                    <div key={field.id} className="bg-[#1c2534]/50 border border-[rgba(255,255,255,0.08)] rounded-xl p-4 hover:border-[#1fb5dd]/30 transition-all">
                      <div className="flex gap-3 mb-3">
                        <input 
                          type="text" 
                          placeholder="Challenge title" 
                          className={`flex-1 bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.challenge?.items?.[idx]?.title ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                          {...register(`challenge.items.${idx}.title`)}
                        />
                        <button 
                          type="button"
                          onClick={() => removeChallengeItem(idx)} 
                          className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <input 
                        type="text" 
                        placeholder="Description" 
                        className={`w-full bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.challenge?.items?.[idx]?.desc ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                        {...register(`challenge.items.${idx}.desc`)}
                      />
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={() => appendChallengeItem({ title: '', desc: '' })} 
                    className="w-full flex items-center justify-center gap-2 bg-transparent border border-dashed border-[#1fb5dd]/40 text-[#1fb5dd] py-3 rounded-xl text-[12px] font-medium hover:bg-[#1fb5dd]/10 transition-all"
                  >
                    <Plus size={14} />
                    Add Challenge Item
                  </button>
                </div>
              </div>

              {/* Solution Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] rounded-full"></div>
                  <h3 className="text-[15px] font-semibold text-white">Solution</h3>
                </div>
                <div className="mb-3">
                  <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">
                    Intro <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <input 
                    type="text" 
                    className={`w-full bg-[#1c2534] border rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.solution?.intro ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                    placeholder="We implemented a full-funnel optimization strategy."
                    {...register('solution.intro')}
                  />
                  {errors.solution?.intro && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.solution.intro.message}</p>
                  )}
                </div>
                <div className="space-y-3">
                  {solutionPhaseFields.map((field, idx) => (
                    <div key={field.id} className="bg-[#1c2534]/50 border border-[rgba(255,255,255,0.08)] rounded-xl p-4 hover:border-[#1fb5dd]/30 transition-all">
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <input 
                          type="text" 
                          placeholder="Phase name (e.g., Audit)" 
                          className={`bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.solution?.phases?.[idx]?.phase ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                          {...register(`solution.phases.${idx}.phase`)}
                        />
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Time (e.g., Week 1)" 
                            className={`flex-1 bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.solution?.phases?.[idx]?.time ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                            {...register(`solution.phases.${idx}.time`)}
                          />
                          <button 
                            type="button"
                            onClick={() => removeSolutionPhase(idx)} 
                            className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <input 
                        type="text" 
                        placeholder="Description" 
                        className={`w-full bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.solution?.phases?.[idx]?.desc ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                        {...register(`solution.phases.${idx}.desc`)}
                      />
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={() => appendSolutionPhase({ phase: '', time: '', desc: '' })} 
                    className="w-full flex items-center justify-center gap-2 bg-transparent border border-dashed border-[#1fb5dd]/40 text-[#1fb5dd] py-3 rounded-xl text-[12px] font-medium hover:bg-[#1fb5dd]/10 transition-all"
                  >
                    <Plus size={14} />
                    Add Solution Phase
                  </button>
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <button 
                  type="button"
                  onClick={() => goToStep(1)} 
                  className="flex items-center gap-2 bg-transparent border border-[rgba(255,255,255,0.08)] text-[#7a8899] px-6 py-2.5 rounded-xl text-[14px] font-medium hover:border-white/20 hover:text-[#e8edf5] transition-all"
                >
                  <ChevronLeft size={18} />
                  Back
                </button>
                <button 
                  type="button"
                  onClick={nextStep} 
                  className="flex items-center gap-2 bg-linear-to-r from-[#1fb5dd] to-[#0d8eb0] text-white px-8 py-2.5 rounded-xl text-[14px] font-semibold font-['Syne',sans-serif] shadow-lg shadow-[#1fb5dd]/30 hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  Continue
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* STEP 3: Results & Media */}
          <div className={`transition-all duration-500 ${currentStep === 3 ? 'block animate-fadeIn' : 'hidden'}`}>
            <div className="bg-[#151b24]/80 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(255,255,255,0.08)]">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] flex items-center justify-center shadow-lg shadow-[#1fb5dd]/20">
                  <span className="text-white text-lg">📊</span>
                </div>
                <div>
                  <h2 className="font-['Syne',sans-serif] font-semibold text-white text-lg">Results & Media</h2>
                  <p className="text-[12px] text-[#7a8899]">Hero stats, metrics, outcome, testimonials and media</p>
                </div>
              </div>

              {/* Hero Stats */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] rounded-full"></div>
                  <h3 className="text-[13px] font-semibold text-white">Hero Stats</h3>
                </div>
                <div className="space-y-2">
                  {heroStatFields.map((field, idx) => (
                    <div key={field.id} className="grid grid-cols-[1fr,1fr,40px] gap-2">
                      <input 
                        type="text" 
                        placeholder="Value (e.g., 250%)" 
                        className={`bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.hero_stats?.[idx]?.value ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                        {...register(`hero_stats.${idx}.value`)}
                      />
                      <input 
                        type="text" 
                        placeholder="Label (e.g., Sales Growth)" 
                        className={`bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.hero_stats?.[idx]?.label ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                        {...register(`hero_stats.${idx}.label`)}
                      />
                      <button 
                        type="button"
                        onClick={() => removeHeroStat(idx)} 
                        className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={() => appendHeroStat({ value: '', label: '' })} 
                    className="text-[#1fb5dd] text-[12px] hover:underline flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Hero Stat
                  </button>
                </div>
              </div>

              {/* Metrics */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] rounded-full"></div>
                  <h3 className="text-[13px] font-semibold text-white">Metrics</h3>
                </div>
                <div className="space-y-2">
                  {metricFields.map((field, idx) => (
                    <div key={field.id} className="grid grid-cols-[1fr,1fr,1.5fr,40px] gap-2">
                      <input 
                        type="text" 
                        placeholder="Value (e.g., $120K)" 
                        className={`bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.metrics?.[idx]?.value ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                        {...register(`metrics.${idx}.value`)}
                      />
                      <input 
                        type="text" 
                        placeholder="Label (e.g., Revenue)" 
                        className={`bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.metrics?.[idx]?.label ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                        {...register(`metrics.${idx}.label`)}
                      />
                      <input 
                        type="text" 
                        placeholder="Subtext (e.g., in 3 months)" 
                        className="bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]"
                        {...register(`metrics.${idx}.sub`)}
                      />
                      <button 
                        type="button"
                        onClick={() => removeMetric(idx)} 
                        className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={() => appendMetric({ value: '', label: '', sub: '' })} 
                    className="text-[#1fb5dd] text-[12px] hover:underline flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Metric
                  </button>
                </div>
              </div>

              {/* Outcome with Before/After */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] rounded-full"></div>
                  <h3 className="text-[13px] font-semibold text-white">Outcome</h3>
                </div>
                <div className="mb-3">
                  <input 
                    type="text" 
                    placeholder="Outcome description" 
                    className={`w-full bg-[#1c2534] border rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.outcome?.description ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                    {...register('outcome.description')}
                  />
                  {errors.outcome?.description && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.outcome.description.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[12px] text-[#7a8899] mb-2 font-medium">Before</div>
                    {beforeFields.map((field, idx) => (
                      <div key={field.id} className="flex gap-2 mb-2">
                        <input 
                          type="text" 
                          placeholder="Metric" 
                          className={`flex-1 bg-[#1c2534] border rounded-lg p-2 text-[12px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.outcome?.before?.[idx]?.label ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                          {...register(`outcome.before.${idx}.label`)}
                        />
                        <input 
                          type="text" 
                          placeholder="Value" 
                          className={`w-24 bg-[#1c2534] border rounded-lg p-2 text-[12px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.outcome?.before?.[idx]?.value ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                          {...register(`outcome.before.${idx}.value`)}
                        />
                        <button 
                          type="button"
                          onClick={() => removeBefore(idx)} 
                          className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => appendBefore({ label: '', value: '' })} 
                      className="text-[#1fb5dd] text-[11px] hover:underline flex items-center gap-1"
                    >
                      <Plus size={10} /> Add
                    </button>
                  </div>
                  <div>
                    <div className="text-[12px] text-[#7a8899] mb-2 font-medium">After</div>
                    {afterFields.map((field, idx) => (
                      <div key={field.id} className="flex gap-2 mb-2">
                        <input 
                          type="text" 
                          placeholder="Metric" 
                          className={`flex-1 bg-[#1c2534] border rounded-lg p-2 text-[12px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.outcome?.after?.[idx]?.label ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                          {...register(`outcome.after.${idx}.label`)}
                        />
                        <input 
                          type="text" 
                          placeholder="Value" 
                          className={`w-24 bg-[#1c2534] border rounded-lg p-2 text-[12px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.outcome?.after?.[idx]?.value ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                          {...register(`outcome.after.${idx}.value`)}
                        />
                        <button 
                          type="button"
                          onClick={() => removeAfter(idx)} 
                          className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => appendAfter({ label: '', value: '' })} 
                      className="text-[#1fb5dd] text-[11px] hover:underline flex items-center gap-1"
                    >
                      <Plus size={10} /> Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] rounded-full"></div>
                  <h3 className="text-[13px] font-semibold text-white">Testimonials</h3>
                </div>
                {testimonialFields.map((field, idx) => (
                  <div key={field.id} className="bg-[#1c2534]/50 border border-[rgba(255,255,255,0.08)] rounded-xl p-4 mb-3 hover:border-[#1fb5dd]/30 transition-all">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input 
                        type="text" 
                        placeholder="Name" 
                        className={`bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.testimonials?.[idx]?.name ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                        {...register(`testimonials.${idx}.name`)}
                      />
                      <input 
                        type="text" 
                        placeholder="Role" 
                        className={`bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.testimonials?.[idx]?.role ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                        {...register(`testimonials.${idx}.role`)}
                      />
                    </div>
                    <div className="flex gap-3 mb-3">
                      <input 
                        type="text" 
                        placeholder="Avatar URL" 
                        className="flex-1 bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]"
                        {...register(`testimonials.${idx}.avatar`)}
                      />
                      <button 
                        type="button"
                        onClick={() => removeTestimonial(idx)} 
                        className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <textarea 
                      rows={2} 
                      placeholder="Quote" 
                      className={`w-full bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] resize-vertical ${errors.testimonials?.[idx]?.quote ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                      {...register(`testimonials.${idx}.quote`)}
                    />
                  </div>
                ))}
                <button 
                  type="button"
                  onClick={() => appendTestimonial({ quote: '', name: '', role: '', avatar: '' })} 
                  className="text-[#1fb5dd] text-[12px] hover:underline flex items-center gap-1"
                >
                  <Plus size={12} /> Add Testimonial
                </button>
              </div>

              {/* Media */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] rounded-full"></div>
                  <h3 className="text-[13px] font-semibold text-white">Media</h3>
                </div>
                {mediaFields.map((field, idx) => (
                  <div key={field.id} className="bg-[#1c2534]/50 border border-[rgba(255,255,255,0.08)] rounded-xl p-4 mb-3 hover:border-[#1fb5dd]/30 transition-all">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <select 
                        className="bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]"
                        {...register(`media.${idx}.type`)}
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                      <button 
                        type="button"
                        onClick={() => removeMedia(idx)} 
                        className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center ml-auto hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <input 
                      type="text" 
                      placeholder="URL" 
                      className={`w-full bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] mb-2 ${errors.media?.[idx]?.url ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                      {...register(`media.${idx}.url`)}
                    />
                    <input 
                      type="text" 
                      placeholder="Alt text" 
                      className={`w-full bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] mb-2 ${errors.media?.[idx]?.alt ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                      {...register(`media.${idx}.alt`)}
                    />
                    <input 
                      type="text" 
                      placeholder="Caption (optional)" 
                      className="w-full bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]"
                      {...register(`media.${idx}.caption`)}
                    />
                  </div>
                ))}
                <button 
                  type="button"
                  onClick={() => appendMedia({ type: 'image', url: '', alt: '', caption: '' })} 
                  className="text-[#1fb5dd] text-[12px] hover:underline flex items-center gap-1"
                >
                  <Plus size={12} /> Add Media
                </button>
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <button 
                  type="button"
                  onClick={() => goToStep(2)} 
                  className="flex items-center gap-2 bg-transparent border border-[rgba(255,255,255,0.08)] text-[#7a8899] px-6 py-2.5 rounded-xl text-[14px] font-medium hover:border-white/20 hover:text-[#e8edf5] transition-all"
                >
                  <ChevronLeft size={18} />
                  Back
                </button>
                <button 
                  type="button"
                  onClick={nextStep} 
                  className="flex items-center gap-2 bg-linear-to-r from-[#1fb5dd] to-[#0d8eb0] text-white px-8 py-2.5 rounded-xl text-[14px] font-semibold font-['Syne',sans-serif] shadow-lg shadow-[#1fb5dd]/30 hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  Continue
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* STEP 4: SEO & Settings */}
          <div className={`transition-all duration-500 ${currentStep === 4 ? 'block animate-fadeIn' : 'hidden'}`}>
            <div className="bg-[#151b24]/80 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(255,255,255,0.08)]">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] flex items-center justify-center shadow-lg shadow-[#1fb5dd]/20">
                  <span className="text-white text-lg">🔧</span>
                </div>
                <div>
                  <h2 className="font-['Syne',sans-serif] font-semibold text-white text-lg">SEO & Settings</h2>
                  <p className="text-[12px] text-[#7a8899]">Meta tags, related content and Calendly link</p>
                </div>
              </div>

              {/* Related Content */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] rounded-full"></div>
                  <h3 className="text-[13px] font-semibold text-white">Related Content</h3>
                </div>
                {relatedFields.map((field, idx) => (
                  <div key={field.id} className="bg-[#1c2534]/50 border border-[rgba(255,255,255,0.08)] rounded-xl p-4 mb-3 hover:border-[#1fb5dd]/30 transition-all">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input 
                        type="text" 
                        placeholder="Tag" 
                        className={`bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.related?.[idx]?.tag ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                        {...register(`related.${idx}.tag`)}
                      />
                      <button 
                        type="button"
                        onClick={() => removeRelated(idx)} 
                        className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center ml-auto hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Title" 
                      className={`w-full bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] mb-2 ${errors.related?.[idx]?.title ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                      {...register(`related.${idx}.title`)}
                    />
                    <input 
                      type="text" 
                      placeholder="Meta description" 
                      className={`w-full bg-[#1c2534] border rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] ${errors.related?.[idx]?.meta ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'}`}
                      {...register(`related.${idx}.meta`)}
                    />
                  </div>
                ))}
                <button 
                  type="button"
                  onClick={() => appendRelated({ tag: '', title: '', meta: '' })} 
                  className="text-[#1fb5dd] text-[12px] hover:underline flex items-center gap-1"
                >
                  <Plus size={12} /> Add Related
                </button>
              </div>

              {/* SEO Meta */}
              <div className="bg-linear-to-br from-[#1c2534] to-[#151b24] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 mb-6">
                <div className="text-[11px] uppercase tracking-widest text-[#1fb5dd] mb-4 font-semibold">SEO & Meta</div>
                <div className="mb-3.5">
                  <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">Meta Title</label>
                  <input 
                    type="text" 
                    maxLength={70}
                    className="w-full bg-[#151b24] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]"
                    {...register('seo.meta_title')}
                  />
                  <div className="text-right text-[11px] mt-1 text-[#7a8899]">
                    {watch('seo.meta_title')?.length || 0} / 70
                  </div>
                </div>
                <div className="mb-3.5">
                  <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">Meta Description</label>
                  <textarea 
                    rows={2} 
                    maxLength={160}
                    className="w-full bg-[#151b24] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] resize-vertical"
                    {...register('seo.meta_description')}
                  />
                  <div className="text-right text-[11px] mt-1 text-[#7a8899]">
                    {watch('seo.meta_description')?.length || 0} / 160
                  </div>
                </div>
                <div className="mb-3.5">
                  <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">OG Image URL</label>
                  <input 
                    type="url" 
                    placeholder="https://example.com/og-image.jpg"
                    className="w-full bg-[#151b24] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]"
                    {...register('seo.og_image')}
                  />
                </div>
                <div className="mb-3.5">
                  <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">Canonical URL</label>
                  <input 
                    type="url" 
                    placeholder="https://example.com/case-study/xyz"
                    className="w-full bg-[#151b24] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]"
                    {...register('seo.canonical')}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">Calendly URL</label>
                  <input 
                    type="url" 
                    placeholder="https://calendly.com/your-link"
                    className="w-full bg-[#151b24] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]"
                    {...register('seo.calendly_url')}
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2">Publication Status</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'draft', label: 'Draft', color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20' },
                    { id: 'review', label: 'In Review', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
                    { id: 'published', label: 'Published', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
                    { id: 'archived', label: 'Archived', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' }
                  ].map(status => (
                    <div 
                      key={status.id} 
                      onClick={() => setValue('status', status.id as StatusType, { shouldValidate: true })} 
                      className={`inline-flex items-center gap-1.5 py-2 px-4 rounded-full border text-[12px] font-medium cursor-pointer transition-all duration-200
                        ${watchStatus === status.id 
                          ? `${status.bg} ${status.color} ${status.border} border-opacity-100 shadow-md` 
                          : 'border-[rgba(255,255,255,0.08)] text-[#7a8899] hover:border-white/20'}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {status.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <button 
                  type="button"
                  onClick={() => goToStep(3)} 
                  className="flex items-center gap-2 bg-transparent border border-[rgba(255,255,255,0.08)] text-[#7a8899] px-6 py-2.5 rounded-xl text-[14px] font-medium hover:border-white/20 hover:text-[#e8edf5] transition-all"
                >
                  <ChevronLeft size={18} />
                  Back
                </button>
                <button 
                  type="button"
                  onClick={() => goToStep(5)} 
                  className="flex items-center gap-2 bg-linear-to-r from-[#1fb5dd] to-[#0d8eb0] text-white px-8 py-2.5 rounded-xl text-[14px] font-semibold font-['Syne',sans-serif] shadow-lg shadow-[#1fb5dd]/30 hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  Review
                  <Eye size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* STEP 5: Review */}
          <div className={`transition-all duration-500 ${currentStep === 5 ? 'block animate-fadeIn' : 'hidden'}`}>
            <div className="bg-[#151b24]/80 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(255,255,255,0.08)]">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] flex items-center justify-center shadow-lg shadow-[#1fb5dd]/20">
                  <span className="text-white text-lg">✓</span>
                </div>
                <div>
                  <h2 className="font-['Syne',sans-serif] font-semibold text-white text-lg">Review & Publish</h2>
                  <p className="text-[12px] text-[#7a8899]">Final review before publishing</p>
                </div>
              </div>

              {/* Review Summary */}
              <div className="bg-linear-to-br from-[#1c2534] to-[#151b24] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 mb-6">
                <div className="text-[11px] uppercase tracking-widest text-[#7a8899] mb-5 flex justify-between items-center">
                  <span className="font-semibold">Case Study Summary</span>
                  <button 
                    type="button"
                    onClick={saveDraft} 
                    className="flex items-center gap-1 text-[#1fb5dd] text-[11px] uppercase hover:underline"
                  >
                    <Save size={12} />
                    Save Draft
                  </button>
                </div>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] text-[#7a8899] uppercase tracking-wider mb-1">Title</div>
                      <div className="text-[14px] font-medium wrap-break-word">
                        {watchTitleNormal} <span className="text-[#1fb5dd]">{watchTitleHighlight}</span> {watchTitleSuffix}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#7a8899] uppercase tracking-wider mb-1">Type & Status</div>
                      <div className="text-[14px] font-medium capitalize">{watchType?.replace('_', ' ')} • 
                        <span className={`ml-1 ${
                          watchStatus === 'draft' ? 'text-gray-400' :
                          watchStatus === 'review' ? 'text-yellow-400' :
                          watchStatus === 'published' ? 'text-green-400' : 'text-red-400'
                        }`}>{watchStatus}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-[10px] text-[#7a8899] uppercase tracking-wider mb-1">Slug</div>
                    <div className="text-[13px] font-mono text-[#1fb5dd]">/case-study/{watchSlug}</div>
                  </div>
                  
                  <div>
                    <div className="text-[10px] text-[#7a8899] uppercase tracking-wider mb-1">Description</div>
                    <div className="text-[13px] text-[#e8edf5]">{watch('description') || '—'}</div>
                  </div>
                  
                  <div>
                    <div className="text-[10px] text-[#7a8899] uppercase tracking-wider mb-1">Tags</div>
                    <div className="flex flex-wrap gap-1.5">
                      {watchTagSlugs?.map(tag => (
                        <span key={tag} className="text-[11px] bg-[#1fb5dd]/15 text-[#1fb5dd] px-2.5 py-1 rounded-full">#{tag}</span>
                      ))}
                      {(!watchTagSlugs || watchTagSlugs.length === 0) && <span className="text-[13px] text-[#7a8899]">—</span>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] text-[#7a8899] uppercase tracking-wider mb-2">Hero Stats</div>
                      <div className="space-y-1">
                        {watch('hero_stats')?.map((stat, idx) => (
                          <div key={idx} className="text-[13px]"><span className="text-[#1fb5dd] font-semibold">{stat.value}</span> {stat.label}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#7a8899] uppercase tracking-wider mb-2">Metrics</div>
                      <div className="space-y-1">
                        {watch('metrics')?.map((metric, idx) => (
                          <div key={idx} className="text-[13px]">
                            <span className="text-[#1fb5dd] font-semibold">{metric.value}</span> {metric.label} 
                            {metric.sub && <span className="text-[#7a8899] text-[11px] ml-1">({metric.sub})</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-[10px] text-[#7a8899] uppercase tracking-wider mb-1">SEO Meta Title</div>
                    <div className="text-[13px]">{watch('seo.meta_title') || '—'}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button 
                  type="button"
                  onClick={() => goToStep(4)} 
                  className="flex items-center gap-2 bg-transparent border border-[rgba(255,255,255,0.08)] text-[#7a8899] px-6 py-2.5 rounded-xl text-[14px] font-medium hover:border-white/20 hover:text-[#e8edf5] transition-all"
                >
                  <ChevronLeft size={18} />
                  Back
                </button>
                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={saveDraft} 
                    className="flex items-center gap-2 bg-transparent border border-[rgba(255,255,255,0.08)] text-[#7a8899] px-6 py-2.5 rounded-xl text-[14px] font-medium hover:border-white/20 hover:text-[#e8edf5] transition-all"
                  >
                    <Save size={16} />
                    Save Draft
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="flex items-center gap-2 bg-linear-to-r from-[#1fb5dd] to-[#0d8eb0] text-white px-8 py-2.5 rounded-xl text-[14px] font-semibold font-['Syne',sans-serif] shadow-lg shadow-[#1fb5dd]/30 hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Publish Case Study
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* SUCCESS STEP */}
        {currentStep === 6 && (
          <div className="bg-[#151b24]/80 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-2xl p-12 text-center animate-fadeIn">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-[#1fb5dd]/20 animate-ping"></div>
              </div>
              <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] flex items-center justify-center mx-auto mb-6 shadow-xl">
                <CheckCircle size={40} className="text-white" />
              </div>
            </div>
            <h2 className="font-['Syne',sans-serif] font-bold text-2xl text-white mb-2">Case Study Published!</h2>
            <p className="text-[14px] text-[#7a8899] mb-8">Your case study has been created and is ready to view.</p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={clearDraft} 
                className="flex items-center gap-2 bg-transparent border border-[rgba(255,255,255,0.08)] text-[#7a8899] px-6 py-2.5 rounded-xl text-[14px] font-medium hover:border-white/20 hover:text-[#e8edf5] transition-all"
              >
                Create Another
              </button>
              <button className="flex items-center gap-2 bg-linear-to-r from-[#1fb5dd] to-[#0d8eb0] text-white px-7 py-2.5 rounded-xl text-[14px] font-semibold font-['Syne',sans-serif] shadow-lg shadow-[#1fb5dd]/30 hover:shadow-xl hover:scale-[1.02] transition-all">
                View Case Study
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className={`
          flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md
          ${toastType === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-400' :
            toastType === 'error' ? 'bg-red-500/20 border border-red-500/30 text-red-400' :
            'bg-[#1fb5dd]/20 border border-[#1fb5dd]/30 text-[#1fb5dd]'}
        `}>
          {toastType === 'success' && <CheckCircle size={18} />}
          {toastType === 'error' && <AlertCircle size={18} />}
          {toastType === 'info' && <AlertCircle size={18} />}
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .border-l-3 {
          border-left-width: 3px;
        }
      `}</style>
    </div>
  );
}