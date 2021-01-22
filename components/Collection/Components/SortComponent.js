import React, { useState } from "react";
import styles from "../Collections.module.scss";
import { Collapse, Container } from "react-bootstrap";
import Image from "next/image";
import SortingComponent from "../../Common/Sorting";

const SortComponent = ({
  openCollapseSort,
  setOpenCollapseSort,
  sortChanged,
  setSortChanged,
}) => {
  const [open, setOpen] = useState(openCollapseSort);
  return (
    <>
      <div className={styles.sort_filter_by}>
        <div className={styles.sub_heading}>SORT BY</div>
        <div className={styles.group_heading}>
          <div
            onClick={() => {
              setOpen(!open);
              setOpenCollapseSort(!open);
            }}
            aria-controls="sort-collapse"
            aria-expanded={open}
          >
            <div className={styles.text_heading}>
              <div className={styles.text}>Featured</div>
              <div className={styles.icon}>
                <Image
                  src={open ? "/icons/subtract.svg" : "/icons/plus.svg"}
                  alt={open ? "Icon subtract" : "Icon plus"}
                  loading="eager"
                  width="12"
                  height="12"
                ></Image>
              </div>
            </div>
          </div>
          <div className={styles.sort_filter_collapse}>
            <Collapse in={open}>
              <div>
                <SortingComponent
                  sortChanged={sortChanged}
                  setSortChanged={setSortChanged}
                />
              </div>
            </Collapse>
          </div>
        </div>
      </div>

      {!open && (
        <Container fluid>
          <div className={styles.sort_filter_by_open}></div>
        </Container>
      )}
    </>
  );
};

export default SortComponent;
