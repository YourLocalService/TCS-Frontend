export const site = {
  name: "TCS",
  fullName: "Technological Construction Service",
  tagline: "All Types of Construction Works in One Place!",
  phones: ["+16478097778", "+16478098000", "+16476773355"],
  email: "tcscanada.info@gmail.com",
  address: "107-4548 Dufferin Street, Toronto, ON M3H 5R9, Canada",
  addressSecondary: "32-1331 Major Mackenzie, Maple, ON L6A 4W4",
  hours: "Mon–Fri",
  since: 1998,
  yearsExperience: 25,
  countries: ["Canada", "USA", "Ukraine"],
};

export type NavService = {
  title: string;
  slug: string;
};

export const services: NavService[] = [
  { title: "Repair and insulation of roofs", slug: "mounting" },
  { title: "Thermal imaging survey", slug: "thermal" },
  { title: "Waterproofing", slug: "hydro-isolation" },
  { title: "Civil works", slug: "remont" },
  { title: "Dismantling work", slug: "dismantling" },
  { title: "Landscaping and interlocking", slug: "landscaping-and-interlocking" },
  { title: "Deck & Fences", slug: "deck" },
  { title: "Retaining Walls", slug: "walls" },
  { title: "Gazebo", slug: "gazebo" },
];

export const navLinks = [
  { title: "About us", href: "/about-us" },
  { title: "Gallery", href: "/gallery" },
  { title: "Contacts", href: "/contacts" },
  { title: "Quote", href: "/quote" },
];

export const heroImages: Record<string, string> = {
  mounting: "/images/hero-mounting.jpg",
  thermal: "/images/hero-thermal.png",
  "hydro-isolation": "/images/hero-hydro-isolation.png",
  remont: "/images/hero-remont.png",
  dismantling: "/images/hero-dismantling.png",
  "landscaping-and-interlocking": "/images/hero-landscaping-and-interlocking.png",
  deck: "/images/hero-deck.png",
  walls: "/images/hero-walls.png",
  gazebo: "/images/hero-gazebo.png",
  side: "/images/hero-side.png",
};

// The live site's footer lists facade/siding work in place of landscaping.
export const footerServices: NavService[] = services.map((s) =>
  s.slug === "landscaping-and-interlocking"
    ? { title: "Facade and finishing works", slug: "side" }
    : s,
);

// The home page "Our services" grid is its own list: 7 image tiles, and its
// labels/links differ from the header nav (e.g. "Gazebos and fences").
export type HomeTile = { key: string; title: string; href: string; image: string };

export const homeTiles: HomeTile[] = [
  { key: "mounting", title: "Repair and insulation of roofs", href: "/mounting", image: "/images/tile-mounting.png" },
  { key: "thermal", title: "Thermal imaging survey", href: "/thermal", image: "/images/tile-thermal.png" },
  { key: "remont", title: "Civil works", href: "/remont", image: "/images/tile-remont.png" },
  { key: "fence", title: "Gazebos and fences", href: "/gazebo", image: "/images/tile-fence.png" },
  { key: "hydro-isolation", title: "Waterproofing", href: "/hydro-isolation", image: "/images/tile-hydro-isolation.png" },
  { key: "dismantling", title: "Dismantling work", href: "/dismantling", image: "/images/tile-dismantling.png" },
  { key: "landscaping", title: "Landscaping and interlocking", href: "/landscaping-and-interlocking", image: "/images/tile-landscaping.png" },
];

export const team = [
  { name: "Maksym Ovramenko", role: "Director", phone: "+16478097778" },
  { name: "Denys Ovramenko", role: "Director", phone: "+16478098000" },
  { name: "Inna Ovramenko", role: "Director", phone: "+16476773355" },
];
