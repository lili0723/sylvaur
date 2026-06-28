"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const t = useTranslations("nav");
  const locale = useLocale();

  const localizeHref = (path: string) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`;

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-brand-navy text-white transform transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className="font-bold text-lg">{t("menu")}</span>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={localizeHref(link.href)}
              onClick={onClose}
              className="px-3 py-3 rounded-md text-base font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              {t(link.labelKey)}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-3">
          <LanguageSwitcher />
          <a
            href={`/${locale}/contact`}
            onClick={onClose}
            className="block w-full text-center px-4 py-3 bg-brand-coral text-white text-sm font-medium rounded-lg hover:bg-brand-coral/90 transition-colors"
          >
            {t("getQuote")}
          </a>
        </div>
      </div>
    </>
  );
}
