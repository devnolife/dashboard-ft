'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import SearchHeader from './search'
import ListLab from './listlab'


const page = ({mode }) => {
  const courseData = [
    {
      tutorImg: 'https://img.freepik.com/free-vector/webpage-template-with-code_24908-78070.jpg?ga=GA1.1.819313025.1726741947',
      courseTitle: 'Praktikum Dasar-dasar Pemrograman',
      tags: 'pemrograman',
      rating: 4.5,
      ratingCount: 150,
      desc: 'Pelajari dasar-dasar pemrograman, penggunaan variabel, struktur kontrol, fungsi, dan algoritma dasar untuk membangun fondasi yang kuat dalam pengembangan perangkat lunak.',
      completedTasks: 5,
      totalTasks: 10,
      time: '2h left',
    },
    {
      tutorImg: 'https://images.unsplash.com/photo-1535083138043-c9ed558d2dc7?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      courseTitle: 'Dasar-dasar Perintah Baris (Linux, Git dan Github)',
      tags: 'perintash baris',
      rating: 4.8,
      ratingCount: 200,
      desc: 'Pelajari dasar-dasar perintah baris, penggunaan Git dan Github untuk mengelola kode sumber, dan penggunaan Linux sebagai sistem operasi.',
      completedTasks: 10,
      totalTasks: 10,
      time: 'Completed',
    },
    {
      tutorImg: 'https://img.freepik.com/free-vector/flat-design-illustrated-cms-desktop_23-2148797334.jpg?ga=GA1.1.819313025.1726741947',
      courseTitle: 'Praktikum Pemrograman Lanjut',
      tags: 'pemrograman',
      rating: 4.7,
      ratingCount: 180,
      desc: 'Pelajari konsep pemrograman lanjut, penggunaan struktur data, algoritma, dan paradigma pemrograman.',
      completedTasks: 8,
      totalTasks: 12,
      time: '1h left',
    },
    {
      tutorImg: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-sql-illustration_23-2149245997.jpg?ga=GA1.1.819313025.1726741947&semt=ais_hybrid',
      courseTitle: 'Praktikum Struktur Data',
      tags: 'database',
      rating: 4.9,
      ratingCount: 230,
      desc: 'Pelajari konsep struktur data, penggunaan algoritma, dan implementasi struktur data dalam pemrograman.',
      completedTasks: 4,
      totalTasks: 6,
      time: '30m left',
    },
    {
      tutorImg: 'https://img.freepik.com/free-vector/abstract-technology-sql-illustration_23-2149229487.jpg?ga=GA1.1.819313025.1726741947&semt=ais_hybrid',
      courseTitle: 'Lab Sistem Basis Data',
      tags: 'database',
      rating: 4.6,
      ratingCount: 170,
      desc: 'Pelajari konsep basis data, penggunaan SQL, dan implementasi basis data dalam pemrograman.',
      completedTasks: 6,
      totalTasks: 10,
      time: '3h left',
    },
    {
      tutorImg: 'https://images.unsplash.com/photo-1535083138043-c9ed558d2dc7?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      courseTitle: 'Praktikum Strategi Algoritma',
      tags: 'algoritma',
      rating: 4.4,
      ratingCount: 110,
      desc: 'Pelajari konsep strategi algoritma, penggunaan algoritma greedy, algoritma divide and conquer, dan algoritma dinamis.',
      completedTasks: 2,
      totalTasks: 5,
      time: '4h left',
    },
    {
        tutorImg: 'https://img.freepik.com/free-vector/gradient-npl-illustration_23-2149266853.jpg?ga=GA1.1.819313025.1726741947',
        courseTitle: 'Pemrograman Python untuk AI dan Data Science',
        tags: 'pemrograman',
        rating: 4.4,
        ratingCount: 110,
        desc: 'Pelajari konsep pemrograman Python, penggunaan library Python untuk kecerdasan buatan dan olah data.',
        completedTasks: 2,
        totalTasks: 5,
        time: '4h left',
    },
    {
        tutorImg: 'https://images.unsplash.com/photo-1535083138043-c9ed558d2dc7?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        courseTitle: 'Lab Pemrograman WEB',
        tags: 'pemrograman',
        rating: 4.4,
        ratingCount: 110,
        desc: 'Pelajari konsep pemrograman web, penggunaan HTML, CSS, dan JavaScript untuk membangun aplikasi web.',
        completedTasks: 2,
        totalTasks: 5,
        time: '4h left',
    },
    {
        tutorImg: 'https://images.unsplash.com/photo-1535083138043-c9ed558d2dc7?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        courseTitle: 'Praktikum Jaringan Komputer',
        tags: 'jarkom',
        rating: 4.4,
        ratingCount: 110,
        desc: 'Pelajari konsep jaringan komputer, penggunaan protokol jaringan, dan implementasi jaringan komputer.',
        completedTasks: 2,
        totalTasks: 5,
        time: '4h left',
    },
    {
        tutorImg: 'https://images.unsplash.com/photo-1535083138043-c9ed558d2dc7?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        courseTitle: 'Lab Jaringan Komputer Lanjut',
        tags: 'jarkom',
        rating: 4.4,
        ratingCount: 110,
        desc: 'Jaringan komputer lanjut, mendalami lebih dalam konsep jaringan komputer, penggunaan protokol jaringan, dan implementasi jaringan komputer.',
        completedTasks: 2,
        totalTasks: 5,
        time: '4h left',
    },
    {
        tutorImg: 'https://images.unsplash.com/photo-1535083138043-c9ed558d2dc7?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        courseTitle: 'Lab Cloud Computing',
        tags: 'cloud',
        rating: 4.4,
        ratingCount: 110,
        desc: 'Pelajari konsep cloud computing, penggunaan layanan cloud, dan implementasi cloud computing.',
        completedTasks: 2,
        totalTasks: 5,
        time: '4h left',
    },
    {
        tutorImg: 'https://img.freepik.com/free-vector/flat-design-api-illustration_23-2149363700.jpg?ga=GA1.1.819313025.1726741947',
        courseTitle: 'Lab Backend Developer',
        tags: 'backend',
        rating: 4.4,
        ratingCount: 110,
        desc: 'Pelajari konsep backend developer, penggunaan Node.js, Express.js, dan MongoDB untuk membangun aplikasi backend.',
        completedTasks: 2,
        totalTasks: 5,
        time: '4h left',
    },
    {
        tutorImg: 'https://images.unsplash.com/photo-1535083138043-c9ed558d2dc7?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        courseTitle: 'Lab Cyber Security',
        tags: 'cybersecurity',
        rating: 4.4,
        ratingCount: 110,
        desc: 'Pelajari konsep cyber security, penggunaan teknik hacking, dan implementasi keamanan siber.',
        completedTasks: 2,
        totalTasks: 5,
        time: '4h left',
    },
    {
        tutorImg: 'https://images.unsplash.com/photo-1535083138043-c9ed558d2dc7?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        courseTitle: 'Praktikum Pemrograman Multimedia',
        tags: 'pemrograman',
        rating: 4.4,
        ratingCount: 110,
        desc: 'Pemrograman multimedia, penggunaan teknologi multimedia, dan implementasi pemrograman multimedia.',
        completedTasks: 2,
        totalTasks: 5,
        time: '4h left',
    },
    {
        tutorImg: 'https://img.freepik.com/free-vector/ui-ux-designers-isometric-background_1284-71566.jpg?ga=GA1.1.819313025.1726741947',
        courseTitle: 'Praktikum Komputasi Bergerak',
        tags: 'pemrograman',
        rating: 4.4,
        ratingCount: 110,
        desc: 'Komputasi bergerak, penggunaan teknologi mobile, dan implementasi komputasi bergerak.',
        completedTasks: 2,
        totalTasks: 5,
        time: '4h left',
    },
  ];

  const [searchValue, setSearchValue] = useState('')

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SearchHeader mode={mode} searchValue={searchValue} setSearchValue={setSearchValue} />
      </Grid>
      <Grid item xs={12}>
        <ListLab courseData={courseData} searchValue={searchValue} />
      </Grid>
    </Grid>
  )
}

export default page
