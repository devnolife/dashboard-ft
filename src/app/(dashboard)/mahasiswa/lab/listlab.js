'use client'

import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

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
import Pagination from '@mui/material/Pagination'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'


const chipColor = {
  Web: { color: 'primary' },
  Art: { color: 'success' },
  'UI/UX': { color: 'error' },
  Psychology: { color: 'warning' },
  Design: { color: 'info' }
}

const ListLab = props => {
  const { courseData, searchValue } = props

  const [course, setCourse] = useState('All')
  const [hideCompleted, setHideCompleted] = useState(true)
  const [data, setData] = useState([])
  const [activePage, setActivePage] = useState(0)

  useEffect(() => {
    let newData =
      courseData?.filter(courseItem => {
        if (course === 'All') return !hideCompleted || courseItem.completedTasks !== courseItem.totalTasks

        return courseItem.tags === course && (!hideCompleted || courseItem.completedTasks !== courseItem.totalTasks)
      }) ?? []

    if (searchValue) {
      newData = newData.filter(category => category.courseTitle.toLowerCase().includes(searchValue.toLowerCase()))
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
            <Typography variant='h5'>LAB</Typography>
            <Typography>Total 6 lab, yang telah anda programkan</Typography>
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
                <MenuItem value='All'>Semua Lab</MenuItem>
                <MenuItem value='pemrograman'>Pemrograman</MenuItem>
                <MenuItem value='algoritma'>Algoritma</MenuItem>
                <MenuItem value='jarkom'>Jaringan Komputer</MenuItem>
                <MenuItem value='database'>Databse</MenuItem>
                <MenuItem value='cloud'>Cloud</MenuItem>
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
                <div className='border rounded bs-full'>
                  <div className='pli-2 pbs-2'>
                    <Link href={''} className='flex'>
                      <img src={item.tutorImg} alt={item.courseTitle} className='is-full w-[300px] h-[300px]' />
                    </Link>
                  </div>
                  <div className='flex flex-col gap-4 p-5'>
                    <div className='flex items-center justify-between'>
                      <Chip label={item.tags} variant='tonal' size='small' color={chipColor[item.tags]} />
                      <div className='flex items-start'>
                        <Typography className='font-medium mie-1'>{item.rating}</Typography>
                        <i className='tabler-star-filled text-warning mie-2' />
                        <Typography>{`(${item.ratingCount})`}</Typography>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Typography
                        variant='h5'
                        component={Link}
                        href={'/apps/academy/lab-details'}
                        className='hover:text-primary'
                      >
                        {item.courseTitle}
                      </Typography>
                      <Typography>
                        {item.desc.length > 50 ? `${item.desc.slice(0, 100)}...` : item.desc}
                        </Typography>
                    </div>
                    <div className='flex flex-col gap-1'>
                      {item.completedTasks === item.totalTasks ? (
                        <div className='flex items-center gap-1'>
                          <i className='text-xl tabler-check text-success' />
                          <Typography color='success.main'>Completed</Typography>
                        </div>
                      ) : (
                        <div className='flex items-center gap-1'>
                          <i className='text-xl tabler-clock' />
                          <Typography>{`${item.time}`}</Typography>
                        </div>
                      )}
                      <LinearProgress
                        color='primary'
                        value={Math.floor((item.completedTasks / item.totalTasks) * 100)}
                        variant='determinate'
                        className='is-full bs-2'
                      />
                    </div>
                    {item.completedTasks === item.totalTasks ? (
                      <Button
                        variant='tonal'
                        startIcon={<i className='tabler-rotate-clockwise-2' />}
                        component={Link}
                        href={'/apps/academy/lab-details'}
                      >
                        Start Over
                      </Button>
                    ) : (
                      <div className='flex flex-wrap gap-4'>
                        <Button
                          fullWidth
                          variant='tonal'
                          color='secondary'
                          startIcon={<i className='tabler-rotate-clockwise-2' />}
                          component={Link}
                          href={'/apps/academy/lab-details'}
                          className='flex-auto is-auto'
                        >
                          Start Over
                        </Button>
                        <Button
                          fullWidth
                          variant='tonal'
                          endIcon={
                            <DirectionalIcon ltrIconClass='tabler-chevron-right' rtlIconClass='tabler-chevron-left' />
                          }
                          component={Link}
                          href={'/apps/academy/lab-details'}
                          className='flex-auto is-auto'
                        >
                          Continue
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
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
    </Card>
  )
}

export default ListLab
