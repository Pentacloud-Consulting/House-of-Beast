export interface Creator {
  id: string;
  name: string;
  role: string;
  handle: string;
  image: string;
  location: string;
  collabTitle: string;
  genre: string;
  bpm: string;
  bio: string;
  gear: string[];
  trackTitle: string;
  audioUrl?: string;
}

export const CREATORS_DATA: Creator[] = [
  {
    id: "cr-1",
    name: "KLARA SVENSSON",
    role: "HEAD OF SOUND & RESIDENT DJ",
    handle: "@klarasonics",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    location: "BERLIN",
    collabTitle: "CURATING THE 24H AUDIO IDENTITY",
    genre: "MINIMAL TECHNO & HYPNOSIS",
    bpm: "126 BPM",
    bio: "Pioneering Berlin's new sound architecture with hypnotic modular basslines and deep analog acoustic resonance.",
    gear: ["Technics SL-1200MK7", "Allen & Heath Xone:96", "Custom HOB Acoustic Monitors"],
    trackTitle: "Berlin Deep Drift (Club Cut)",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "cr-2",
    name: "MARCUS BEAT",
    role: "MODULAR SYNTH ARCHITECT",
    handle: "@marcusbeat",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    location: "AMSTERDAM",
    collabTitle: "CUSTOM ACOUSTIC INSTALLATIONS",
    genre: "ANALOG MODULAR & TEXTURES",
    bpm: "128 BPM",
    bio: "Designing spatial acoustic environments that tune hotel suites, communal clubs, and listening dens to pure harmony.",
    gear: ["Buchla 200e System", "Moog Sub 37", "Genelec 8351B SAM"],
    trackTitle: "Resonance in Concrete & Wood",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=electronic-future-beats-117997.mp3"
  },
  {
    id: "cr-3",
    name: "NINA VANDERBILT",
    role: "VINYL SELECTOR & HOST",
    handle: "@ninavanderbilt",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    location: "BERLIN",
    collabTitle: "NIGHTLY LISTENING SESSIONS",
    genre: "RARE JAPANESE JAZZ & DEEP GROOVES",
    bpm: "118 BPM",
    bio: "Curator of the House of Beats Wax Vault, guiding intimate listening sessions with rare 1st-edition Japanese pressings.",
    gear: ["Garrard 301 Turntable", "Shindo Laboratory Preamp", "Tannoy Westminster Royal"],
    trackTitle: "Midnight at the Listening Den",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=ambient-piano-amp-strings-10711.mp3"
  },
  {
    id: "cr-4",
    name: "KAI & LEO",
    role: "EXPERIMENTAL AUDIO VISUALISTS",
    handle: "@kaileo_studio",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    location: "AMSTERDAM",
    collabTitle: "REACTIVE LIGHT ARCHITECTURE",
    genre: "SYNCHRONIZED LIGHT & FREQUENCY",
    bpm: "132 BPM",
    bio: "Amsterdam audiovisual duo engineering kinetic light sculptures that breathe and flicker in sync with real-time sound frequencies.",
    gear: ["TouchDesigner Cluster", "DMX Laser Matrix", "Custom Audio Reactive Shaders"],
    trackTitle: "Luminescent Pulse (Live Take)",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=tuesday-glitch-122413.mp3"
  },
  {
    id: "cr-5",
    name: "ELENA ROCH",
    role: "CULTURE PODCASTER & CRITIC",
    handle: "@elena_waves",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
    location: "BERLIN",
    collabTitle: "DEEP DIVE MUSIC TALKS",
    genre: "UNDERGROUND BROADCASTS & DIALOGUE",
    bpm: "120 BPM",
    bio: "Hosting the weekly House of Beats Live Broadcast with underground selectors, electronic music historians, and club innovators.",
    gear: ["Shure SM7B Broadcast", "Universal Audio Apollo x8", "Vintage Tube Preamp"],
    trackTitle: "Frequencies of the Underground Ep. 04",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_c972750873.mp3?filename=lofi-chill-medium-version-159456.mp3"
  },
  {
    id: "cr-6",
    name: "TARIQ M.",
    role: "UNDERGROUND RECORD COLLECTOR",
    handle: "@tariq_wax",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    location: "AMSTERDAM",
    collabTitle: "RARE WAX VAULT CURATION",
    genre: "DETROIT ELECTRO & CHICAGO SOUL",
    bpm: "124 BPM",
    bio: "Spanning three decades of crate-digging across Chicago, Detroit, and Berlin, Tariq curates our 4,000-piece vinyl collection.",
    gear: ["Rane MP2015 Rotary Mixer", "Isonoe Isolation Feet", "Audio-Technica ART9XI Cartridge"],
    trackTitle: "Motor City to Dam (Rotary Mix)",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/11/06/audio_c073041935.mp3?filename=groove-club-126296.mp3"
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
