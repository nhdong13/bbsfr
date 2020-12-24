export function authenticationFromStamped() {
  let username = process.env.STAMPED_PUBLIC_API_KEY
  let password = process.env.STAMPED_PRIVATE_API_KEY
  var myHeaders = new Headers({
    Authorization:
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
    "Content-Type": "application/json",
  })

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  return requestOptions
}

function detectSlug(router, type) {
  //This function return slug router follow tags name of Tesmonials results.
  //Each PageType(HomePage, Department, Collection, etc.. has one slug)
  //Using useRouter in nextjs
  switch (type) {
    case "home":
      return "home"
    case "department":
      return router.id
    case "collection":
      return router.collection
    case "category":
      return router.category
    default:
      return ""
  }
}

function checkItemIncludeSlug(listItems, slug) {
  for (let item of listItems) {
    if (item.name != undefined && item.name == slug) return true
  }
  return false
}

export function dataToRender(results, router, type) {
  let testimonial = results != undefined ? results : []
  let slug = detectSlug(router, type)
  let dataFilter = testimonial.filter((items) =>
    checkItemIncludeSlug(items.tags, slug)
  )
  let data = dataFilter.map((items) => ({
    rate: items.nps.rating / 2,
    content: items.nps.body,
    author: items.nps.customer,
  }))
  return data || []
}
