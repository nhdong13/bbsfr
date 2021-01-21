import React, { useEffect } from "react";
import styles from "./sorting.module.scss";
import { useSorting } from "@sajari/react-hooks";
import { useRouter } from "next/router";
import { Radio, RadioGroup } from "@sajari/react-components";

const SortingComponent = ({ sortChanged, setSortChanged }) => {
  const { sorting, setSorting } = useSorting();
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => setSorting(""));
    return () => {
      router.events.off("routeChangeComplete");
    };
  }, [sortChanged]);

  return (
    <>
      <div className="">
        <RadioGroup
          value={sorting}
          className={styles.radio_sajari}
          onChange={(e) => {
            setSorting(e.target.value);
            setSortChanged(true);
          }}
        >
          <Radio value="">Most relevant</Radio>
          <Radio value="name">Name: A to Z</Radio>
          <Radio value="-name">Name: Z to A</Radio>
          <Radio value="price">Price: Low to High</Radio>
          <Radio value="-price">Price: High to Low</Radio>
        </RadioGroup>
      </div>
    </>
  );
};

export default SortingComponent;
