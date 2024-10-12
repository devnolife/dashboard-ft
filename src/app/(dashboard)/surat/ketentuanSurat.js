'use client'
import { useState, useEffect } from "react"
import { Grid, CircularProgress, Typography, Card, CardContent, MenuItem, Select, FormControl, InputLabel, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

const KetentuanSurat = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [masalahData, setMasalahData] = useState([])
  const [tujuanData, setTujuanData] = useState([])

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [localState, setLocalState] = useState({})

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8080/api/ketentuan-surat')
      .then((response) => response.json())
      .then((json) => {
        setData(json.data)
        setLoading(false)
        initializeLocalState(json.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/api/masalah-surat')
      .then((response) => response.json())
      .then((json) => {
        setMasalahData(json.data)
      })
      .catch((error) => console.error("Error fetching masalah surat:", error))
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/api/tujuan-surat')
      .then((response) => response.json())
      .then((json) => {
        setTujuanData(json.data)
      })
      .catch((error) => console.error("Error fetching tujuan surat:", error))
  }, [])

  const initializeLocalState = (data) => {
    const initialState = {}
    data.forEach(item => {
      initialState[item.id] = {
        selectedTujuan: item.tujuan.id,
        selectedMasalah: item.masalah.id,
        selectedCount: item.count.id
      }
    })
    setLocalState(initialState)
  }

  const handleTujuanChange = (event, id) => {
    setLocalState(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        selectedTujuan: event.target.value
      }
    }))
  }

  const handleMasalahChange = (event, id) => {
    setLocalState(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        selectedMasalah: event.target.value
      }
    }))
  }

  const handleCountChange = (event, id) => {
    setLocalState(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        selectedCount: event.target.value
      }
    }))
  }

  const handleOpenDialog = (item) => {
    setSelectedItem(item)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSaveChanges = () => {
    const updatedData = {
      id: selectedItem.id,
      tujuan: localState[selectedItem.id].selectedTujuan,
      masalah: localState[selectedItem.id].selectedMasalah,
      count: localState[selectedItem.id].selectedCount
    }

    fetch(`http://localhost:8080/api/ketentuan-surat/${selectedItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data)
        handleCloseDialog()
      })
      .catch((error) => {
        console.error("Error updating data:", error)
        handleCloseDialog()
      })
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ textAlign: 'flex', marginBottom: '20px', color: '#1976d2' }}>
        Ketentuan Surat
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {data.map((item) => (
            <Grid item xs={12} sm={8} md={6} key={item.id}>
              <Card sx={{ boxShadow: 3, borderRadius: '10px', backgroundColor: '#f9f9f9', padding: '20px' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.nama}
                  </Typography>

                  <FormControl fullWidth sx={{ marginBottom: '15px' }} variant="outlined">
                    <InputLabel id="tujuan-label-demo-basic-select-outlined">Tujuan</InputLabel>
                    <Select
                      label='Tujuan'
                      labelId='tujuan-label-demo-basic-select-outlined'
                      id='demo-basic-select-outlined'
                      value={localState[item.id]?.selectedTujuan || ''}
                      onChange={(event) => handleTujuanChange(event, item.id)}
                      fullWidth
                    >
                      {tujuanData.map((tujuan) => (
                        <MenuItem key={tujuan.id} value={tujuan.id}>
                          {tujuan.nama} ({tujuan.kode})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ marginBottom: '15px' }} variant="outlined">
                    <InputLabel id="masalah-label">Masalah</InputLabel>
                    <Select
                      label='Masalah'
                      labelId="masalah-label"
                      id="select-masalah"
                      value={localState[item.id]?.selectedMasalah || ''}
                      onChange={(event) => handleMasalahChange(event, item.id)}
                      fullWidth
                    >
                      {masalahData.map((masalah) => (
                        <MenuItem key={masalah.id} value={masalah.id}>
                          {masalah.masalah} ({masalah.kode})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ marginBottom: '15px' }} variant="outlined">
                    <InputLabel id="jenis-surat-label">Jenis Surat</InputLabel>
                    <Select
                      label='Jenis Surat'
                      labelId="jenis-surat-label"
                      id="select-jenis-surat"
                      value={localState[item.id]?.selectedCount || ''}
                      onChange={(event) => handleCountChange(event, item.id)}
                      fullWidth
                    >
                      <MenuItem value={3}>Biasa</MenuItem>
                      <MenuItem value={4}>Keputusan</MenuItem>
                      <MenuItem value={5}>Prodi</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    No Surat: {item.count.counter}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(item)} // Buka dialog konfirmasi saat tombol diklik
                  >
                    Simpan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog Konfirmasi */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Konfirmasi Perubahan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menyimpan perubahan ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Batal
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default KetentuanSurat
