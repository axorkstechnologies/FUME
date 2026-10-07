import React, { useMemo } from 'react';
import { FRAGRANCES } from '../data/fragrances';

export const SEOSchema: React.FC = () => {
  const schema = useMemo(() => {
    const productSchemas = FRAGRANCES.map(f => ({
      "@type": "Product",
      "name": `FUME ${f.name} Eau de Parfum`,
      "image": `https://fume-six.vercel.app${f.image}`,
      "description": `Luxury Eau de Parfum. ${f.notesLine}. Formulated with Grasse distillates for 14+ hours longevity.`,
      "brand": {
        "@type": "Brand",
        "name": "FUME FRAGRANCES"
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
          "name": "How long do FUME Fragrances last?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our fragrances are formulated as true Eau de Parfum with high concentration (22-28%), ensuring 14+ hours of longevity on skin and fabrics."
          }
        },
        {
          "@type": "Question",
          "name": "Where are FUME Fragrances made?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our distillates are sourced and formulated at our Creation Lab in Grasse, France, and carefully bottled in Pakistan to ensure accessible luxury pricing without compromising quality."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer Custom Scent Atelier services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer bespoke olfactory creation. You can work directly with our perfumers to orchestrate a signature fragrance bottled in an engraved European flacon."
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
