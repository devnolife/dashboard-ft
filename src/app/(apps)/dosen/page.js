import dynamic from 'next/dynamic'

import Grid from '@mui/material/Grid'

import { getPricingData } from '@/app/server/actions'
import CardDosen from './CardDosen'
import TabContent from './TabContent'

const ListPa = dynamic(() => import('@views/user/view/user-right/overview'))
const SecurityTab = dynamic(() => import('@views/user/view/user-right/security'))
const BillingPlans = dynamic(() => import('@views/user/view/user-right/billing-plans'))
const NotificationsTab = dynamic(() => import('@views/user/view/user-right/notifications'))
const ConnectionsTab = dynamic(() => import('@views/user/view/user-right/connections'))

const tabContentList = data => ({
  listpa: <ListPa />,
  security: <SecurityTab />,
  'billing-plans': <BillingPlans data={data} />,
  notifications: <NotificationsTab />,
  connections: <ConnectionsTab />
})

const DashboardDosen = async () => {
  const data = await getPricingData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <CardDosen />
      </Grid>
      <Grid item xs={12} lg={8} md={7}>
        <TabContent tabContentList={tabContentList(data)} />
      </Grid>
    </Grid>
  )
}

export default DashboardDosen
