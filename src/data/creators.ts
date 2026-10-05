export interface Creator {
  id: string;
  name: string;
  role: string;
  handle: string;
  image: string;
  location: string;
  collabTitle: string;
}

export const CREATORS_DATA: Creator[] = [
  {
    id: "cr-1",
    name: "KLARA SVENSSON",
    role: "HEAD OF SOUND & RESIDENT DJ",
    handle: "@klarasonics",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    location: "BERLIN",
    collabTitle: "CURATING THE 24H AUDIO IDENTITY"
  },
  {
    id: "cr-2",
    name: "MARCUS BEAT",
    role: "MODULAR SYNTH ARCHITECT",
    handle: "@marcusbeat",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    location: "AMSTERDAM",
    collabTitle: "CUSTOM ACOUSTIC INSTALLATIONS"
  },
  {
    id: "cr-3",
    name: "NINA VANDERBILT",
    role: "VINYL SELECTOR & HOST",
    handle: "@ninavanderbilt",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    location: "BERLIN",
    collabTitle: "NIGHTLY LISTENING SESSIONS"
  },
  {
    id: "cr-4",
    name: "KAI & LEO",
    role: "EXPERIMENTAL AUDIO VISUALISTS",
    handle: "@kaileo_studio",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    location: "AMSTERDAM",
    collabTitle: "REACTIVE LIGHT ARCHITECTURE"
  },
  {
    id: "cr-5",
    name: "ELENA ROCH",
    role: "CULTURE PODCASTER & CRITIC",
    handle: "@elena_waves",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
    location: "BERLIN",
    collabTitle: "DEEP DIVE MUSIC TALKS"
  },
  {
    id: "cr-6",
    name: "TARIQ M.",
    role: "UNDERGROUND RECORD COLLECTOR",
    handle: "@tariq_wax",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    location: "AMSTERDAM",
    collabTitle: "RARE WAX VAULT CURATION"
  }
];

export const UGC_POSTS = [
  { id: "ugc-1", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop", tag: "#FINDTHEBEAT", author: "@elena_v" },
  { id: "ugc-2", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop", tag: "#THEBEATSTARTSHERE", author: "@pulse_bln" },
  { id: "ugc-3", image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=600&auto=format&fit=crop", tag: "#HOBNIGHTS", author: "@dj_sam" },
  { id: "ugc-4", image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=600&auto=format&fit=crop", tag: "#VINYLCULTURE", author: "@wax_seeker" },
  { id: "ugc-5", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop", tag: "#FINDTHEBEAT", author: "@ams_beats" },
  { id: "ugc-6", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop", tag: "#THEBEATSTARTSHERE", author: "@synth_girl" }
];
