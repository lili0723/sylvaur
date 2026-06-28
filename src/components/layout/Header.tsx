"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu } from "lucide-react";
import { NAV_LINKS, COMPANY } from "@/lib/constants";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import MobileNav from "./MobileNav";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const localizeHref = (path: string) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`;

  return (
    <header className="sticky top-0 z-40 bg-brand-navy text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href={`/${locale}`}
            className="flex items-center gap-2 font-bold text-lg tracking-tight hover:text-brand-beige transition-colors"
          >
            <span className="w-8 h-8 bg-brand-coral rounded-lg flex items-center justify-center text-white text-sm font-extrabold">
              S
            </span>
            <span className="hidden sm:inline">{COMPANY.shortName}</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={localizeHref(link.href)}
                className="px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                {t(link.labelKey)}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center px-4 py-2 bg-brand-coral text-white text-sm font-medium rounded-lg hover:bg-brand-coral/90 transition-colors shadow-sm"
            >
              {t("getQuote")}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
