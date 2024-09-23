import CardTop from './CardTop'
import React from 'react'
import TableSurat from './TableSurat'
import TimeLine from './TimeLine'
import { Grid } from '@mui/material'
export default function Page() {
  return (
    <>
      <CardTop />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TableSurat />
        </Grid>
        <Grid item xs={12} md={4}>
          <TimeLine />
        </Grid>
      </Grid>
    </>
  )
}
