import FaqAccordion from '@/components/seo/FaqAccordion'
import { homeFaqs } from './homeFaqs'

/**
 * Thin wrapper: the accordion markup now lives in the shared FaqAccordion so the
 * homepage, the landing pages and /faq cannot drift apart, and the questions live
 * in homeFaqs so the FAQPage JSON-LD on `/` quotes the same strings.
 */
export default function HomeFAQ() {
  return <FaqAccordion faqs={homeFaqs} heading="Common questions." />
}
