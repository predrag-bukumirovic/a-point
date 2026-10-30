import type { StaticImageData } from "next/image";
import type { Img } from "./site";

import ajCover from "@/assets/images/projects/ajman-villa/cover.jpg";
import ajDetail from "@/assets/images/projects/ajman-villa/detail.jpg";
import aj01 from "@/assets/images/projects/ajman-villa/01.jpg";
import aj02 from "@/assets/images/projects/ajman-villa/02.jpg";
import aj03 from "@/assets/images/projects/ajman-villa/03.jpg";
import aj04 from "@/assets/images/projects/ajman-villa/04.jpg";
import aj05 from "@/assets/images/projects/ajman-villa/05.jpg";
import aj06 from "@/assets/images/projects/ajman-villa/06.jpg";
import aj07 from "@/assets/images/projects/ajman-villa/07.jpg";
import aj08 from "@/assets/images/projects/ajman-villa/08.jpg";
import aj09 from "@/assets/images/projects/ajman-villa/09.jpg";
import aj10 from "@/assets/images/projects/ajman-villa/10.jpg";
import khCover from "@/assets/images/projects/khalid-villa/cover.jpg";
import khDetail from "@/assets/images/projects/khalid-villa/detail.jpg";
import kh01 from "@/assets/images/projects/khalid-villa/01.jpg";
import kh02 from "@/assets/images/projects/khalid-villa/02.jpg";
import kh03 from "@/assets/images/projects/khalid-villa/03.jpg";
import kh04 from "@/assets/images/projects/khalid-villa/04.jpg";
import kh05 from "@/assets/images/projects/khalid-villa/05.jpg";
import kh06 from "@/assets/images/projects/khalid-villa/06.jpg";
import kh07 from "@/assets/images/projects/khalid-villa/07.jpg";
import kh08 from "@/assets/images/projects/khalid-villa/08.jpg";
import kh09 from "@/assets/images/projects/khalid-villa/09.jpg";
import khP1 from "@/assets/images/projects/khalid-villa/p1.jpg";
import khP2 from "@/assets/images/projects/khalid-villa/p2.jpg";
import cpCover from "@/assets/images/projects/central-park-plaza/cover.jpg";
import cpDetail from "@/assets/images/projects/central-park-plaza/detail.jpg";
import cp01 from "@/assets/images/projects/central-park-plaza/01.jpg";
import cp02 from "@/assets/images/projects/central-park-plaza/02.jpg";
import prCover from "@/assets/images/projects/port-rashid/cover.jpg";
import prDetail from "@/assets/images/projects/port-rashid/detail.jpg";
import pr01 from "@/assets/images/projects/port-rashid/01.jpg";
import pr02 from "@/assets/images/projects/port-rashid/02.jpg";
import pr03 from "@/assets/images/projects/port-rashid/03.jpg";
import pr04 from "@/assets/images/projects/port-rashid/04.jpg";
import pr05 from "@/assets/images/projects/port-rashid/05.jpg";
import wsCover from "@/assets/images/projects/wsa-office/cover.jpg";
import wsDetail from "@/assets/images/projects/wsa-office/detail.jpg";
import ws01 from "@/assets/images/projects/wsa-office/01.jpg";
import ws02 from "@/assets/images/projects/wsa-office/02.jpg";
import ws03 from "@/assets/images/projects/wsa-office/03.jpg";
import ws04 from "@/assets/images/projects/wsa-office/04.jpg";
import ws05 from "@/assets/images/projects/wsa-office/05.jpg";
import ws06 from "@/assets/images/projects/wsa-office/06.jpg";
import mkCover from "@/assets/images/projects/mak-villa/cover.jpg";
import mkDetail from "@/assets/images/projects/mak-villa/detail.jpg";
import mk01 from "@/assets/images/projects/mak-villa/01.jpg";
import mk02 from "@/assets/images/projects/mak-villa/02.jpg";
import mk03 from "@/assets/images/projects/mak-villa/03.jpg";
import mk04 from "@/assets/images/projects/mak-villa/04.jpg";
import mk05 from "@/assets/images/projects/mak-villa/05.jpg";
import mk06 from "@/assets/images/projects/mak-villa/06.jpg";
import mk07 from "@/assets/images/projects/mak-villa/07.jpg";
import mk08 from "@/assets/images/projects/mak-villa/08.jpg";
import pvCover from "@/assets/images/projects/private-villa/cover.jpg";
import pvDetail from "@/assets/images/projects/private-villa/detail.jpg";
import pv01 from "@/assets/images/projects/private-villa/01.jpg";
import pv02 from "@/assets/images/projects/private-villa/02.jpg";
import pv03 from "@/assets/images/projects/private-villa/03.jpg";
import pv04 from "@/assets/images/projects/private-villa/04.jpg";
import pv05 from "@/assets/images/projects/private-villa/05.jpg";
import pv06 from "@/assets/images/projects/private-villa/06.jpg";
import pv07 from "@/assets/images/projects/private-villa/07.jpg";
import pv08 from "@/assets/images/projects/private-villa/08.jpg";
import pv09 from "@/assets/images/projects/private-villa/09.jpg";
import agCover from "@/assets/images/projects/al-gurum-villa/cover.jpg";
import agDetail from "@/assets/images/projects/al-gurum-villa/detail.jpg";
import ag01 from "@/assets/images/projects/al-gurum-villa/01.jpg";
import ag02 from "@/assets/images/projects/al-gurum-villa/02.jpg";
import ag03 from "@/assets/images/projects/al-gurum-villa/03.jpg";
import ag04 from "@/assets/images/projects/al-gurum-villa/04.jpg";
import ag05 from "@/assets/images/projects/al-gurum-villa/05.jpg";
import ag06 from "@/assets/images/projects/al-gurum-villa/06.jpg";

/*
 * Projekti sa Instagrama (@apoint_ida) i sa starog sajta (a-pnt.com: MAK Villa,
 * Private Villa, Al Gurum Villa — sa godinama). Nazivi, lokacije i godine su njihovi;
 * Central Park Plaza ima i podatke o saradnicima (Client: DHRE, Architecture: DEWAN).
 * Prva slika galerije je ujedno i naslovna slika projekta.
 * `featured` — projekat se prikazuje i u izboru na početnoj strani.
 */

type Photo = { src: StaticImageData; alt: string; portrait?: boolean };

type ProjectData = {
  slug: string;
  title: string;
  category: string;
  location: string;
  scope: string;
  summary: string;
  body: string[];
  caption: string;
  year?: string;
  featured?: boolean;
  credits?: { client: string; architect: string };
  film?: { src: string; poster: string };
  cover: StaticImageData;
  detail: StaticImageData;
  gallery: Photo[];
};

const projects: ProjectData[] = [
  {
    slug: "ajman-villa",
    featured: true,
    title: "Ajman Villa",
    category: "Private villa",
    location: "Ajman, UAE",
    scope: "Interior architecture · Visualisation",
    summary: "A private villa in warm stone, pale oak and soft daylight, where the living spaces open fully to the garden and pool.",
    body: [
      "The villa is organised around its garden. Full-height glazing dissolves the boundary between inside and out, so the living room, the pool and the planting read as one continuous space.",
      "Inside, a restrained palette of veined stone, oak panelling and bronze details carries through every room — from the sculptural living areas to the kitchen island, the master suite and the stone-clad bathrooms, each lit with quiet, layered light.",
    ],
    caption: "Master bedroom — oak panelling and quiet, layered light.",
    cover: ajCover,
    detail: ajDetail,
    gallery: [
      { src: aj01, alt: "Living room opening onto the garden courtyard and pool" },
      { src: aj02, alt: "Living area beneath a sculptural hexagonal light" },
      { src: aj03, alt: "Lounge with garden views and a stone feature wall" },
      { src: aj04, alt: "Sitting room with a linear fireplace and veined stone walls" },
      { src: aj05, alt: "Dining room with a linear chandelier" },
      { src: aj06, alt: "Kitchen island in pale stone with bronze bar stools" },
      { src: aj07, alt: "Bedroom suite framed in oak" },
      { src: aj08, alt: "Master bedroom with an oak-panelled wall" },
      { src: aj09, alt: "Stone bathroom lit by a skylight" },
      { src: aj10, alt: "Bathroom with a freestanding tub and a walk-in wardrobe" },
    ],
  },
  {
    slug: "khalid-villa",
    featured: true,
    title: "Khalid Villa",
    category: "Private villa",
    location: "Dubai, UAE",
    scope: "Interior architecture · Visualisation",
    summary: "A contemporary villa in Dubai defined by fluted dark timber, pale stone and gallery lighting — a calm backdrop for art, family life and gathering.",
    body: [
      "Generous open-plan living is structured by tall fluted timber walls that frame the art, conceal storage and give each zone its own presence. Track lighting and recessed coves keep the ceilings clean and let the mood change from day to night.",
      "The private wing continues the same language in softer tones — bedroom suites with full-height glazing and stone bathrooms with a living green wall — while a private car gallery with mirrored columns turns a collection into an exhibition.",
    ],
    caption: "Bedroom suite with full-height glazing and an open dressing wall.",
    cover: khCover,
    detail: khDetail,
    gallery: [
      { src: kh01, alt: "Open-plan living area with art and fluted timber walls" },
      { src: kh02, alt: "Dining room with a sculptural brass chandelier" },
      { src: kh03, alt: "Living room with a dark fluted timber wall and a brass kitchen island" },
      { src: kh04, alt: "Lounge with a low sectional sofa and a sculptural coffee table" },
      { src: kh05, alt: "Private car gallery with mirrored columns" },
      { src: kh06, alt: "Bedroom suite with full-height glazing" },
      { src: kh07, alt: "Bedroom with dark timber walls" },
      { src: kh08, alt: "Stone bathroom with a freestanding tub" },
      { src: kh09, alt: "Bathroom with a living green wall" },
      { src: khP1, alt: "Corridor lit by a concealed light cove", portrait: true },
      { src: khP2, alt: "Illuminated stair beside dark fluted panels", portrait: true },
    ],
  },
  {
    slug: "central-park-plaza",
    featured: true,
    title: "Central Park Plaza",
    category: "Residential development",
    location: "Dubai, UAE",
    scope: "Interior design consultant",
    summary: "Interior design consultancy for Central Park Plaza, a residential development by DHRE with architecture by DEWAN.",
    body: [
      "As interior design consultant on the project, A Point worked on the interiors of the development, including lobbies that bring greenery, daylight and sculptural forms indoors.",
      "Set beside a landscaped park, the towers look over generous gardens towards the Dubai skyline — a setting the interiors continue with natural materials and soft, organic shapes.",
    ],
    caption: "Arrival lobby with a floating stair.",
    credits: { client: "DHRE", architect: "DEWAN" },
    film: { src: "/media/central-park-plaza.mp4", poster: "/media/central-park-plaza.jpg" },
    cover: cpCover,
    detail: cpDetail,
    gallery: [
      { src: cp01, alt: "Lobby with a tree, a sculptural staircase and soft seating" },
      { src: cp02, alt: "Floating staircase with pendant lights and stone walls" },
    ],
  },
  {
    slug: "mak-villa",
    title: "MAK Villa",
    category: "Private villa",
    location: "Dubai, UAE",
    scope: "Interior architecture · Visualisation",
    summary: "A private villa in Dubai composed around a floating timber staircase, where slatted screens, veined stone and a glass-fronted garage become part of the interior.",
    body: [
      "MAK Villa is organised around a double-height hall and a floating timber staircase. Slatted screens filter the light between the living spaces, while large-format stone, dark timber and bronze set a calm, tailored palette.",
      "Living and dining areas open onto the garden; art, sculptural lighting and bespoke joinery give each room its own character, through to the master suite, the dressing room and the stone-clad bathrooms.",
    ],
    caption: "Master bedroom with a dark timber wall and soft, layered light.",
    year: "2020",
    featured: true,
    cover: mkCover,
    detail: mkDetail,
    gallery: [
      { src: mk01, alt: "Floating timber staircase with a glass-fronted garage below" },
      { src: mk02, alt: "Living room with slatted screens and sculptural art" },
      { src: mk03, alt: "Dining room and kitchen beneath linear pendant lights" },
      { src: mk04, alt: "Lounge with a fireplace and garden views" },
      { src: mk05, alt: "Double-height hall with art and a floating staircase" },
      { src: mk06, alt: "Master bedroom with a dark timber wall" },
      { src: mk07, alt: "Dressing room with a skylight and a central island" },
      { src: mk08, alt: "Bathroom with a stone vanity and garden views" },
    ],
  },
  {
    slug: "port-rashid",
    title: "Port Rashid",
    category: "Waterfront residence",
    location: "Port Rashid, Dubai",
    scope: "Interior design · Visualisation",
    summary: "A waterfront residence where every room turns towards the sea, with soft textiles, natural timber and blue accents that carry the view inside.",
    body: [
      "Overlooking the marina at Port Rashid, the residence is planned around its views. Living spaces sit behind floor-to-ceiling glass, while layered curtains, warm timber and textured rugs soften the light and the scale.",
      "Sculptural lighting, slatted timber screens and hand-finished surfaces give each room its own character, from the living and dining areas to the bedroom, the bathroom and the gym.",
    ],
    caption: "A bedroom framed by the marina.",
    cover: prCover,
    detail: prDetail,
    gallery: [
      { src: pr01, alt: "Living room with a panoramic view over the marina" },
      { src: pr02, alt: "Lounge with a sculptural light and slatted timber screens" },
      { src: pr03, alt: "Bedroom overlooking the marina" },
      { src: pr04, alt: "Bathroom with twin rounded mirrors and an oak vanity" },
      { src: pr05, alt: "Gym with views across the city" },
    ],
  },
  {
    slug: "private-villa",
    title: "Private Villa",
    category: "Private villa",
    location: "Dubai, UAE",
    scope: "Interior architecture · Visualisation",
    summary: "A private villa in Dubai where dramatic marble, warm timber and concealed light create a sequence of calm, hotel-like spaces — from the lounge to a private spa.",
    body: [
      "The villa unfolds around a bright double-height atrium and a sculptural marble staircase. Living spaces pair soft, low furniture with bold stone — black-veined marble at the kitchen island and book-matched slabs in the bathrooms.",
      "Below, a private spa with an indoor pool and a treatment room continues the same palette of warm timber and concealed light.",
    ],
    caption: "Marble staircase rising beside the atrium.",
    year: "2019",
    cover: pvCover,
    detail: pvDetail,
    gallery: [
      { src: pv01, alt: "Evening lounge with low sofas and concealed lighting" },
      { src: pv02, alt: "Living room with a sculptural coffee table and garden views" },
      { src: pv03, alt: "Kitchen island in black-veined marble" },
      { src: pv04, alt: "Double-height atrium with a floating staircase" },
      { src: pv05, alt: "Sculptural staircase clad in white marble" },
      { src: pv06, alt: "Master bedroom with an open bathroom" },
      { src: pv07, alt: "Bathroom with book-matched marble and a freestanding tub" },
      { src: pv08, alt: "Indoor pool lined with timber and light" },
      { src: pv09, alt: "Spa treatment room in warm timber" },
    ],
  },
  {
    slug: "wsa-office",
    featured: true,
    title: "WSA Office",
    category: "Workplace",
    location: "Dubai, UAE",
    scope: "Interior design · Visualisation",
    summary: "A workplace with the poise of a hotel lobby — sculpted seating, curved lines of light, glass and a statement wall of rose marble.",
    body: [
      "The office opens with a reception that feels closer to hospitality than to a corporate floor: a sculptural round desk, soft seating and curved lines of light drawn across the ceiling.",
      "Glass meeting rooms keep the plan open and bright, while rose marble, fluted bronze and pale timber give the space warmth and a clear identity.",
    ],
    caption: "Rose marble and fluted bronze at the entrance.",
    cover: wsCover,
    detail: wsDetail,
    gallery: [
      { src: ws01, alt: "Lounge with sculptural seating beneath curved light lines" },
      { src: ws02, alt: "Round reception desk in the entrance hall" },
      { src: ws03, alt: "Rose marble wall and fluted bronze panels" },
      { src: ws04, alt: "Glass meeting rooms around the open floor" },
      { src: ws05, alt: "Reception with the WSA logo wall" },
      { src: ws06, alt: "Reception desk and waiting area" },
    ],
  },
  {
    slug: "al-gurum-villa",
    title: "Al Gurum Villa",
    category: "Private villa",
    location: "Abu Dhabi, UAE",
    scope: "Interior architecture · Visualisation",
    summary: "A villa in Abu Dhabi shaped by soft curves — sweeping timber columns, flowing ceilings and generous, light-filled rooms for family and guests.",
    body: [
      "Curved walls and ceilings guide movement through the villa's reception spaces, where rounded timber columns frame a lounge with a linear fireplace and full-height glazing.",
      "A formal dining room for large gatherings sits beneath a cascading chandelier, while the private rooms are finished in pale stone, warm timber and soft textiles.",
    ],
    caption: "Bedroom in warm timber and pale stone.",
    year: "2018",
    featured: true,
    cover: agCover,
    detail: agDetail,
    gallery: [
      { src: ag01, alt: "Reception lounge with curved timber columns and a linear fireplace" },
      { src: ag02, alt: "Living room with a large artwork and low sofas" },
      { src: ag03, alt: "Formal dining room beneath a cascading chandelier" },
      { src: ag04, alt: "Lounge beneath a flowing curved ceiling" },
      { src: ag05, alt: "Bedroom with a timber headboard wall" },
      { src: ag06, alt: "Bathroom with a freestanding tub and marble walls" },
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  scope: string;
  summary: string;
  body: string[];
  caption: string;
  year?: string;
  featured?: boolean;
  credits?: { client: string; architect: string };
  film?: { src: string; poster: string };
  cover: Img;
  detail: Img;
  hero: Img;
  gallery: (Img & { portrait?: boolean })[];
};

// Naslovna i detaljna slika dobijaju alt tekst iz galerije, odnosno iz potpisa.
const toProject = (p: ProjectData): Project => ({
  ...p,
  cover: { src: p.cover, alt: p.gallery[0].alt },
  detail: { src: p.detail, alt: p.caption },
  hero: p.gallery[0],
});

export const PROJECT_SLUGS = projects.map((p) => p.slug);

export const getProjects = () => projects.map(toProject);

/** Izbor projekata za početnu stranu. */
export const getFeaturedProjects = () => projects.filter((p) => p.featured).map(toProject);

export const getProject = (slug: string) => {
  const p = projects.find((item) => item.slug === slug);
  return p ? toProject(p) : undefined;
};

/** Sledeći projekat (kružno), za dno strane projekta. */
export const getNextProject = (slug: string) => {
  const i = projects.findIndex((item) => item.slug === slug);
  return toProject(projects[(i + 1) % projects.length]);
};
