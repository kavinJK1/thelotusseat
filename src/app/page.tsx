import Hero from '@/components/home/Hero'
import ProblemSection from '@/components/home/ProblemSection'
import Solution from '@/components/home/Solution'
import Posture from '@/components/home/Posture'
import Design from '@/components/home/Design'
import Product3D from '@/components/home/Product3D'
import Details from '@/components/home/Details'
import Gallery from '@/components/home/Gallery'
import HomeFAQ from '@/components/home/HomeFAQ'
import CTASection from '@/components/home/CTASection'
import { homeFaqs } from '@/components/home/homeFaqs'
import JsonLd from '@/components/seo/JsonLd'
import { faqSchema, graph, productSchema } from '@/lib/seo/schema'

/**
 * One simple line of argument, in plain words: here's the problem, here's the fix,
 * here's the proof you can see, here's how it's built, here's what it's made of —
 * then the pictures, the questions, and the order. Every section says one new thing;
 * nothing is repeated twice in different clothes.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={graph(productSchema(), faqSchema(homeFaqs))} />
      <Hero />
      {/* Information */}
      <ProblemSection />
      <Solution />
      {/* The difference you can see */}
      <Posture />
      <Design />
      {/* The seat in the round */}
      <Product3D />
      <Details />
      {/* The pictures */}
      <Gallery />
      <HomeFAQ />
      <CTASection />
    </>
  )
}
