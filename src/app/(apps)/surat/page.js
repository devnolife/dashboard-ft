/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import classnames from 'classnames'

import CustomAvatar from '@core/components/mui/Avatar'
import CustomTabList from '@core/components/mui/TabList'

const SettingSurat = () => {
  // State to manage data for each tab
  const [tabData, setTabData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Active Tab State
  const [activeTab, setActiveTab] = useState('jenis-surat')

  // Dialog States
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [formValues, setFormValues] = useState({})

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  // Fetch data when activeTab changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      // If data for the active tab is already fetched, do not fetch again
      if (tabData[activeTab]) {
        setLoading(false)

        return
      }

      try {
        const response = await fetch(`http://localhost:8080/api/${activeTab}`)
        const result = await response.json()

        setTabData(prevData => ({
          ...prevData,
          [activeTab]: result.data, // Assuming the API response structure
        }))
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeTab])

  // Define columns for each tab
  const columns = {
    'jenis-surat': [
      { field: 'nama', headerName: 'Nama' },
      { field: 'kode', headerName: 'Kode' },
    ],
    'masalah-surat': [
      { field: 'masalah', headerName: 'Masalah' },
      { field: 'kode', headerName: 'Kode' },
    ],

    // Add other tabs if needed
  }

  // Get data for the active tab
  const data = tabData[activeTab] || []

  // Handle Edit Dialog Open
  const handleEditOpen = (row) => {
    setSelectedRow(row)
    setFormValues(row)
    setOpenEditDialog(true)
  }

  // Handle Edit Dialog Close
  const handleEditClose = () => {
    setOpenEditDialog(false)
    setSelectedRow(null)
    setFormValues({})
  }

  // Handle Delete Dialog Open
  const handleDeleteOpen = (row) => {
    setSelectedRow(row)
    setOpenDeleteDialog(true)
  }

  // Handle Delete Dialog Close
  const handleDeleteClose = () => {
    setOpenDeleteDialog(false)
    setSelectedRow(null)
  }

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  // Handle Save Changes
  const handleSaveChanges = async () => {
    // Implement API call to update data
    try {
      const response = await fetch(`http://localhost:8080/api/${activeTab}/${selectedRow.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      })

      const result = await response.json()


      // Update state with new data
      setTabData(prevData => {
        const newData = prevData[activeTab].map(item => (item.id === selectedRow.id ? result.data : item))


        return {
          ...prevData,
          [activeTab]: newData,
        }
      })
      handleEditClose()
    } catch (err) {
      console.error('Error updating data:', err)
    }
  }

  const handleConfirmDelete = async () => {
    try {
      await fetch(`http://localhost:8080/api/${activeTab}/${selectedRow.id}`, {
        method: 'DELETE',
      })

      // Update state by removing deleted item
      setTabData(prevData => {
        const newData = prevData[activeTab].filter(item => item.id !== selectedRow.id)


        return {
          ...prevData,
          [activeTab]: newData,
        }
      })
      handleDeleteClose()
    } catch (err) {
      console.error('Error deleting data:', err)
    }
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={5} md={4} xl={3} className="flex flex-col items-center gap-4">
          <CustomTabList orientation="vertical" onChange={handleChange} className="is-full" pill={true}>
            <Tab
              label={<Typography variant="h5">Jenis Surat</Typography>}
              value="jenis-surat"
              icon={<i className={classnames('tabler-file-text', '!mbe-0 mie-1.5', 'text-xl')} />}
              className="flex-row justify-start !min-is-full"
            />
            <Tab
              label={<Typography variant="h5">Tujuan Surat</Typography>}
              value="tujuan-surat"
              icon={<i className={classnames('tabler-map-pin', '!mbe-0 mie-1.5', 'text-xl')} />}
              className="flex-row justify-start !min-is-full"
            />
            <Tab
              label={<Typography variant="h5">Masalah Surat</Typography>}
              value="masalah-surat"
              icon={<i className={classnames('tabler-alert-circle', '!mbe-0 mie-1.5', 'text-xl')} />}
              className="flex-row justify-start !min-is-full"
            />
            <Tab
              label={<Typography variant="h5">Ketentuan Surat</Typography>}
              value="ketentuan-surat"
              icon={<i className={classnames('tabler-file-description', '!mbe-0 mie-1.5', 'text-xl')} />}
              className="flex-row justify-start !min-is-full"
            />
            <Tab
              label={<Typography variant="h5">Profile Admin</Typography>}
              value="profile-admin"
              icon={<i className={classnames('tabler-user', '!mbe-0 mie-1.5', 'text-xl')} />}
              className="flex-row justify-start !min-is-full"
            />
          </CustomTabList>
          <img
            src="/images/illustrations/characters-with-objects/3.png"
            className="max-md:hidden is-[380px]"
            alt="illustration"
          />
        </Grid>
        <Grid item xs={12} sm={7} md={8} xl={9}>
          <TabPanel value={activeTab} className="p-0">
            <div className="flex items-center gap-4 mbe-4">
              <CustomAvatar skin="light" color="primary" variant="rounded" size={50}>
                <i
                  className={classnames(
                    activeTab === 'jenis-surat'
                      ? 'tabler-file-text'
                      : activeTab === 'masalah-surat'
                        ? 'tabler-alert-circle'
                        : activeTab === 'tujuan-surat'
                          ? 'tabler-map-pin'
                          : activeTab === 'ketentuan-surat'
                            ? 'tabler-file-description'
                            : activeTab === 'profile-admin'
                              ? 'tabler-user'
                              : '',
                    'text-4xl'
                  )}
                />
              </CustomAvatar>
              <div>
                <Typography variant="h4">
                  {activeTab === 'jenis-surat' && 'Jenis Surat'}
                  {activeTab === 'masalah-surat' && 'Masalah Surat'}
                  {activeTab === 'tujuan-surat' && 'Tujuan Surat'}
                  {activeTab === 'ketentuan-surat' && 'Ketentuan Surat'}
                  {activeTab === 'profile-admin' && 'Profile Admin'}
                </Typography>
                <Typography variant="h6">
                  {activeTab === 'jenis-surat' && 'Daftar Jenis Surat'}
                  {activeTab === 'masalah-surat' && 'Daftar Masalah Surat'}
                  {activeTab === 'tujuan-surat' && 'Daftar Tujuan Surat'}
                  {activeTab === 'ketentuan-surat' && 'Informasi Ketentuan Surat'}
                  {activeTab === 'profile-admin' && 'Pengaturan Profil Admin'}
                </Typography>
              </div>
            </div>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : error ? (
              <Typography>Error fetching data</Typography>
            ) : (
              <>
                {activeTab === 'profile-admin' ||
                  activeTab === 'ketentuan-surat' ||
                  activeTab === 'tujuan-surat' ? (

                  // Placeholder content for tabs without data
                  <Typography variant="body1">
                    Konten {activeTab.replace('-', ' ')} akan ditampilkan di sini.
                  </Typography>
                ) : (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          {columns[activeTab].map(column => (
                            <TableCell key={column.field}>
                              <Typography variant="subtitle2">{column.headerName}</Typography>
                            </TableCell>
                          ))}
                          <TableCell align="center">
                            <Typography variant="subtitle2">Actions</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            {columns[activeTab].map(column => (
                              <TableCell key={column.field}>
                                {row[column.field]}
                              </TableCell>
                            ))}
                            <TableCell align="center">
                              <IconButton
                                aria-label="edit"
                                onClick={() => handleEditOpen(row)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleDeleteOpen(row)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </>
            )}
          </TabPanel>
        </Grid>
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Data</DialogTitle>
        <DialogContent>
          {columns[activeTab]?.map(column => (
            <TextField
              key={column.field}
              margin="dense"
              label={column.headerName}
              name={column.field}
              value={formValues[column.field] || ''}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSaveChanges} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menghapus data ini?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TabContext>
  )
}

export default SettingSurat
