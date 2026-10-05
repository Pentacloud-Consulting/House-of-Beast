export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioUrl?: string; // Royalty-free audio or synth generator fallback
}

export interface Playlist {
  id: string;
  title: string;
  dj: string;
  tag: "Warm-up" | "Peak Hour" | "After Hours" | "Lobby Selects";
  bpm: number;
  coverImage: string;
  vinylColor: string;
  tracks: Track[];
  audioUrl: string; // Default audio for this mix
}

export const PLAYLISTS_DATA: Playlist[] = [
  {
    id: "pl-01",
    title: "ECHOES OF THE LOBBY",
    dj: "AMSTERDAM RESIDENTS",
    tag: "Warm-up",
    bpm: 118,
    coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop",
    vinylColor: "#76EDBB",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
    tracks: [
      { id: "t1", title: "Velvet Frequency", artist: "Klara S.", duration: "05:42" },
      { id: "t2", title: "Subterranean Pulse", artist: "Marcus B.", duration: "06:15" },
      { id: "t3", title: "Canal Twilight", artist: "Duo Sonics", duration: "04:50" }
    ]
  },
  {
    id: "pl-02",
    title: "THE VAULT HYPNOSIS",
    dj: "BERLIN SOUNDSYSTEM",
    tag: "Peak Hour",
    bpm: 132,
    coverImage: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=800&auto=format&fit=crop",
    vinylColor: "#111111",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73507.mp3?filename=electronic-future-beats-117997.mp3",
    tracks: [
      { id: "t4", title: "Industrial Acid Ritual", artist: "Vault Master", duration: "07:30" },
      { id: "t5", title: "Modular Overdrive", artist: "Synth Lab 09", duration: "08:12" },
      { id: "t6", title: "Beat Friction", artist: "Klara S.", duration: "06:05" }
    ]
  },
  {
    id: "pl-03",
    title: "DAWN TIDES & REVERB",
    dj: "NINA V.",
    tag: "After Hours",
    bpm: 110,
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    vinylColor: "#333333",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-ambient-18482.mp3",
    tracks: [
      { id: "t7", title: "5 AM Reverie", artist: "Nina V.", duration: "06:40" },
      { id: "t8", title: "Analog Horizon", artist: "Deep Collective", duration: "07:10" },
      { id: "t9", title: "Whispering Bassline", artist: "Klara S.", duration: "05:22" }
    ]
  },
  {
    id: "pl-04",
    title: "CREATOR SELECTS V.04",
    dj: "GUEST TASTEMAKERS",
    tag: "Lobby Selects",
    bpm: 124,
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    vinylColor: "#76EDBB",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f7f458.mp3?filename=house-beat-124401.mp3",
    tracks: [
      { id: "t10", title: "Groove Architecture", artist: "Selecta", duration: "05:15" },
      { id: "t11", title: "City Oscillations", artist: "Tastemakers", duration: "06:00" },
      { id: "t12", title: "The Beat Starts Here", artist: "HOB All Stars", duration: "07:45" }
    ]
  }
];
