import FAQ from '@/components/Home/FAQ'
import HeroSection from '@/components/Home/HeroSection'
import HowItWorks from '@/components/Home/HowItWorks'
import RecommendedCourses from '@/components/Home/RecommendedCourses'
import Testimonials from '@/components/Home/Testimonials'
import TrustCommunity from '@/components/Home/TrustCommunity'

export default function page() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <RecommendedCourses />
      <Testimonials />
      <FAQ />
      <TrustCommunity />
    </main>
  )
}
