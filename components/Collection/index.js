import ResultComponent from "./Components/ResultComponent";
import HeaderCollectionComponent from "./Components/HeaderCollectionComponent";
import SEOComponent from "../HomePage/SEO/index";
import Head from "next/head";
const isServer = () => typeof window === "undefined";
const CollectionComponent = ({ collections }) => {
  const {
    page_heading_1,
    page_paragraph,
    meta_description,
    meta_title,
  } = collections;
  return (
    <>
      <Head>
        <title>{meta_title}</title>
        <meta name="description" content={meta_description} />
        <meta
          name="og:description"
          property="og:description"
          content={meta_description}
        />
        <meta name="og:title" property="og:title" content={meta_title} />
        <meta name="twitter:title" content={meta_title} />
        <meta name="twitter:description" content={meta_description} />
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonFAQ }}
        /> */}
      </Head>
      
      <HeaderCollectionComponent
        pageHeading={
          collections &&
          collections.page_heading_1 &&
          collections.page_heading_1.length > 0
            ? collections.page_heading_1[0].text
            : ""
        }
      />

      {!isServer() && <ResultComponent />}
      <SEOComponent
        heading1={
          page_heading_1 && page_heading_1.length > 0
            ? page_heading_1[0].text
            : ""
        }
        pageParagraph={
          page_paragraph && page_paragraph.length > 0 ? page_paragraph : []
        }
      />
    </>
  );
};

export default CollectionComponent;
