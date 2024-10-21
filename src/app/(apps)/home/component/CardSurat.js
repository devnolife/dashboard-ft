// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const data = [
  {
    stats: '230',
    title: 'Surat Masuk',
    color: 'primary',
    icon: 'tabler-mail'
  },
  {
    color: 'info',
    stats: '150',
    title: 'Surat Keluar',
    icon: 'tabler-send'
  },
  {
    color: 'error',
    stats: '75',
    title: 'Dokumen Arsip',
    icon: 'tabler-archive'
  },
  {
    stats: '455',
    color: 'success',
    title: 'Total Dokumen',
    icon: 'tabler-file'
  }
]

const StatisticsCard = () => {
  return (
    <Card>
      <CardHeader
        title='Statistik Administrasi dan Persuratan'
        action={
          <Typography variant='subtitle2' color='text.disabled'>
            Diperbarui 1 bulan yang lalu
          </Typography>
        }
      />
      <CardContent className='flex flex-wrap justify-between gap-4'>
        <Grid container spacing={4}>
          {data.map((item, index) => (
            <Grid item xs={6} md={3} key={index} className='flex items-center gap-4'>
              <CustomAvatar color={item.color} variant='rounded' size={40} skin='light'>
                <i className={item.icon}></i>
              </CustomAvatar>
              <div>
                <Typography variant='h5'>{item.stats}</Typography>
                <Typography variant='body2'>{item.title}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
