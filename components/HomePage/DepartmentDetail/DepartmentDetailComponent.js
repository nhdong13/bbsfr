import Brand from "../Brand";
import SessionHeaderDepartmentComponent from "./Sesstion/SessionHeaderDepartmentComponent";
import SessionBrowseByCategoryComponent from "./Sesstion/SessionBrowseByCategoryComponent";
import SEO from "../SEO";
import FAQComponent from "../FAQ";
import { useRouter } from "next/router";
import SearchForAccessoriesComponent from "./Sesstion/SearchForAccessoriesComponent";
import Head from "next/head";
import { convertSchemaFAQ } from "../../../services/convertSchemaFAQ";
import TestimonialsComponent from "../Testimonials/index";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DepartmentDetailComponent = (props) => {
  const { department } = props;
  const router = useRouter();
  const {
    collections,
    shop_by_brand_slider_content,
    page_heading_2,
    meta_title,
    page_paragraph,
    meta_description,
    faq,
    faq_title,
  } = department;

  const brands =
    shop_by_brand_slider_content && shop_by_brand_slider_content.length > 0
      ? shop_by_brand_slider_content
      : [];

  const heading1 =
    page_heading_2 && page_heading_2.length > 0
      ? page_heading_2[0].text
      : "---";
  const jsonFAQ = convertSchemaFAQ({ faq, faq_title });

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonFAQ }}
        />
      </Head>
      <div>
        <SessionHeaderDepartmentComponent department={department} />
        {router?.query?.id === "accessories" ? (
          <SearchForAccessoriesComponent />
        ) : (
          <></>
        )}
        <SessionBrowseByCategoryComponent collections={collections} />
        <Brand brands={brands} />
        <TestimonialsComponent />
        <FAQComponent FAQ={{ faq, faq_title }} />
        <SEO heading1={heading1} pageParagraph={page_paragraph || []} />
      </div>
    </>
  );
};
export default DepartmentDetailComponent;
