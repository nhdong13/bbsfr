import React, { useEffect, useState } from "react";
import styles from "./filter.module.scss";
import { Collapse, Container } from "react-bootstrap";
import Image from "next/image";
import { useFilter } from "@sajari/react-hooks";
import { useRouter } from "next/router";
import FilterOptionComponent from "./FilterOptions";
import FilterRatingOption from "./FilterRatingOption";
import ColorFilter from "./FilterColorOptions";

const FilterRender = ({
  name,
  title,
  isOpen,
  handleSetOpenCollapse,
  filterChanged,
  setFilterChanged,
}) => {
  const router = useRouter();
  const { multi, options, selected, setSelected, reset } = useFilter(name);
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => reset());
    return () => {
      router.events.off("routeChangeComplete");
    };
  }, [filterChanged]);

  return (
    <>
      {options?.length > 0 && (
        <div className={styles.containerFilter}>
          <>
            <div
              onClick={() => {
                setOpen(!open);
                handleSetOpenCollapse(name);
              }}
              className={styles.titleFilter}
            >
              <div className={styles.heading}>
                <p>{title}</p>
              </div>
              <div className={styles.icon}>
                <Image
                  src={open ? "/icons/subtract.svg" : "/icons/plus.svg"}
                  alt={open ? "Icon subtract" : "Icon plus"}
                  loading="lazy"
                  layout="fill"
                ></Image>
              </div>
            </div>
            <div className={styles.contextCollapse}>
              <Collapse in={open}>
                <div>
                  {name && name !== "rating" && name !== "color" && (
                    <FilterOptionComponent
                      name={name}
                      setSelected={setSelected}
                      setFilterChanged={setFilterChanged}
                      selected={selected}
                      multi={multi}
                      options={options}
                    />
                  )}
                  {name && name === "rating" && (
                    <FilterRatingOption
                      name={name}
                      setSelected={setSelected}
                      setFilterChanged={setFilterChanged}
                      selected={selected}
                      multi={multi}
                      options={options}
                    />
                  )}
                  {name && name === "color" && (
                    <ColorFilter
                      name={name}
                      setSelected={setSelected}
                      setFilterChanged={setFilterChanged}
                      selected={selected}
                      multi={multi}
                      options={options}
                    />
                  )}
                </div>
              </Collapse>
            </div>
          </>
        </div>
      )}
      {!open && (
        <Container fluid>
          <div className={styles.containerFilterOpen}></div>
        </Container>
      )}
    </>
  );
};
export default FilterRender;
