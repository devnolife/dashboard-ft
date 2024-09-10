'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'
import LinearProgress from '@mui/material/LinearProgress'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'

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

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
// import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
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

// Column Definitions
const columnHelper = createColumnHelper()

const getCourseUrl = (courseTitle) => {
  switch (courseTitle.toLowerCase()) {
    case 'lab':
      return '/mahasiswa/lab/'
    case 'kelengkapan kkp':
      return '/koordinator/kkp/persuratan'
    case 'kartu kontrol pa':
      return '/koordinator/pa/kartu-kontrol'
    default:
      return `/course/${courseTitle.toLowerCase().replace(/\s+/g, '-')}` // URL fallback jika tidak ada match
  }
}

const CourseTable = ({ courseData }) => {
  // States
  const [rowSelection, setRowSelection] = useState({})

  const [data, setData] = useState(...[courseData])
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()

  const columns = useMemo(
    () => [
      columnHelper.accessor('courseTitle', {
        header: 'Course Name',
        cell: ({ row }) => {
          const courseUrl = getCourseUrl(row.original.courseTitle)
          return (
            <div className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' skin='light' color={row.original.color}>
                <i className={classnames('text-[28px]', row.original.logo)} />
              </CustomAvatar>
              <div className='flex flex-col'>
                <Typography
                  component={Link}
                  href={courseUrl}
                  className='font-medium hover:text-primary'
                  color='text.primary'
                >
                  {row.original.courseTitle}
                </Typography>
              </div>
            </div>
          )
        }
      }),
      columnHelper.accessor('progressValue', {
        header: 'progress',
        sortingFn: (rowA, rowB) => {
          if (
            !Math.floor((rowA.original.completedTasks / rowA.original.totalTasks) * 100) ||
            !Math.floor((rowB.original.completedTasks / rowB.original.totalTasks) * 100)
          )
            return 0

          return (
            Number(Math.floor((rowA.original.completedTasks / rowA.original.totalTasks) * 100)) -
            Number(Math.floor((rowB.original.completedTasks / rowB.original.totalTasks) * 100))
          )
        },
        cell: ({ row }) => (
          <div className='flex items-center gap-4 min-is-48'>
            <Typography
              className='font-medium'
              color='text.primary'
            >{`${Math.floor((row.original.completedTasks / row.original.totalTasks) * 100)}%`}</Typography>
            <LinearProgress
              color='primary'
              value={Math.floor((row.original.completedTasks / row.original.totalTasks) * 100)}
              variant='determinate'
              className='is-full bs-2'
            />
            <Typography variant='body2'>{`${row.original.completedTasks}/${row.original.totalTasks}`}</Typography>
          </div>
        )
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: data,
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
        pageSize: 6
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

  return (
    <Card>
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
                            asc: <i className='tabler-chevron-up text-xl' />,
                            desc: <i className='tabler-chevron-down text-xl' />
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
  )
}

export default CourseTable
