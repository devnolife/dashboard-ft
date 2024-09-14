
import WelcomeCard from "./WelcomeCard"
import ProgressAkademik from './ProgressAkademik'

import { getAcademyData } from '@/app/server/actions'

export default async function Page() {
  const data = await getAcademyData()

  return (
    <>
      <WelcomeCard />
      <ProgressAkademik courseData={data?.mhsList} />
    </>
  )
}
