export const convertSchemaFAQ = ({ faq: faqs, faq_title }) => {
  const obj = {
    "@context": "https://schema.org",
    "@type": `FAQPage`,
  };
  const mainEntity = [];
  if (faqs && faqs.length) {
    for (const item of faqs) {
      mainEntity.push({
        "@type": "Question",
        name: `${item.question}`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${item.answer}`,
        },
      });
    }
  }
  obj["mainEntity"] = mainEntity;
  return JSON.stringify(obj);
};
