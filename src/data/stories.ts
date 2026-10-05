export interface Story {
  id: string;
  category: "PEOPLE" | "CULTURE" | "CITY";
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  image: string;
  readTime: string;
}

export const STORIES_DATA: Story[] = [
  {
    id: "st-1",
    category: "PEOPLE",
    title: "THE SOUNDSCAPE ARCHITECTS",
    subtitle: "BEHIND THE ACOUSTIC LABS",
    excerpt: "How three Berlin producers engineered a hotel space where acoustics dictate architecture.",
    date: "OCT 2026",
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1200&auto=format&fit=crop",
    readTime: "3 MIN READ"
  },
  {
    id: "st-2",
    category: "CULTURE",
    title: "NOCTURNAL SANCTUARIES",
    subtitle: "WHY MUSIC NEEDS A HOME",
    excerpt: "Redefining urban spaces into 24-hour creative ecosystems for sonic explorers.",
    date: "NOV 2026",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 MIN READ"
  },
  {
    id: "st-3",
    category: "CITY",
    title: "AMSTERDAM UNDERGROUND",
    subtitle: "HIDDEN FREQUENCIES",
    excerpt: "A curated guide to secret vinyl vaults, basement clubs, and sunrise listening spots.",
    date: "NOV 2026",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    readTime: "2 MIN READ"
  }
];
