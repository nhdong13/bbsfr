import {
  FilterBuilder,
  Pipeline,
  Results,
  SearchProvider,
} from "@sajari/react-search-ui";

const ResultComponent = (props) => {
  const pipeline = new Pipeline(
    {
      account: "1594153711901724220",
      collection: "bestbuy",
      endpoint: "https://jsonapi-us-valkyrie.sajari.net",
    },
    "query"
  );

  console.log("Debug colog:", pipeline);

  const brandFilter = new FilterBuilder({
    name: "brand",
    field: "brand",
    options: {
      Apple: "brand = 'Apple'",
      Samsung: "brand = 'Samsung'",
      Dell: "brand = 'Dell'",
      HP: "brand = 'HP'",
      Garmin: "brand = 'Garmin'",
    },
  });

  const priceFilter = new FilterBuilder({
    name: "price",
    options: {
      High: "price >= 200",
      Mid: "price >= 50",
      Low: "price < 50",
    },
    multi: false,
    initial: ["High"],
  });

  const colorFilter = new FilterBuilder({
    name: "color",
    field: "imageTags",
    array: true,
  });

  const ratingFilter = new FilterBuilder({
    name: "rating",
    field: "rating",
  });

  return (
    <SearchProvider
      search={{
        pipeline,
        fields: { title: "name", subtitle: "brand" },
        filters: [priceFilter, brandFilter, colorFilter, ratingFilter],
      }}
      searchOnLoad
    >
      <Results appearance="grid" />;
    </SearchProvider>
  );
};

export default ResultComponent;
