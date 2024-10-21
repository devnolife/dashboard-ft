'use client'

'use client'

import { useState, useEffect, useMemo } from 'react';

import {
  Grid,
  Typography,
  TextField,
  Alert,
  Snackbar,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Skeleton,
  useTheme,
} from '@mui/material';
import {
  Visibility,
  Edit,
  Delete,
  Close,
  Error as ErrorIcon,
} from '@mui/icons-material';
import axios from 'axios';

const TableSurat = () => {
  // State variables
  const [data, setData] = useState([]);
  const [selectedJenisSurat, setSelectedJenisSurat] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [tujuanToDelete, setTujuanToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const theme = useTheme();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Gunakan environment variable untuk URL API
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
        const response = await axios.get(`${API_URL}/api/jenis-surat`);

        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Gagal mengambil data dari API');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handlers
  const handleOpenDetailDialog = (jenisSurat) => {
    setSelectedJenisSurat(jenisSurat);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedJenisSurat(null);
  };

  const handleEditTujuan = (tujuan) => {
    // Implementasi logika edit
    setSnackbar({ open: true, message: `Edit tujuan: ${tujuan.nama}` });
  };

  const handleDeleteTujuan = (tujuanId) => {
    setTujuanToDelete(tujuanId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    // Implementasi logika hapus
    setSnackbar({ open: true, message: `Tujuan dengan ID ${tujuanToDelete} berhasil dihapus` });
    setOpenConfirmDialog(false);
    setTujuanToDelete(null);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
    setTujuanToDelete(null);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Filtered data based on search term
  const filteredData = useMemo(() => {
    return data.filter((jenisSurat) =>
      jenisSurat.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Paginated data
  const paginatedData = useMemo(() => {
    return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Jenis Surat
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Cari Jenis Surat"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginBottom: 2 }}
        />
      </Grid>

      {error && (
        <Grid item xs={12}>
          <Alert severity="error" icon={<ErrorIcon />}>
            {error}
          </Alert>
        </Grid>
      )}

      {loading ? (
        <Grid item xs={12}>
          <Skeleton variant="rectangular" width="100%" height={400} />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, boxShadow: theme.shadows[3] }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: theme.palette.background.default }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Kode</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Tidak ada data yang tersedia.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((jenisSurat) => (
                    <TableRow key={jenisSurat.id} hover>
                      <TableCell>{jenisSurat.id}</TableCell>
                      <TableCell>{jenisSurat.nama}</TableCell>
                      <TableCell>{jenisSurat.kode}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDetailDialog(jenisSurat)}
                          sx={{ marginRight: 1 }}
                          aria-label="Lihat Detail"
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          color="error"
                          aria-label="Hapus"
                          onClick={() => {
                            // Implementasi aksi hapus
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      )}

      {/* Detail Dialog */}
      <Dialog
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          Detail Jenis Surat
          <IconButton onClick={handleCloseDetailDialog} aria-label="Tutup">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedJenisSurat ? (
            <>
              <Typography variant="h6">
                {selectedJenisSurat.nama} ({selectedJenisSurat.kode})
              </Typography>
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                  <TableHead sx={{ backgroundColor: theme.palette.background.default }}>
                    <TableRow>
                      <TableCell>Kode</TableCell>
                      <TableCell>Nama</TableCell>
                      <TableCell align="center">Aksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedJenisSurat.tujuan.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          Tidak ada tujuan yang tersedia.
                        </TableCell>
                      </TableRow>
                    ) : (
                      selectedJenisSurat.tujuan.map((tujuan) => (
                        <TableRow key={tujuan.id} hover>
                          <TableCell>{tujuan.kode}</TableCell>
                          <TableCell>{tujuan.nama}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => handleEditTujuan(tujuan)}
                              sx={{ marginRight: 1 }}
                              aria-label="Edit"
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDeleteTujuan(tujuan.id)}
                              aria-label="Hapus"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Typography>Tidak ada detail yang tersedia.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailDialog} color="primary">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={openConfirmDialog} onClose={handleCancelDelete}>
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <Typography>Apakah Anda yakin ingin menghapus tujuan ini?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Batal</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
      />
    </Grid>
  );
};

export default TableSurat;
