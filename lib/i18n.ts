import en from '@/locales/en.json';
import zhCN from '@/locales/zh-CN.json';
import zhTW from '@/locales/zh-TW.json';
import es from '@/locales/es.json';
import { overrides } from '@/locales/overrides';
export const locales = ['en', 'zh-cn', 'zh-tw', 'es'] as const;
export type Locale = (typeof locales)[number];
export const localeLabels: Record<Locale, string> = {
  en: 'English',
  'zh-cn': '简体中文',
  'zh-tw': '繁體中文',
  es: 'Español',
};
export const languageTags: Record<Locale, string> = {
  en: 'en-US',
  'zh-cn': 'zh-CN',
  'zh-tw': 'zh-TW',
  es: 'es',
};
export const messages: Record<Locale, Record<string, string>> = {
  en,
  'zh-cn': { ...zhCN, ...overrides['zh-cn'] },
  'zh-tw': { ...zhTW, ...overrides['zh-tw'] },
  es: { ...es, ...overrides.es },
};
export function isLocale(value: string | null): value is Locale {
  return locales.includes(value as Locale);
}
export function translate(locale: Locale, source: string) {
  return messages[locale][source] || source;
}
