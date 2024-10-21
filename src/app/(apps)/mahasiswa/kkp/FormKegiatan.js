'use client';

import React, { useState } from 'react';

import { Container, TextField, Typography, Grid, Button, Box, Card, CardContent, Pagination, Avatar } from '@mui/material';
import { useDropzone } from 'react-dropzone';

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker';
import CustomTextField from '@core/components/mui/TextField';

const FormKegiatan = () => {
  const [activities, setActivities] = useState([{ date: '', activity: '', upload: '' }]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const [date, setDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddActivity = () => {
    const currentActivity = activities[currentPage - 1];

    if (!currentActivity.date || !currentActivity.activity || !currentActivity.upload) {
      setErrorMessage('Semua field harus diisi sebelum menambahkan kegiatan baru.');

      return;
    }

    setErrorMessage('');
    setActivities([...activities, { date: '', activity: '', upload: '' }]);
    setCurrentPage(Math.ceil((activities.length + 1) / itemsPerPage));
  };

  const handleChange = (index, field, value) => {
    const updatedActivities = [...activities];

    updatedActivities[index][field] = value;
    setActivities(updatedActivities);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFileUpload = (index, files) => {
    const updatedActivities = [...activities];

    updatedActivities[index].upload = files[0];
    setActivities(updatedActivities);
  };

  const handleSubmit = () => {
    const hasIncompleteActivity = activities.some(activity => !activity.date || !activity.activity || !activity.upload);

    if (hasIncompleteActivity) {
      setErrorMessage('Semua field harus diisi lengkap sebelum disimpan.');

      return;
    }

    setErrorMessage('');

    // Lakukan tindakan submit di sini, seperti mengirim data ke server
    console.log('Data berhasil disimpan!');
  };

  const paginatedActivities = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const FileUploaderSingle = ({ onFileUpload }) => {
    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg'],
      },
      onDrop: acceptedFiles => {
        const uploadedFiles = acceptedFiles.map(file => Object.assign(file));

        setFiles(uploadedFiles);

        if (onFileUpload) {
          onFileUpload(uploadedFiles);
        }
      },
    });

    const img = files.map(file => (
      <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} style={{ maxWidth: '100%', maxHeight: '150px', marginTop: '10px' }} />
    ));

    return (
      <Box {...getRootProps({ className: 'dropzone' })} sx={{ border: '2px dashed #ccc', p: 2, textAlign: 'center' }}>
        <input {...getInputProps()} />
        {files.length ? (
          img
        ) : (
          <div className='flex flex-col items-center'>
            <Avatar variant='rounded' sx={{ mb: 2 }}>
              <i className='tabler-upload' />
            </Avatar>
            <Typography variant='h6'>
              Seret dan lepas file atau klik di sini.
            </Typography>
          </div>
        )}
      </Box>
    );
  };

  return (
    <Container maxWidth="md">
      {paginatedActivities.map((activity, index) => (
        <Card key={index} sx={{ mb: 3, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <AppReactDatepicker
                    selected={date}
                    id='basic-input'
                    onChange={date => setDate(date)}
                    placeholderText='Pilih Tanggal'
                    customInput={<CustomTextField label='Informasi Kegiatan' fullWidth />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id={`activity-${index}`}
                    label="Deskripsi Kegiatan"
                    multiline
                    rows={4}
                    value={activity.activity}
                    onChange={(e) => handleChange((currentPage - 1) * itemsPerPage + index, 'activity', e.target.value)}
                    placeholder="Jelaskan kegiatan atau pekerjaan yang dilakukan pada hari tersebut"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom> Upload Foto Kegiatan </Typography>
                  <FileUploaderSingle onFileUpload={(files) => handleFileUpload(index, files)} />
                </Grid>
              </Grid>
              {errorMessage && (
                <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                  {errorMessage}
                </Typography>
              )}
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ position: 'absolute', top: 8, right: 16 }}>
              {`Kegiatan ${index + 1} dari ${activities.length}`}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
        <Button variant="outlined" color="primary" onClick={handleAddActivity}>
          Tambah Kegiatan
        </Button>
        <Pagination
          count={Math.ceil(activities.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>
      {/* <Grid container justifyContent="flex-start" sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
          Submit Semua
        </Button>
      </Grid> */}
    </Container>
  );
};

export default FormKegiatan;
