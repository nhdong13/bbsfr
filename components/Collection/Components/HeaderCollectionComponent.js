import React, { useEffect, useState } from "react";
import { Pipeline, Summary, SearchProvider } from "@sajari/react-search-ui";

import { Container } from "react-bootstrap";
import styles from "../Collections.module.scss";
import { useSearch, Variables } from "@sajari/react-hooks";

const HeaderCollectionComponent = ({ pageHeading }) => {
  const pipeline = new Pipeline(
    {
      account: "1606874199975641114",
      collection: "jackets-app",
    },
    "app"
  );
  const variables = new Variables({ q: "" });

  const { totalResults } = useSearch({
    variables,
    pipeline,
    fields: {},
  });
  
  return (
    <Container fluid className="headerCollectionPage">
      <div className="contentHeader">
        <div className="page_heading_1_collection_page">{pageHeading}</div>
        <div className="product_count_collection_page"></div>
        <div className="product_count_collection_page">{`${
          totalResults != undefined ? totalResults : 0
        } Products`}</div>
      </div>
    </Container>
  );
};

export default HeaderCollectionComponent;
