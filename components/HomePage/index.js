import React from "react"
import Department from "./Department"
import Brand from "./Brand"
import SEO_page from "./SEO"
import styles from "./HomePage.module.scss"

function Home(props) {
  const { department: departments, brands, SEO } = props
  let count_department = departments.length % 2 == 0 ? -1 : 0
  return (
    <div className={styles.homepageContainer}>
      {departments.map((department, index) => (
        <Department
          key={index}
          count={++count_department}
          preHeader={department.department_preHeader[0].text}
          title={department.department_title[0].text}
          slug={department.department_slug}
          callAction={department.department_call_to_action[0].text}
          image={department.department_image}
        />
      ))}
      <Brand brands={brands} />
      <SEO_page
        heading1={SEO.page_heading_1[0].text}
        pageParagraph={SEO.page_paragraph}
      />
    </div>
  )
}
export default Home
