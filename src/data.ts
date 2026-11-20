import cms from './assets/proj-cms.jpg'
import stripe from './assets/proj-stripe.jpg'
import fanduel from './assets/proj-fanduel.jpg'
import go3 from './assets/proj-go3.jpg'
import tabii from './assets/proj-tabii.jpg'
import simpletv from './assets/proj-simpletv.jpg'

export const contact = {
  name: 'Shaik Maliha',
  role: 'React Js Frontend Developer',
  phone: '+91-8501823535',
  phoneHref: 'tel:+918501823535',
  email: 'maliha.shaik35@gmail.com',
  emailHref: 'mailto:maliha.shaik35@gmail.com',
  location: 'Hyderabad, India',
  tenure: '4 Years 3 Months',
  resume: '/Maliha_Resume.pdf',
}

export const summary =
  'Visionary Frontend Developer with 4 years of experience building responsive, accessible UI solutions using React, Material UI, HTML, CSS and modern JavaScript. Proven track record of designing reusable component libraries, improving performance and Core Web Vitals, and delivering user-centric interfaces that adhere to WCAG standards. Experienced in integrating frontend components with APIs, implementing client-side validation using Formik and Yup, and publishing a reusable Stripe payment integration as an NPM package. Effective collaborator across cross-functional teams with a proactive, innovation-driven approach.'

export const skillGroups = [
  {
    title: 'Interface',
    items: ['React', 'Redux', 'HTML', 'CSS', 'SCSS', 'JavaScript', 'Material UI'],
  },
  {
    title: 'Integrity',
    items: [
      'Formik',
      'Yup',
      'Web Accessibility',
      'Responsive Design',
      'Cross-browser Compatibility',
    ],
  },
  {
    title: 'Throughput',
    items: [
      'Performance Optimization',
      'Stripe Integration',
      'Paypal Integration',
      'NPM Packaging',
    ],
  },
]

export const projects = [
  {
    index: '01',
    title: 'EV_CMS',
    subtitle: 'Content Management System',
    org: 'Evergent Technologies',
    tags: ['React.js', 'Material UI', 'Formik', 'Yup'],
    image: cms,
    bullets: [
      'Developed and enhanced responsive user interfaces for CMS modules using React.js and Material UI.',
      'Built reusable UI components and implemented client-side form validation with Formik and Yup.',
    ],
  },
  {
    index: '02',
    title: 'Stripe Payment Gateway',
    subtitle: 'NPM package (R&D)',
    org: 'Published package',
    tags: ['Stripe Elements', 'Stripe.js', 'NPM'],
    image: stripe,
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
    image: fanduel,
    bullets: [
      'Implemented iFrame-based UI and integrated Add TVOD and Add Subscription APIs to enable purchases.',
    ],
  },
  {
    index: '04',
    title: 'Go3',
    subtitle: 'Plan Selection · Registration',
    org: 'Streaming product',
    tags: ['Plan Selection', 'Registration'],
    image: go3,
    bullets: [
      'Designed the Plan Selection and Registration pages, enhancing user experience and interface aesthetics.',
      'Developed intuitive layouts to streamline the registration process and improve customer engagement.',
    ],
  },
  {
    index: '05',
    title: 'Tabii',
    subtitle: 'Payments · Error states',
    org: 'Streaming product',
    tags: ['Payments', 'Error UI'],
    image: tabii,
    bullets: [
      'Designed and developed payment pages to enhance user experience and streamline transaction processes.',
      'Created and implemented error pop-up message displays to improve error handling and user notification.',
    ],
  },
  {
    index: '06',
    title: 'Simple TV',
    subtitle: 'Multi-page UI · Validation',
    org: 'Streaming product',
    tags: ['Formik', 'Yup', 'Multi-page'],
    image: simpletv,
    bullets: [
      'Designed multiple web pages ensuring user-centric interfaces.',
      'Implemented complex form validation using Formik and Yup for enhanced data integrity and user experience.',
    ],
  },
]

export const experience = {
  title: 'React Js Frontend Developer',
  company: 'Evergent Technologies',
  dates: 'Jul 2022 – Sep 2026',
  bullets: [
    'Designed and implemented reusable UI components with a focus on responsive layouts and consistent user experience using React.js and Material UI.',
    'Developed forms with client-side validation using Formik and Yup to improve data integrity and user feedback.',
    'Integrated UI components with backend APIs and handled request/response flows, error handling, and appropriate UI feedback.',
    'Worked on UI enhancements, bug fixes, cross-browser responsive design, and performance optimization to improve page load times and engagement.',
    'Published a reusable Stripe payment integration as an NPM package that encapsulated Stripe Elements and Stripe.js for secure payments and reuse across applications.',
    'Implemented payment-related UI components, validations, and responsive layouts for secure payment processing.',
    'Contributed to iFrame-based subscription and TVOD integrations by integrating APIs and building UI flows for purchase and subscription management.',
  ],
}

export const education = [
  {
    year: '2018',
    title: 'B.Tech / B.E. | Electrical and Electronics Engineering (EEE)',
    school: 'Khammam Institute Of Technology And Sciences',
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
  { href: '#signal', id: '01', label: 'Signal' },
  { href: '#craft', id: '02', label: 'Craft' },
  { href: '#transmission', id: '03', label: 'Transmission' },
  { href: '#ledger', id: '04', label: 'Ledger' },
  { href: '#studio', id: '05', label: 'Studio' },
  { href: '#line', id: '06', label: 'Line' },
]
