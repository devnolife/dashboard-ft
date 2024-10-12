'use client'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import classnames from 'classnames'
import CustomAvatar from '@core/components/mui/Avatar'

const suratData = [
  {
    title: 'Informatika',
    jumlah: '12',
    avatarIcon: 'tabler-code',
    avatarColor: 'error',
    prodi: true
  },
  {
    title: 'Pengairan',
    jumlah: '32',
    avatarIcon: 'tabler-droplet-half-2',
    avatarColor: 'success',
    prodi: true
  },
  {
    title: 'Elektro',
    jumlah: '7',
    avatarIcon: 'tabler-bolt',
    avatarColor: 'warning',
    prodi: true
  },
  {
    title: 'PWK',
    jumlah: '10',
    avatarIcon: 'tabler-map',
    avatarColor: 'info',
    prodi: true
  },
  {
    title: 'Arsitektur',
    jumlah: '8',
    avatarIcon: 'tabler-building',
    avatarColor: 'primary',
    prodi: true
  },
  {
    title: 'Umum',
    jumlah: '20',
    avatarIcon: 'tabler-clipboard-text',
    avatarColor: 'secondary',
    prodi: false
  },
  {
    title: 'Keputusan',
    jumlah: '15',
    avatarIcon: 'tabler-checklist',
    avatarColor: 'primary',
    prodi: false
  },
  {
    title: 'Keputusan',
    jumlah: '15',
    avatarIcon: 'tabler-checklist',
    avatarColor: 'primary',
    prodi: false
  }
]

const CardSurat = () => {
  const [currentProdiIndex, setCurrentProdiIndex] = useState(0)
  const prodiData = suratData.filter(item => item.prodi)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProdiIndex((prevIndex) => (prevIndex + 1) % prodiData.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [prodiData.length])

  const currentProdi = prodiData[currentProdiIndex]
  const nonProdiData = suratData.filter(item => !item.prodi)

  return (
    <Grid container spacing={2} justifyContent="center" >
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
          <Typography
            variant='h5'
            color='text.primary'
            sx={{ textAlign: 'center', paddingTop: 2 }}
          >
            {currentProdi.title}
          </Typography>
          <CardContent sx={{ paddingTop: 1, marginTop: 1 }}
            className='flex items-center gap-4'>
            <CustomAvatar color={currentProdi.avatarColor} skin='light' variant='rounded' size={50}>
              <i className={classnames(currentProdi.avatarIcon, 'text-[30px]')} />
            </CustomAvatar>
            <div className='flex flex-col flex-grow' style={{ alignItems: 'flex-start', marginLeft: '8px' }}>
              <Typography variant='h3'>{currentProdi.jumlah}</Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
      {nonProdiData.map((item, i) => (
        <Grid key={i} item xs={12} sm={6} md={3}>
          <Card sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
            <Typography
              variant='h5'
              color='text.primary'
              sx={{ textAlign: 'center', paddingTop: 2 }}
            >
              {item.title}
            </Typography>
            <CardContent sx={{ paddingTop: 1, marginTop: 1 }}
              className='flex items-center gap-4'>
              <CustomAvatar color={item.avatarColor} skin='light' variant='rounded' size={50}>
                <i className={classnames(item.avatarIcon, 'text-[30px]')} />
              </CustomAvatar>
              <div className='flex flex-col flex-grow' style={{ alignItems: 'flex-start', marginLeft: '8px' }}>
                <Typography variant='h3'>{item.jumlah}</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default CardSurat
