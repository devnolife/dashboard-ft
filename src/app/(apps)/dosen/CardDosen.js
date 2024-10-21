import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

import EditUserInfo from '@components/dialogs/edit-user-info'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import CustomAvatar from '@core/components/mui/Avatar'

const dosenData = {
  firstName: 'Ahmad',
  lastName: 'Santoso',
  nidn: '0123456789',
  email: 'ahmad.santoso@universitas.ac.id',
  status: 'Aktif',
  role: 'Dosen',
  nik: '9876543210',
  contact: '+62 812 3456 7890',
  language: ['Indonesia', 'English'],
  prodi: 'Infor  matika',
  fakultas: 'Teknik',
  kota: 'Jakarta'
}

const CardDosen = () => {

  const buttonProps = (children, color, variant) => ({
    children,
    color,
    variant
  })

  return (
    <>
      <Card>
        <CardContent className='flex flex-col gap-6 pbs-12'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col items-center justify-center gap-4'>
              <div className='flex flex-col items-center gap-4'>
                <CustomAvatar alt='dosen-profile' src='/images/avatars/1.png' variant='rounded' size={120} />
                <Typography variant='h5'>{`${dosenData.firstName} ${dosenData.lastName}`}</Typography>
              </div>
              <Chip label={dosenData.role} color='secondary' size='small' variant='tonal' />
            </div>
            <div className='flex flex-wrap items-center justify-around gap-4'>
              <div className='flex items-center gap-4'>
                <CustomAvatar variant='rounded' color='primary' skin='light'>
                  <i className='tabler-book' />
                </CustomAvatar>
                <div>
                  <Typography variant='h5'>5</Typography>
                  <Typography>Mata Kuliah</Typography>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <CustomAvatar variant='rounded' color='primary' skin='light'>
                  <i className='tabler-briefcase' />
                </CustomAvatar>
                <div>
                  <Typography variant='h5'>10</Typography>
                  <Typography>Penelitian</Typography>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Typography variant='h5'>Detail Dosen</Typography>
            <Divider className='mlb-4' />
            <div className='flex flex-col gap-2'>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  NIDN:
                </Typography>
                <Typography>{dosenData.nidn}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Email:
                </Typography>
                <Typography>{dosenData.email}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Status:
                </Typography>
                <Typography color='text.primary'>{dosenData.status}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Role:
                </Typography>
                <Typography color='text.primary'>{dosenData.role}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  NIK:
                </Typography>
                <Typography color='text.primary'>{dosenData.nik}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Kontak:
                </Typography>
                <Typography color='text.primary'>{dosenData.contact}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Bahasa:
                </Typography>
                <Typography color='text.primary'>{dosenData.language.join(', ')}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Prodi:
                </Typography>
                <Typography color='text.primary'>{dosenData.prodi}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Fakultas:
                </Typography>
                <Typography color='text.primary'>{dosenData.fakultas}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Kota:
                </Typography>
                <Typography color='text.primary'>{dosenData.kota}</Typography>
              </div>
            </div>
          </div>
          <div className='flex justify-center gap-4'>
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps('Edit Profil', 'primary', 'contained')}
              dialog={EditUserInfo}
              dialogProps={{ data: dosenData }}
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default CardDosen
