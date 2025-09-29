import FAQ from '@/components/Home/FAQ'
import HeroSection from '@/components/Home/HeroSection'
import HowItWorks from '@/components/Home/HowItWorks'
import Matchmaking from '@/components/Home/Matchmaking'
import Testimonials from '@/components/Home/Testimonials'
import TrustCommunity from '@/components/Home/TrustCommunity'

export default function page() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      {/* <Matchmaking /> */}
      <Testimonials />
      <FAQ />
      <TrustCommunity />
    </main>
  )
}
