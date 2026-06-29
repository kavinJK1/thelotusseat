import Hero from '@/components/home/Hero'
import ProductIntro from '@/components/home/ProductIntro'
import ProblemSection from '@/components/home/ProblemSection'
import WhySection from '@/components/home/WhySection'
import Benefits from '@/components/home/Benefits'
import Features from '@/components/home/Features'
import Specs from '@/components/home/Specs'
import Lifestyle from '@/components/home/Lifestyle'
import HomeFAQ from '@/components/home/HomeFAQ'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <>
      <Hero />
      <ProductIntro />
      <ProblemSection />
      <WhySection />
      <Benefits />
      <Features />
      <Specs />
      <Lifestyle />
      <HomeFAQ />
      <CTASection />
    </>
  )
}
