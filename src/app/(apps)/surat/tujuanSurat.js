'use client'

import { useState, useEffect, Fragment } from 'react'

import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import DialogContentText from '@mui/material/DialogContentText'

const CollapsibleTable = () => {
  const [openRow, setOpenRow] = useState(null)
  const [data, setData] = useState([]) // Data dari API
  const [loading, setLoading] = useState(true)

  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState('add') // 'add' atau 'edit'
  const [currentData, setCurrentData] = useState({ id: null, kode: '', nama: '', tujuan: [] })

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const [openTujuanDialog, setOpenTujuanDialog] = useState(false)
  const [currentTujuan, setCurrentTujuan] = useState({ id: null, kode: '', nama: '', id_jenis: null })
  const [parentJenisSuratId, setParentJenisSuratId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://devnolife.site/api/tujuan-surat')
        const result = await response.json()

        console.log("🚀 ~ fetchData ~ result:", result)

        setData(result.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleRowClick = (id) => {
    setOpenRow(openRow === id ? null : id)
  }

  const handleOpenDialog = (type, row = null) => {
    setDialogType(type)

    if (type === 'edit' && row) {
      setCurrentData(row)
    } else {
      setCurrentData({ id: null, kode: '', nama: '', tujuan: [] })
    }

    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSaveData = async () => {
    const url =
      dialogType === 'add'
        ? 'https://devnolife.site/api/jenis-surat'
        : `https://devnolife.site/api/jenis-surat/${currentData.id}`

    const method = dialogType === 'add' ? 'POST' : 'PUT'

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          kode: currentData.kode,
          nama: currentData.nama
        })
      })

      const result = await response.json()

      if (method === 'POST') {
        setData([...data, result.data])
      } else {
        setData(
          data.map((item) => (item.id === currentData.id ? { ...item, ...result.data } : item))
        )
      }

      setOpenDialog(false)
    } catch (error) {
      console.error('Error saving data:', error)
    }
  }

  const handleDeleteConfirmation = (id) => {
    setDeleteId(id)
    setOpenDeleteDialog(true)
  }

  const handleDeleteData = async () => {
    try {
      await fetch(`https://devnolife.site/api/jenis-surat/${deleteId}`, {
        method: 'DELETE'
      })
      setData(data.filter((item) => item.id !== deleteId))
      setOpenDeleteDialog(false)
    } catch (error) {
      console.error('Error deleting data:', error)
    }
  }

  // Handle edit tujuan
  const handleEditTujuan = (tujuan) => {
    setCurrentTujuan(tujuan)
    setOpenTujuanDialog(true)
  }

  const handleAddTujuan = (id_jenis) => {
    setCurrentTujuan({ id: null, kode: '', nama: '', id_jenis })
    setParentJenisSuratId(id_jenis)
    setOpenTujuanDialog(true)
  }

  const handleCloseTujuanDialog = () => {
    setOpenTujuanDialog(false)
  }

  const handleSaveTujuan = async () => {
    const method = currentTujuan.id ? 'PUT' : 'POST'

    const url = currentTujuan.id
      ? `https://devnolife.site/api/tujuan/${currentTujuan.id}`
      : `https://devnolife.site/api/tujuan`

    const body = {
      kode: currentTujuan.kode,
      nama: currentTujuan.nama,
      id_jenis: parentJenisSuratId || currentTujuan.id_jenis
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      const result = await response.json()

      if (method === 'POST') {
        setData(
          data.map((item) =>
            item.id === parentJenisSuratId
              ? { ...item, tujuan: [...item.tujuan, result.data] }
              : item
          )
        )
      } else {
        setData(
          data.map((item) =>
            item.id === currentTujuan.id_jenis
              ? {
                ...item,
                tujuan: item.tujuan.map((t) =>
                  t.id === currentTujuan.id ? { ...t, ...currentTujuan } : t
                )
              }
              : item
          )
        )
      }

      setOpenTujuanDialog(false)
    } catch (error) {
      console.error('Error updating tujuan:', error)
    }
  }

  const handleDeleteTujuan = async (tujuanId, jenisSuratId) => {
    try {
      await fetch(`https://devnolife.site/api/tujuan/${tujuanId}`, {
        method: 'DELETE'
      })
      setData(
        data.map((item) =>
          item.id === jenisSuratId
            ? { ...item, tujuan: item.tujuan.filter((t) => t.id !== tujuanId) }
            : item
        )
      )
    } catch (error) {
      console.error('Error deleting tujuan:', error)
    }
  }

  if (loading) {
    return <Typography>Loading data...</Typography>
  }

  return (
    <Card>
      <Box p={2} display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h6'>Daftar Jenis Surat</Typography>
        <Button variant='contained' color='primary' onClick={() => handleOpenDialog('add')}>
          Tambah Jenis Surat
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kode</TableCell>
              <TableCell>Nama Surat</TableCell>
              <TableCell align='center'>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <Fragment key={row.id}>
                <TableRow>
                  <TableCell>{row.kode}</TableCell>
                  <TableCell>{row.nama}</TableCell>
                  <TableCell align='center'>
                    <IconButton size='small' onClick={() => handleRowClick(row.id)}>
                      <i className={openRow === row.id ? 'tabler-chevron-up' : 'tabler-chevron-down'} />
                    </IconButton>
                    <IconButton size='small' onClick={() => handleOpenDialog('edit', row)}>
                      <i className='tabler-edit' />
                    </IconButton>
                    <IconButton size='small' onClick={() => handleDeleteConfirmation(row.id)}>
                      <i className='tabler-trash' />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={openRow === row.id} timeout='auto' unmountOnExit>
                      <Box margin={2}>
                        <Table size='small'>
                          <TableHead>
                            <TableRow>
                              <TableCell>Kode Tujuan</TableCell>
                              <TableCell>Nama Tujuan</TableCell>
                              <TableCell>Aksi</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.tujuan.map((tujuan) => (
                              <TableRow key={tujuan.id}>
                                <TableCell>{tujuan.kode}</TableCell>
                                <TableCell>{tujuan.nama}</TableCell>
                                <TableCell>
                                  <IconButton size='small' onClick={() => handleEditTujuan(tujuan)}>
                                    <i className='tabler-edit' />
                                  </IconButton>
                                  <IconButton size='small' onClick={() => handleDeleteTujuan(tujuan.id, row.id)}>
                                    <i className='tabler-trash' />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell colSpan={3}>
                                <Box display='flex' justifyContent='flex-end'>
                                  <Button size='small'
                                    variant='outlined' onClick={() => handleAddTujuan(row.id)}>
                                    Tambah Tujuan
                                  </Button>
                                </Box>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth>
        <DialogTitle>{dialogType === 'add' ? 'Tambah Jenis Surat' : 'Edit Jenis Surat'}</DialogTitle>
        <DialogContent dividers>
          <TextField
            margin='dense'
            label='Kode'
            fullWidth
            value={currentData.kode}
            onChange={(e) => setCurrentData({ ...currentData, kode: e.target.value })} />
          <TextField
            margin='dense'
            label='Nama'
            fullWidth
            value={currentData.nama}
            onChange={(e) => setCurrentData({ ...currentData, nama: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='secondary'>
            Batal
          </Button>
          <Button onClick={handleSaveData} color='primary'>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Edit/Tambah Tujuan */}
      <Dialog open={openTujuanDialog} onClose={handleCloseTujuanDialog} maxWidth='sm' fullWidth>
        <DialogTitle>{currentTujuan.id ? 'Edit Tujuan' : 'Tambah Tujuan'}</DialogTitle>
        <DialogContent dividers>
          <TextField
            margin='dense'
            label='Kode'
            fullWidth
            value={currentTujuan.kode}
            onChange={(e) => setCurrentTujuan({ ...currentTujuan, kode: e.target.value })} />
          <TextField
            margin='dense'
            label='Nama'
            fullWidth
            value={currentTujuan.nama}
            onChange={(e) => setCurrentTujuan({ ...currentTujuan, nama: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTujuanDialog} color='secondary'>
            Batal
          </Button>
          <Button onClick={handleSaveTujuan} color='primary'>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth='xs' fullWidth>
        <DialogTitle>Hapus Jenis Surat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus jenis surat ini? Tindakan ini tidak dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color='secondary'>
            Batal
          </Button>
          <Button onClick={handleDeleteData} color='primary'>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default CollapsibleTable
