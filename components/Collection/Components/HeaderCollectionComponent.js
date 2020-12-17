import React from "react";
import { Container } from "react-bootstrap";
import styles from "../Collections.module.scss";
import { useSearchContext } from "@sajari/react-hooks";

const HeaderCollectionComponent = ({ pageHeading }) => {
  const { totalResults } = useSearchContext();

  return <></>;
};

export default HeaderCollectionComponent;
