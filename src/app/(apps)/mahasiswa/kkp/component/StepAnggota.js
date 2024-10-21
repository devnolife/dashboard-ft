import { useState } from 'react';

import { Grid, Typography, Paper, Avatar, InputAdornment, Button, Box, IconButton } from '@mui/material';


import CustomTextField from '@/@core/components/mui/TextField';

const StepAnggota = ({ handleNext }) => {
  const [nim, setNim] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [errors, setErrors] = useState({});

  const handleAddMember = () => {
    if (selectedStudent && groupMembers.length < 4) {
      setGroupMembers([...groupMembers, selectedStudent]);
      setSelectedStudent(null);
      setNim(''); // Clear NIM input after adding
    }
  };

  const handleSave = () => {
    if (groupMembers.length >= 2 && groupMembers.length <= 4) {
      handleNext();
    } else {
      setErrors({ members: 'Anggota tim harus terdiri dari 2 hingga 4 orang.' });
    }
  };

  const handleCancel = () => {
    setNim('');
    setSelectedStudent(null);
    setGroupMembers([]);
    setErrors({});
  };

  const handleSearchStudent = async () => {
    if (nim.length === 12) {
      // Check if the student is already a member
      if (groupMembers.some(member => member.nim === nim)) {
        setErrors({ search: 'Mahasiswa ini sudah menjadi anggota tim.' });

        return;
      }

      const query = `
      query Mahasiswa($nim: String!) {
        mahasiswa(nim: $nim) {
          nim
          kodeProdi
          nama
        }
      }
    `;

      const variables = { nim };

      try {
        const response = await fetch('https://sicekcok.if.unismuh.ac.id/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        });

        const { data, errors } = await response.json();

        if (errors) {
          setErrors({ search: 'Mahasiswa tidak ditemukan atau terjadi kesalahan.' });
        } else if (data && data.mahasiswa) {
          const student = {
            nim: data.mahasiswa.nim,
            nama: data.mahasiswa.nama,
            prodi: data.mahasiswa.kodeProdi,
            avatar: `https://simak.unismuh.ac.id/upload/mahasiswa/${data.mahasiswa.nim}.jpg`,
          };

          setSelectedStudent(student);
          setErrors({});
        } else {
          setErrors({ search: 'Mahasiswa tidak ditemukan.' });
        }
      } catch (error) {
        setErrors({ search: 'Terjadi kesalahan saat mencari mahasiswa.' });
      }
    } else {
      setErrors({ search: 'NIM harus 12 karakter.' });
    }
  };

  return (
    <Grid container alignItems="center" spacing={4} sx={{ padding: 3 }}>
      <Grid item>
        <img src="/gif/anggota.gif" alt="anggota" width={400} />
      </Grid>
      <Grid item xs>
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Cari Anggota Kelompok
          </Typography>

          {groupMembers.length < 4 && (
            <Box component="form" noValidate autoComplete="off">
              <CustomTextField
                label="NIM"
                variant="outlined"
                fullWidth
                margin="normal"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="tabler-search" />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.search}
                helperText={errors.search}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearchStudent}
                sx={{ marginTop: 2 }}
              >
                Cari Mahasiswa
              </Button>
            </Box>
          )}

          {selectedStudent && (
            <Box sx={{ marginTop: 4, textAlign: 'center' }}>
              <Typography variant="h6">Detail Mahasiswa:</Typography>
              <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
                <Avatar
                  src={selectedStudent.avatar}
                  alt={selectedStudent.nama}
                  sx={{ width: 50, height: 50, marginRight: 2 }}
                />
                <Box>
                  <Typography variant="body1">{selectedStudent.nama}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedStudent.nim} - {selectedStudent.prodi}
                  </Typography>
                </Box>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddMember}
                disabled={groupMembers.length >= 4}
                sx={{ marginTop: 2 }}
              >
                Tambahkan Anggota
              </Button>
            </Box>
          )}

          {errors.members && (
            <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
              {errors.members}
            </Typography>
          )}
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6">Anggota Tim:</Typography>
            <Grid
              container
              spacing={2}
              sx={{
                marginTop: 2,
                justifyContent: groupMembers.length === 2 ? 'center' : 'flex-start',
              }}
            >
              {groupMembers.map((member, index) => (
                <Grid item xs={12} sm={4} md={groupMembers.length === 2 ? 6 : 6} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 2,
                      textAlign: 'center',
                      position: 'relative',
                    }}
                  >
                    <Avatar
                      src={member.avatar}
                      alt={member.nama}
                      sx={{ width: 70, height: 70, marginRight: 3 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {member.nama}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.nim} - {member.prodi}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => {
                        const newMembers = groupMembers.filter((_, i) => i !== index);

                        setGroupMembers(newMembers);
                      }}
                      sx={{ position: 'absolute', top: -4, right: -4 }}
                    >
                      <i className='text-xl tabler-x text-actionActive' />
                    </IconButton>

                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Grid container justifyContent="flex-end" gap={2} marginTop={3}>
            <Button variant="contained" color="error" onClick={handleCancel}>
              Batalkan
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave} disabled={groupMembers.length < 2}>
              Simpan
            </Button>
          </Grid>
          <Typography variant="caption" color="text.secondary">
            * Pastikan data yang diinputkan sudah benar.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StepAnggota;
