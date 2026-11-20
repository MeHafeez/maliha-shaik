// Every fact on the site comes from public/Maliha_Resume.pdf.

export const contact = {
  name: 'Shaik Maliha',
  first: 'Shaik',
  last: 'Maliha',
  role: 'React Js Frontend Developer',
  phone: '+91 85018 23535',
  phoneHref: 'tel:+918501823535',
  email: 'maliha.shaik35@gmail.com',
  emailHref: 'mailto:maliha.shaik35@gmail.com',
  location: 'Hyderabad, India',
  tenure: '4 Years 3 Months',
  resume: '/Maliha_Resume.pdf',
}

export const summary =
  'Visionary frontend developer with four years of building responsive, accessible UI with React, Material UI and modern JavaScript. I design reusable component libraries, push Core Web Vitals forward, and ship user-centric interfaces that meet WCAG standards — from validated forms to secure payment flows.'

export const pillars = [
  {
    no: '01',
    title: 'Reusable',
    body: 'Component libraries built once, trusted everywhere — consistent layouts with React and Material UI.',
  },
  {
    no: '02',
    title: 'Accessible',
    body: 'Interfaces that adhere to WCAG standards and behave across browsers and screen sizes.',
  },
  {
    no: '03',
    title: 'Fast',
    body: 'Performance work that improves page load times, Core Web Vitals and engagement.',
  },
  {
    no: '04',
    title: 'Secure',
    body: 'Payment-grade UI: Stripe and PayPal integrations, validations and clear error states.',
  },
]

export const stats = [
  { value: 4, suffix: '+', label: 'Years shipping production UI' },
  { value: 6, suffix: '', label: 'Products and platforms delivered' },
  { value: 16, suffix: '', label: 'Core skills in daily rotation' },
  { value: 1, suffix: '', label: 'Payment package published to npm' },
]

export const skillGroups = [
  {
    no: '01',
    title: 'Interface',
    note: 'What users see',
    items: ['React', 'Redux', 'JavaScript', 'HTML', 'CSS', 'SCSS', 'Material UI'],
  },
  {
    no: '02',
    title: 'Integrity',
    note: 'What users trust',
    items: ['Formik', 'Yup', 'Web Accessibility', 'Responsive Design', 'Cross-browser Compatibility'],
  },
  {
    no: '03',
    title: 'Throughput',
    note: 'What the business ships',
    items: ['Performance Optimization', 'Stripe Integration', 'Paypal Integration', 'NPM Packaging'],
  },
]

export const marquee = [
  'React',
  'Redux',
  'Material UI',
  'Formik + Yup',
  'Stripe Elements',
  'WCAG',
  'Core Web Vitals',
  'SCSS',
  'NPM Packaging',
  'Responsive Design',
  'PayPal',
]

export type VisualKind = 'cms' | 'stripe' | 'iframe' | 'plans' | 'error' | 'stepper'

export const projects: {
  index: string
  title: string
  subtitle: string
  org: string
  tags: string[]
  visual: VisualKind
  bullets: string[]
}[] = [
  {
    index: '01',
    title: 'EV_CMS',
    subtitle: 'Content Management System',
    org: 'Evergent Technologies',
    tags: ['React.js', 'Material UI', 'Formik', 'Yup'],
    visual: 'cms',
    bullets: [
      'Developed and enhanced responsive user interfaces for CMS modules using React.js and Material UI.',
      'Built reusable UI components and implemented client-side form validation with Formik and Yup.',
    ],
  },
  {
    index: '02',
    title: 'Stripe Gateway',
    subtitle: 'Payment package on npm · R&D',
    org: 'Published package',
    tags: ['Stripe Elements', 'Stripe.js', 'NPM'],
    visual: 'stripe',
    bullets: [
      'Built a reusable Stripe payment component integrating Stripe Elements and Stripe.js for secure payment processing.',
      'Packaged and published the solution as an NPM package to enable reuse across React applications.',
    ],
  },
  {
    index: '03',
    title: 'FanDuel Track',
    subtitle: 'iFrame-based integration',
    org: 'TVOD · Subscriptions',
    tags: ['iFrame', 'TVOD', 'APIs'],
    visual: 'iframe',
    bullets: [
      'Implemented an iFrame-based UI and integrated the Add TVOD and Add Subscription APIs to enable purchases.',
    ],
  },
  {
    index: '04',
    title: 'Go3',
    subtitle: 'Plan selection · Registration',
    org: 'Streaming platform',
    tags: ['Plan Selection', 'Registration', 'UX'],
    visual: 'plans',
    bullets: [
      'Designed the Plan Selection and Registration pages, enhancing user experience and interface aesthetics.',
      'Developed intuitive layouts to streamline registration and improve customer engagement.',
    ],
  },
  {
    index: '05',
    title: 'Tabii',
    subtitle: 'Payments · Error handling',
    org: 'Streaming platform',
    tags: ['Payments', 'Error UI', 'Notifications'],
    visual: 'error',
    bullets: [
      'Designed and developed payment pages that streamline transaction processes.',
      'Created error pop-up message displays to improve error handling and user notification.',
    ],
  },
  {
    index: '06',
    title: 'Simple TV',
    subtitle: 'Multi-page UI · Complex validation',
    org: 'Streaming platform',
    tags: ['Formik', 'Yup', 'Multi-page'],
    visual: 'stepper',
    bullets: [
      'Designed multiple web pages with user-centric interfaces.',
      'Implemented complex form validation using Formik and Yup for data integrity and a smoother experience.',
    ],
  },
]

export const experience = {
  title: 'React Js Frontend Developer',
  company: 'Evergent Technologies',
  dates: 'Jul 2022 — Sep 2026',
  span: '4 yrs 3 mos',
  items: [
    {
      key: 'Components',
      text: 'Designed and implemented reusable UI components with a focus on responsive layouts and consistent user experience using React.js and Material UI.',
    },
    {
      key: 'Validation',
      text: 'Developed forms with client-side validation using Formik and Yup to improve data integrity and user feedback.',
    },
    {
      key: 'APIs',
      text: 'Integrated UI components with backend APIs and handled request/response flows, error handling and appropriate UI feedback.',
    },
    {
      key: 'Performance',
      text: 'Worked on UI enhancements, bug fixes, cross-browser responsive design and performance optimization to improve page load times and engagement.',
    },
    {
      key: 'Open package',
      text: 'Published a reusable Stripe payment integration as an NPM package that encapsulates Stripe Elements and Stripe.js for secure payments and reuse across applications.',
    },
    {
      key: 'Payments',
      text: 'Implemented payment-related UI components, validations and responsive layouts for secure payment processing.',
    },
    {
      key: 'Subscriptions',
      text: 'Contributed to iFrame-based subscription and TVOD integrations by integrating APIs and building UI flows for purchase and subscription management.',
    },
  ],
}

export const education = [
  {
    year: '2018',
    title: 'B.Tech — Electrical & Electronics Engineering',
    school: 'Khammam Institute of Technology and Sciences',
    marks: '69%',
  },
  {
    year: '2014',
    title: 'Intermediate',
    school: 'Netaji Jr. College',
    marks: '94%',
  },
  {
    year: '2012',
    title: 'SSC',
    school: 'Z.P.S. School',
    marks: '92%',
  },
]

export const achievement =
  'Published a reusable Stripe payment integration as an NPM package to simplify payment integration across React applications.'

export const nav = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]
