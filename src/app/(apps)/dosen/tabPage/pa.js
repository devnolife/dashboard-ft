'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

import tableStyles from '@core/styles/table.module.css'

const data = [
  {
    no: 'Bimbingan 1',
    uraian: 'Rencana studi dan tujuan akademik',
    date: '12 Januari 2024',
    paraf: 'Sudah',
    keterangan: 'Pertemuan pengantar dan penetapan tujuan.'
  },
  {
    no: 'Bimbingan 2',
    uraian: 'Pemilihan mata kuliah dan pengembangan kompetensi',
    date: '19 Februari 2024',
    paraf: 'Sudah',
    keterangan: 'Diskusi mendalam mengenai pilihan mata kuliah.'
  },
  {
    no: 'Bimbingan 3',
    uraian: 'Evaluasi tengah semester dan kemajuan akademik',
    date: '10 Maret 2024',
    paraf: 'Belum',
    keterangan: 'Tinjauan kemajuan dan rencana perbaikan.'
  },
  {
    no: 'Bimbingan 4',
    uraian: 'Rencana studi untuk semester berikutnya',
    date: '25 April 2024',
    paraf: 'Belum',
    keterangan: 'Persiapan untuk semester mendatang.'
  }
]

const PreviewKartuLab = () => {
  return (
    <Card>
      <CardContent className='sm:!p-12'>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <div className='p-6 rounded bg-actionHover'>
              <div className='flex items-center justify-between gap-y-4'>
                <img src='/logo/logo-ft.png' alt='logo' style={{ width: '140px' }} />

                <div className='flex flex-col items-center text-center'>
                  <Typography variant='h3' sx={{ fontWeight: 'bold', color: '#365F91', fontFamily: 'Arial Black, sans-serif' }}>
                    UNIVERSITAS MUHAMMADIYAH MAKASSAR
                  </Typography>
                  <Typography variant='h3' sx={{ fontWeight: 'bold', color: '#365F91', fontFamily: 'Arial Black, sans-serif' }}>
                    PROGRAM STUDI INFORMATIKA
                  </Typography>
                  <Typography variant='h3' sx={{ fontWeight: 'bold', color: '#365F91', fontFamily: 'Arial Black, sans-serif' }}>
                    FAKULTAS TEKNIK
                  </Typography>
                </div>

                <img src='/logo/unggul.png' alt='logo' style={{ width: '140px' }} />
              </div>
            </div>
          </Grid>

          <Grid item xs={12} container justifyContent="center" alignItems="center" direction="column" spacing={1}>
            <Typography variant='h5' sx={{ fontFamily: 'Arial, sans-serif', fontSize: '2rem', textAlign: 'center', color: '#365F91' }}>
              بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </Typography>
            <Typography variant='h5' sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
              KARTU KONTROL PENASEHAT AKADEMIK
            </Typography>
            <Typography variant='h5' sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
              TAHUN AJARAN: 20 - 20
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <div className='flex flex-col gap-2'>
              <div className='flex'>
                <Typography variant='body1' color='text.primary' style={{ minWidth: '180px', fontWeight: 'bold' }}>
                  Nama:
                </Typography>
                <Typography variant='body1' color='text.primary'>:John Doe</Typography>
              </div>
              <div className='flex'>
                <Typography variant='body1' color='text.primary' style={{ minWidth: '180px', fontWeight: 'bold' }}>
                  Stambuk
                </Typography>
                <Typography variant='body1' color='text.primary'>:12345678</Typography>
              </div>
              <div className='flex'>
                <Typography variant='body1' color='text.primary' style={{ minWidth: '180px', fontWeight: 'bold' }}>
                  Penasehat Akademik
                </Typography>
                <Typography variant='body1' color='text.primary'>:Dr. Rahmawati</Typography>
              </div>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className='overflow-x-auto border rounded'>
              <table className={`${tableStyles.table} border-separate border-spacing-0 w-full`}>
                <thead>
                  <tr>
                    <th className='px-4 py-2 border border-gray-300'>No</th>
                    <th className='px-4 py-2 border border-gray-300'>Hari/Tanggal</th>
                    <th className='px-4 py-2 border border-gray-300'>Uraian</th>
                    <th className='px-4 py-2 border border-gray-300'>Paraf</th>
                    <th className='px-4 py-2 border border-gray-300'>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className='px-4 py-2 border border-gray-300'>{item.no}</td>
                      <td className='px-4 py-2 border border-gray-300'>{item.date}</td>
                      <td className='px-4 py-2 border border-gray-300'>{item.uraian}</td>
                      <td className='px-4 py-2 border border-gray-300'>{item.paraf}</td>
                      <td className='px-4 py-2 border border-gray-300'>{item.keterangan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Grid>

          <Grid item xs={12}>
            <Divider className='border-dashed' />
          </Grid>

          <Grid item xs={12}>
            <Typography>
              <strong>Catatan:</strong> Sebelum Tanda Tangan Ketua Prodi, Mahasiswa diwajibkan:
            </Typography>
            <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
              <li>Konsultasi ke Penasehat Akademik setiap Bulan Semester Berjalan (Min. 5 kali)</li>
              <li>Pengurusan Tanda Tangan dan Cetak KRS Online pada Awal Semester Berjalan (1 Bulan awal Semester)</li>
              <li>Pengisian Uraian Kartu Kontrol diisi oleh Mahasiswa pada saat Konsultasi di Depan PA yang ditandai dengan Paraf PA</li>
              <li>Point 1, 2, dan 3 wajib dipenuhi sebagai Syarat Pengambilan Kartu UAS Semester Berjalan</li>
            </ul>
          </Grid>

          <Grid item xs={12}>
            <div className='flex flex-col justify-between gap-y-4 sm:flex-row'>
              <div className='flex flex-col gap-1 order-2 sm:order-[unset]' />
              <div className='min-w-[200px] text-center'>
                <Typography>Makassar, 12 Januari 2024</Typography>
                <Typography>Ketua Prodi Informatika</Typography>
                <Typography>Muhyiddin AM.Hayat, S.Kom., MT</Typography>
                <Typography>NBM : 1504 577</Typography>
                <Divider className='mt-2' />
              </div>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PreviewKartuLab
