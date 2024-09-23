import { useState } from 'react';

import { Grid, Typography, Box, Paper, Avatar, InputAdornment, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useDropzone } from 'react-dropzone';

import CustomTextField from '@/@core/components/mui/TextField';

const data = [
  {
    name: 'Komisi Pemilihan Umum - Kota Makassar',
    address: 'Jl. Perintis Kemerdekaan No.3, Makassar',
    logo: '/logo/kpu.png',
    keterangan: 'Kantor KPU Kota Makassar adalah kantor yang berada di Kota Makassar yang bertugas untuk mengatur dan melaksanakan pemilihan umum di Kota Makassar.',
  },
  {
    name: 'Kalla Group',
    address: 'Jl. AP Pettarani No.1, Makassar',
    logo: '/logo/kalla.png',
    keterangan: 'Kalla Group adalah sebuah perusahaan yang bergerak di bidang konstruksi, properti, hotel, dan lain-lain.',
  },
  {
    name: 'PDAM Kota Makassar',
    address: 'Jl. Dr. Sam Ratulangi No.52, Makassar',
    logo: '/logo/pdam.png',
    keterangan: 'PDAM Kota Makassar adalah perusahaan daerah yang bergerak di bidang penyediaan air bersih di Kota Makassar.',
  },
  {
    name: 'Balai Bahasa Sulawesi Selatan',
    address: 'Jl. Sultan Alauddin No.259, Makassar',
    logo: '/logo/balai.png',
    keterangan: 'Balai Bahasa Sulawesi Selatan adalah balai bahasa yang berada di Sulawesi Selatan.',
  },
  {
    name: 'TVRI Sulawesi Selatan',
    address: 'Jl. Pajonga Daeng Ngalle No.28, Makassar',
    logo: '/logo/tvri.png',
    keterangan: 'TVRI Sulawesi Selatan adalah stasiun televisi yang berada di Sulawesi Selatan yang merupakan bagian dari TVRI.',
  },
  {
    name: 'Warkop Kopi Kenangan',
    address: 'Jl. Boulevard No.1, Makassar',
    logo: '/logo/kopkep.png',
    keterangan: 'Warkop Kopi Kenangan adalah warkop yang berada di Makassar yang menyediakan berbagai macam minuman kopi.',
  },
];

const FileUploaderSingle = () => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png'],
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)));
    },
  });

  const img = files.map(file => (
    <img key={file.name} alt={file.name} className="single-file-image" src={URL.createObjectURL(file)} />
  ));

  return (
    <Box {...getRootProps({ className: 'dropzone' })} sx={{ border: '1px dashed', borderRadius: 1, padding: 1 }}>
      <input {...getInputProps()} />
      {files.length ? (
        img
      ) : (
        <div className="flex flex-col items-center">
          <Avatar variant="rounded">
            <i className="tabler-upload" />
          </Avatar>
          <Typography>
            Letakkan file di sini atau klik{' '}
            <a href="/" onClick={e => e.preventDefault()} className="no-underline text-textPrimary">
              untuk mengunggah
            </a>{' '}
            file.
          </Typography>
        </div>
      )}
    </Box>
  );
};


const StepLokasi = ({ handleNext }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationOptions] = useState(data);
  const [errors, setErrors] = useState({});


  const validateFields = () => {
    const newErrors = {};

    if (!selectedLocation?.name) {
      newErrors.name = 'Nama Lokasi wajib diisi';
    }

    if (!selectedLocation?.address) {
      newErrors.address = 'Alamat wajib diisi';
    }

    if (!selectedLocation?.keterangan) {
      newErrors.keterangan = 'Keterangan wajib diisi';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateFields()) {
      handleNext();
    }
  };

  const handleCancel = () => {
    setSelectedLocation(null); // Clear all fields by resetting selectedLocation
  }

  const isNewLocation = !locationOptions.find(option => option.name === selectedLocation?.name);

  return (
    <Grid container alignItems="center" spacing={4} sx={{ padding: 3 }}>
      <Grid item>
        <img src="/gif/location.gif" alt="location" width={400} />
      </Grid>
      <Grid item xs>
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Lokasi Kuliah Kerja Profesi
          </Typography>
          {selectedLocation && !isNewLocation && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
              <img
                src={selectedLocation.logo}
                alt={selectedLocation.name}
                style={{ maxWidth: '100px', height: 'auto' }}
              />
            </Box>
          )}
          <Box component="form" noValidate autoComplete="off">
            <Autocomplete
              value={selectedLocation}
              onChange={(event, newValue) => setSelectedLocation(newValue)}
              options={locationOptions}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box component="li" sx={{ display: 'flex', alignItems: 'center' }} {...props}>
                  <img
                    src={option.logo}
                    alt={option.name}
                    style={{ width: 60, height: 30, marginRight: '19px', objectFit: 'contain' }}
                  />
                  <Box>
                    <Typography variant="body1" color="text.primary">
                      {option.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {option.address}
                    </Typography>
                  </Box>
                </Box>
              )}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  label="Nama Lokasi"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <i className="tabler-pin" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <CustomTextField
              label="Alamat"
              variant="outlined"
              fullWidth
              margin="normal"
              value={selectedLocation ? selectedLocation.address : ''}
              error={!!errors.address}
              helperText={errors.address}
              onChange={(e) => setSelectedLocation({ ...selectedLocation, address: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="tabler-road-sign" />
                  </InputAdornment>
                ),
              }}
            />

            <CustomTextField
              label="Keterangan"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
              value={selectedLocation ? selectedLocation.keterangan : ''}
              onChange={(e) => setSelectedLocation({ ...selectedLocation, keterangan: e.target.value })}
              error={!!errors.keterangan}
              helperText={errors.keterangan}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="tabler-info-circle" />
                  </InputAdornment>
                ),
              }}
            />
            {isNewLocation && (
              <Box sx={{ marginTop: 2 }}>
                <Typography
                  sx={{ textAlign: "flex-start" }}
                  variant="h6">Upload Gambar (Opsional)</Typography>
                <FileUploaderSingle />
              </Box>
            )}
          </Box>
          {
            errors.name || errors.address || errors.keterangan ? (
              <Typography variant="caption" color="error">
                * Mohon lengkapi data yang diperlukan.
              </Typography>
            ) : null
          }
          <Grid container justifyContent="flex-end" gap={2} marginTop={3}>
            <Button variant="contained" color="error" onClick={handleCancel}>
              Batalkan
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
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

export default StepLokasi;
