// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports


// Data Imports
import { getUserDataByDosen } from '@/app/server/actions'
import UserLeftOverview from '@views/user/view/user-left-overview'
import UserRight from '@views/user/view/user-right'
import UserList from '../(components)/list'
import TampilanMhs from '../(components)/TampilanMhs'
import Kkp from '../(components)/Kkp'

const NotificationsTab = dynamic(() => import('@views/user/view/user-right/notifications'))
const ConnectionsTab = dynamic(() => import('@views/user/view/user-right/connections'))

// Vars
const tabContentList = data => ({
  overview: <TampilanMhs userData={data} />,
  pembingbing: <UserList userData={data} />,
  'kkp': <Kkp />,
  notifications: <NotificationsTab />,
  connections: <ConnectionsTab />
})

const UserViewTab = async () => {
  // Vars
  // const data = await getPricingData()

  const data = await getUserDataByDosen()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <UserLeftOverview />
      </Grid>
      <Grid item xs={12} lg={8} md={7}>
        <UserRight tabContentList={tabContentList(data)} />
      </Grid>
    </Grid>
  )
}

export default UserViewTab
