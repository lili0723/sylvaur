import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh", "vi", "th", "id", "de", "fr", "es"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  vi: "Tiếng Việt",
  th: "ไทย",
  id: "Bahasa Indonesia",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
};
