'use client'

import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import LinearProgress from '@mui/material/LinearProgress'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import { Pagination } from '@mui/material'

// Define chip colors based on semester
const chipColor = {
  'Semester 1': { color: 'primary' },
  'Semester 2': { color: 'success' },
  'Semester 3': { color: 'error' },
  'Semester 4': { color: 'warning' },
  'Semester 5': { color: 'info' }
}

const ListLab = ({ courseData, searchValue }) => {
  const [course, setCourse] = useState('All')
  const [hideCompleted, setHideCompleted] = useState(true)
  const [data, setData] = useState([])
  const [activePage, setActivePage] = useState(0)

  useEffect(() => {
    let newData =
      courseData?.filter(courseItem => {
        if (course === 'All') return !hideCompleted || courseItem.completedTasks !== courseItem.totalTasks

        return courseItem.semester === course && (!hideCompleted || courseItem.completedTasks !== courseItem.totalTasks)
      }) ?? []

    if (searchValue) {
      newData = newData.filter(category => category.namaLab.toLowerCase().includes(searchValue.toLowerCase()))
    }

    if (activePage > Math.ceil(newData.length / 6)) setActivePage(0)
    setData(newData)
  }, [searchValue, activePage, course, hideCompleted, courseData])

  const handleChange = e => {
    setHideCompleted(e.target.checked)
    setActivePage(0)
  }

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <Typography variant='h5'>Pratikum Prodi Informatika</Typography>
            <Typography>12 Jumlah Pratikum yang ingin di laksanakan</Typography>
          </div>
          <div className='flex flex-wrap items-center gap-y-4 gap-x-6'>
            <FormControl fullWidth size='small' className='is-[250px] flex-auto'>
              <Select
                fullWidth
                id='select-course'
                value={course}
                onChange={e => {
                  setCourse(e.target.value)
                  setActivePage(0)
                }}
                labelId='course-select'
              >
                <MenuItem value='All'>Semua Semester</MenuItem>
                <MenuItem value='Semester 1'>Semester 1</MenuItem>
                <MenuItem value='Semester 2'>Semester 2</MenuItem>
                <MenuItem value='Semester 3'>Semester 3</MenuItem>
                <MenuItem value='Semester 4'>Semester 4</MenuItem>
                <MenuItem value='Semester 5'>Semester 5</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Switch onChange={handleChange} checked={hideCompleted} />}
              label='LAB yang tidak selesai'
            />
          </div>
        </div>
        {data.length > 0 ? (
          <Grid container spacing={6}>
            {data.slice(activePage * 6, activePage * 6 + 6).map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className='flex flex-col justify-between h-full'>
                  <div>
                    <img src={item.gambarLab} alt={item.namaLab} className='w-full h-[200px] object-cover' />
                    <CardContent className='flex flex-col gap-4 p-5'>
                      <div className='flex items-center justify-between'>
                        <Chip label={item.semester} variant='tonal' size='small' color={chipColor[item.semester].color} />
                        <Typography>{`(${item.pengurusLab})`}</Typography>
                      </div>
                      <Typography
                        variant='h5'
                        component={Link}
                        href={'/apps/academy/lab-details'}
                        className='hover:text-primary'
                      >
                        {item.namaLab}
                      </Typography>
                      <Typography
                        className='overflow-hidden text-ellipsis'
                        title={item.desc}
                      >
                        {item.desc}
                      </Typography>
                      <div className='flex items-center gap-1'>
                        <i className='text-xl tabler-clock' />
                        <Typography>{`${item.time} Menit`}</Typography>
                      </div>
                    </CardContent>
                  </div>
                  <div className='p-5 pt-0'>
                    <LinearProgress
                      color='primary'
                      value={Math.floor((item.completedTasks / item.totalTasks) * 100)}
                      variant='determinate'
                      className='mb-4 is-full bs-2'
                    />
                    {item.completedTasks === item.totalTasks ? (
                      <Button
                        variant='tonal'
                        color='error'
                        startIcon={<i className='tabler-rotate-clockwise-2' />}
                        component={Link}
                        href={'/apps/academy/lab-details'}
                        className='w-full'
                      >
                        Ulangi
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        variant='tonal'
                        endIcon={
                          <DirectionalIcon ltrIconClass='tabler-chevron-right' rtlIconClass='tabler-chevron-left' />
                        }
                        component={Link}
                        href={'/apps/academy/lab-details'}
                        className='w-full'
                      >
                        Lanjutkan
                      </Button>
                    )}
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography className='text-center'>No courses found</Typography>
        )}
        <div className='flex justify-center'>
          <Pagination
            count={Math.ceil(data.length / 6)}
            page={activePage + 1}
            showFirstButton
            showLastButton
            shape='rounded'
            variant='tonal'
            color='primary'
            onChange={(e, page) => setActivePage(page - 1)}
          />
        </div>
      </CardContent>
    </Card >
  )
}

export default ListLab
