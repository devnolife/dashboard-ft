'use client';

import React, { useState, useEffect } from 'react';
// MUI Imports
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import classnames from 'classnames';

// Component Imports
import CustomIconButton from '@core/components/mui/IconButton';
import { Link } from '@mui/material';

const CardKelompok = () => {
  const data = [
    {
      nama: 'Andi Muhammad Akbar DB',
      nim: '105841111221',
      prodi: 'Informatika',
      posisi: 'Ketua Kelompok',
      avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111221.jpg',
      kehadiran: 10,
      alpa: 25,
      berhasil: 15,
      isConnected: true,
      chips: [
        { posisi: 'Ketua Kelompok', color: 'primary' }
      ]
    },
    {
      nama: 'RIZKA UTAMI',
      nim: '105841111421',
      prodi: 'Informatika',
      posisi: 'Anggota Kelompok',
      avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111421.jpg',
      kehadiran: 8,
      alpa: 18,
      berhasil: 12,
      isConnected: false,
      chips: [
        { posisi: 'Anggota Kelompok', color: 'secondary' }
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const currentItem = data[currentIndex];

  return (
    <Grid>
      <Card>
        <CardContent className='flex flex-col items-center gap-6'>
          <Avatar src={currentItem.avatar} className='!mbs-5 bs-[100px] is-[100px]' />
          <div className='flex flex-col items-center'>
            <Typography variant='h5'>{currentItem.nama}</Typography>
            <Typography>{currentItem.prodi}</Typography>
          </div>
          <div className='flex items-center gap-4'>
            {currentItem.chips.map((chip, index) => (
              <Link key={index}>
                <Chip variant='tonal' label={chip.posisi} color={chip.color} size='small' />
              </Link>
            ))}
          </div>
          <div className='flex flex-wrap items-center justify-around is-full'>
            <div className='flex flex-col items-center'>
              <Typography variant='h5'>{currentItem.kehadiran}</Typography>
              <Typography>Absen</Typography>
            </div>
            <div className='flex flex-col items-center'>
              <Typography variant='h5'>{currentItem.alpa}</Typography>
              <Typography>Alpha</Typography>
            </div>
            <div className='flex flex-col items-center'>
              <Typography variant='h5'>{currentItem.berhasil}</Typography>
              <Typography>Selesai</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <Button
              variant={currentItem.isConnected ? 'contained' : 'tonal'}
              startIcon={<i className={currentItem.isConnected ? 'tabler-user-check' : 'tabler-user-plus'} />}
            >
              {currentItem.isConnected ? 'Connected' : 'Connect'}
            </Button>
            <CustomIconButton variant='tonal' color='secondary'>
              <i className='tabler-mail' />
            </CustomIconButton>
          </div>
        </CardContent>
      </Card>

    </Grid>
  );
};

export default CardKelompok;
