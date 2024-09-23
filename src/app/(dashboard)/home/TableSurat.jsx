'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

import TableFilters from './TableFilter'
import CreatedSurat from './CratedSurat'
import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({
    itemRank
  })
  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const userRoleObj = {
  admin: { icon: 'tabler-crown', color: 'error' },
  author: { icon: 'tabler-device-desktop', color: 'warning' },
  editor: { icon: 'tabler-edit', color: 'info' },
  maintainer: { icon: 'tabler-chart-pie', color: 'success' },
  subscriber: { icon: 'tabler-user', color: 'primary' }
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}
const db = [
  {
    id: 1,
    nomorSurat: '001/KKP/2024',
    judulSurat: 'Pengajuan KKP',
    jenisSurat: 'Pengajuan',
    penerima: 'Arief Kurniawan',
    negara: 'Indonesia',
    kontak: '(479) 232-9151',
    email: 'arief.kurniawan@abc.net.au',
    statusSurat: 'Diproses',
    avatar: '',
    avatarColor: 'primary',
    metodePengambilan: 'Diambil langsung'
  },
  {
    id: 2,
    nomorSurat: '002/Beasiswa/2024',
    judulSurat: 'Rekomendasi Beasiswa',
    jenisSurat: 'Rekomendasi',
    penerima: 'Nur Azizah',
    negara: 'Indonesia',
    kontak: '(472) 607-9137',
    email: 'nur.azizah@imgur.com',
    statusSurat: 'Menunggu persetujuan',
    avatar: '/images/avatars/3.png',
    metodePengambilan: 'Diambil langsung'
  },
  {
    id: 3,
    nomorSurat: '003/Lulus/2024',
    judulSurat: 'Surat Keterangan Lulus',
    jenisSurat: 'Keterangan',
    penerima: 'Dwi Santoso',
    negara: 'Indonesia',
    kontak: '(321) 264-4599',
    email: 'dwi.santoso@who.int',
    statusSurat: 'Disetujui',
    avatar: '/images/avatars/1.png',
    metodePengambilan: 'Dikirim via email'
  },
  {
    id: 4,
    nomorSurat: '004/SKP/2024',
    judulSurat: 'Pengajuan SKP',
    jenisSurat: 'Pengajuan',
    penerima: 'Cyrill Risby',
    negara: 'Indonesia',
    kontak: '(923) 690-6806',
    email: 'cyrill.risby@wordpress.com',
    statusSurat: 'Diproses',
    avatar: '/images/avatars/3.png',
    metodePengambilan: 'Dikirim via email'
  },
  {
    id: 5,
    nomorSurat: '005/KKP/2024',
    judulSurat: 'Surat Pengantar KKP',
    jenisSurat: 'Pengantar',
    penerima: 'Maggy Hurran',
    negara: 'Indonesia',
    kontak: '(669) 914-1078',
    email: 'maggy.hurran@yahoo.co.jp',
    statusSurat: 'Menunggu persetujuan',
    avatar: '/images/avatars/1.png',
    metodePengambilan: 'Diambil langsung'
  },
  {
    id: 6,
    nomorSurat: '006/Beasiswa/2024',
    judulSurat: 'Pengajuan Beasiswa',
    jenisSurat: 'Pengajuan',
    penerima: 'Silvain Halstead',
    negara: 'Indonesia',
    kontak: '(958) 973-3093',
    email: 'silvain.halstead@shinystat.com',
    statusSurat: 'Diproses',
    avatar: '',
    avatarColor: 'error',
    metodePengambilan: 'Dikirim via email'
  },
  {
    id: 7,
    nomorSurat: '007/Lulus/2024',
    judulSurat: 'Surat Keterangan Lulus',
    jenisSurat: 'Keterangan',
    penerima: 'Breena Gallemore',
    negara: 'Indonesia',
    kontak: '(825) 977-8152',
    email: 'breena.gallemore@boston.com',
    statusSurat: 'Disetujui',
    avatar: '',
    avatarColor: 'warning',
    metodePengambilan: 'Dikirim via email'
  },
  {
    id: 8,
    nomorSurat: '008/Beasiswa/2024',
    judulSurat: 'Rekomendasi Beasiswa',
    jenisSurat: 'Rekomendasi',
    penerima: 'Kathryne Liger',
    negara: 'Indonesia',
    kontak: '(187) 440-0934',
    email: 'kathryne.liger@vinaora.com',
    statusSurat: 'Diproses',
    avatar: '/images/avatars/4.png',
    metodePengambilan: 'Diambil langsung'
  },
  {
    id: 9,
    nomorSurat: '009/SKP/2024',
    judulSurat: 'Surat Pengantar SKP',
    jenisSurat: 'Pengantar',
    penerima: 'Franz Scotfurth',
    negara: 'Indonesia',
    kontak: '(978) 146-5443',
    email: 'franz.scotfurth@dailymotion.com',
    statusSurat: 'Menunggu persetujuan',
    avatar: '/images/avatars/2.png',
    metodePengambilan: 'Dikirim via email'
  }
]

// Column Definitions
const columnHelper = createColumnHelper()

const SuratListTable = () => {
  // States
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(...[db])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('nomorSurat', {
        header: 'Nomor Surat',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.nomorSurat}
          </Typography>
        )
      }),
      columnHelper.accessor('judulSurat', {
        header: 'Judul Surat',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.judulSurat}
          </Typography>
        )
      }),
      columnHelper.accessor('jenisSurat', {
        header: 'Jenis Surat',
        cell: ({ row }) => (
          <Typography color='text.primary' className='capitalize'>
            {row.original.jenisSurat}
          </Typography>
        )
      }),
      columnHelper.accessor('penerima', {
        header: 'Penerima',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            {getAvatar({ avatar: row.original.avatar, fullName: row.original.penerima })}
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.penerima}
              </Typography>
              <Typography variant='body2'>{row.original.kontak}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('statusSurat', {
        header: 'Status Surat',
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={row.original.statusSurat}
            size='small'
            color={userStatusObj[row.original.statusSurat]}
            className='capitalize'
          />
        )
      }),
      columnHelper.accessor('metodePengambilan', {
        header: 'Metode Pengambilan',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.metodePengambilan}
          </Typography>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => setData(data?.filter(surat => surat.id !== row.original.id))}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <IconButton>
              <Link href={'/apps/surat/view'} className='flex'>
                <i className='tabler-eye text-textSecondary' />
              </Link>
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Download',
                  icon: 'tabler-download',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                },
                {
                  text: 'Edit',
                  icon: 'tabler-edit',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, filteredData]
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
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const getAvatar = params => {
    const { avatar, fullName } = params

    if (avatar) {
      return <CustomAvatar src={avatar} size={34} />
    } else {
      return <CustomAvatar size={34}>{getInitials(fullName)}</CustomAvatar>
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <TableFilters setData={setFilteredData} tableData={data} />
        <div className='flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-center border-bs'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='max-sm:is-full sm:is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col items-start gap-4 sm:flex-row max-sm:is-full sm:items-center'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search User'
              className='max-sm:is-full'
            />
            <Button
              color='secondary'
              variant='tonal'
              startIcon={<i className='tabler-upload' />}
              className='max-sm:is-full'
            >
              Export
            </Button>
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddUserOpen(!addUserOpen)}
              className='max-sm:is-full'
            >
              Tambahkan Surat Baru
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='text-xl tabler-chevron-up' />,
                              desc: <i className='text-xl tabler-chevron-down' />
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
      <CreatedSurat
        open={addUserOpen}
        handleClose={() => setAddUserOpen(!addUserOpen)}
        userData={data}
        setData={setData}
      />
    </>
  )
}

export default SuratListTable
