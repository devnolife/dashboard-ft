'use client'

import { useState, useEffect, useMemo } from 'react'

import Link from 'next/link'

import Card from '@mui/material/Card'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

import classnames from 'classnames'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

import CustomAvatar from '@core/components/mui/Avatar'

import tableStyles from '@core/styles/table.module.css'

const columnHelper = createColumnHelper()

const dataProgress = [
  {
    id: 1,
    completedTasks: 2,
    totalTasks: 7,
    logo: 'tabler-clipboard',
    color: 'success',
    progress: 'Kartu Kontrol PA',
    status: 'aktif',
    url: '/mahasiswa/kontrol-pa'
  },
  {
    id: 2,
    completedTasks: 2,
    totalTasks: 10,
    logo: 'tabler-flask',
    color: 'warning',
    progress: 'Praktikum/Laboratorium',
    status: 'aktif',
    url: '/mahasiswa/lab'
  },
  {
    id: 3,
    completedTasks: 1,
    totalTasks: 6,
    logo: 'tabler-file-check',
    color: 'info',
    progress: 'Kuliah Kerja Profesi',
    status: 'aktif',
    url: '/mahasiswa/kkp'
  },
  {
    id: 4,
    completedTasks: 0,
    totalTasks: 10,
    logo: 'tabler-pencil',
    color: 'success',
    progress: 'Proposal',
    status: 'nonaktif',
    url: '/mahasiswa/ujian-proposal'
  },
  {
    id: 5,
    completedTasks: 0,
    totalTasks: 4,
    logo: 'tabler-medal',
    color: 'primary',
    progress: 'Ujian Hasil',
    status: 'nonaktif',
    url: '/mahasiswa/ujian-hasil'
  },
  {
    id: 6,
    completedTasks: 0,
    totalTasks: 25,
    logo: 'tabler-graduation-cap',
    color: 'info',
    progress: 'Ujian Tutup',
    status: 'nonaktif',
    url: '/mahasiswa/ujian-tutup'
  },
]

const TableProgress = () => {
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo(
    () => [
      columnHelper.accessor('progress', {
        header: 'List Progress',
        cell: ({ row }) => {

          const isDisabled = row.original.status === 'nonaktif'

          return (
            <div className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' skin='light' color={row.original.color}>
                <i className={classnames('text-[28px]', row.original.logo)} />
              </CustomAvatar>
              <div className='flex flex-col'>
                <Typography
                  component={isDisabled ? 'span' : Link}
                  href={isDisabled ? undefined : row.original.url}
                  className={classnames('font-medium', {
                    'hover:text-primary': !isDisabled,
                    'text-gray-400 cursor-not-allowed': isDisabled,
                  })}
                  color={isDisabled ? 'text.secondary' : 'text.primary'}
                >
                  {row.original.progress}
                </Typography>
              </div>
            </div>
          )
        }
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Typography className={classnames('font-medium', {
            'text-green-600': row.original.status === 'aktif',
            'text-red-600': row.original.status === 'nonaktif',
          })}>
            {row.original.status}
          </Typography>
        ),
      }),
      columnHelper.accessor('progressValue', {
        header: 'Progress',
        cell: ({ row }) => {
          const isDisabled = row.original.status === 'nonaktif'
          const progressValue = Math.floor((row.original.completedTasks / row.original.totalTasks) * 100)

          return (
            <div className='flex items-center gap-4 min-is-48'>
              <Typography
                className={classnames('font-medium', {
                  'text-gray-400': isDisabled, // Disabled style for text
                  'text-primary': !isDisabled, // Active style for text
                })}
              >
                {`${progressValue}%`}
              </Typography>
              <LinearProgress
                color={isDisabled ? 'inherit' : 'primary'} // Make progress bar gray if disabled
                value={progressValue}
                variant='determinate'
                className={classnames('is-full bs-2', {
                  'bg-gray-200': isDisabled, // Gray background for disabled progress
                })}
                sx={{
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: isDisabled ? '#b0b0b0' : undefined, // Gray bar if disabled
                  },
                }}
              />
              <Typography
                variant='body2'
                className={classnames({
                  'text-gray-400': isDisabled, // Disabled style for completed/total tasks
                })}
              >
                {`${row.original.completedTasks}/${row.original.totalTasks}`}
              </Typography>
            </div>
          )
        }
      }),
    ],
    []
  )

  const table = useReactTable({
    data: dataProgress,
    columns,
    state: {
      rowSelection,
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Card>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {!header.isPlaceholder && (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() && (
                          <i className={`text-xl tabler-chevron-${header.column.getIsSorted() === 'asc' ? 'up' : 'down'}`} />
                        )}
                      </div>
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
                  <Typography variant='body2' color='textSecondary'>
                    No data available
                  </Typography>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </Card>
  )
}

export default TableProgress
