
import WelcomeCard from "./WelcomeCard"
import Dialogs from "./Dialogs"
import CourseTable from '@views/academy/dashboard/CourseTable'

import { getAcademyData } from '@/app/server/actions'

export default async function Page() {
  const data = await getAcademyData()

  return (
    <>
      <WelcomeCard />

      <CourseTable courseData={data?.mhsList} />

      <Dialogs />
    </>
  )
}
