export interface FeedItem {
  id: string;
  platform: "instagram" | "tiktok";
  username: string;
  userAvatar: string;
  thumbnail: string;
  videoUrl?: string;
  likes: string;
  comments: string;
  caption: string;
  location: string;
  timestamp: string;
  aspectRatio: "9/16";
}

export const MOCK_FEED_DATA: FeedItem[] = [
  {
    id: "feed-1",
    platform: "instagram",
    username: "@beat.seeker",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-party-lights-in-a-nightclub-43308-large.mp4",
    likes: "14.2K",
    comments: "482",
    caption: "Soundcheck at 3 AM. The acoustics in this venue are unmatched. #FINDTHEBEAT",
    location: "Studio 01, House of Beats",
    timestamp: "2h ago",
    aspectRatio: "9/16"
  },
  {
    id: "feed-2",
    platform: "tiktok",
    username: "@sound_curator",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-dj-hands-mixing-music-on-a-console-42687-large.mp4",
    likes: "32.8K",
    comments: "1.2K",
    caption: "When the hotel lobby drops a 130 BPM acid bassline at check-in 🔊⚡️ #THEBEATSTARTSHERE",
    location: "Berlin Lobby Sanctuary",
    timestamp: "5h ago",
    aspectRatio: "9/16"
  },
  {
    id: "feed-3",
    platform: "instagram",
    username: "@analog_rebel",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-dj-mixing-music-in-a-club-41584-large.mp4",
    likes: "9.5K",
    comments: "210",
    caption: "Secret vinyl vault sessions preview. No phones, just analog warmth.",
    location: "Underground Vault",
    timestamp: "12h ago",
    aspectRatio: "9/16"
  },
  {
    id: "feed-4",
    platform: "tiktok",
    username: "@night_tales",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-crowd-dancing-at-a-concert-41581-large.mp4",
    likes: "45.1K",
    comments: "1.8K",
    caption: "Is this a hotel or a 24-hour sound culture hub? Both. #FINDTHEBEAT",
    location: "Amsterdam Rooftop",
    timestamp: "1d ago",
    aspectRatio: "9/16"
  },
  {
    id: "feed-5",
    platform: "instagram",
    username: "@vibe_architect",
    userAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-in-a-club-43306-large.mp4",
    likes: "21.0K",
    comments: "540",
    caption: "Where local artists record their next EP and drop it live the same night.",
    location: "Listening Suite 03",
    timestamp: "2d ago",
    aspectRatio: "9/16"
  },
  {
    id: "feed-6",
    platform: "tiktok",
    username: "@sonic_berlin",
    userAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-party-lights-in-a-nightclub-43308-large.mp4",
    likes: "18.7K",
    comments: "390",
    caption: "Early morning sunrise sets overlooking Kreuzberg. High energy sonic immersion.",
    location: "Berlin Sky Lounge",
    timestamp: "2d ago",
    aspectRatio: "9/16"
  },
  {
    id: "feed-7",
    platform: "instagram",
    username: "@ams_grooves",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-dj-hands-mixing-music-on-a-console-42687-large.mp4",
    likes: "29.3K",
    comments: "812",
    caption: "Rare 90s house vinyls spinning in the canal sanctuary. Pure nostalgia. #FINDTHEBEAT",
    location: "Canal Room, Amsterdam",
    timestamp: "3d ago",
    aspectRatio: "9/16"
  },
  {
    id: "feed-8",
    platform: "tiktok",
    username: "@synth_explorer",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-dj-mixing-music-in-a-club-41584-large.mp4",
    likes: "11.4K",
    comments: "195",
    caption: "Custom Moog synth modular rack built into every suite wall. Mind blown. 🤯",
    location: "Suite 404, Berlin",
    timestamp: "4d ago",
    aspectRatio: "9/16"
  },
  {
    id: "feed-9",
    platform: "instagram",
    username: "@pulse_selector",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-crowd-dancing-at-a-concert-41581-large.mp4",
    likes: "38.9K",
    comments: "1.1K",
    caption: "Midnight pop-up set in the underground coffee lounge. Unforgettable energy. #THEBEATSTARTSHERE",
    location: "Underground Vault",
    timestamp: "5d ago",
    aspectRatio: "9/16"
  }
];

export async function fetchFeed(): Promise<FeedItem[]> {
  // Adapter function for future API integration (Behold, Elfsight, Official Social API)
  return Promise.resolve(MOCK_FEED_DATA);
}
