export type Locale = 'ja' | 'en';

export const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export function localizedPath(path: string, locale: Locale) {
  const clean = `/${path}`.replace(/\/{2,}/g, '/');
  return locale === 'en' ? `/en${clean === '/' ? '/' : clean}` : clean;
}

export function withBase(path: string) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${clean}`.replace(/\/{2,}/g, '/');
}

export function alternateLocalePath(pathname: string, locale: Locale) {
  const withoutBase =
    basePath && pathname.startsWith(basePath) ? pathname.slice(basePath.length) || '/' : pathname;
  if (withoutBase.includes('404')) return withBase(locale === 'ja' ? '/en/' : '/');
  if (locale === 'en') return withBase(withoutBase.replace(/^\/en(?=\/|$)/, '') || '/');
  return withBase(`/en${withoutBase === '/' ? '/' : withoutBase}`);
}
