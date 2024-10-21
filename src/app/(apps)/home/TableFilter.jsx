
import { useState, useEffect } from 'react'


import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'


import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({ setData, tableData }) => {

  const [jenisSurat, setJenisSurat] = useState('')
  const [statusSurat, setStatusSurat] = useState('')

  useEffect(() => {
    const filteredData = tableData?.filter(surat => {
      if (jenisSurat && surat.jenisSurat !== jenisSurat) return false
      if (statusSurat && surat.statusSurat !== statusSurat) return false

      return true
    })

    setData(filteredData || [])
  }, [jenisSurat, statusSurat, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        {/* Filter Jenis Surat */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            select
            fullWidth
            id='select-jenis-surat'
            value={jenisSurat}
            onChange={e => setJenisSurat(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Jenis Surat</MenuItem>
            <MenuItem value='Pengajuan'>Pengajuan</MenuItem>
            <MenuItem value='Rekomendasi'>Rekomendasi</MenuItem>
            <MenuItem value='Keterangan'>Keterangan</MenuItem>
            <MenuItem value='Pengantar'>Pengantar</MenuItem>
          </CustomTextField>
        </Grid>

        {/* Filter Status Surat */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            select
            fullWidth
            id='select-status-surat'
            value={statusSurat}
            onChange={e => setStatusSurat(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Status Surat</MenuItem>
            <MenuItem value='Diproses'>Diproses</MenuItem>
            <MenuItem value='Menunggu persetujuan'>Menunggu persetujuan</MenuItem>
            <MenuItem value='Disetujui'>Disetujui</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
