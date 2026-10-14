import type { CollectionEntry } from 'astro:content';
import { site } from '../site.config';

export type Pub = CollectionEntry<'publications'>;

/** Prefix an internal path with the configured base ('/' or '/repo/'). */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return base + path.replace(/^\//, '');
}

/** True when `path` is the current page or one of its children. */
export function isCurrent(current: string, path: string): boolean {
  const a = current.replace(/\/?$/, '/');
  const b = url(path).replace(/\/?$/, '/');
  return a === b || a.startsWith(b);
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const monthYear = (d: Date) => `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
export const monthShort = (d: Date) => MONTHS[d.getUTCMonth()].slice(0, 3);

export const isSelf = (name: string) => name.trim() === site.name;

/** “A, B and C”. */
export function joinNames(names: string[]): string {
  if (names.length <= 1) return names.join('');
  return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
}

/** Co-authors only, as “C. Hillairet, A. Réveillac”. */
export function coauthors(names: string[]): string {
  return names.filter((n) => !isSelf(n)).map(initials).join(', ');
}
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const last = parts.pop() ?? '';
  return [...parts.map((p) => p.split('-').map((q) => q[0] + '.').join('-')), last].join(' ');
}

export const statusLabel: Record<Pub['data']['status'], string> = {
  preprint: 'Preprint', submitted: 'Submitted', revision: 'In revision', accepted: 'Accepted', published: 'Published',
};

export function venue(p: Pub['data']): string {
  if (p.journal) return [p.journal, p.volume, p.pages && `${p.pages}`].filter(Boolean).join(', ') + ` (${p.year})`;
  return 'Preprint';
}

export const links = {
  arxiv: (id: string) => `https://arxiv.org/abs/${id}`,
  hal: (id: string) => `https://hal.science/${id}`,
  doi: (doi: string) => `https://doi.org/${doi}`,
  file: (p: string) => (/^https?:/.test(p) ? p : url(p)),
};

/** Links of a paper in a fixed order, as [label, href]. */
export function paperLinks(p: Pub['data']): [string, string][] {
  const l = p.links ?? {};
  const out: [string, string][] = [];
  if (l.doi) out.push(['DOI', links.doi(l.doi)]);
  if (l.arxiv) out.push(['arXiv', links.arxiv(l.arxiv)]);
  if (l.hal) out.push(['HAL', links.hal(l.hal)]);
  if (l.pdf) out.push(['PDF', links.file(l.pdf)]);
  if (l.code) out.push(['Code', l.code]);
  if (l.slides) out.push(['Slides', links.file(l.slides)]);
  return out;
}

/** Newest first: year, then date, then title. */
export function byRecency(a: Pub, b: Pub): number {
  return b.data.year - a.data.year
    || (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0)
    || a.data.title.localeCompare(b.data.title);
}

/** BibTeX for a paper; the abstract is not included. */
export function bibtex(p: Pub): string {
  const d = p.data;
  const first = d.authors[0].split(/\s+/).pop()!.normalize('NFD').replace(/[^A-Za-z]/g, '');
  const word = d.title.split(/\s+/).find((w) => w.length > 3)?.replace(/[^A-Za-z]/g, '') ?? 'paper';
  const key = d.bibkey ?? `${first}${d.year}${word}`.toLowerCase();
  const type = d.journal ? 'article' : 'misc';
  const f: [string, string | undefined][] = [
    ['title', `{${d.title}}`],
    ['author', d.authors.join(' and ')],
    ['year', String(d.year)],
    ['journal', d.journal],
    ['volume', d.volume],
    ['pages', d.pages?.replace(/[–-]/, '--')],
    ['doi', d.links?.doi],
    ['eprint', d.links?.arxiv],
    ['archivePrefix', d.links?.arxiv ? 'arXiv' : undefined],
    ['note', !d.journal && d.links?.hal ? `HAL: ${d.links.hal}` : undefined],
  ];
  const body = f.filter(([, v]) => v).map(([k, v]) => `  ${k.padEnd(13)} = {${v}}`).join(',\n');
  return `@${type}{${key},\n${body}\n}`;
}
