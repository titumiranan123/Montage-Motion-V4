/* eslint-disable @next/next/no-img-element */
// components/CaseStudyCard.tsx

import { ArrowRight } from "lucide-react";

interface CaseStudyItem {
  id: string;
  slug: string;
  type: string;
  status: 'published' | 'draft';
  title: string;
  description: string;
  image_url: string;
  image_alt: string;
  created_at: string;
}

interface Metric {
  label: string;
  value: string;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractMetrics(): Metric[] {
  return [
    { label: 'ARR Growth', value: '3×' },
    { label: 'Timeline', value: '9 mo' },
    { label: 'Final ARR', value: '$2.4M' },
  ];
}

interface CaseStudyCardProps {
  item: CaseStudyItem;
}

export default function CaseStudyCard({ item }: CaseStudyCardProps) {
  const metrics = extractMetrics();

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:border-blue-300 hover:shadow-md max-w-sm">

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image_url}
          alt={item.image_alt}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-blue-50 text-[#1FB5DD] text-[11px] font-medium px-3 py-1 rounded-md uppercase tracking-wide">
          {formatType(item.type)}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-[17px] font-semibold text-gray-900 leading-snug mb-2">
          {item.title}
        </h3>
        <p className="text-[13px] text-gray-500 leading-relaxed mb-4 line-clamp-3">
          {item.description}
        </p>

        {/* Metrics */}
        <div className="flex items-center gap-4 mb-4">
          {metrics.map((m, i) => (
            <div key={m.label} className="flex items-center gap-4">
              {i !== 0 && <div className="w-px h-8 bg-gray-200" />}
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] text-gray-400 uppercase tracking-widest">
                  {m.label}
                </span>
                <span className="text-lg font-semibold text-[#1FB5DD]">
                  {m.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
          <span className="text-xs text-gray-400">{formatDate(item.created_at)}</span>
          <a
            href={`/case-studies/${item.slug}`}
            className="text-[14px] text-[#1FB5DD] hover:text-[#1FB5DD] flex items-center gap-1 transition-colors active:scale-90"
          >
            Read case study  <ArrowRight size={14} className="-rotate-45"/>
          </a>
        </div>
      </div>
    </div>
  );
}