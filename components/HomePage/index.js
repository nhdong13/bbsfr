import React from "react";
import Department from "./Department";
import Brand from "./Brand";
import SEO_page from "./SEO";
import styles from "./HomePage.module.scss";
import FAQComponent from "./FAQ";
import Head from "next/head";
import { convertSchemaFAQ } from "../../services/convertSchemaFAQ";
import TestimonialsComponent from "./Testimonials";

function Home(props) {
  const { department: departments, brands, SEO, FAQ } = props;
  let count_department = departments.length % 2 == 0 ? -1 : 0;
  let meta_title = SEO && SEO.meta_title;
  let meta_description = SEO && SEO.meta_description;
  const jsonFAQ = convertSchemaFAQ(FAQ);
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
      <div className={styles.homepageContainer}>
        {departments.map((department, index) => (
          <Department
            key={index}
            count={++count_department}
            preHeader={department.department_preHeader[0].text}
            title={department.department_title[0].text}
            slug={department.department_slug}
            callAction={department.department_call_to_action[0].text}
            image={department.department_image}
          />
        ))}
        <Brand brands={brands} />
        <TestimonialsComponent />
        <FAQComponent FAQ={FAQ} />
        <SEO_page
          heading1={SEO.page_heading_1[0].text}
          pageParagraph={SEO.page_paragraph}
        />
      </div>
    </>
  );
}
export default Home;
