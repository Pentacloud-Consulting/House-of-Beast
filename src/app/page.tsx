"use client";

import React, { useState } from "react";
import { Preloader } from "@/components/layout/Preloader";
import { SectionHero } from "@/components/sections/01-Hero";
import { SectionManifesto } from "@/components/sections/02-Manifesto";
import { SectionSocialFeed } from "@/components/sections/03-SocialFeed";
import { SectionEvents } from "@/components/sections/04-Events";
import { SectionMusic } from "@/components/sections/05-Music";
import { SectionCreators } from "@/components/sections/06-Creators";
import { SectionStories } from "@/components/sections/07-Stories";
import { SectionFindTheBeat } from "@/components/sections/08-FindTheBeat";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const [, setIsPreloaderComplete] = useState(false);

  return (
    <>
      {/* Section 0: Preloader */}
      <Preloader onComplete={() => setIsPreloaderComplete(true)} />

      {/* Main Experience Flow */}
      <div className="relative overflow-hidden">
        {/* Section 1: Hero */}
        <SectionHero />

        {/* Section 2: Manifesto */}
        <SectionManifesto />

        {/* Section 3: Social Feed */}
        <SectionSocialFeed />

        {/* Section 4: Events & Booking */}
        <SectionEvents />

        {/* Section 5: Music & Sound Lab */}
        <SectionMusic />

        {/* Section 6: Creators Community */}
        <SectionCreators />

        {/* Section 7: Editorial Stories */}
        <SectionStories />

        {/* Section 8: Find The Beat Countdown & Waitlist */}
        <SectionFindTheBeat />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
