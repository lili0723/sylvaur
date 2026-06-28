"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { LOCALE_LABELS, routing } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLocale = (routing.locales.find((l) =>
    pathname.startsWith(`/${l}`)
  ) || routing.defaultLocale) as Locale;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const switchLanguage = (locale: Locale) => {
    if (locale === currentLocale) return;
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors px-2 py-1 rounded border border-white/30 hover:border-white/60"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="w-5 text-center">{currentLocale.toUpperCase()}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-zinc-200 py-1 z-50 max-h-64 overflow-y-auto">
          <div className="px-3 py-1.5 text-xs text-muted uppercase tracking-wider border-b border-zinc-100">
            Language / 语言
          </div>
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLanguage(loc as Locale)}
              className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center justify-between ${
                loc === currentLocale
                  ? "bg-brand-coral/10 text-brand-coral font-semibold"
                  : "text-brand-navy hover:bg-zinc-50"
              }`}
              role="option"
              aria-selected={loc === currentLocale}
            >
              <span>{LOCALE_LABELS[loc as Locale]}</span>
              {loc === currentLocale && (
                <span className="text-brand-coral text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
