/* eslint-disable @next/next/no-img-element */
'use client';

import { Pencil, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

type HeroStat = { label: string; value: string };
type Metric   = { label: string; value: string; sub: string };

interface CaseStudy {
  id:          string;
  slug:        string;
  type:        string;
  status:      string;
  title:       string;
  description: string;
  image_url:   string;
  image_alt:   string;
  tag_slugs:   string[];
  hero_stats:  HeroStat[];
  metrics:     Metric[];
  created_at:  string;
}

interface Props {
  data:     CaseStudy;
  onEdit?:  (id: string) => void;
  onDelete?:(id: string) => void;
}

const typeColors: Record<string, string> = {
  client_success: 'bg-[#1fb5dd]/15 text-[#1fb5dd] border-[#1fb5dd]/30',
  product:        'bg-purple-500/15 text-purple-400 border-purple-500/30',
  research:       'bg-amber-500/15 text-amber-400 border-amber-500/30',
  business:       'bg-green-500/15 text-green-400 border-green-500/30',
};

const statusColors: Record<string, string> = {
  published: 'bg-green-500/15 text-green-400 border-green-500/30',
  draft:     'bg-gray-500/15 text-gray-400 border-gray-500/30',
  archived:  'bg-red-500/15 text-red-400 border-red-500/30',
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

export default function CaseStudyCard({ data, onEdit, onDelete }: Props) {
  return (
    <div className="group bg-[#151b24] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden hover:border-[#1fb5dd]/30 hover:shadow-xl hover:shadow-[#1fb5dd]/5 transition-all duration-300 max-w-100 w-full">

      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={data?.image_url}
          alt={data?.image_alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[#0a0e14]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            href={`/montage/case-studies/edit/${data?.id}`}
            className="flex items-center gap-2 bg-[#1fb5dd] text-white px-4 py-2 rounded-xl text-[13px] font-medium hover:bg-[#0d8eb0] transition-all"
          >
            <Pencil size={14} /> Edit
          </Link>
          <button
            onClick={() => onDelete?.(data?.id)}
            className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-400 px-4 py-2 rounded-xl text-[13px] font-medium hover:bg-red-500/30 transition-all"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border capitalize ${typeColors[data?.type] ?? typeColors.business}`}>
            {data?.type.replace('_', ' ')}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border capitalize ${statusColors[data?.status] ?? statusColors?.draft}`}>
            {data?.status}
          </span>
        </div>

        {/* Action buttons always visible top-right */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => onEdit?.(data?.id)}
            className="w-8 h-8 rounded-lg bg-[#0a0e14]/70 backdrop-blur-sm border border-white/10 text-[#7a8899] flex items-center justify-center hover:text-[#1fb5dd] hover:border-[#1fb5dd]/40 transition-all"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => onDelete?.(data?.id)}
            className="w-8 h-8 rounded-lg bg-[#0a0e14]/70 backdrop-blur-sm border border-white/10 text-[#7a8899] flex items-center justify-center hover:text-red-400 hover:border-red-500/40 transition-all"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">

        {/* Title */}
        <h3 className="text-[15px] font-semibold text-white leading-snug mb-2 line-clamp-2">
          {data?.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-[#7a8899] leading-relaxed line-clamp-2 mb-4">
          {data?.description}
        </p>

      
      

        {/* Tags */}
        {data?.tag_slugs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {data?.tag_slugs.slice(0, 4).map(t => (
              <span key={t} className="px-2 py-0.5 rounded-full bg-[#1fb5dd]/8 text-[#1fb5dd] text-[11px] font-medium border border-[#1fb5dd]/15">
                #{t}
              </span>
            ))}
            {data?.tag_slugs.length > 4 && (
              <span className="px-2 py-0.5 rounded-full bg-[#1c2534] text-[#7a8899] text-[11px]">
                +{data?.tag_slugs.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.06)]">
          <span className="text-[11px] text-[#4a5568]">{formatDate(data?.created_at)}</span>
          <a
            href={`/case-study/${data?.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[12px] text-[#7a8899] hover:text-[#1fb5dd] transition-colors"
          >
            View <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}