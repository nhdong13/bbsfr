import { FilterBuilder } from "@sajari/react-search-ui"

export const listBrandsFilter = new FilterBuilder({
  name: "brand",
  field: "brand",
})

export const categoryFilter = new FilterBuilder({
  name: "category",
  field: "level1",
  count: true,
  multi: true,
})

export const priceRangeFilter = new FilterBuilder({
  name: "priceRange",
  count: true,
  field: "price_range",
  multi: true,
})

export const ratingFilter = new FilterBuilder({
  name: "rating",
  field: "rating",
})

export const colorFilter = new FilterBuilder({
  name: "color",
  field: "imageTags",
  array: true,
})
