import EarningReportsWithTabs from '@views/crm/EarningReportsWithTabs'

import RadarSalesChart from '@views/crm/RadarSalesChart'
import UserList from '@views/user/list'
import { getUserData } from '@/app/server/actions'

export default async function page() {
  const data = await getUserData()

  return (
    <div className={'flex flex-col'} >
      <div className={'flex justify-between'}>
        <EarningReportsWithTabs />
        <RadarSalesChart />
      </div>

        <div className={'mt-6'}>
          <UserList userData={data} />
        </div>
    </div>
  )
}
