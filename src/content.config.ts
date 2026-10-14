/**
 * Content model.
 *
 * Every collection is a folder (or one file) under src/content/. Adding an
 * item = adding one file; `npm run build` stops with a readable message if a
 * field is missing or malformed. The file name without extension is the
 * entry id and, when the entry has a page, its URL slug.
 *
 *   publications/ *.md    front matter + the abstract as Markdown body (LaTeX: $…$, $$…$$)
 *   research/     *.md    one line of work, written as a case study (LaTeX allowed)
 *   talks/        *.yaml  one talk (or one organised event) per file
 *   teaching/     *.yaml  one course or one supervised project per file
 *   news/         *.md    one dated item; the body is the text; the newest is shown on the home page
 *   pages/        *.md    free-standing pages (the Primer)
 *   cv.yaml               the CV page: one top-level key per section
 */
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

/* ---------- shared field types ---------- */

/** A date written YYYY-MM-DD (or YYYY-MM, read as the 1st of the month). */
const DateField = z.coerce.date();

/** External identifiers of a paper or talk. Each is optional; only those present are shown. */
const Links = z
  .object({
    doi: z.string().regex(/^10\.\d{4,9}\/\S+$/, 'DOI without the https://doi.org/ prefix, e.g. 10.1051/ps/2025003').optional(),
    arxiv: z.string().regex(/^\d{4}\.\d{4,5}(v\d+)?$/, 'arXiv identifier, e.g. "2503.15958" (quoted)').optional(),
    hal: z.string().regex(/^hal-\d{8}(v\d+)?$/, 'HAL identifier, e.g. hal-04997515').optional(),
    pdf: z.string().optional(),    // a URL, or a path under public/ such as files/paper.pdf
    code: z.url().optional(),
    slides: z.string().optional(), // a URL, or a path under public/
  })
  .default({});

/**
 * Publication status, in the order a paper goes through it:
 *   preprint  — public (arXiv/HAL), not yet submitted
 *   submitted — under review
 *   revision  — revise and resubmit
 *   accepted  — accepted, not yet in print
 *   published — in print: `journal` is then required
 */
export const STATUS = ['preprint', 'submitted', 'revision', 'accepted', 'published'] as const;

/* ---------- collections ---------- */

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.md' }),
  schema: z
    .object({
      title: z.string().min(1),
      authors: z.array(z.string().min(1)).min(1),   // as printed on the paper, owner included
      year: z.number().int().min(1990).max(2100),   // year of the version listed
      date: DateField.optional(),                   // optional finer ordering within a year
      status: z.enum(STATUS),
      journal: z.string().optional(),               // full journal name
      volume: z.string().optional(),
      pages: z.string().optional(),                 // "158–183"
      links: Links,
      keywords: z.array(z.string()).default([]),
      research: z.array(reference('research')).default([]), // lines of work this paper belongs to
      bibkey: z.string().optional(),                // to force a BibTeX key; generated otherwise
    })
    .refine((p) => p.status !== 'published' || !!p.journal, {
      message: 'A published paper needs `journal` (and ideally `volume` and `pages`).',
      path: ['journal'],
    }),
});

const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().max(260).nullish(),         // shown on the index and as the page lede; may be left empty
    period: z.object({ start: z.number().int(), end: z.number().int().optional() }), // no end = ongoing
    collaborators: z.array(z.string()).default([]),
    order: z.number().int().default(100),           // smaller comes first on the index
  }),
});

const talks = defineCollection({
  loader: glob({ base: './src/content/talks', pattern: '**/*.{yaml,yml}' }),
  schema: z.object({
    date: DateField,                                // day unknown? use the 1st of the month
    event: z.string().min(1),
    title: z.string().optional(),                   // title of the talk, if worth showing
    session: z.string().optional(),
    city: z.string(),
    country: z.string(),
    kind: z.enum(['invited', 'contributed', 'seminar', 'school', 'organiser']).default('contributed'),
    url: z.url().optional(),                        // event page
    slides: z.string().optional(),
  }),
});

const teaching = defineCollection({
  loader: glob({ base: './src/content/teaching', pattern: '**/*.{yaml,yml}' }),
  schema: z
    .object({
      kind: z.enum(['course', 'supervision']),
      title: z.string().min(1),
      start: z.number().int(),                      // first (academic) year
      end: z.number().int().optional(),             // last year, if different
      institution: z.string().optional(),
      level: z.string().optional(),                 // "Undergraduate", "Master 1"…
      role: z.string().optional(),                  // "Teaching assistant", "Lecturer"…
      description: z.string().optional(),
    })
    .refine((t) => t.kind !== 'course' || !!t.institution, { message: 'A course needs `institution`.', path: ['institution'] }),
});

const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
  schema: z.object({
    date: DateField,
    when: z.string().optional(),                    // how to print the date, e.g. "November 2026"
  }),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    description: z.string(),
  }),
});

const cv = defineCollection({
  loader: file('src/content/cv.yaml'),
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    items: z.array(z.object({
      when: z.string(),
      what: z.string(),
      where: z.string().optional(),
      detail: z.string().optional(),
    })),
  }),
});

export const collections = { publications, research, talks, teaching, news, pages, cv };
