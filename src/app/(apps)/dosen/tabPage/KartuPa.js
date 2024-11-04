import React, { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { styled } from '@mui/material/styles'

const data = [
  {
    no: '1',
    uraian: 'Rencana studi dan tujuan akademik',
    date: '12 Januari 2024',
    paraf: 'Sudah',
    keterangan: 'Pertemuan pengantar dan penetapan tujuan.'
  },
  {
    no: '2',
    uraian: 'Pemilihan mata kuliah dan pengembangan kompetensi',
    date: '19 Februari 2024',
    paraf: 'Sudah',
    keterangan: 'Diskusi mendalam mengenai pilihan mata kuliah.'
  },
  {
    no: '3',
    uraian: 'Evaluasi tengah semester dan kemajuan akademik',
    date: '10 Maret 2024',
    paraf: 'Belum',
    keterangan: 'Tinjauan kemajuan dan rencana perbaikan.'
  },
  {
    no: '4',
    uraian: 'Rencana studi untuk semester berikutnya',
    date: '25 April 2024',
    paraf: 'Belum',
    keterangan: 'Persiapan untuk semester mendatang.'
  }
]

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  overflow: 'hidden'
}))

const StyledTable = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  '& th, & td': {
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`
  },
  '& th': {
    backgroundColor: theme.palette.background.default,
    fontWeight: theme.typography.fontWeightBold
  }
}))

const KartuPa = () => {
  const [open, setOpen] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [editData, setEditData] = useState(data)

  const [formData, setFormData] = useState({
    no: '',
    uraian: '',
    date: '',
    paraf: '',
    keterangan: ''
  })

  const handleClickOpen = (index) => {
    setEditIndex(index)

    if (index === null) {
      setFormData({
        no: '',
        uraian: '',
        date: '',
        paraf: '',
        keterangan: ''
      })
    } else {
      setFormData(editData[index])
    }

    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSave = () => {
    const newData = [...editData]

    if (editIndex === null) {
      newData.push(formData)
    } else {
      newData[editIndex] = formData
    }

    setEditData(newData)
    handleClose()
  }

  const handleDelete = (index) => {
    const newData = [...editData]

    newData.splice(index, 1)
    setEditData(newData)
  }

  return (
    <StyledCard>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <div className='p-6 rounded bg-actionHover'>
              <div className='flex items-center justify-between gap-y-4'>
                <Avatar src='/logo/logo-ft.png' alt='logo' sx={{ width: 140, height: 140 }} />
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
                <Avatar src='/logo/unggul.png' alt='logo' sx={{ width: 140, height: 140 }} />
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
                <Typography variant='body1' color='text.primary' sx={{ minWidth: '180px', fontWeight: 'bold' }}>
                  Nama:
                </Typography>
                <Typography variant='body1' color='text.primary'>: John Doe</Typography>
              </div>
              <div className='flex'>
                <Typography variant='body1' color='text.primary' sx={{ minWidth: '180px', fontWeight: 'bold' }}>
                  Stambuk
                </Typography>
                <Typography variant='body1' color='text.primary'>: 12345678</Typography>
              </div>
              <div className='flex'>
                <Typography variant='body1' color='text.primary' sx={{ minWidth: '180px', fontWeight: 'bold' }}>
                  Penasehat Akademik
                </Typography>
                <Typography variant='body1' color='text.primary'>: Dr. Rahmawati</Typography>
              </div>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className='overflow-x-auto border rounded'>
              <StyledTable>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Hari/Tanggal</th>
                    <th>Uraian</th>
                    <th>Paraf</th>
                    <th>Keterangan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {editData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.no}</td>
                      <td>{item.date}</td>
                      <td>{item.uraian}</td>
                      <td>{item.paraf}</td>
                      <td>{item.keterangan}</td>
                      <td>
                        <IconButton onClick={() => handleClickOpen(index)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
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

          <Grid item xs={12} className='flex justify-end gap-2'>
            <Button variant='contained' color='primary' onClick={() => handleClickOpen(null)}>
              Tambah Bimbingan
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
        <DialogTitle>{editIndex === null ? 'Tambah Data Bimbingan' : 'Edit Data Bimbingan'}</DialogTitle>
        <DialogContent>
          <TextField
            label='No'
            value={formData.no}
            onChange={(e) => handleChange('no', e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Hari/Tanggal'
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Uraian'
            value={formData.uraian}
            onChange={(e) => handleChange('uraian', e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Paraf'
            value={formData.paraf}
            onChange={(e) => handleChange('paraf', e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Keterangan'
            value={formData.keterangan}
            onChange={(e) => handleChange('keterangan', e.target.value)}
            fullWidth
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color='primary'>
            Simpan
          </Button>
          <Button onClick={handleClose} color='secondary'>
            Batal
          </Button>
        </DialogActions>
      </Dialog>
    </StyledCard>
  )
}

export default KartuPa
