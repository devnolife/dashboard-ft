'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import MyCourseHeader from './MyCourseHeader'
import Courses from './Courses'
import ColoredCards from './ColoredCards'
import FreeCourses from './FreeCourses'

const AcademyMyCourse = ({ courseData, mode }) => {
  // States
  const [searchValue, setSearchValue] = useState('')

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <MyCourseHeader mode={mode} searchValue={searchValue} setSearchValue={setSearchValue} />
      </Grid>
      <Grid item xs={12}>
        <Courses courseData={courseData} searchValue={searchValue} />
      </Grid>
      <Grid item xs={12}>
        <ColoredCards />
      </Grid>
      <Grid item xs={12}>
        <FreeCourses />
      </Grid>
    </Grid>
  )
}

export default AcademyMyCourse
