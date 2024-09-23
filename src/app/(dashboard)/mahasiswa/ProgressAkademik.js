import { Card, Grid } from '@mui/material'

import CourseTable from '@views/academy/dashboard/CourseTable'
import { getAcademyData } from '@/app/server/actions'
import CardDosen from './DosenCard'
import TableProgress from './TableProgress'

const ProgressAkademik = async () => {
  const data = await getAcademyData()

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
