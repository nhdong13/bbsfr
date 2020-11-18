import React, { useState } from "react"
import Department from "./Department"
import styles from "./HomePage.module.scss"

function Home(props) {
  let departments = props.department
  let count_department = -1
  return (
    <div className={styles.homepageContainer}>
       {departments.map((department, id) => (
        <Department
          key={id}
          count={++count_department}
          pre_header={department.department_preHeader[0].text}
          title={department.department_title[0].text}
          slug={department.department_slug}
          image={department.department_image}
        />
       ))}
    </div>
  )
}
export default Home
