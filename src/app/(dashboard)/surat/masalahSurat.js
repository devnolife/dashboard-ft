'use client'

import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, DialogContentText
} from '@mui/material';

const MasalahSurat = () => {
  const [masalahSurat, setMasalahSurat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentMasalah, setCurrentMasalah] = useState({ id: null, kode: '', masalah: '' });
  const [deleteId, setDeleteId] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchMasalahSurat = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/masalah-surat');
        const data = await response.json();
        setMasalahSurat(data.data); // Update the state with fetched data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching masalah surat:', error);
        setLoading(false);
      }
    };

    fetchMasalahSurat();
  }, []);

  const handleOpenEditDialog = (masalah) => {
    setCurrentMasalah(masalah);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveMasalah = async () => {
    const url = `http://localhost:8080/api/masalah-surat/${currentMasalah.id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kode: currentMasalah.kode,
          masalah: currentMasalah.masalah,
        }),
      });
      const result = await response.json();
      setMasalahSurat(
        masalahSurat.map((item) => (item.id === currentMasalah.id ? result.data : item))
      );
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error updating masalah surat:', error);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteMasalah = async () => {
    const url = `http://localhost:8080/api/masalah-surat/${deleteId}`;
    try {
      await fetch(url, {
        method: 'DELETE',
      });
      setMasalahSurat(masalahSurat.filter((item) => item.id !== deleteId));
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting masalah surat:', error);
    }
  };

  if (loading) {
    return <Typography>Loading data...</Typography>;
  }

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Daftar Masalah Surat
        </Typography>

        {/* Tabel untuk menampilkan masalah surat */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Kode</strong></TableCell>
                <TableCell><strong>Masalah Surat</strong></TableCell>
                <TableCell align="center"><strong>Aksi</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {masalahSurat.map((masalah) => (
                <TableRow key={masalah.id}>
                  <TableCell>{masalah.kode}</TableCell>
                  <TableCell>{masalah.masalah}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpenEditDialog(masalah)} aria-label="edit">
                      <i className='tabler-edit' />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDeleteDialog(masalah.id)} aria-label="delete">
                      <i className='tabler-trash' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      {/* Dialog Edit */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth='sm' fullWidth>
        <DialogTitle>Edit Masalah Surat</DialogTitle>
        <DialogContent dividers>
          <TextField
            margin='dense'
            label='Kode'
            fullWidth
            value={currentMasalah.kode}
            onChange={(e) => setCurrentMasalah({ ...currentMasalah, kode: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Masalah'
            fullWidth
            value={currentMasalah.masalah}
            onChange={(e) => setCurrentMasalah({ ...currentMasalah, masalah: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color='secondary'>
            Batal
          </Button>
          <Button onClick={handleSaveMasalah} color='primary'>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Konfirmasi Hapus */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} maxWidth='xs' fullWidth>
        <DialogTitle>Hapus Masalah Surat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus masalah surat ini? Tindakan ini tidak dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color='secondary'>
            Batal
          </Button>
          <Button onClick={handleDeleteMasalah} color='primary'>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default MasalahSurat;
