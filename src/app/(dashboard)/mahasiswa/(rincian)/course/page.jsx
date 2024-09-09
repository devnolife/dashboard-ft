import AcademyMyCourse from '@views/academy/my-courses'
import { getAcademyData } from '@/app/server/actions'

export default async function page() {
  const data = await getAcademyData()

  return (
    <>
      <AcademyMyCourse courseData={data?.courses} />
    </>
  )
}
