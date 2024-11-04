
'use client'

import { useState } from 'react'

import dynamic from 'next/dynamic'

import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

import CustomTabList from '@core/components/mui/TabList'


const ListPa = dynamic(() => import('./tabPage/KartuPa'))

const TabContent = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'listpa':
        return <ListPa />
      default:
        return <div>Konten tidak tersedia</div>
    }
  }

  return (
    <>
      <TabContext value={activeTab}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
              <Tab icon={<i className='tabler-users' />} value='listpa' label='Akademik' iconPosition='start' />
              <Tab icon={<i className='tabler-lock' />} value='overview' label='KKP' iconPosition='start' />
              <Tab
                icon={<i className='tabler-bookmark' />}
                value='billing-plans'
                label='Ujian Akhir Semester'
                iconPosition='start'
              />
              <Tab
                icon={<i className='tabler-bell' />}
                value='notifications'
                label='Notifications'
                iconPosition='start'
              />
              <Tab icon={<i className='tabler-link' />} value='connections' label='Connections' iconPosition='start' />
            </CustomTabList>
          </Grid>
          <Grid item xs={12}>
            <TabPanel value={activeTab} className='p-0'>
              {renderTabContent()}
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </>
  )
}

const DashboardDosen = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <TabContent />
      </Grid>
    </Grid>
  )
}

export default DashboardDosen
