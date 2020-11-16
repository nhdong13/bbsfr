import React, { useState } from "react"
import Department from "./Department"

export default function Home() {
  const [activeStep] = useState(1)
  const ActivePage = [Department][activeStep - 1]
  return <ActivePage />
}
