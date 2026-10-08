import React, { useMemo } from 'react';
import { FRAGRANCES } from '../data/fragrances';

export const SEOSchema: React.FC = () => {
  const schema = useMemo(() => {
    const productSchemas = FRAGRANCES.map(f => ({
      "@type": "Product",
      "name": `FUME ${f.name} Eau de Parfum`,
      "image": `https://fume-six.vercel.app${f.image}`,
      "description": `Eau de Parfum. ${f.notesLine}. Crafted with premium ingredients for lasting presence.`,
      "brand": {
        "@type": "Brand",
        "name": "FUME FRAGRANCES"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "FUME FRAGRANCES",
        "foundingDate": "2024",
        "foundingLocation": {
          "@type": "Place",
          "name": "Karachi, Pakistan"
        }
      },
      "offers": {
        "@type": "Offer",
        "url": "https://fume-six.vercel.app/",
        "priceCurrency": "PKR",
        "price": f.price,
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "FUME FRAGRANCES"
        }
      }
    }));

    const faqSchema = {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "HOW LONG DOES FUME PERFUME LAST ON SKIN AND TEXTILES?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "FUME Eau de Parfum creations are formulated with an uncompromised 22% to 28% pure perfume oil concentration. In real-world wear tests across Pakistan, our scents consistently deliver all-day active skin persistence and exceptional longevity on garments, remaining distinct and elegant even in warm summer climates."
          }
        },
        {
          "@type": "Question",
          "name": "WHERE IS FUME FORMULATED AND MANUFACTURED?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "FUME combines artisan parfumerie standards with Pakistani artisanal precision. We source our premium ingredients, resinous absolutes, and floral essences. Compounding, 45-day cool cellar maceration, and hand-pouring in heavy architectural flint glass flacons take place in our studio in Pakistan."
          }
        },
        {
          "@type": "Question",
          "name": "IS CASH ON DELIVERY (COD) AVAILABLE ACROSS PAKISTAN?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We provide nationwide Cash on Delivery (COD) to all cities across Pakistan, including Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Multan, and Faisalabad. Orders placed before 15h00 PKT are dispatched the same day via premier tracked air and road couriers, reaching major cities within 2 to 3 business days."
          }
        },
        {
          "@type": "Question",
          "name": "HOW DOES THE COMPLIMENTARY 2ML DISCOVERY VIAL WORK?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every full 50ml or 100ml FUME flacon arrives accompanied by an individual 2ml matching sample vial positioned outside the sealed presentation box. We invite you to spritz and wear the 2ml sample for several days to witness how its top, heart, and base notes harmonize with your unique skin chemistry. If it is not your signature scent, simply return the unopened, sealed full flacon for a complete refund. Return shipping is entirely complimentary."
          }
        }
      ]
    };

    return {
      "@context": "https://schema.org",
      "@graph": [...productSchemas, faqSchema]
    };
  }, []);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
