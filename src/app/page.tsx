import Hero from '@/components/home/Hero'
import ProductIntro from '@/components/home/ProductIntro'
import ProblemSection from '@/components/home/ProblemSection'
import Comparison from '@/components/home/Comparison'
import CushionScrollShowcase from '@/components/showcase/CushionScrollShowcase'
import WhySection from '@/components/home/WhySection'
import Features from '@/components/home/Features'
import Materials from '@/components/home/Materials'
import Specs from '@/components/home/Specs'
import Lifestyle from '@/components/home/Lifestyle'
import HomeFAQ from '@/components/home/HomeFAQ'
import CTASection from '@/components/home/CTASection'
import { homeFaqs } from '@/components/home/homeFaqs'
import JsonLd from '@/components/seo/JsonLd'
import { faqSchema, graph, productSchema } from '@/lib/seo/schema'

/**
 * The homepage argues in one order: state the claim, diagnose why ordinary cushions
 * fail, *show* the postural mechanism (the scroll scene and its measured plate),
 * then open the object up — construction, systems, materials, specification.
 *
 * The old Benefits grid is deliberately gone: the posture proof demonstrates what
 * that grid asserted, and repeating it in six cells weakened both.
 */
export default function Home() {
  return (
    <>
      {/* The Product node lives here rather than on /product because `/` is the URL
          that ranks and the one an answer engine will cite for "meditation seat". */}
      <JsonLd data={graph(productSchema(), faqSchema(homeFaqs))} />
      <Hero />
      <ProductIntro />
      <ProblemSection />
      {/* Answers "why not a normal cushion?" before the 500vh showcase, which makes the
          same argument far better but 300vh deep — where a skimming visitor never gets
          to it. Stated once here, demonstrated at length below. */}
      <Comparison />
      <CushionScrollShowcase />
      <WhySection />
      <Features />
      <Materials />
      <Specs />
      <Lifestyle />
      <HomeFAQ />
      <CTASection />
    </>
  )
}
