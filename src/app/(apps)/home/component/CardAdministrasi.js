// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

const CardAdministrasi = () => {
  return (
    <Card>
      <Grid container>
        <Grid item xs={12}>
          <CardContent>
            <Typography variant='h5' className='mbe-0.5'>
              Administrasi Umum
            </Typography>
            <Grid container alignItems='center'>
              <Typography variant='subtitle1 font-weight: 800' className='mbe-2'>
                Jumlah Pengajuan Surat :
              </Typography>
              <Typography variant='h5' color='primary.main' className='mbe-2' >
                10
              </Typography>
            </Grid>
            <Button variant='contained' color='primary'>
              Lihat Dokumen
            </Button>
          </CardContent>
        </Grid>
        <Grid item xs={12}>
          <div className='relative bs-full is-full'>
            <img
              alt='Administrasi Umum'
              src='/images/illustrations/characters/6.png'
              className='max-bs-[150px] absolute block-end-0 inline-end-6 max-is-full'
            />
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CardAdministrasi
