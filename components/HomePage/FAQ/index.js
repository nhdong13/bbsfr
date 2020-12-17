import { useState, useEffect } from "react";
import { Col, Collapse, Container } from "react-bootstrap"
import styles from "../HomePage.module.scss";
import Image from "next/image";

const FAQComponent = (props) => {
  const { FAQ } = props;
  const [faqItemLess, setFaqItemsLess] = useState([]);
  const [faqItemAll, setFaqItemsAll] = useState([]);

  const setOpen = (item, bol) => {
    const itemChange = { ...item, open: bol };
    const updateFaq = [];
    for (const item of faqItemLess) {
      if (itemChange.id === item.id) {
        updateFaq.push(itemChange);
      } else {
        updateFaq.push(item);
      }
    }
    setFaqItemsLess(updateFaq);
  };

  useEffect(() => {
    refactorFAQ();
  }, []);

  const refactorFAQ = () => {
    const faqMap =
      FAQ &&
      FAQ.faq &&
      FAQ.faq.map((item, index) => ({ ...item, id: index + 1, open: false }));
    if (faqMap) {
      setFaqItemsAll(faqMap);
      const faqLess = faqMap.slice(0, 5);
      setFaqItemsLess(faqLess);
    }
  };

  const showMore = () => {
    const faqLessToAll = [
      ...faqItemLess,
      ...faqItemAll.slice(5, faqItemAll.length),
    ];
    setFaqItemsLess(faqLessToAll);
  };

  const title =
    FAQ?.faq_title && FAQ.faq_title.length > 0 ? FAQ.faq_title[0].text : "";

  return (
    <Container className={styles.FAQ}>
      <h2 className={`${styles.text_heading_line_40} d-flex`}>{title}</h2>
      <div className={styles.faqContent}>
        {faqItemLess &&
          faqItemLess.length > 0 &&
          faqItemLess.map((item, index) => {
            return (
              <div key={index}>
                <div
                  className={styles.question}
                  key={index}
                  onClick={() => setOpen(item, !item.open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={item.open}
                >
                  <div className={styles.questionCol}>
                    <Col xs={10} sm={10} md={10} lg={11} xl={11}>
                      <div className={styles.questionTitle}>
                        {item.question}
                      </div>
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={1} xl={1}>
                      <div className={styles.questionIcon}>
                        {item.open ? (
                          <div className={styles.questionIconElement}>
                            <Image
                              src="/icons/subtract.svg"
                              alt="Icon subtract"
                              height={12}
                              width={12}
                              loading="eager"
                            ></Image>
                          </div>
                        ) : (
                          <div className={styles.questionIconElement}>
                            <Image
                              src="/icons/plus.svg"
                              alt="Icon plus"
                              height={12}
                              width={12}
                            ></Image>
                          </div>
                        )}
                      </div>
                    </Col>
                  </div>
                </div>
                <Collapse in={item.open}>
                  <Col className={styles.faqText}>
                    <div
                      className={styles.questionAnswer}
                      id="example-collapse-text"
                    >
                      {item.answer || "---"}
                    </div>
                  </Col>
                </Collapse>
                {index !== faqItemLess.length - 1 ||
                faqItemLess.length !== faqItemAll.length ? (
                  <Container style={{ maxWidth: "unset" }}>
                    <div className={styles.bottomBorder}></div>
                  </Container>
                ) : (
                  ""
                )}
              </div>
            )
          })}
        <Col>
          {faqItemAll &&
          faqItemAll.length > 5 &&
          faqItemLess.length !== faqItemAll.length ? (
            <p onClick={() => showMore()} className={styles.questionLoadMore}>
              Load More
            </p>
          ) : (
            ""
          )}
        </Col>
      </div>
    </Container>
  );
  
};


export default FAQComponent;
