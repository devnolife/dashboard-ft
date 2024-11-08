import { Grid } from '@mui/material'

import CardDosen from './DosenCard'
import TableProgress from './TableProgress'

const ProgressAkademik = async () => {
  return (
    <Grid container spacing={6}>
      < Grid item xs={12} md={8} >
        <TableProgress />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardDosen />
      </Grid>
    </Grid>
  )
}

export default ProgressAkademik
