import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { Community } from '@/components/sections/Community';
import { Events } from '@/components/sections/Events';
import { Testimonials } from '@/components/sections/Testimonials';
import { GetInvolved } from '@/components/sections/GetInvolved';
import { FAQ } from '@/components/sections/FAQ';

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <Stats />
      <WhatWeDo />
      <Events />
      <Community />
      <Testimonials />
      <GetInvolved />
      <FAQ />
    </main>
  );
}
