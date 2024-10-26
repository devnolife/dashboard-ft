/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Grid, TextField, Box, CardContent } from '@mui/material'

// Third-party Imports
import { v4 as uuidv4 } from 'uuid'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'
import tableStyles from '@core/styles/table.module.css'
import { getInitials } from '@/utils/getInitials'

// Filter function
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

  return itemRank.passed
}

// Debounced input for search filtering
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)


    return () => clearTimeout(timeout)
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Sample data for students
const dataMahasiswa = [
  { nama: 'Andi Ahmad', nim: '2021101010', semester: 5, no_hp: '081234567890', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { nama: 'Budi Setiawan', nim: '2021101011', semester: 5, no_hp: '081234567891', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { nama: 'Citra Puspita', nim: '2021101012', semester: 5, no_hp: '081234567892', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { nama: 'Dewi Anjani', nim: '2021101013', semester: 5, no_hp: '081234567893', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { nama: 'Eko Prasetyo', nim: '2021101014', semester: 5, no_hp: '081234567894', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
]

// Filter component
const TableFilters = ({ setData, tableData }) => {
  const [semester, setSemester] = useState('')

  useEffect(() => {
    const filteredData = tableData?.filter(mahasiswa => {
      if (semester && mahasiswa.semester !== parseInt(semester)) return false

      return true
    })

    setData(filteredData || [])
  }, [semester, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            select
            fullWidth
            id='select-semester'
            value={semester}
            onChange={e => setSemester(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Semester</MenuItem>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
              <MenuItem key={sem} value={sem}>{sem}</MenuItem>
            ))}
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

// Main component for displaying student list and consultation dialog
const ListPaMahasiswa = () => {
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(dataMahasiswa)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null)
  const [consultationList, setConsultationList] = useState([])
  const [newUraian, setNewUraian] = useState('')
  const [newKeterangan, setNewKeterangan] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  const columnHelper = createColumnHelper()

  const handleFormOpen = () => setFormOpen(true)

  const handleDialogOpen = (mahasiswa) => {
    setSelectedMahasiswa(mahasiswa)
    setDialogOpen(true)
  }

  const handleDialogClose = () => setDialogOpen(false)

  const handleFormClose = () => {
    setFormOpen(false)
    setNewUraian('')
    setNewKeterangan('')
  }

  const handleAddConsultation = () => {
    const newConsultation = {
      id: uuidv4(),
      tanggal: new Date().toLocaleDateString(),
      uraian: newUraian,
      keterangan: newKeterangan
    }

    setConsultationList(prevList => [...prevList, newConsultation])
    handleFormClose()
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('nama', {
        header: 'Nama',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            {getAvatar({ avatar: row.original.avatar, fullName: row.original.nama })}
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.nama}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('nim', {
        header: 'NIM',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.nim}
          </Typography>
        )
      }),
      columnHelper.accessor('semester', {
        header: 'Semester',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.semester}
          </Typography>
        )
      }),
      columnHelper.accessor('no_hp', {
        header: 'No HP',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.no_hp}
          </Typography>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <IconButton onClick={() => handleDialogOpen(row.original)}>
            <i className='tabler-plus text-textSecondary' />
          </IconButton>
        ),
        enableSorting: false
      })
    ],
    [data]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: { pageSize: 10 }
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  const getAvatar = params => {
    const { avatar, fullName } = params


    return avatar ? <CustomAvatar src={avatar} size={34} /> : <CustomAvatar size={34}>{getInitials(fullName)}</CustomAvatar>
  }

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <TableFilters setData={setFilteredData} tableData={data} />
        <div className='flex flex-col items-start gap-4 p-6 md:flex-row md:items-center'>
          <CustomTextField select value={table.getState().pagination.pageSize} onChange={e => table.setPageSize(Number(e.target.value))}>
            {[10, 25, 50].map(size => (
              <MenuItem key={size} value={size}>{size}</MenuItem>
            ))}
          </CustomTextField>
          <DebouncedInput value={globalFilter ?? ''} onChange={value => setGlobalFilter(String(value))} placeholder='Cari Mahasiswa' />
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={header.column.getIsSorted() ? 'flex items-center' : 'cursor-pointer select-none'}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getFilteredRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
        />
      </Card>

      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Konsultasi Akademik</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>Daftar konsultasi antara mahasiswa {selectedMahasiswa?.nama} dan dosen sebagai penasehat akademik.</Typography>
          {consultationList.map(consultation => (
            <Card key={consultation.id} variant="outlined" className="mb-4">
              <CardHeader title={`Konsultasi ID: ${consultation.id}`} subheader={`Tanggal: ${consultation.tanggal}`} />
              <Box sx={{ padding: 2 }}>
                <Typography variant="subtitle1" color="textSecondary">Uraian:</Typography>
                <Typography variant="body2">{consultation.uraian}</Typography>
                <Typography variant="subtitle1" color="textSecondary">Keterangan:</Typography>
                <Typography variant="body2">{consultation.keterangan}</Typography>
              </Box>
            </Card>
          ))}
          <Button variant="contained" onClick={handleFormOpen} color="primary" fullWidth className="mt-4">Tambah Konsultasi</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">Tutup</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={formOpen} onClose={handleFormClose} maxWidth="sm" fullWidth>
        <DialogTitle>Tambah Konsultasi</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Uraian" value={newUraian} onChange={e => setNewUraian(e.target.value)} margin="normal" variant="outlined" />
          <TextField fullWidth label="Keterangan" value={newKeterangan} onChange={e => setNewKeterangan(e.target.value)} multiline rows={4} margin="normal" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose} color="secondary">Batal</Button>
          <Button onClick={handleAddConsultation} color="primary">Simpan</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ListPaMahasiswa
