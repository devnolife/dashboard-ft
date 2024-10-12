import { Card, CardContent, Grid, Typography, Button, Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const HeaderDashboard = () => {
  const dataDosenPembimbing = {
    name: "ASYRAFUL INSAN S.Kom.,M.T",
    profession: "Dosen Prodi Informatika",
    nidn: "0918068804",
    avatar: "https://simak.unismuh.ac.id/upload/dosen/0918068804_.jpg"
  };

  const locationData = {
    name: 'Komisi Pemilihan Umum - Kota Makassar',
    address: 'Jl. Perintis Kemerdekaan No.3, Makassar',
    logo: '/logo/kpu.png',
    keterangan: 'Kantor KPU Kota Makassar adalah kantor yang berada di Kota Makassar yang bertugas untuk mengatur dan melaksanakan pemilihan umum di Kota Makassar.',
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={5}>
        <Card sx={{ minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={8}>
              <CardContent>
                <Typography
                  variant='body1'
                  className='mbe-2'
                  sx={{ fontWeight: "bold", fontSize: "1rem", maxHeight: '2.5rem', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {dataDosenPembimbing.name}
                </Typography>
                <Chip label='Pembimbing Kuliah Kerja Praktek'
                  color='success' size='small'
                  variant='tonal'
                  className='mbe-2'
                />
                <Typography
                  variant='subtitle1'
                  className='mbe-2'
                  sx={{
                    maxHeight: '2rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {dataDosenPembimbing.profession}
                </Typography>
                <Typography variant='subtitle1' className='mbe-2'>
                  NIDN: {dataDosenPembimbing.nidn}
                </Typography>
                <Button
                  variant='contained'
                  color='primary'
                >
                  Lihat Profil
                </Button>
              </CardContent>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center">
              <Avatar
                alt={`Profil ${dataDosenPembimbing.name}`}
                src={dataDosenPembimbing.avatar}
                sx={{
                  width: 140,
                  height: 140,
                  border: "2px solid #3f51b5",
                  objectFit: 'cover'
                }}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} md={7} sx={{ marginBottom: 0 }}>
        <Card sx={{ minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Grid container>
            <Grid item xs={12} md={8}>
              <CardContent>
                <Typography variant='h5' className='mbe-1'>
                  {locationData.name}
                </Typography>
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant='subtitle1' className='mbe-1'>
                  {locationData.address}
                </Typography>
                <Typography
                  color='text.secondary'
                  sx={{
                    maxHeight: 70,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical'
                  }}>
                  {locationData.keterangan}
                </Typography>
                <div style={{ flexDirection: 'column', marginTop: 4 }}>
                  <Button>Lokasi</Button>
                  <Button>Details</Button>
                </div>
              </CardContent>
            </Grid>
            <Grid item xs={12} md={4} className='flex items-center justify-center'>
              <CardContent className='flex items-center justify-center' sx={{ paddingLeft: 2 }}>
                <img
                  src={locationData.logo}
                  height='140'
                  style={{
                    maxHeight: '140px',
                    objectFit: 'contain'
                  }}
                  className='rounded'
                  alt={`Logo ${locationData.name}`}
                />
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HeaderDashboard;
