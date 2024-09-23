'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Typography from '@mui/material/Typography'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'
import OptionMenu from '@/@core/components/option-menu'

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const SuratActivityTimeline = () => {
  return (
    <Card>
      <CardHeader
        avatar={<i className='text-xl tabler-list-details' />}
        title='Activity Timeline'
        titleTypographyProps={{ variant: 'h5' }}
        action={<OptionMenu options={['Share timeline', 'Suggest edits', 'Report bug']} />}
        sx={{ '& .MuiCardHeader-avatar': { mr: 3 } }}
      />
      <CardContent>
        <Timeline>
          {/* Item 1: Surat diambil */}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                <Typography className='font-medium' color='text.primary'>
                  Surat Pengajuan KKP telah diambil
                </Typography>
                <Typography variant='caption' color='text.disabled'>
                  10 menit yang lalu
                </Typography>
              </div>
              <Typography className='mbe-2'>Surat Pengajuan KKP telah diterbitkan untuk mahasiswa.</Typography>
              <div className='flex items-center gap-2.5 is-fit bg-actionHover rounded plb-[5px] pli-2.5'>
                <img height={20} alt='kkp_surat.pdf' src='/images/icons/pdf-document.png' />
                <Typography className='font-medium'>kkp_surat.pdf</Typography>
              </div>
              <Typography variant='body2' className='font-medium'>
                Diambil oleh: Arief Kurniawan
              </Typography>
            </TimelineContent>
          </TimelineItem>

          {/* Item 2: Surat lainnya */}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='success' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                <Typography className='font-medium' color='text.primary'>
                  Surat Rekomendasi Beasiswa telah diambil
                </Typography>
                <Typography variant='caption' color='text.disabled'>
                  30 menit yang lalu
                </Typography>
              </div>
              <Typography className='mbe-2'>Surat Rekomendasi Beasiswa diterbitkan oleh bagian TU.</Typography>
              <div className='flex items-center gap-2.5 is-fit bg-actionHover rounded plb-[5px] pli-2.5'>
                <img height={20} alt='rekomendasi.pdf' src='/images/icons/pdf-document.png' />
                <Typography className='font-medium'>rekomendasi.pdf</Typography>
              </div>
              <Typography variant='body2' className='font-medium'>
                Diambil oleh: Nur Azizah
              </Typography>
            </TimelineContent>
          </TimelineItem>

          {/* Item 3: Surat yang lebih lama */}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='info' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                <Typography className='font-medium' color='text.primary'>
                  Surat Keterangan Lulus telah diambil
                </Typography>
                <Typography variant='caption' color='text.disabled'>
                  2 hari yang lalu
                </Typography>
              </div>
              <Typography className='mbe-2'>Surat Keterangan Lulus telah diterbitkan oleh bagian akademik.</Typography>
              <AvatarGroup total={1} className='pull-up'>
                <Avatar alt='Mahasiswa' src='/images/avatars/1.png' />
              </AvatarGroup>
              <Typography variant='body2' className='font-medium'>
                Diambil oleh: Dwi Santoso
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default SuratActivityTimeline
