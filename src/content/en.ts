import * as media from "./media";
import { CONTACT } from "./site";

/*
 * Svi tekstovi sajta na engleskom. Arapski (ar.ts) mora imati istu strukturu.
 * Putanje (href) su bez jezika — komponente dodaju /en ili /ar.
 */

const post = (code: string) => `https://www.instagram.com/p/${code}/`;

export const en = {
  meta: {
    title: "A Point — Architecture & Interior Design Studio in Dubai",
    template: "%s — A Point, Dubai",
    description:
      "A Point is an architecture and interior design studio in Dubai and Limassol, established in 2011, specialising in high-end residential developments and private villas.",
    ogLocale: "en_AE",
    ogAlt: "A Point — Interior · Design · Architecture",
  },

  nav: {
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Services", href: "/services" },
    ],
    contact: { label: "Contact", href: "/contact" },
    menu: "Menu",
    close: "Close",
    home: "A Point — home",
    main: "Main menu",
    mobile: "Mobile menu",
    skip: "Skip to content",
    switchLabel: "عربي",
    switchTitle: "العربية",
  },

  ui: {
    viewProject: "View project",
    allProjects: "All projects",
    prevProject: "Previous project",
    nextProject: "Next project",
    openImage: "Open image",
    close: "Close",
    prevImage: "Previous image",
    nextImage: "Next image",
    whatsapp: "WhatsApp",
    whatsappChat: "Chat on WhatsApp",
    whatsappMessage: "Hello A Point, I'd like to talk about a project.",
    call: "Call",
    email: "Email",
    instagram: "Instagram",
  },

  home: {
    hero: {
      lines: ["Spatial clarity.", "Precision.", "Context."],
      text: "Architecture and interior design studio in Dubai and Limassol, specialising in high-end residential developments and private villas.",
      cta: { label: "Start a project", href: "/contact" },
      image: {
        wide: media.heroWide,
        tall: media.heroTall,
        alt: "Living room of Khalid Villa in Dubai with a dark fluted timber wall and a brass kitchen island",
      },
    },
    about: {
      label: "About",
      lines: ["Design guided", "by context"],
      text: "We work where architecture and interior meet. Every project begins with the site, the light and the people who will live there — and is resolved down to the last joint, material and detail. The result is calm, precise space that feels as if it could not have been any other way.",
      cta: { label: "More about us", href: "/about" },
      images: [
        { src: media.aboutBathroom, alt: "Stone bathroom of Ajman Villa lit by a skylight" },
        { src: media.aboutKitchen, alt: "Kitchen island in pale stone with bar stools, Ajman Villa" },
      ],
    },
    featured: {
      label: "Projects",
      lines: ["Selected work"],
    },
    services: {
      label: "Services",
      lines: ["From plan", "to detail"],
      text: "Architecture, interiors and design development under one roof — coordinated from the first sketch to the final detail.",
      cta: { label: "Our services", href: "/services" },
      note: "Private villas, residences and developments — Dubai, Limassol and worldwide.",
      background: { src: media.servicesBg, alt: "" },
      items: [
        {
          title: "Architecture",
          text: "Private villas and residences shaped by the site, the climate and the way you live.",
          image: { src: media.serviceArchitecture, alt: "Living room of Ajman Villa in stone and pale timber" },
        },
        {
          title: "Interior design",
          text: "Complete interior concepts — space planning, materials, lighting, furniture and art.",
          image: { src: media.serviceInterior, alt: "Dining area of Khalid Villa with a sculptural chandelier" },
        },
        {
          title: "Visualisation & detailing",
          text: "Photorealistic 3D visualisation and precise detailing, so every decision is made before construction begins.",
          image: { src: media.serviceDetailing, alt: "Bathroom with a green wall and a freestanding tub" },
        },
        {
          title: "Residential developments",
          text: "Lobbies, amenities and show apartments for high-end residential developments.",
          image: { src: media.serviceDevelopments, alt: "Lobby of Central Park Plaza with a tree and a sculptural staircase" },
        },
      ],
    },
    instagram: {
      label: "Instagram",
      lines: ["Follow our work"],
      cta: { label: CONTACT.instagramHandle, href: CONTACT.instagram },
      more: "View post",
      items: [
        {
          title: "Ajman Villa",
          text: "Oak, stone and soft, layered light.",
          href: post("DeYsqRmiC2t"),
          image: { src: media.igAjman, alt: "Bedroom of Ajman Villa with a timber-framed opening" },
        },
        {
          title: "Khalid Villa",
          text: "Open living, defined by texture.",
          href: post("DeOXpmUiOcF"),
          image: { src: media.igKhalid, alt: "Living area of Khalid Villa with a low sectional sofa" },
        },
        {
          title: "Port Rashid",
          text: "Calm, precise and made to last.",
          href: post("Dd6GCK8ICMy"),
          image: { src: media.igPortRashid, alt: "Bathroom with twin rounded mirrors and an oak vanity" },
        },
        {
          title: "WSA Office",
          text: "A workplace with the poise of a hotel.",
          href: post("Dd02PxaiL4N"),
          image: { src: media.igWsa, alt: "Round reception desk beneath a curved light line, WSA office" },
        },
      ],
    },
  },

  contact: {
    label: "Contact",
    lines: ["Let's start", "a conversation"],
    text: "Tell us about your site, your project and your plans. We'll get back to you and walk you through the next steps.",
    methodsLabel: "Get in touch",
    instagramDm: "Message us on Instagram",
    enquiryCta: "Send an enquiry",
    postal: { label: "Postal address", lines: ["P.O. Box 331208", "Ras Al Khaimah, United Arab Emirates"] },
    directorsLabel: "Directors",
    studiosLabel: "Studios",
    // Adresa studija (ulica, zgrada) — upisati kad bude poznata; prazna se ne prikazuje.
    studios: [
      { city: "Dubai", country: "United Arab Emirates", address: "" },
      { city: "Limassol", country: "Cyprus", address: "" },
    ],
    form: {
      label: "Enquiry",
      lines: ["Tell us about", "your project"],
      fields: {
        name: "Full name",
        email: "Email",
        phone: "Phone / WhatsApp",
        type: "Project type",
        location: "Project location",
        message: "Your message",
      },
      typePlaceholder: "Select",
      types: ["Private villa", "Residence / apartment", "Residential development", "Workplace", "Other"],
      privacy: { text: "By sending this form you agree to our", link: "privacy policy" },
      submit: "Send enquiry",
      sending: "Sending…",
      success: { title: "Thank you.", text: "Your enquiry has been sent. We'll get back to you shortly." },
      errors: {
        invalid: "Please fill in your name, a valid email address and a message.",
        unavailable: "The form is temporarily unavailable. Please contact us on Instagram or WhatsApp.",
        failed: "Something went wrong. Please try again or contact us directly.",
      },
    },
  },

  contactPage: {
    meta: {
      title: "Contact",
      description:
        "Contact A Point, architecture and interior design studio in Dubai and Limassol. Tell us about your villa, residence or development.",
    },
    image: { src: media.contactImage, alt: "Bedroom overlooking the marina at Port Rashid, Dubai" },
    faq: {
      label: "FAQ",
      lines: ["Questions we're", "often asked"],
      items: [
        {
          q: "Where do you work?",
          a: "Our studios are in Dubai and Limassol. We work on projects across the UAE and the wider region, and take on selected projects worldwide.",
        },
        {
          q: "Which projects do you take on?",
          a: "Private villas and residences, residential developments — from lobbies and amenities to show apartments — and selected workplaces.",
        },
        {
          q: "Can you design both the architecture and the interiors?",
          a: "Yes. We can take a project from the first plan through architecture and interiors to the final details, or join at the interior stage.",
        },
        {
          q: "Will I see the design before it is built?",
          a: "Yes. Every project is presented with photorealistic 3D visualisations, so you can see the spaces, materials and light before construction begins.",
        },
        {
          q: "How do we start?",
          a: "Send us a message with a few words about your site, the scope and your timing. We will reply, arrange a first conversation and outline the next steps.",
        },
      ],
    },
  },

  aboutPage: {
    meta: {
      title: "About",
      description:
        "A Point is an architecture and interior design studio in Dubai and Limassol. Our work is guided by spatial clarity, precision and context.",
    },
    hero: {
      label: "About",
      lines: ["Architecture", "and interior", "as one"],
      text: "We design private villas, residences and residential developments — from the first plan to the last detail.",
      image: { src: media.studioHero, alt: "Kitchen island in pale stone beneath soft concealed light, Ajman Villa" },
    },
    intro: {
      label: "Who we are",
      text: "A Point is an international architecture and interior design practice, established in 2011 and led by Michael Pokroy and Dimitrije Dukic. We design high-end residential developments, private villas and interiors — with projects across the Middle East, Singapore, China and the USA.",
    },
    facts: [
        { value: "2011", label: "Founded" },
        { value: "Middle East · Asia · USA", label: "Projects across" },
        { value: "Residential · Hospitality · Commercial", label: "Experience" },
    ],
    clients: {
      label: "Clients",
      lines: ["Who we", "work with"],
      items: [
        { title: "Property developers", text: "We help developers make the most of every building — from the first plan to lobbies, amenities and show apartments." },
        { title: "Commercial occupiers", text: "Efficient, productive workplaces that express who you are." },
        { title: "Private clients", text: "Unique, personal homes — from private villas to residences." },
      ],
    },
    team: {
      label: "Directors",
      lines: ["The people", "behind A Point"],
      people: [
        {
          name: "Michael Pokroy",
          role: "Managing Director",
          email: "michael@a-pnt.com",
          photo: { src: media.michael, alt: "Portrait of Michael Pokroy" },
          bio: [
            "Michael studied interior design at the University of Johannesburg and led a multidisciplinary design practice in South Africa for over fifteen years. Based in the UAE since 2005, he was Director of AMM, creating the guest experience for several leading hotels.",
            "He joined A Point in 2011 as Managing Director and leads the interior design team on residential, corporate and hospitality projects across the Middle East, the USA and Asia. His approach is one of luxury and elegance, with a keen eye for detail — and he is the key point of contact for every client.",
          ],
        },
        {
          name: "Dimitrije Dukic",
          role: "Design Director, co-founder",
          email: "dimitrije@a-pnt.com",
          photo: { src: media.dimitrije, alt: "Portrait of Dimitrije Dukic" },
          bio: [
            "Dimitrije holds a master's degree in architecture from the University of Belgrade. He practised in Belgrade, including with the Belgrade office of LA-based Hetzel Design on residential, hotel and retail projects across the USA, before moving to Dubai in 2008 to work on large-scale projects in Doha, Dubai and Abu Dhabi with Hamilton International.",
            "In 2011 he co-founded A Point. His work is known for clean lines and understated elegance; as Design Director he leads every project from the first concept to the completion of construction.",
          ],
        },
      ],
    },
    principles: {
      label: "Principles",
      lines: ["Three ideas behind", "every project"],
      items: [
        {
          title: "Spatial clarity",
          text: "We begin with the plan. Clear routes, generous proportions and honest structure make a space feel calm before a single finish is chosen.",
        },
        {
          title: "Precision",
          text: "Every joint, edge and transition is resolved on paper first. Detailed drawings and visualisations let decisions be made long before construction.",
        },
        {
          title: "Context",
          text: "Climate, light, culture and the way our clients live shape each design. The result belongs to its place — in Dubai, Limassol or anywhere else.",
        },
      ],
    },
    approach: {
      label: "Approach",
      lines: ["One studio,", "one vision"],
      paragraphs: [
        "Architecture and interiors are usually designed by different teams. We design them together, so the structure, the light, the materials and the furniture are part of the same idea.",
        "For private clients this means a home that feels complete. For developers it means lobbies, amenities and residences with a clear identity and a coherent experience.",
      ],
      image: { src: media.studioApproach, alt: "Rose marble wall and fluted bronze panels at the WSA office" },
    },
    locations: {
      label: "Studios",
      lines: ["Dubai · Limassol"],
      text: "From our studios in Dubai and Limassol we work with clients across the region and around the world.",
      image: { src: media.studioLocations, alt: "" },
    },
  },

  servicesPage: {
    meta: {
      title: "Services",
      description:
        "Architecture, interior design, 3D visualisation and interiors for residential developments — for private villas and developers in Dubai and the UAE.",
    },
    hero: {
      label: "Services",
      lines: ["From plan", "to detail"],
      text: "Architecture, interiors and design development under one roof.",
      image: { src: media.servicesHero, alt: "Sitting room with a linear fireplace and veined stone walls, Ajman Villa" },
    },
    includesLabel: "Includes",
    items: [
      {
        id: "architecture",
        title: "Architecture",
        text: "Private villas and residences shaped by the site, the climate and the way you live.",
        includes: ["Site analysis and concept", "Planning and spatial layouts", "Facades, massing and materials", "Design development"],
        image: { src: media.servicesArchitecture, alt: "Lounge with garden views and a stone feature wall, Ajman Villa" },
        note: "",
      },
      {
        id: "interior-design",
        title: "Interior design",
        text: "Complete interior concepts for villas, residences and workplaces.",
        includes: [
          "Space planning",
          "Materials and finishes",
          "Lighting design",
          "Joinery and bespoke furniture",
          "Furniture, art and accessories",
        ],
        image: { src: media.servicesInterior, alt: "Dining room with a sculptural brass chandelier, Khalid Villa" },
        note: "",
      },
      {
        id: "visualisation",
        title: "Visualisation & detailing",
        text: "Photorealistic 3D visualisation and precise detailing, so every decision is made before construction begins.",
        includes: ["Photorealistic 3D renders", "Material and finish boards", "Technical drawings and details", "Specifications"],
        image: { src: media.servicesDetailing, alt: "Bathroom with a living green wall, Khalid Villa" },
        note: "",
      },
      {
        id: "developments",
        title: "Residential developments",
        text: "Interior design for developers — from arrival lobbies and amenities to show apartments.",
        includes: ["Lobbies and amenity spaces", "Show apartments", "Unit layouts and finishes", "Visuals for sales and marketing"],
        image: { src: media.servicesDevelopments, alt: "Lobby of Central Park Plaza with a tree and a sculptural staircase" },
        note: "Interior design consultant for Central Park Plaza by DHRE.",
      },
    ],
    process: {
      label: "Process",
      lines: ["How a project", "unfolds"],
      steps: [
        { title: "Brief & site", text: "We listen first: your brief, your site, your budget and the way you want to live or work." },
        { title: "Concept", text: "A clear spatial idea, mood and material direction, presented with sketches and references." },
        { title: "Design development", text: "Plans, elevations and interiors are developed together and refined with you." },
        { title: "Visualisation", text: "Photorealistic renders show the spaces as they will be built — light, materials and furniture." },
        { title: "Detailing", text: "Technical drawings, details and specifications that contractors can build from." },
        { title: "Delivery", text: "We stay involved with contractors and suppliers so the design is built as intended." },
      ],
    },
  },

  projectsPage: {
    meta: {
      title: "Projects",
      description:
        "Selected private villas, residences, residential developments and workplaces by A Point in Dubai and the UAE.",
    },
    label: "Projects",
    lines: ["Selected work"],
    text: "Private villas, residences, residential developments and workplaces in Dubai and the UAE.",
    archive: {
      label: "Archive",
      lines: ["More from", "our portfolio"],
      text: "Selected interiors for villas, residences and hospitality projects from our earlier work.",
      images: [
        { src: media.archive01, alt: "Bedroom with a sea view and a patterned rug" },
        { src: media.archive02, alt: "Living room with a timber fireplace wall" },
        { src: media.archive03, alt: "Bedroom with a library screen and a velvet sofa" },
        { src: media.archive04, alt: "Living room with sculpture and a mirrored ceiling" },
        { src: media.archive05, alt: "Living room with grey sofas and a patterned rug" },
        { src: media.archive06, alt: "Hotel reception with a bronze bead wall" },
      ],
    },
  },

  projectPage: {
    year: "Year",
    location: "Location",
    type: "Type",
    scope: "Scope",
    client: "Client",
    architect: "Architecture",
    gallery: "Gallery",
    film: "Project film",
    next: "Next project",
    back: "All projects",
  },

  cta: {
    lines: ["Have a project", "in mind?"],
    text: "Tell us about your site and your plans — we'll take it from there.",
    button: { label: "Start a project", href: "/contact" },
  },

  privacyPage: {
    meta: {
      title: "Privacy policy",
      description: "How A Point handles the information you send us.",
    },
    title: "Privacy policy",
    updated: "Last updated: October 2026",
    sections: [
      {
        title: "Who we are",
        text: "This website is operated by A Point I.D.A (P.O. Box 331208, Ras Al Khaimah, United Arab Emirates), an architecture and interior design studio with studios in Dubai and Limassol. You can reach us at info@a-pnt.com.",
      },
      {
        title: "What we collect",
        text: "We only collect the information you choose to send us — for example your name, phone number, email address and message when you send an enquiry through the contact form or contact us by email, phone, WhatsApp or Instagram. This website does not use analytics or advertising cookies; a single functional cookie remembers the language you chose.",
      },
      {
        title: "How we use it",
        text: "We use your information only to reply to your enquiry and, if we work together, to manage the project. We do not sell it or share it with third parties for marketing.",
      },
      {
        title: "Third-party services",
        text: "Enquiries sent through the contact form are delivered to us by email through an email service provider. If you contact us through WhatsApp or Instagram, those services process your messages under their own privacy policies.",
      },
      {
        title: "Your rights",
        text: "You can ask us at any time what information we hold about you, and ask us to correct or delete it, using the details on our contact page.",
      },
      {
        title: "Changes",
        text: "We may update this policy from time to time. The latest version is always available on this page.",
      },
    ],
  },

  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has moved.",
    cta: "Back to home",
  },

  footer: {
    menuLabel: "Menu",
    followLabel: "Follow",
    contactLabel: "Contact",
    location: "Dubai · Limassol · Worldwide",
    marquee: "Let's talk",
    rights: "All rights reserved.",
    privacy: "Privacy policy",
    credit: { label: "Website by", name: "SCAONS", href: "https://scaons.com" },
  },
};

export type Dictionary = typeof en;
