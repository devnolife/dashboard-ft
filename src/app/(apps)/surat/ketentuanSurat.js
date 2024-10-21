'use client'
import React, { useState, useEffect } from 'react';

import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Skeleton,
  Snackbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import {
  Folder as FolderIcon,
  Save as SaveIcon,
  WarningAmber as WarningAmberIcon,
} from '@mui/icons-material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f4f6f8',
      paper: '#fff',
    },
  },
});

const KetentuanSurat = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [masalahData, setMasalahData] = useState([]);
  const [tujuanData, setTujuanData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [localState, setLocalState] = useState({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/api/ketentuan-surat')
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
        initializeLocalState(json.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/masalah-surat')
      .then((response) => response.json())
      .then((json) => {
        setMasalahData(json.data);
      })
      .catch((error) => console.error('Error fetching masalah surat:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/tujuan-surat')
      .then((response) => response.json())
      .then((json) => {
        setTujuanData(json.data);
      })
      .catch((error) => console.error('Error fetching tujuan surat:', error));
  }, []);

  const initializeLocalState = (data) => {
    const initialState = {};

    data.forEach((item) => {
      initialState[item.id] = {
        selectedTujuan: item.tujuan.id,
        selectedMasalah: item.masalah.id,
        selectedCount: item.count.id,
      };
    });
    setLocalState(initialState);
  };

  const handleTujuanChange = (event, id) => {
    setLocalState((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        selectedTujuan: event.target.value,
      },
    }));
  };

  const handleMasalahChange = (event, id) => {
    setLocalState((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        selectedMasalah: event.target.value,
      },
    }));
  };

  const handleCountChange = (event, id) => {
    setLocalState((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        selectedCount: event.target.value,
      },
    }));
  };

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveChanges = () => {
    const updatedData = {
      id: selectedItem.id,
      tujuan: localState[selectedItem.id].selectedTujuan,
      masalah: localState[selectedItem.id].selectedMasalah,
      count: localState[selectedItem.id].selectedCount,
    };

    fetch(`http://localhost:8080/api/ketentuan-surat/${selectedItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        handleCloseDialog();
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        handleCloseDialog();
      });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, color: 'primary.main' }}>
        Ketentuan Surat
      </Typography>
      {loading ? (
        <Grid container spacing={2}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))}
        </Grid>
      ) : data.length === 0 ? (
        <Typography variant="h6" align="center">
          Tidak ada data tersedia.
        </Typography>
      ) : (
        <Fade in={!loading}>
          <Grid container spacing={2}>
            {data.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    boxShadow: 2,
                    '&:hover': {
                      boxShadow: 4,
                    },
                    borderRadius: 2,
                    padding: 2,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" marginBottom={2}>
                      <FolderIcon color="primary" />
                      <Typography variant="h6" marginLeft={1}>
                        {item.nama}
                      </Typography>
                    </Box>

                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                      <InputLabel id={`tujuan-label-${item.id}`}>Tujuan</InputLabel>
                      <Select
                        label="Tujuan"
                        labelId={`tujuan-label-${item.id}`}
                        id={`tujuan-select-${item.id}`}
                        value={localState[item.id]?.selectedTujuan || ''}
                        onChange={(event) => handleTujuanChange(event, item.id)}
                      >
                        {tujuanData.map((tujuan) => (
                          <MenuItem key={tujuan.id} value={tujuan.id}>
                            {tujuan.nama} ({tujuan.kode})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                      <InputLabel id={`masalah-label-${item.id}`}>Masalah</InputLabel>
                      <Select
                        label="Masalah"
                        labelId={`masalah-label-${item.id}`}
                        id={`masalah-select-${item.id}`}
                        value={localState[item.id]?.selectedMasalah || ''}
                        onChange={(event) => handleMasalahChange(event, item.id)}
                      >
                        {masalahData.map((masalah) => (
                          <MenuItem key={masalah.id} value={masalah.id}>
                            {masalah.masalah} ({masalah.kode})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                      <InputLabel id={`jenis-surat-label-${item.id}`}>Jenis Surat</InputLabel>
                      <Select
                        label="Jenis Surat"
                        labelId={`jenis-surat-label-${item.id}`}
                        id={`jenis-surat-select-${item.id}`}
                        value={localState[item.id]?.selectedCount || ''}
                        onChange={(event) => handleCountChange(event, item.id)}
                      >
                        <MenuItem value={3}>Biasa</MenuItem>
                        <MenuItem value={4}>Keputusan</MenuItem>
                        <MenuItem value={5}>Prodi</MenuItem>
                      </Select>
                    </FormControl>

                    <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                      No Surat: {item.count.counter}
                    </Typography>

                    <Tooltip title="Simpan perubahan">
                      <IconButton color="primary" onClick={() => handleOpenDialog(item)}>
                        <SaveIcon />
                      </IconButton>
                    </Tooltip>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Fade>
      )}

      {/* Dialog Konfirmasi */}
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <WarningAmberIcon color="warning" /> Konfirmasi Perubahan
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menyimpan perubahan ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Batal
          </Button>
          <Button onClick={handleSaveChanges} color="primary" autoFocus>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar untuk Feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Perubahan berhasil disimpan"
      />
    </Box>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <KetentuanSurat />
    </ThemeProvider>
  );
}
