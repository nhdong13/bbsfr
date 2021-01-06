import { useEffect, useState } from "react"
import { SearchProvider } from "@sajari/react-hooks"
import { getBrandByUid, getDepartmentByUID } from "../../../lib/prismic/api"
import dynamic from "next/dynamic"
import ImagedHeaderComponent from "../Components/ImagedHeaderComponent"
import SessionBrowseByCategoryComponent from "../../DepartmentDetail/Sesstion/SessionBrowseByCategoryComponent"
import Head from "next/head"
import { convertSchemaFAQ } from "../../../services/convertSchemaFAQ"
import { addConsoleHandler } from "selenium-webdriver/lib/logging"

const SEODynamic = dynamic(() => import("../../HomePage/SEO"))
const BrandHomeComponent = ({
  initialResponse,
  pipeline,
  variables,
  brand,
}) => {
  const {
    meta_description,
    meta_title,
    faq,
    faq_title,
    brand_hero_image,
  } = brand
  const jsonFAQ = convertSchemaFAQ({ faq, faq_title })
  console.log(brand_hero_image)
  const collections =
    brand.brand_collections &&
    brand.brand_collections.map((i) => {
      return {
        collection_image: i.brand_collection_image,
        collection_title: i.brand_collection_title,
        collection_slug: i.brand_collection_slug,
      }
    })

  return (
    <>
      <Head>
        <title>{meta_title || "Home"}</title>
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
      <SearchProvider
        search={{
          pipeline,
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
      >
        <ImagedHeaderComponent
          header={
            brand && brand.page_heading_1 && brand.page_heading_1.length > 0
              ? brand.page_heading_1[0].text
              : "Brand Home"
          }
          pipeline={pipeline}
          imgUrl={brand_hero_image.url}
        />
      </SearchProvider>

      <SessionBrowseByCategoryComponent
        departmentSlug={brand._meta.uid}
        collections={collections}
        disableTitleContainer={true}
      />

      <SEODynamic
        heading1={
          brand && brand.page_heading_1 && brand.page_heading_1.length > 0
            ? brand.page_heading_1[0].text
            : ""
        }
        pageParagraph={
          brand && brand.page_paragraph && brand.page_paragraph.length > 0
            ? brand.page_paragraph
            : []
        }
      />
    </>
  )
}
export default BrandHomeComponent
