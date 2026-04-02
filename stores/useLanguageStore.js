"use client";

import { create } from "zustand";
import Cookies from "js-cookie";

const COOKIE_KEY = "current-language";

const DEFAULT_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", flag: "US" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "SA" },
  // { code: "fr", name: "French", nativeName: "Français", flag: "FR" },
  // { code: "es", name: "Spanish", nativeName: "Español", flag: "ES" },
];

export const useLanguageStore = create((set, get) => {
  const cookieLang = Cookies.get(COOKIE_KEY);
  const initialLang = cookieLang || "en";

  return {
    languages: DEFAULT_LANGUAGES,
    currentLanguage: initialLang,

    setCurrentLanguage: (code) => {
      Cookies.set(COOKIE_KEY, code, { expires: 30 });
      set({ currentLanguage: code });
    },

    // Helpers
    getLanguageCodes: () => get().languages.map((lang) => lang.code),
    getLanguageByCode: (code) =>
      get().languages.find((lang) => lang.code === code),
  };
});
