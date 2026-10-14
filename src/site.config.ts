/**
 * Everything about the site owner that appears on several pages.
 * Edit here to change the home page, the footer or the profiles.
 * A profile left empty ('') is not shown.
 */
export const site = {
  name: 'Thomas Peyrat',
  fields: ['Applied Mathematics', 'Probability', 'Finance & Insurance'],

  position: {
    title: 'Postdoctoral researcher',
    lab: 'CMAP, École Polytechnique',
    labUrl: 'https://cmap.ip-paris.fr/',
    chair: 'AIDA-F chair',
  },
  summary:
    'Self-exciting point processes and stochastic analysis on Poisson space, with applications to cyber risk, insurance and generative AI for finance.',

  email: 'thomas.peyrat@ensae.fr',
  address: ['CMAP, École Polytechnique', '91120 Palaiseau'],

  profiles: {
    hal: '',
    arxiv: '',
    orcid: '',
    scholar: '',
    linkedin: 'https://www.linkedin.com/in/thomas-peyrat/',
    github: '',
  },

  cvPdf: 'files/Thomas_Peyrat_CV.pdf',
  description:
    'Thomas Peyrat, applied mathematician. Postdoctoral researcher at CMAP, École Polytechnique: self-exciting point processes, Malliavin calculus on Poisson space, cyber risk, insurance and generative AI for finance.',
};

/** Navigation: split around the wordmark on wide screens, merged in the mobile menu. */
export const nav = {
  left: [
    { href: 'research/', label: 'Research' },
    { href: 'publications/', label: 'Publications' },
    { href: 'talks/', label: 'Talks' },
  ],
  right: [
    { href: 'teaching/', label: 'Teaching' },
    { href: 'primer/', label: 'Primer' },
    { href: 'cv/', label: 'CV' },
  ],
};
