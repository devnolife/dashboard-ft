'use client'
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputLabel,
  FormControl,
  Typography,
  Paper,
  Alert,
} from '@mui/material';

const professors = ['Dosen 1', 'Dosen 2', 'Dosen 3'];

// Data mahasiswa tanpa properti professor
const studentsData = [
  { name: 'Muhammad Rafli', nim: '105811110121' },
  { name: 'Sariana', nim: '105811100221' },
  { name: 'Muhammad Dasril Asdar', nim: '105841100321' },
  { name: 'Adam Hidayat', nim: '105811100521' },
  { name: 'Andika Saputra', nim: '105841100621' },
  { name: 'Muh. Iqbal Asy\'ari', nim: '105821100621' },
  { name: 'Asriana', nim: '105821100621' },
];

export default function Kkp() {
  const [selectedProfessor, setSelectedProfessor] = useState(''); // Pilihan dosen pembimbing
  const [selectedStudents, setSelectedStudents] = useState([]); // Mahasiswa yang dipilih
  const [errorMessage, setErrorMessage] = useState(''); // Pesan error

  // Filter mahasiswa berdasarkan dosen pembimbing yang dipilih
  const filteredStudents = studentsData.filter((student) => {
    return selectedProfessor === '' || student.professor === selectedProfessor;
  });

  // Fungsi untuk menangani perubahan pada pilihan mahasiswa
  const handleStudentSelection = (event, newValue) => {
    if (newValue.length > 4) {
      setErrorMessage('Anda hanya dapat memilih maksimal 4 mahasiswa.');
    } else if (newValue.length < 2) {
      setErrorMessage('Pilih minimal 2 mahasiswa.');
    } else {
      setErrorMessage('');
    }
    setSelectedStudents(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Pilih Pembimbing dan Cari Mahasiswa
      </Typography>

      {/* Dropdown untuk memilih dosen pembimbing */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="professor-label">Pilih Pembimbing</InputLabel>
        <Select
          labelId="professor-label"
          value={selectedProfessor}
          onChange={(e) => setSelectedProfessor(e.target.value)}
        >
          <MenuItem value="">Semua Pembimbing</MenuItem>
          {professors.map((prof, index) => (
            <MenuItem key={index} value={prof}>
              {prof}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Autocomplete multiple selection untuk memilih mahasiswa */}
      <Autocomplete
        multiple
        fullWidth
        options={studentsData}
        getOptionLabel={(student) => student.name}
        value={selectedStudents}
        onChange={handleStudentSelection}
        renderInput={(params) => (
          <TextField {...params} label="Cari Mahasiswa" variant="outlined" margin="normal" />
        )}
      />

      {/* Pesan error jika jumlah mahasiswa yang dipilih tidak valid */}
      {errorMessage && (
        <Alert severity="error" style={{ marginTop: '10px' }}>
          {errorMessage}
        </Alert>
      )}

      {/* Tabel untuk menampilkan mahasiswa yang dipilih */}
      {selectedStudents.length >= 2 && selectedStudents.length <= 4 && (
        <Paper elevation={3} style={{ marginTop: '20px', padding: '10px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>NIM</TableCell>
                <TableCell>Nama</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedStudents.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.nim}</TableCell>
                  <TableCell>{student.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
