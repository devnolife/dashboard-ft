'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import classnames from 'classnames'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

const dataMainCard = {
  title: 'Administrasi Umum',
  description: 'Kelola semua tugas administrasi Anda dengan efisien dan mudah.',
  type: 'Request Surat',
  image: '/images/illustrations/characters/9.png',
  color: 'error',
  imageColorClass: 'bg-errorLight',
  bgColorClass: 'bg-errorLighter',
  requestCount: 25 // Menambahkan jumlah request surat
}

// Data untuk jumlah surat
const suratData = [
  {
    title: 'Surat KKP',
    stats: '12',
    avatarIcon: 'tabler-file-description',
    avatarColor: 'error',
    trend: 'positive',
    trendNumber: '8%',
    subtitle: 'Pengajuan terakhir'
  },
  {
    title: 'Surat Aktif Kuliah',
    stats: '32',
    avatarIcon: 'tabler-file-text',
    avatarColor: 'success',
    trend: 'negative',
    trendNumber: '5%',
    subtitle: 'Pengajuan terakhir'
  },
  {
    title: 'Surat Cuti',
    stats: '7',
    avatarIcon: 'tabler-file-exclamation',
    avatarColor: 'warning',
    trend: 'positive',
    trendNumber: '12%',
    subtitle: 'Pengajuan terakhir'
  }
]

const ColoredCards = () => {
  const theme = useTheme()

  return (
    <Grid container spacing={6} sx={{ marginBottom: 2 }}>
      <Grid item xs={12} md={5}>
        <div
          className={classnames(
            'flex max-sm:flex-col items-center sm:items-start justify-between gap-6 rounded p-6',
            dataMainCard.bgColorClass
          )}
        >
          <div className='flex flex-col items-center sm:items-start max-sm:text-center'>
            <Typography variant='h5' color={dataMainCard.color} className='mbe-2'>
              {dataMainCard.title}
            </Typography>
            <Typography className='mbe-4'>{dataMainCard.description}</Typography>
            <Typography variant='h6' color='textSecondary' className='mbe-4'>
              Jumlah Request: {dataMainCard.requestCount}
            </Typography>
            <Button variant='contained' size='small' color={dataMainCard.color}>{`Lihat ${dataMainCard.type}`}</Button>
          </div>
          <div
            className={classnames(
              'flex justify-center rounded min-is-[180px] max-sm:-order-1 pbs-[7px]',
              dataMainCard.imageColorClass
            )}
          >
            <img
              src={dataMainCard.image}
              alt={dataMainCard.title}
              className={classnames('bs-[120px]', { 'scale-x-[-1]': theme.direction === 'rtl' })}
            />
          </div>
        </div>
      </Grid>
      {suratData.map((item, i) => (
        <Grid key={i} item xs={12} sm={4} md={2}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ColoredCards
