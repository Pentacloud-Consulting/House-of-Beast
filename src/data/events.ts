export interface EventItem {
  id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  artist: string;
  tag: "SECRET" | "SOLD OUT SOON" | "MYSTERY" | "LIMITED" | "OPEN ACCESS";
  location: string;
  time: string;
  isMystery?: boolean;
  featuredImage: string;
  videoUrl?: string;
  description: string;
}

export const EVENTS_DATA: EventItem[] = [
  {
    id: "evt-01",
    day: "18",
    month: "NOV",
    year: "2026",
    title: "MIDNIGHT SONICS & ANALOG SYNTHS",
    artist: "DJ KLARA x SOUNDSCAPE LAB",
    tag: "SECRET",
    location: "THE BASEMENT VAULT / HOB AMSTERDAM",
    time: "23:00 - 06:00",
    featuredImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
    description: "An unannounced 7-hour vinyl marathon exploring underground house, raw minimalism, and industrial rhythms."
  },
  {
    id: "evt-02",
    day: "24",
    month: "NOV",
    year: "2026",
    title: "CLASSIFIED BOILER SESSION",
    artist: "SPECIAL GUEST (TBA)",
    tag: "MYSTERY",
    location: "ROOFTOP DOME / HOB BERLIN",
    time: "20:00 - 03:00",
    isMystery: true,
    featuredImage: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=1200&auto=format&fit=crop",
    description: "Location unveiled 2 hours prior via SMS. High-energy modular synth set with panoramic skyline acoustics."
  },
  {
    id: "evt-03",
    day: "02",
    month: "DEC",
    year: "2026",
    title: "AFTER HOURS: DEEP CHORD ECHOES",
    artist: "MARCUS BEAT & AMSTERDAM COLLECTIVE",
    tag: "SOLD OUT SOON",
    location: "STUDIO 04 / HOB AMSTERDAM",
    time: "04:00 - LATE",
    featuredImage: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1200&auto=format&fit=crop",
    description: "Intimate early morning session curated for night dwellers, producers, and deep groove aficionados."
  },
  {
    id: "evt-04",
    day: "12",
    month: "DEC",
    year: "2026",
    title: "NEON & WAX VINYL SWAP + SET",
    artist: "NINA V. & GUEST SELECTORS",
    tag: "OPEN ACCESS",
    location: "LOBBY LOUNGE / HOB BERLIN",
    time: "16:00 - 22:00",
    featuredImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    description: "Record exchange, ambient warm-up sets, signature espresso cocktails, and rare vinyl pressings."
  },
  {
    id: "evt-05",
    day: "31",
    month: "DEC",
    year: "2026",
    title: "THE BEAT STARTS HERE: NYE RITUAL",
    artist: "FULL RESIDENT LINEUP",
    tag: "LIMITED",
    location: "ALL FLOORS / HOB GLOBAL",
    time: "21:00 - SUNRISE",
    featuredImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    description: "The inauguration of our culture sanctuary. 3 stages, immersive light installations, and 24h music immersion."
  }
];
