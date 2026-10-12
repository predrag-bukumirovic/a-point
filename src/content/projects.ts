import type { StaticImageData } from "next/image";
import type { Img, Locale } from "./site";

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

type T<V = string> = Record<Locale, V>;
type Photo = { src: StaticImageData; alt: T; portrait?: boolean };

type ProjectData = {
  slug: string;
  title: T;
  category: T;
  location: T;
  scope: T;
  summary: T;
  body: T<string[]>;
  caption: T;
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
    title: { en: "Ajman Villa", ar: "فيلا عجمان" },
    category: { en: "Private villa", ar: "فيلا خاصة" },
    location: { en: "Ajman, UAE", ar: "عجمان، الإمارات" },
    scope: { en: "Interior architecture · Visualisation", ar: "العمارة الداخلية · التصوّر ثلاثي الأبعاد" },
    summary: {
      en: "A private villa in warm stone, pale oak and soft daylight, where the living spaces open fully to the garden and pool.",
      ar: "فيلا خاصة من الحجر الدافئ وخشب البلوط الفاتح وضوء النهار الناعم، تنفتح مساحات المعيشة فيها بالكامل على الحديقة والمسبح.",
    },
    body: {
      en: [
        "The villa is organised around its garden. Full-height glazing dissolves the boundary between inside and out, so the living room, the pool and the planting read as one continuous space.",
        "Inside, a restrained palette of veined stone, oak panelling and bronze details carries through every room — from the sculptural living areas to the kitchen island, the master suite and the stone-clad bathrooms, each lit with quiet, layered light.",
      ],
      ar: [
        "تتمحور الفيلا حول حديقتها. الواجهات الزجاجية الممتدة من الأرض حتى السقف تُذيب الحدود بين الداخل والخارج، فتبدو غرفة المعيشة والمسبح والمساحات الخضراء فضاءً واحداً متصلاً.",
        "في الداخل، تمتد لوحة مواد هادئة من الحجر المعرّق وألواح البلوط والتفاصيل البرونزية عبر جميع الغرف — من مساحات المعيشة النحتية إلى جزيرة المطبخ والجناح الرئيسي والحمّامات المكسوّة بالحجر، وكلّها مضاءة بإضاءة هادئة متعددة الطبقات.",
      ],
    },
    caption: {
      en: "Master bedroom — oak panelling and quiet, layered light.",
      ar: "غرفة النوم الرئيسية — ألواح البلوط وإضاءة هادئة متعددة الطبقات.",
    },
    cover: ajCover,
    detail: ajDetail,
    gallery: [
      { src: aj01, alt: { en: "Living room opening onto the garden courtyard and pool", ar: "غرفة المعيشة المنفتحة على فناء الحديقة والمسبح" } },
      { src: aj02, alt: { en: "Living area beneath a sculptural hexagonal light", ar: "منطقة المعيشة أسفل ثريا سداسية نحتية" } },
      { src: aj03, alt: { en: "Lounge with garden views and a stone feature wall", ar: "صالة بإطلالة على الحديقة وجدار حجري" } },
      { src: aj04, alt: { en: "Sitting room with a linear fireplace and veined stone walls", ar: "غرفة جلوس بمدفأة طولية وجدران من الحجر المعرّق" } },
      { src: aj05, alt: { en: "Dining room with a linear chandelier", ar: "غرفة الطعام بثريا طولية" } },
      { src: aj06, alt: { en: "Kitchen island in pale stone with bronze bar stools", ar: "جزيرة المطبخ من الحجر الفاتح مع مقاعد برونزية" } },
      { src: aj07, alt: { en: "Bedroom suite framed in oak", ar: "جناح نوم بإطار من خشب البلوط" } },
      { src: aj08, alt: { en: "Master bedroom with an oak-panelled wall", ar: "غرفة النوم الرئيسية بجدار من ألواح البلوط" } },
      { src: aj09, alt: { en: "Stone bathroom lit by a skylight", ar: "حمّام حجري يضيئه منور سقفي" } },
      { src: aj10, alt: { en: "Bathroom with a freestanding tub and a walk-in wardrobe", ar: "حمّام بحوض مستقل وغرفة ملابس" } },
    ],
  },
  {
    slug: "khalid-villa",
    featured: true,
    title: { en: "Khalid Villa", ar: "فيلا خالد" },
    category: { en: "Private villa", ar: "فيلا خاصة" },
    location: { en: "Dubai, UAE", ar: "دبي، الإمارات" },
    scope: { en: "Interior architecture · Visualisation", ar: "العمارة الداخلية · التصوّر ثلاثي الأبعاد" },
    summary: {
      en: "A contemporary villa in Dubai defined by fluted dark timber, pale stone and gallery lighting — a calm backdrop for art, family life and gathering.",
      ar: "فيلا معاصرة في دبي تحدّد ملامحها الأخشاب الداكنة المضلّعة والحجر الفاتح وإضاءة المعارض — خلفية هادئة للفن والحياة العائلية واللقاءات.",
    },
    body: {
      en: [
        "Generous open-plan living is structured by tall fluted timber walls that frame the art, conceal storage and give each zone its own presence. Track lighting and recessed coves keep the ceilings clean and let the mood change from day to night.",
        "The private wing continues the same language in softer tones — bedroom suites with full-height glazing and stone bathrooms with a living green wall — while a private car gallery with mirrored columns turns a collection into an exhibition.",
      ],
      ar: [
        "تنتظم مساحات المعيشة المفتوحة والواسعة بواسطة جدران خشبية مضلّعة عالية تؤطّر الأعمال الفنية وتُخفي التخزين وتمنح كل منطقة حضورها الخاص. وتحافظ الإضاءة المسارية والتجاويف المضيئة على نقاء الأسقف، وتتيح تبديل الأجواء من النهار إلى الليل.",
        "ويستمر الجناح الخاص باللغة نفسها بدرجات أكثر نعومة — أجنحة نوم بواجهات زجاجية كاملة وحمّامات حجرية بجدار نباتي حيّ — بينما يحوّل معرض السيارات الخاص بأعمدته العاكسة المجموعةَ إلى معرض فني.",
      ],
    },
    caption: {
      en: "Bedroom suite with full-height glazing and an open dressing wall.",
      ar: "جناح نوم بواجهة زجاجية كاملة وجدار ملابس مفتوح.",
    },
    cover: khCover,
    detail: khDetail,
    gallery: [
      { src: kh01, alt: { en: "Open-plan living area with art and fluted timber walls", ar: "منطقة معيشة مفتوحة مع أعمال فنية وجدران خشبية مضلّعة" } },
      { src: kh02, alt: { en: "Dining room with a sculptural brass chandelier", ar: "غرفة الطعام بثريا نحاسية نحتية" } },
      { src: kh03, alt: { en: "Living room with a dark fluted timber wall and a brass kitchen island", ar: "غرفة المعيشة بجدار خشبي داكن مضلّع وجزيرة مطبخ نحاسية" } },
      { src: kh04, alt: { en: "Lounge with a low sectional sofa and a sculptural coffee table", ar: "صالة بأريكة منخفضة وطاولة قهوة نحتية" } },
      { src: kh05, alt: { en: "Private car gallery with mirrored columns", ar: "معرض سيارات خاص بأعمدة عاكسة" } },
      { src: kh06, alt: { en: "Bedroom suite with full-height glazing", ar: "جناح نوم بواجهة زجاجية كاملة" } },
      { src: kh07, alt: { en: "Bedroom with dark timber walls", ar: "غرفة نوم بجدران خشبية داكنة" } },
      { src: kh08, alt: { en: "Stone bathroom with a freestanding tub", ar: "حمّام حجري بحوض مستقل" } },
      { src: kh09, alt: { en: "Bathroom with a living green wall", ar: "حمّام بجدار نباتي حيّ" } },
      { src: khP1, alt: { en: "Corridor lit by a concealed light cove", ar: "ممر تضيئه إنارة مخفية" }, portrait: true },
      { src: khP2, alt: { en: "Illuminated stair beside dark fluted panels", ar: "درج مضاء بجانب ألواح داكنة مضلّعة" }, portrait: true },
    ],
  },
  {
    slug: "central-park-plaza",
    featured: true,
    title: { en: "Central Park Plaza", ar: "سنترال بارك بلازا" },
    category: { en: "Residential development", ar: "مشروع سكني" },
    location: { en: "Dubai, UAE", ar: "دبي، الإمارات" },
    scope: { en: "Interior design consultant", ar: "استشاري التصميم الداخلي" },
    summary: {
      en: "Interior design consultancy for Central Park Plaza, a residential development by DHRE with architecture by DEWAN.",
      ar: "استشارات التصميم الداخلي لمشروع سنترال بارك بلازا، وهو مشروع سكني لشركة DHRE بتصميم معماري من DEWAN.",
    },
    body: {
      en: [
        "As interior design consultant on the project, A Point worked on the interiors of the development, including lobbies that bring greenery, daylight and sculptural forms indoors.",
        "Set beside a landscaped park, the towers look over generous gardens towards the Dubai skyline — a setting the interiors continue with natural materials and soft, organic shapes.",
      ],
      ar: [
        "بصفتها استشاري التصميم الداخلي للمشروع، عملت A Point على التصاميم الداخلية للمشروع، ومنها الردهات التي تُدخل المساحات الخضراء وضوء النهار والأشكال النحتية إلى الداخل.",
        "تقع الأبراج بجانب حديقة منسّقة، وتطل على مساحات خضراء واسعة باتجاه أفق دبي — وهو محيط تواصله التصاميم الداخلية بمواد طبيعية وأشكال عضوية ناعمة.",
      ],
    },
    caption: {
      en: "Arrival lobby with a floating stair.",
      ar: "ردهة الاستقبال بدرج معلّق.",
    },
    credits: { client: "DHRE", architect: "DEWAN" },
    film: { src: "/media/central-park-plaza.mp4", poster: "/media/central-park-plaza.jpg" },
    cover: cpCover,
    detail: cpDetail,
    gallery: [
      { src: cp01, alt: { en: "Lobby with a tree, a sculptural staircase and soft seating", ar: "ردهة بشجرة ودرج نحتي ومقاعد ناعمة" } },
      { src: cp02, alt: { en: "Floating staircase with pendant lights and stone walls", ar: "درج معلّق مع إضاءة متدلية وجدران حجرية" } },
    ],
  },
  {
    slug: "mak-villa",
    title: { en: "MAK Villa", ar: "فيلا MAK" },
    category: { en: "Private villa", ar: "فيلا خاصة" },
    location: { en: "Dubai, UAE", ar: "دبي، الإمارات" },
    scope: { en: "Interior architecture · Visualisation", ar: "العمارة الداخلية · التصوّر ثلاثي الأبعاد" },
    summary: {
      en: "A private villa in Dubai composed around a floating timber staircase, where slatted screens, veined stone and a glass-fronted garage become part of the interior.",
      ar: "فيلا خاصة في دبي تتمحور حول درج خشبي معلّق، تصبح فيها الحواجز الخشبية المشبّكة والحجر المعرّق والمرأب ذو الواجهة الزجاجية جزءاً من التصميم الداخلي.",
    },
    body: {
      en: [
        "MAK Villa is organised around a double-height hall and a floating timber staircase. Slatted screens filter the light between the living spaces, while large-format stone, dark timber and bronze set a calm, tailored palette.",
        "Living and dining areas open onto the garden; art, sculptural lighting and bespoke joinery give each room its own character, through to the master suite, the dressing room and the stone-clad bathrooms.",
      ],
      ar: [
        "تنتظم فيلا MAK حول بهو بارتفاع طابقين ودرج خشبي معلّق. تُرشّح الحواجز الخشبية المشبّكة الضوء بين مساحات المعيشة، فيما يرسم الحجر بالألواح الكبيرة والخشب الداكن والبرونز لوحة مواد هادئة ومتقنة.",
        "تنفتح مساحات المعيشة والطعام على الحديقة، وتمنح الأعمال الفنية والإضاءة النحتية والنجارة المصممة حسب الطلب كل غرفة طابعها الخاص، وصولاً إلى الجناح الرئيسي وغرفة الملابس والحمّامات المكسوّة بالحجر.",
      ],
    },
    caption: { en: "Master bedroom with a dark timber wall and soft, layered light.", ar: "غرفة النوم الرئيسية بجدار خشبي داكن وإضاءة ناعمة متعددة الطبقات." },
    year: "2020",
    featured: true,
    cover: mkCover,
    detail: mkDetail,
    gallery: [
      { src: mk01, alt: { en: "Floating timber staircase with a glass-fronted garage below", ar: "درج خشبي معلّق ومرأب بواجهة زجاجية في الأسفل" } },
      { src: mk02, alt: { en: "Living room with slatted screens and sculptural art", ar: "غرفة المعيشة بحواجز خشبية مشبّكة وأعمال فنية نحتية" } },
      { src: mk03, alt: { en: "Dining room and kitchen beneath linear pendant lights", ar: "غرفة الطعام والمطبخ أسفل إضاءة متدلية طولية" } },
      { src: mk04, alt: { en: "Lounge with a fireplace and garden views", ar: "صالة بمدفأة وإطلالة على الحديقة" } },
      { src: mk05, alt: { en: "Double-height hall with art and a floating staircase", ar: "بهو بارتفاع طابقين مع عمل فني ودرج معلّق" } },
      { src: mk06, alt: { en: "Master bedroom with a dark timber wall", ar: "غرفة النوم الرئيسية بجدار خشبي داكن" } },
      { src: mk07, alt: { en: "Dressing room with a skylight and a central island", ar: "غرفة ملابس بمنور سقفي وجزيرة وسطية" } },
      { src: mk08, alt: { en: "Bathroom with a stone vanity and garden views", ar: "حمّام بوحدة مغسلة حجرية وإطلالة على الحديقة" } },
    ],
  },
  {
    slug: "port-rashid",
    title: { en: "Port Rashid", ar: "ميناء راشد" },
    category: { en: "Waterfront residence", ar: "مسكن على الواجهة البحرية" },
    location: { en: "Port Rashid, Dubai", ar: "ميناء راشد، دبي" },
    scope: { en: "Interior design · Visualisation", ar: "التصميم الداخلي · التصوّر ثلاثي الأبعاد" },
    summary: {
      en: "A waterfront residence where every room turns towards the sea, with soft textiles, natural timber and blue accents that carry the view inside.",
      ar: "مسكن على الواجهة البحرية تتجه فيه كل غرفة نحو البحر، بأقمشة ناعمة وأخشاب طبيعية ولمسات زرقاء تنقل المنظر إلى الداخل.",
    },
    body: {
      en: [
        "Overlooking the marina at Port Rashid, the residence is planned around its views. Living spaces sit behind floor-to-ceiling glass, while layered curtains, warm timber and textured rugs soften the light and the scale.",
        "Sculptural lighting, slatted timber screens and hand-finished surfaces give each room its own character, from the living and dining areas to the bedroom, the bathroom and the gym.",
      ],
      ar: [
        "يطل المسكن على مرسى ميناء راشد، وقد خُطّط حول إطلالاته. تقع مساحات المعيشة خلف واجهات زجاجية من الأرض حتى السقف، فيما تُليّن الستائر المتعددة الطبقات والأخشاب الدافئة والسجاد المنسوج الضوءَ والمقياس.",
        "وتمنح الإضاءة النحتية والحواجز الخشبية المشبّكة والأسطح المشغولة يدوياً كل غرفة طابعها الخاص، من مساحات المعيشة والطعام إلى غرفة النوم والحمّام والنادي الرياضي.",
      ],
    },
    caption: { en: "A bedroom framed by the marina.", ar: "غرفة نوم يؤطّرها المرسى." },
    cover: prCover,
    detail: prDetail,
    gallery: [
      { src: pr01, alt: { en: "Living room with a panoramic view over the marina", ar: "غرفة المعيشة بإطلالة بانورامية على المرسى" } },
      { src: pr02, alt: { en: "Lounge with a sculptural light and slatted timber screens", ar: "صالة بإضاءة نحتية وحواجز خشبية مشبّكة" } },
      { src: pr03, alt: { en: "Bedroom overlooking the marina", ar: "غرفة نوم تطل على المرسى" } },
      { src: pr04, alt: { en: "Bathroom with twin rounded mirrors and an oak vanity", ar: "حمّام بمرآتين مستديرتين ووحدة مغسلة من البلوط" } },
      { src: pr05, alt: { en: "Gym with views across the city", ar: "نادٍ رياضي بإطلالة على المدينة" } },
    ],
  },
  {
    slug: "private-villa",
    title: { en: "Private Villa", ar: "فيلا خاصة" },
    category: { en: "Private villa", ar: "فيلا خاصة" },
    location: { en: "Dubai, UAE", ar: "دبي، الإمارات" },
    scope: { en: "Interior architecture · Visualisation", ar: "العمارة الداخلية · التصوّر ثلاثي الأبعاد" },
    summary: {
      en: "A private villa in Dubai where dramatic marble, warm timber and concealed light create a sequence of calm, hotel-like spaces — from the lounge to a private spa.",
      ar: "فيلا خاصة في دبي يصنع فيها الرخام اللافت والخشب الدافئ والإضاءة المخفية تتابعاً من المساحات الهادئة بأجواء فندقية — من الصالة إلى منتجع صحي خاص.",
    },
    body: {
      en: [
        "The villa unfolds around a bright double-height atrium and a sculptural marble staircase. Living spaces pair soft, low furniture with bold stone — black-veined marble at the kitchen island and book-matched slabs in the bathrooms.",
        "Below, a private spa with an indoor pool and a treatment room continues the same palette of warm timber and concealed light.",
      ],
      ar: [
        "تتكشّف الفيلا حول بهو مضيء بارتفاع طابقين ودرج رخامي نحتي. وتجمع مساحات المعيشة بين الأثاث المنخفض الناعم والحجر الجريء — رخام معرّق بالأسود في جزيرة المطبخ وألواح رخامية متناظرة في الحمّامات.",
        "وفي الطابق السفلي، يواصل منتجع صحي خاص بمسبح داخلي وغرفة علاج لوحةَ المواد نفسها من الخشب الدافئ والإضاءة المخفية.",
      ],
    },
    caption: { en: "Marble staircase rising beside the atrium.", ar: "درج رخامي يرتفع بجانب البهو." },
    year: "2019",
    cover: pvCover,
    detail: pvDetail,
    gallery: [
      { src: pv01, alt: { en: "Evening lounge with low sofas and concealed lighting", ar: "صالة مسائية بأرائك منخفضة وإضاءة مخفية" } },
      { src: pv02, alt: { en: "Living room with a sculptural coffee table and garden views", ar: "غرفة المعيشة بطاولة قهوة نحتية وإطلالة على الحديقة" } },
      { src: pv03, alt: { en: "Kitchen island in black-veined marble", ar: "جزيرة مطبخ من الرخام المعرّق بالأسود" } },
      { src: pv04, alt: { en: "Double-height atrium with a floating staircase", ar: "بهو بارتفاع طابقين ودرج معلّق" } },
      { src: pv05, alt: { en: "Sculptural staircase clad in white marble", ar: "درج نحتي مكسوّ بالرخام الأبيض" } },
      { src: pv06, alt: { en: "Master bedroom with an open bathroom", ar: "غرفة النوم الرئيسية بحمّام مفتوح" } },
      { src: pv07, alt: { en: "Bathroom with book-matched marble and a freestanding tub", ar: "حمّام برخام متناظر وحوض مستقل" } },
      { src: pv08, alt: { en: "Indoor pool lined with timber and light", ar: "مسبح داخلي محاط بالخشب والضوء" } },
      { src: pv09, alt: { en: "Spa treatment room in warm timber", ar: "غرفة علاج في المنتجع الصحي من الخشب الدافئ" } },
    ],
  },
  {
    slug: "wsa-office",
    featured: true,
    title: { en: "WSA Office", ar: "مكتب WSA" },
    category: { en: "Workplace", ar: "مساحة عمل" },
    location: { en: "Dubai, UAE", ar: "دبي، الإمارات" },
    scope: { en: "Interior design · Visualisation", ar: "التصميم الداخلي · التصوّر ثلاثي الأبعاد" },
    summary: {
      en: "A workplace with the poise of a hotel lobby — sculpted seating, curved lines of light, glass and a statement wall of rose marble.",
      ar: "مساحة عمل بأناقة ردهة فندقية — مقاعد نحتية وخطوط ضوء منحنية وزجاج وجدار لافت من الرخام الوردي.",
    },
    body: {
      en: [
        "The office opens with a reception that feels closer to hospitality than to a corporate floor: a sculptural round desk, soft seating and curved lines of light drawn across the ceiling.",
        "Glass meeting rooms keep the plan open and bright, while rose marble, fluted bronze and pale timber give the space warmth and a clear identity.",
      ],
      ar: [
        "يستقبل المكتب زوّاره بمنطقة استقبال أقرب إلى أجواء الضيافة منها إلى طابق مؤسسي: مكتب دائري نحتي، ومقاعد ناعمة، وخطوط ضوء منحنية مرسومة على السقف.",
        "وتحافظ غرف الاجتماعات الزجاجية على انفتاح المساحة وإشراقها، بينما يمنحها الرخام الوردي والبرونز المضلّع والخشب الفاتح دفئاً وهوية واضحة.",
      ],
    },
    caption: { en: "Rose marble and fluted bronze at the entrance.", ar: "رخام وردي وبرونز مضلّع عند المدخل." },
    cover: wsCover,
    detail: wsDetail,
    gallery: [
      { src: ws01, alt: { en: "Lounge with sculptural seating beneath curved light lines", ar: "صالة بمقاعد نحتية أسفل خطوط ضوء منحنية" } },
      { src: ws02, alt: { en: "Round reception desk in the entrance hall", ar: "مكتب استقبال دائري في بهو المدخل" } },
      { src: ws03, alt: { en: "Rose marble wall and fluted bronze panels", ar: "جدار من الرخام الوردي وألواح برونزية مضلّعة" } },
      { src: ws04, alt: { en: "Glass meeting rooms around the open floor", ar: "غرف اجتماعات زجاجية حول المساحة المفتوحة" } },
      { src: ws05, alt: { en: "Reception with the WSA logo wall", ar: "منطقة الاستقبال وجدار شعار WSA" } },
      { src: ws06, alt: { en: "Reception desk and waiting area", ar: "مكتب الاستقبال ومنطقة الانتظار" } },
    ],
  },
  {
    slug: "al-gurum-villa",
    title: { en: "Al Gurum Villa", ar: "فيلا القرم" },
    category: { en: "Private villa", ar: "فيلا خاصة" },
    location: { en: "Abu Dhabi, UAE", ar: "أبوظبي، الإمارات" },
    scope: { en: "Interior architecture · Visualisation", ar: "العمارة الداخلية · التصوّر ثلاثي الأبعاد" },
    summary: {
      en: "A villa in Abu Dhabi shaped by soft curves — sweeping timber columns, flowing ceilings and generous, light-filled rooms for family and guests.",
      ar: "فيلا في أبوظبي تُشكّلها الانحناءات الناعمة — أعمدة خشبية منسابة وأسقف متموّجة وغرف رحبة مفعمة بالضوء للعائلة والضيوف.",
    },
    body: {
      en: [
        "Curved walls and ceilings guide movement through the villa's reception spaces, where rounded timber columns frame a lounge with a linear fireplace and full-height glazing.",
        "A formal dining room for large gatherings sits beneath a cascading chandelier, while the private rooms are finished in pale stone, warm timber and soft textiles.",
      ],
      ar: [
        "توجّه الجدران والأسقف المنحنية الحركة عبر مساحات الاستقبال في الفيلا، حيث تؤطّر الأعمدة الخشبية المستديرة صالةً بمدفأة طولية وواجهات زجاجية كاملة.",
        "وتقع غرفة طعام رسمية للتجمعات الكبيرة أسفل ثريا متدرّجة، فيما تُشطَّب الغرف الخاصة بالحجر الفاتح والخشب الدافئ والأقمشة الناعمة.",
      ],
    },
    caption: { en: "Bedroom in warm timber and pale stone.", ar: "غرفة نوم من الخشب الدافئ والحجر الفاتح." },
    year: "2018",
    featured: true,
    cover: agCover,
    detail: agDetail,
    gallery: [
      { src: ag01, alt: { en: "Reception lounge with curved timber columns and a linear fireplace", ar: "صالة استقبال بأعمدة خشبية منحنية ومدفأة طولية" } },
      { src: ag02, alt: { en: "Living room with a large artwork and low sofas", ar: "غرفة المعيشة بعمل فني كبير وأرائك منخفضة" } },
      { src: ag03, alt: { en: "Formal dining room beneath a cascading chandelier", ar: "غرفة طعام رسمية أسفل ثريا متدرّجة" } },
      { src: ag04, alt: { en: "Lounge beneath a flowing curved ceiling", ar: "صالة أسفل سقف منحنٍ متموّج" } },
      { src: ag05, alt: { en: "Bedroom with a timber headboard wall", ar: "غرفة نوم بجدار خشبي خلف السرير" } },
      { src: ag06, alt: { en: "Bathroom with a freestanding tub and marble walls", ar: "حمّام بحوض مستقل وجدران رخامية" } },
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

const localize = (p: ProjectData, locale: Locale): Project => {
  const gallery = p.gallery.map((g) => ({ src: g.src, alt: g.alt[locale], portrait: g.portrait }));
  return {
    slug: p.slug,
    title: p.title[locale],
    category: p.category[locale],
    location: p.location[locale],
    scope: p.scope[locale],
    summary: p.summary[locale],
    body: p.body[locale],
    caption: p.caption[locale],
    year: p.year,
    featured: p.featured,
    credits: p.credits,
    film: p.film,
    cover: { src: p.cover, alt: gallery[0].alt },
    detail: { src: p.detail, alt: p.caption[locale] },
    hero: gallery[0],
    gallery,
  };
};

export const PROJECT_SLUGS = projects.map((p) => p.slug);

export const getProjects = (locale: Locale) => projects.map((p) => localize(p, locale));

/** Izbor projekata za početnu stranu. */
export const getFeaturedProjects = (locale: Locale) =>
  projects.filter((p) => p.featured).map((p) => localize(p, locale));

export const getProject = (locale: Locale, slug: string) => {
  const p = projects.find((item) => item.slug === slug);
  return p ? localize(p, locale) : undefined;
};

/** Sledeći projekat (kružno), za dno strane projekta. */
export const getNextProject = (locale: Locale, slug: string) => {
  const i = projects.findIndex((item) => item.slug === slug);
  return localize(projects[(i + 1) % projects.length], locale);
};
