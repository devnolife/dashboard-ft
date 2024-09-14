// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UserListTable from './list/UserListTable'
import UserListCards from './list/UserListCards'

const TampilanMhs = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      {/*<Grid item xs={12}>*/}
      {/*  <UserListCards />*/}
      {/*</Grid>*/}
      <Grid item xs={12}>
        <UserListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default TampilanMhs
