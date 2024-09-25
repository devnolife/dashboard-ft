'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import SearchHeader from './search'
import ListLab from './listlab'


const AcademyMyCourse = ({ courseData, mode }) => {
  // States
  const [searchValue, setSearchValue] = useState('')

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SearchHeader mode={mode} searchValue={searchValue} setSearchValue={setSearchValue} />
      </Grid>
      <Grid item xs={12}>
        <ListLab courseData={courseData} searchValue={searchValue} />
      </Grid>
    </Grid>
  )
}

export default AcademyMyCourse
