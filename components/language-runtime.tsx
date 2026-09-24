'use client';
import { Globe2 } from 'lucide-react';
import { useEffect, useSyncExternalStore } from 'react';
import {
  isLocale,
  languageTags,
  loadMessages,
  localeLabels,
  locales,
  translate,
  type Locale,
} from '@/lib/i18n';
const textSources = new WeakMap<Text, string>();
const attributeSources = new WeakMap<Element, Map<string, string>>();
const translatedAttributes = ['alt', 'aria-label', 'placeholder', 'title'];
let originalTitle = '';
let originalDescription = '';
function translateTree(
  locale: Locale,
  messages: Record<string, string>,
  root: Node = document.body,
) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    if (node.parentElement?.closest('script,style,[data-no-translate]'))
      continue;
    const source = textSources.get(node) ?? node.nodeValue ?? '';
    textSources.set(node, source);
    const trimmed = source.trim();
    if (trimmed)
      node.nodeValue = source.replace(trimmed, translate(messages, trimmed));
  }
  const elements =
    root instanceof Element
      ? [root, ...root.querySelectorAll('*')]
      : [...document.querySelectorAll('*')];
  for (const element of elements) {
    let sources = attributeSources.get(element);
    if (!sources) {
      sources = new Map();
      attributeSources.set(element, sources);
    }
    for (const attribute of translatedAttributes) {
      const current = element.getAttribute(attribute);
      if (!current) continue;
      const source = sources.get(attribute) ?? current;
      sources.set(attribute, source);
      element.setAttribute(attribute, translate(messages, source));
    }
    if (element instanceof HTMLAnchorElement) {
      const original =
        sources.get('href') ?? element.getAttribute('href') ?? '';
      sources.set('href', original);
      if (original.startsWith('/')) {
        const url = new URL(original, window.location.origin);
        if (locale === 'en') url.searchParams.delete('lang');
        else url.searchParams.set('lang', locale);
        element.setAttribute('href', `${url.pathname}${url.search}${url.hash}`);
      }
    }
  }
  document.documentElement.lang = languageTags[locale];
  originalTitle ||= document.title;
  document.title = translate(messages, originalTitle);
  const description = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]',
  );
  if (description) {
    originalDescription ||= description.content;
    description.content = translate(messages, originalDescription);
  }
  for (const selector of [
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]',
  ]) {
    const meta = document.querySelector<HTMLMetaElement>(selector);
    if (!meta?.content) continue;
    let sources = attributeSources.get(meta);
    if (!sources) {
      sources = new Map();
      attributeSources.set(meta, sources);
    }
    const source = sources.get('content') ?? meta.content;
    sources.set('content', source);
    meta.content = translate(messages, source);
  }
  // Canonical, robots and language alternatives are owned by server metadata.
}
function selectedLocale(): Locale {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isLocale(fromUrl)) return fromUrl;
  return 'en';
}
export function LanguageRuntime() {
  useEffect(() => {
    let cancelled = false;
    const apply = async () => {
      const locale = selectedLocale();
      // English is already rendered by the server. Avoid walking a large page
      // when no translation work is required.
      if (locale === 'en') return;
      const messages = await loadMessages(locale);
      if (cancelled) return;
      translateTree(locale, messages);
    };
    void apply();
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
function subscribeLanguage(callback: () => void) {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
}
export function LanguageSelector() {
  const locale = useSyncExternalStore(
    subscribeLanguage,
    selectedLocale,
    () => 'en' as Locale,
  );
  const selectorLabels: Record<Locale, string> = {
    en: 'Select display language',
    'zh-cn': '选择显示语言',
    'zh-tw': '選擇顯示語言',
    es: 'Seleccionar idioma de visualización',
  };
  const changeLanguage = (next: Locale) => {
    window.localStorage.setItem('yudaro-language', next);
    const url = new URL(window.location.href);
    if (next === 'en') url.searchParams.delete('lang');
    else url.searchParams.set('lang', next);
    window.location.assign(`${url.pathname}${url.search}${url.hash}`);
  };
  return (
    <label className="language-selector" data-no-translate>
      <Globe2 size={16} />
      <span className="sr-only">{selectorLabels[locale]}</span>
      <select
        value={locale}
        onChange={(event) => changeLanguage(event.target.value as Locale)}
        aria-label={selectorLabels[locale]}
      >
        {locales.map((code) => (
          <option value={code} key={code}>
            {localeLabels[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
