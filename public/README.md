# Media Placeholder Guide for House of Beats (HOB)

To replace the mock media with official production assets:

## 1. Videos (`public/videos/`)
- `hero-loop.mp4`: High-contrast B&W atmosphere loop (1080p, 24fps, muted, ~10s).
- `feed-01.mp4` through `feed-05.mp4`: Vertical 9:16 mobile videos for Section 03 Social Feed.
- `event-preview.mp4`: Background loop for featured events.

## 2. Images (`public/images/`)
- `hero-poster.jpg`: Fallback image for video loading.
- `fresco-arch.jpg`: High-res architectural photography for Section 02 Manifesto.
- `vinyl-cover-01.jpg` to `04.jpg`: Square 1:1 artwork for Section 05 Music vinyl sleeves.
- `creator-01.jpg` to `06.jpg`: 3:4 portrait photography for Section 06 Creators.

## 3. Data Configuration (`src/data/`)
- `site.ts`: Update `CITY`, `OPENING_DATE`, social URLs, tagline, vision, and `bookingUrl`.
- `events.ts`: Replace event details, dates, line-ups, and ticket tiers.
- `feed.ts`: Swap `fetchFeed()` mock return value with Behold / Elfsight / Official API feed.
- `playlists.ts`: Replace MP3 streams / Spotify / SoundCloud URLs.
