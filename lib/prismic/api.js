import Prismic from "prismic-javascript"

const REPOSITORY = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`

const API_TOKEN = process.env.PRISMIC_API_TOKEN
const API_LOCALE = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_LOCALE

const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN || "",
})

async function fetchAPI(query, { previewData, variables } = {}) {
  const prismicAPI = await PrismicClient.getApi()

  const res = await fetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        "Prismic-Ref": previewData?.ref || prismicAPI.masterRef.ref,
        "Content-Type": "application/json",
        "Accept-Language": API_LOCALE,
        Authorization: `Token ${API_TOKEN || ""}`,
      },
    }
  )

  if (res.status !== 200) {
    throw new Error("Failed to fetch API")
  }

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch API")
  }
  return json.data
}

export async function getAllDepartments(previewData) {
  const data = await fetchAPI(
    `
  query{
    allHomes(uid:"home"){
      edges{
        node{
          department_link {
            department_image
            department_preHeader
            department_title
            department_call_to_action
            department_slug
          }
        }
      }
    }
  }
  `,
    { previewData }
  )
  return data?.allHomes?.edges
}

export async function listAllocationsByDepartmentUID(uid) {
  try {
    const data = await fetchAPI(`
      query{
        allDepartments(uid:"${uid}"){
          edges{
            node{
              collections{
                collection_image
                collection_title
                collection_slug
              }
            }
          }
        }
      }
    `)
    return data?.allDepartments?.edges && data.allDepartments.edges.length > 0
      ? data.allDepartments.edges[0].node
      : {}
  } catch (error) {
    console.log("List allocations by department UID error:", error)
  }
}

export async function listAllCategoriesOfCollection(uid) {
  try {
    const data = await fetchAPI(`
      query{
        allCollections(uid:"${uid}"){
          edges{
            node{
               categories{
                category_slug
              }
            }
          }
        }
      }
    `)
    return data?.allCollections?.edges && data.allCollections.edges.length > 0
      ? data.allCollections.edges[0].node
      : {}
  } catch (error) {
    console.log("List categories by collection UID error:", error)
  }
}

export async function getDepartmentByUID(uid) {
  try {
    const data = await fetchAPI(`
      query{
        allDepartments(uid:"${uid}"){
          edges{
            node{
              page_heading_1
              page_heading_2
              department_image
              meta_title
              page_paragraph
              meta_description
              department_preHeader
              shop_by_brand_slider_content{
                brand_logo,
                brand_link,
              }
              faq{
                question
                answer
              }
              faq_title
              collections{
                collection_image
                collection_title
                collection_slug
              }
            }
          }
        }
      }
    `)
    return data?.allDepartments?.edges && data.allDepartments.edges.length > 0
      ? data.allDepartments.edges[0].node
      : {}
  } catch (error) {
    console.log("Get department detail error:", error)
  }
}

export async function getAllBrands(previewData) {
  try {
    const data = await fetchAPI(
      `
    query{
      allHomes {
        edges {
          node {
            shop_by_brand_slider_content {
              brand_logo
              brand_link
            }
          }
        }
      }
    }
  `,
      { previewData }
    )
    return data?.allHomes?.edges
  } catch (error) {
    console.log("Get all brands error:", error)
  }
}

export async function getAllSEO(previewData) {
  try {
    const data = await fetchAPI(
      `
    query{
      allHomes{
        edges{
          node{
            page_heading_1
            page_paragraph
            meta_title
            meta_description
          }
        }
      }
    }
  `,
      { previewData }
    )
    return data?.allHomes?.edges
  } catch (error) {
    console.log("Get all SEO error:", error)
  }
}

export async function getAllFAQ(previewData) {
  try {
    const data = await fetchAPI(
      `
      query{
        allHomes{
          edges{
            node{
              faq{
                question
                answer
              }
              faq_title
            }
          }
        }
      }
    `
    )
    return data?.allHomes?.edges && data.allHomes.edges.length > 0
      ? data.allHomes.edges[0].node
      : {}
  } catch (error) {
    console.log("Get FAQ error:", error)
  }
}

export async function getCollectionByUid(uid) {
  try {
    const data = await fetchAPI(
      `
      query{
          allCollections(uid:"${uid}"){
            edges{
              node{
                page_heading_1
                shop_by_category_text
                categories {
                  category_title
                  category_slug
                }
                collection_title
                page_paragraph
                meta_title
                meta_description
                faq_title
                faq {
                  question
                  answer
                }
              }
            }
          }
        }
    `
    )
    return data?.allCollections?.edges && data.allCollections.edges.length > 0
      ? data.allCollections.edges[0].node
      : {}
  } catch (error) {
    console.log("Get Collections error:", error)
  }
}

export async function getCategoryByUid(uid) {
  try {
    const data = await fetchAPI(
      ` query{
          allCategorys(uid:"${uid}"){
            edges{
              node{
                page_heading_1
                page_paragraph
                meta_title
                meta_description
                faq_title
                faq {
                  question
                  answer
                }
              }
            }
          }
        }
    `
    )
    return data?.allCategorys?.edges && data.allCategorys.edges.length > 0
      ? data.allCategorys.edges[0].node
      : {}
  } catch (error) {
    console.log("Get Collections error:", error)
  }
}

export async function getDataBrandDirectory() {
  try {
    const data = await fetchAPI(
      `
      query{
       allBrand_directorys{
            edges{
              node{
                page_heading_1
                page_paragraph
                meta_title
                meta_description
                faq_title
                faq {
                  question
                  answer
                }
              }
            }
          }
        }
    `
    )
    return data?.allBrand_directorys?.edges &&
      data.allBrand_directorys.edges.length > 0
      ? data.allBrand_directorys.edges[0].node
      : {}
  } catch (error) {
    console.log("Get brand directory error:", error)
  }
}

export async function listAllBrands() {
  try {
    const data = await fetchAPI(
      `
      query{
        allBrands{
            edges{
              node{
                brand_name
                _meta{
                  uid
                }
                brand_collections{
                  brand_collection_slug
                }
              }
            }
          }
        }
    `
    )
    return data?.allBrands?.edges && data.allBrands.edges.length > 0
      ? data.allBrands.edges
      : []
  } catch (error) {
    console.log("Get all brands error:", error)
  }
}

export async function getBrandByUid(uid) {
  try {
    const data = await fetchAPI(
      `
      query{
        allBrands(uid:"${uid}"){
            edges{
              node{
                brand_name
                _meta{
                  uid
                }
                meta_title
                meta_description
                page_heading_1
                page_heading_2
                brand_hero_image
                page_paragraph
                brand_collections {
                  brand_collection_image
                  brand_collection_title
                  brand_collection_slug
                }
                faq {
                  question
                  answer
                }
                faq_title
              }
            }
          }
        }
    `
    )
    return data?.allBrands?.edges && data.allBrands.edges.length > 0
      ? data.allBrands.edges[0].node
      : []
  } catch (error) {
    console.log("Get all brands error:", error)
  }
}

export async function listAllBrandRangesOfCollection(uid) {
  try {
    const data = await fetchAPI(`
      query{
        allBrand_collections(uid:"${uid}"){
          edges{
            node{
              ranges {
                range_title
                range_slug
              }
            }
          }
        }
      }
    `)
    return data?.allBrand_collections?.edges &&
      data.allBrand_collections.edges.length > 0
      ? data.allBrand_collections.edges[0].node
      : {}
  } catch (error) {
    console.log("List categories by collection UID error:", error)
  }
}

export async function getBrandRangeByUid(uid) {
  try {
    const data = await fetchAPI(
      `
      query{
        allBrand_ranges(uid:"${uid}"){
            edges{
              node{
                _meta{
                  uid
                }
                meta_title
                meta_description
                pahe_heading_1
                page_heading_2
                faq {
                  question
                  answer
                }
                faq_title
                page_paragraph
              }
            }
          }
        }
      `
    )
    return data?.allBrand_ranges?.edges && data.allBrand_ranges.edges.length > 0
      ? data.allBrand_ranges.edges[0].node
      : []
  } catch (error) {
    console.log("Get all brands error:", error)
  }
}
export async function getBrandCollectionDetail(uid) {
  try {
    const data = await fetchAPI(
      ` query{
          allBrand_collections(uid:"${uid}"){
            edges{
               node{
                  faq_title
                  faq {
                    question
                    answer
                  }
                  meta_title
                  page_paragraph
                  meta_description
                  page_heading_2
                  page_heading_1
                  ranges{
                    range_title
                    range_slug
                  }
                  categories{
                    category_title
                    category_slug
                  }
                }
            }
          }
        }
    `
    )
    return data?.allBrand_collections?.edges?.length > 0
      ? data.allBrand_collections.edges[0].node
      : {}
  } catch (error) {
    console.log("Get brand collection by UID error:", error)
  }
}

export async function getAllBrandCategories() {
  try {
    const data = await fetchAPI(
      `
      query{
        allBrand_categorys{
            edges{
              node{
                _meta {
                  uid
                }
                parent_brand {
                  _linkType
                }
                page_heading_1
                faq_title
                faq {
                  question
                  answer
                }
                page_heading_2
                meta_title
                meta_description
              }
            }
          }
        }
      `
    )

    return data?.allBrand_categorys?.edges &&
      data.allBrand_categorys.edges.length > 0
      ? data.allBrand_categorys.edges
      : []
  } catch (error) {
    console.error("Get Brand categories error:", error)
    return []
  }
}

export async function getBrandCategoryByUid(uid) {
  try {
    const data = await fetchAPI(
      `
      query {
        allBrand_categorys(uid: "${uid}") {
          edges {
            node {
              _meta {
                uid
              }
              parent_brand {
                _linkType
              }
              page_heading_1
              faq_title
              faq {
                question
                answer
              }
              page_heading_2
              meta_title
              meta_description
              page_paragraph
            }
          }
        }
      }
      `
    )
    return data?.allBrand_categorys?.edges &&
      data.allBrand_categorys.edges.length > 0
      ? data.allBrand_categorys.edges[0].node
      : {}
  } catch (error) {
    console.error("Get Brand categories error:", error)
  }
}
