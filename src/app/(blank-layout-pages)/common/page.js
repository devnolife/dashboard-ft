'use client'
import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Chip } from '@mui/material';

import { OTPInput } from 'input-otp'
import classnames from 'classnames'

import styles from '@/libs/styles/inputOtp.module.css'

const FakeCaret = () => {
  return (
    <div className={styles.fakeCaret}>
      <div className='w-px h-5 bg-textPrimary' />
    </div>
  )
}

const Slot = props => {
  return (
    <div className={classnames(styles.slot, { [styles.slotActive]: props.isActive })}>
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  )
}

const locationData = {
  name: 'Warkop Kopi Kenangan',
  address: 'Jl. Boulevard No.1, Makassar',
  logo: '/logo/kopken.svg',
  keterangan: 'Warkop Kopi Kenangan adalah warkop yang berada di Makassar yang menyediakan berbagai macam minuman kopi.',
};

const fakeData = {
  requestId: 'KKP2023111101',
  prodiCheckMessage: 'Dokumen ini sedang menunggu persetujuan tanda tangan anda. Hasil akan dikirim ke WhatsApp Mahasiswa Bersangkutan.',
  whatsappNote: 'Pastikan WhatsApp Ketua kelompok selalu ON untuk menerima informasi penting.',
  instansi: locationData,
  mahasiswa: [
    {
      nama: 'Andi Muhammad Akbar DB',
      nim: '105841111221',
      prodi: 'Informatika',
      posisi: 'Ketua Kelompok',
      avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111221.jpg',
    },
    {
      nama: 'RIZKA UTAMI',
      nim: '105841111421',
      prodi: 'Informatika',
      posisi: 'Anggota Kelompok',
      avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111421.jpg',
    },
  ]
};

const PreviewDocument = () => {

  const [otp, setOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleVerification = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
    }, 2000); // Simulate 2 seconds loading time
  };

  return (
    <Grid container spacing={6}>
      {loading ? (
        <Grid item xs={12} className='flex justify-center'>
          <img src="/gif/loading.gif" alt="Loading..." width={300} />
        </Grid>
      ) : confirmed ? (
        <Grid item xs={12} className='flex flex-col items-center justify-center'>
          <img src="/gif/thankyou.gif" alt="Thank You" width={300} />
          <Typography variant="h6" sx={{ marginTop: 2, textAlign: 'center' }}>
            Terima kasih telah meluangkan waktu Anda untuk melakukan verifikasi.
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 1, textAlign: 'center' }}>
            Kehadiran dan dukungan Anda sangat penting bagi kami.
            Kami akan segera memproses tanda tangan digital Anda.
          </Typography>
          <Button variant='outlined' sx={{ marginTop: 4 }} >
            Keluar
          </Button>
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <div className='flex flex-col items-center gap-4 text-center'>
              <Typography variant='h4'>Konfirmasi Tanda Tangan Dokumen</Typography>
            </div>
            <Grid item xs={12}>
              <div className='flex flex-col items-center gap-4 text-center'>
                <Typography variant='h5'>Dokumen Menunggu Persetujuan</Typography>
                <Typography>{fakeData.prodiCheckMessage}</Typography>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 0 }}>
            <div className='flex flex-col border rounded md:flex-row'>
              <div className='flex flex-col items-center p-6 is-full sm:items-start'>
                <div
                  className='flex flex-col items-center gap-4 mbe-4'
                  style={{
                    background: 'transparent',
                    borderRadius: 0,
                    boxShadow: 'none',
                  }}
                >
                  <img
                    src={fakeData.instansi.logo}
                    alt={fakeData.instansi.name}
                    width={140}
                    style={{
                      backgroundColor: 'transparent',
                      display: 'block',
                    }}
                  />
                </div>
                <div>
                  <Typography color='text.primary' variant="h6" sx={{ fontWeight: 'bold' }}>
                    Nama Instansi : {fakeData.instansi.name}
                  </Typography>
                  <Typography variant='body1' color='text.primary'>
                    Alamat : {fakeData.instansi.address}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' sx={{ marginTop: 1 }}>
                    Keterangan : {fakeData.instansi.keterangan}
                  </Typography>
                </div>
              </div>
              <div className='flex flex-col items-center p-6 is-full sm:items-start'>
                <div className='flex items-center gap-2 mbe-4'>
                  <i className='text-xl tabler-users text-textPrimary' />
                  <Typography color='text.primary' className='font-medium'>
                    Mahasiswa yang terlibat
                  </Typography>
                </div>
                <div className='flex flex-col gap-4'>
                  {fakeData.mahasiswa.map((student, index) => (
                    <div key={index} className='flex items-center gap-4'>
                      <Avatar src={student.avatar} alt={student.nama} sx={{ width: 50, height: 50 }} />
                      <div>
                        <Typography>{student.nama}</Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {student.nim} - {student.prodi}
                        </Typography>
                        <Chip label={student.posisi} color={student.posisi === 'Ketua Kelompok' ? 'success' : 'info'}
                          size='small' variant='tonal' />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} className='flex justify-center'>
            <div className='flex flex-col sm:w-[450px] p-4 sm:p-12 rounded-lg'>
              <div className='flex flex-col gap-1 mb-3'>
                <Typography sx={{ fontWeight: 'bold', textAlign: 'center', marginTop: 0 }}
                  variant='h4'>Verifikasi Sesi Code 🔐</Typography>
                <Typography>
                  Kami mengirimkan kode verifikasi ke ponsel Anda. Masukkan kode dari ponsel pada kolom di bawah ini.
                </Typography>
              </div>
              <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                  <Typography>Ketikkan kode keamanan 4 digit Anda</Typography>
                  <OTPInput
                    onChange={setOtp}
                    value={otp ?? ''}
                    maxLength={4}
                    containerClassName='flex items-center'
                    render={({ slots }) => (
                      <div className='flex items-center justify-between w-full gap-4'>
                        {slots.slice(0, 4).map((slot, idx) => (
                          <Slot key={idx} {...slot} />
                        ))}
                      </div>
                    )}
                  />
                </div>
                <Button fullWidth variant='contained' type='submit' sx={{ padding: 3, marginBottom: 2 }} onClick={handleVerification}>
                  Verifikasi Kode
                </Button>
              </form>
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PreviewDocument;
