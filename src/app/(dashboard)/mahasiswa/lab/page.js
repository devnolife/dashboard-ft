'use client'

import { useState } from 'react'
import Grid from '@mui/material/Grid'
import SearchHeader from './search'
import ListLab from './listlab'

const data = [
  {
    namaLab: 'Pemrograman Dasar',
    semester: 'Semester 1',
    tags: 'pemrograman',
    pengurusLab: 'Dai Daifullah',
    gambarLab: 'https://c4.wallpaperflare.com/wallpaper/974/747/684/java-developer-hd-wallpaper-preview.jpg',
    desc: 'Lab ini fokus pada dasar-dasar pemrograman menggunakan bahasa java.',
    totalTasks: 10,
    completedTasks: 7,
    time: 180 // dalam jam
  },
  {
    namaLab: 'Basic Command Line , Git & Github',
    semester: 'Semester 1',
    tags: 'algoritma',
    pengurusLab: 'Akbar DB Posgrest',
    gambarLab: 'https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    desc: 'Lab ini mendalami algoritma dan struktur data menggunakan C++.',
    totalTasks: 12,
    completedTasks: 12,
    time: 120 // dalam jam, menunjukkan telah selesai
  },
  {
    namaLab: 'Algoritma & Struktur Data',
    semester: 'Semester 2',
    tags: 'jarkom',
    pengurusLab: 'Asgart Asgard',
    gambarLab: 'https://plus.unsplash.com/premium_photo-1663050633633-2856e875dcc7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    desc: 'Lab ini mengajarkan dasar-dasar jaringan komputer dan protokol jaringan.',
    totalTasks: 8,
    completedTasks: 5,
    time: 120 // dalam jam
  },
  {
    namaLab: 'Database',
    semester: 'Semester 4',
    tags: 'database',
    pengurusLab: 'Emily Davis',
    gambarLab: '/images/lab-database.jpg',
    desc: 'Lab ini berfokus pada desain dan manajemen database menggunakan MySQL.',
    totalTasks: 10,
    completedTasks: 10,
    time: 0 // dalam jam, menunjukkan telah selesai
  },
  {
    namaLab: 'Cloud Computing',
    semester: 'Semester 5',
    tags: 'cloud',
    pengurusLab: 'Michael Johnson',
    gambarLab: '/images/lab-cloud.jpg',
    desc: 'Lab ini mengeksplorasi komputasi awan dan penerapannya menggunakan AWS.',
    totalTasks: 9,
    completedTasks: 4,
    time: 10 // dalam jam
  }
];


const page = ({ mode }) => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SearchHeader mode={mode} searchValue={searchValue} setSearchValue={setSearchValue} />
      </Grid>
      <Grid item xs={12}>
        <ListLab searchValue={searchValue} courseData={data} />
      </Grid>
    </Grid>
  )
}

export default page
