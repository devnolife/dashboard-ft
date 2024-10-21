'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { styled } from '@mui/material/styles'
import MuiTimeline from '@mui/lab/Timeline'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Components
const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root': {
    '&:before': {
      display: 'none'
    }
  }
})

const ActivityTimeline = () => {
  const mahasiswa = [
    {
      nama: 'Andi Muhammad Akbar DB',
      nim: '105841111221',
      prodi: 'Informatika',
      posisi: 'Ketua Kelompok',
      avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111221.jpg',
    },
    {
      nama: 'RIZKA UTAMI',
      nim: '105841111421',
      prodi: 'Informatika',
      posisi: 'Anggota Kelompok',
      avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111421.jpg',
    }
  ];

  const dataDosenPembimbing = {
    name: "ASYRAFUL INSAN S.Kom.,M.T",
    profession: "Dosen Prodi Informatika",
    nidn: "0918068804",
    avatar: "https://simak.unismuh.ac.id/upload/dosen/0918068804_.jpg"
  };

  return (
    <Card>
      <CardHeader
        title='Aktivitas Timeline'
        avatar={<i className='tabler-chart-bar text-textSecondary' />}
        titleTypographyProps={{ variant: 'h5' }}
      />
      <CardContent>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='secondary' />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex items-center justify-between flex-wrap gap-x-4 pbe-[7px]'>
                <Typography className='font-medium text-textPrimary'> KKP Sedang Berlangsung</Typography>
                <Typography variant='caption'>Hari Ini</Typography>
              </div>
              <Typography>Seluruh anggota kelompok saat ini sedang menjalani kegiatan KKP.</Typography>
            </TimelineContent>

          </TimelineItem>
          {/* Penambahan Pembimbing */}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='success' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex items-center justify-between flex-wrap gap-x-4 pbe-[7px]'>
                <Typography className='font-medium text-textPrimary'>Penambahan Pembimbing</Typography>
                <Typography variant='caption'>5 Hari Lalu</Typography>
              </div>
              <Typography className='mbe-1'>Dosen pembimbing ditambahkan:</Typography>
              <div className='flex items-center gap-2.5'>
                <CustomAvatar src={dataDosenPembimbing.avatar} size={32} />
                <div>
                  <Typography className='font-medium' variant='body2'>
                    {dataDosenPembimbing.name}
                  </Typography>
                  <Typography variant='body2'>{dataDosenPembimbing.profession}</Typography>
                </div>
              </div>
            </TimelineContent>
          </TimelineItem>

          {/* Pembuatan File Surat */}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='info' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex items-center justify-between flex-wrap gap-x-4 pbe-[7px]'>
                <Typography className='font-medium text-textPrimary'>Pembuatan File Surat</Typography>
                <Typography variant='caption'>3 Hari Lalu</Typography>
              </div>
              <Typography className='mbe-1'>File surat KKP telah selesai dibuat.</Typography>
              <div className='flex'>
                <div className='flex gap-2.5 items-center pli-2.5 bg-actionHover plb-[0.3125rem] rounded'>
                  <img alt='file-surat.pdf' src='/images/icons/pdf-document.png' className='bs-5' />
                  <Typography className='font-medium'>file-surat.pdf</Typography>
                </div>
              </div>
            </TimelineContent>
          </TimelineItem>

          {/* Status KKP Berurutan */}

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex items-center justify-between flex-wrap gap-x-4 pbe-[7px]'>
                <Typography className='font-medium text-textPrimary'>Pembentukan Kelompok</Typography>
                <Typography variant='caption'>1 Minggu Lalu</Typography>
              </div>
              <Typography className='mbe-1'>Kelompok KKP terbentuk dengan anggota sebagai berikut:</Typography>
              <AvatarGroup>
                {mahasiswa.map((mhs, index) => (
                  <Avatar key={index} alt={mhs.nama} src={mhs.avatar} />
                ))}
              </AvatarGroup>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default ActivityTimeline;
