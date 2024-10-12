import React from "react"

import StepWizard from "./StepWizard"
import Dashboard from "./dashboard"

const Page = () => {
  const statusMahasiswa = "mengajukan"
  return (
    <>
      {
        statusMahasiswa === "sedangKKP" ? (
          <Dashboard />
        ) : (
          <StepWizard />
        )
      }
    </>
  )
}


export default Page
