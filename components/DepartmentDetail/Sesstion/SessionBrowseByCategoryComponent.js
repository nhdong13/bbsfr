import styles from "../DepartmentPage.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const SessionBrowseByCategoryComponent = (props) => {
  const router = useRouter();
  const { collections } = props;
  const collectionsData =
    collections && collections.length > 0
      ? collections
      : [
          {
            collection_image: {
              dimensions: {
                width: 2048,
                height: 1536,
              },
              alt: null,
              copyright: null,
              url:
                "https://images.prismic.io/slicemachine-blank/6b2bf485-aa12-44ef-8f06-dce6b91b9309_dancing.png?auto=compress,format",
            },
            collection_title: [
              {
                type: "heading3",
                text: "Belts",
                spans: [],
              },
            ],
            collection_slug: "/belts",
          },
          {
            collection_image: {
              dimensions: {
                width: 2048,
                height: 1536,
              },
              alt: null,
              copyright: null,
              url:
                "https://images.prismic.io/slicemachine-blank/dcea6535-f43b-49a7-8623-bf281aaf1cb2_roller-skating.png?auto=compress,format",
            },
            collection_title: [
              {
                type: "heading3",
                text: "Boots",
                spans: [],
              },
            ],
            collection_slug: "/boots",
          },
          {
            collection_image: {
              dimensions: {
                width: 2048,
                height: 1536,
              },
              alt: null,
              copyright: null,
              url:
                "https://images.prismic.io/slicemachine-blank/30d6602b-c832-4379-90ef-100d32c5e4c6_selfie.png?auto=compress,format",
            },
            collection_title: [
              {
                type: "heading3",
                text: "Gloves",
                spans: [],
              },
            ],
            collection_slug: "/gloves",
          },
          {
            collection_image: {
              dimensions: {
                width: 2048,
                height: 1536,
              },
              alt: null,
              copyright: null,
              url:
                "https://images.prismic.io/slicemachine-blank/3109b42f-4f55-4de1-91fa-40c734f88e62_ice-cream.png?auto=compress,format",
            },
            collection_title: [
              {
                type: "heading3",
                text: "Jackets",
                spans: [],
              },
            ],
            collection_slug: "/jackets",
          },
          {
            collection_image: {
              dimensions: {
                width: 2048,
                height: 1536,
              },
              alt: null,
              copyright: null,
              url:
                "https://images.prismic.io/slicemachine-blank/e608a89b-0298-451c-a826-e56743544836_zombieing.png?auto=compress,format",
            },
            collection_title: [
              {
                type: "heading3",
                text: "Helmets",
                spans: [],
              },
            ],
            collection_slug: "/helmets",
          },
        ];
  return (
    <>
      <Container className={styles.sessionTitleCategory}>
        <Row>
          <Col xs={9} sm={8} md={8} lg={8}>
            <p className={styles.sessionTitleCategoryTextRight}>
              BROWSE BY CATEGORY
            </p>
          </Col>
          <Col style={{ textAlign: "right" }} xs={3} sm={4} md={4} lg={4}>
            <Link href={`${router?.query?.id}/all`}>
              <p className={styles.sessionTitleCategoryTextLeft}>VIEW ALL</p>
            </Link>
          </Col>
        </Row>
      </Container>
      <div className={styles.sessionListCategory}>
        {collectionsData &&
          collectionsData.map((collection, index) => {
            return (
              <Link
                key={index}
                href={`${router?.query?.id}${collection.collection_slug}`}
              >
                <Container style={{ maxWidth: "unset" }}>
                  <div
                    className={
                      collectionsData.length === index + 1
                        ? styles.containerItemCategoryLasted
                        : styles.containerItemCategory
                    }
                  >
                    <Row>
                      <Col
                        className={styles.categoryIndex}
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        xl={1}
                      >
                        {index + 1 < 10 ? 0 : ""}
                        {index + 1}
                      </Col>
                      <Col
                        className={styles.categoryTitle}
                        xs={7}
                        sm={8}
                        md={9}
                        lg={9}
                        xl={9}
                      >
                        {collection.collection_title &&
                        collection.collection_title.length > 0
                          ? collection.collection_title[0].text
                          : "---"}
                      </Col>
                      <Col xs={3} sm={3} md={2} lg={2} xl={2}>
                        <div className={styles.categoryLeft}>
                          <div className={styles.categoryLeftImg}>
                            <Image
                              src={collection.collection_image.url}
                              alt={collection.collection_image.alt || ""}
                              width={57}
                              height={62}
                            />
                          </div>
                          <div className={styles.categoryLeftIcon}>{">"}</div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Container>
              </Link>
            )
          })}
      </div>
    </>
  );
};
export default SessionBrowseByCategoryComponent;
