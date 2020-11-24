import React, { useState } from "react"
import Department from "./Department"
import Brand from "./Brand"
import styles from "./HomePage.module.scss"

function Home(props) {
  let departments = props.department
  let brands = props.brands
  let count_department = departments.length % 2 == 0 ? -1 : 0
  return (
    <div className={styles.homepageContainer}>
      {departments.map((department, id) => (
        <Department
          key={id}
          count={++count_department}
          pre_header={department.department_preHeader[0].text}
          title={department.department_title[0].text}
          slug={department.department_slug}
          call_action={department.department_call_to_action[0].text}
          image={department.department_image}
        />
      ))}
      <Brand brands={brands} />
    </div>
  )
}
export default Home
