import Prismic from "prismic-javascript"

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`

export const API_TOKEN = process.env.PRISMIC_API_TOKEN
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE

export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN,
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
        Authorization: `Token ${API_TOKEN}`,
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
    );
    return data?.allCollections?.edges && data.allCollections.edges.length > 0
      ? data.allCollections.edges[0].node
      : {};
  } catch (error) {
    console.log("Get Collections error:", error);
  }
}
