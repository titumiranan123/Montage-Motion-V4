'use client';
import { useEffect, useState } from 'react';

const links = [
  { href: '#challenge', label: 'The Challenge' },
  { href: '#solution', label: 'Our Solution' },
  { href: '#outcome', label: 'The Outcome' },
  { href: '#testimonial', label: 'Testimonial' },
];

export default function TableOfContents() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
      <div className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">
        On this page
      </div>
      <nav className="space-y-1 text-sm">
        {links.map((link) => (
              <a
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2.5 py-1.5 px-2 rounded-lg transition-colors ${
              active === link.href
                ? 'text-[#1fb5dd] bg-[rgba(31,181,221,0.08)] font-medium'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${active === link.href ? 'bg-[#1fb5dd]' : 'bg-gray-300'}`} />
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}