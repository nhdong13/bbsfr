import { FilterBuilder } from "@sajari/react-search-ui"

export const brandFilter = new FilterBuilder({
  name: "brand",
  options: {
    Apple: "brand = 'Apple'",
    Samsung: "brand = 'Samsung'",
    Dell: "brand = 'Dell'",
    HP: "brand = 'HP'",
    Garmin: "brand = 'Garmin'",
  },
  multi: true,
})

export const listBrandsFilter = new FilterBuilder({
  name: "listBrands",
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
