"use client";

import { useState } from "react";

// MUI Imports
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// Components Imports
import CustomAvatar from "@core/components/mui/Avatar";

const dataDosenProdi = [
  { name: "TITIN WAHYUNI", profession: "Dosen Prodi", id: "0903058406", avatar: "https://simak.unismuh.ac.id/upload/dosen/0903058406_.jpg" },
  { name: "RIZKI YUSLIANA BAKTI", profession: "Dosen Prodi", id: "0905078907", avatar: "https://simak.unismuh.ac.id/upload/dosen/0905078907_.jpg" },
  { name: "LUKMAN ANAS", profession: "Dosen Prodi", id: "0917109102", avatar: "https://simak.unismuh.ac.id/upload/dosen/0917109102_.jpg" },
  { name: "ASYRAFUL INSAN ASRY", profession: "Dosen Prodi", id: "0918068804", avatar: "https://simak.unismuh.ac.id/upload/dosen/0918068804_.jpg" },
  { name: "MUHYIDDIN A M HAYAT", profession: "Dosen Prodi", id: "0931087901", avatar: "https://simak.unismuh.ac.id/upload/dosen/0931087901_.jpg" },
  { name: "NANDY RIZALDY NAJIB", profession: "Dosen Prodi", id: "0031019003", avatar: "https://simak.unismuh.ac.id/upload/dosen/0031019003_.jpg" },
  { name: "AHMAD THARIQ", profession: "Dosen Prodi", id: "0028069104", avatar: "https://simak.unismuh.ac.id/upload/dosen/0028069104_.jpg" },
  { name: "CHYQUITHA DANUPUTRI", profession: "Dosen Prodi", id: "0431037702", avatar: "https://simak.unismuh.ac.id/upload/dosen/0431037702_.jpg" },
  { name: "LUKMAN", profession: "Dosen Prodi", id: "0921098306", avatar: "https://simak.unismuh.ac.id/upload/dosen/0921098306_.jpg" },
];

const dataPembimbingUjian = [
  { name: "Bentlee Emblin", profession: "Digital Marketing", id: "0905078908", avatar: "/images/avatars/2.png" },
];

const dataPembimbingKKP = [
  { name: "Beverlie Krabbe", profession: "Vue", id: "0905078909", avatar: "/images/avatars/4.png" },
];

const CardDosen = () => {
  // State untuk kategori yang dipilih
  const [selectedCategory, setSelectedCategory] = useState("Prodi");

  // Menentukan data yang akan ditampilkan berdasarkan kategori
  const getData = () => {
    switch (selectedCategory) {
      case "Prodi":
        return dataDosenProdi;
      case "Pembimbing Ujian":
        return dataPembimbingUjian;
      case "Pembimbing KKP":
        return dataPembimbingKKP;
      default:
        return [];
    }
  };

  return (
    <Card className="bs-full">
      <CardHeader
        title="Daftar Dosen"
        action={
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Select Category" }}
            sx={{
              padding: "2px 4px", // Mengurangi padding atas dan bawah
              minWidth: "170px", // Mengatur lebar minimum agar dropdown cukup luas
              marginTop: "-15px", // Menggeser sedikit ke atas jika diperlukan
              marginBottom: "-15px", // Menggeser sedikit ke bawah jika diperlukan
            }}
          >
            <MenuItem value="Prodi">Prodi</MenuItem>
            <MenuItem value="Pembimbing Ujian"> Pembimbing Ujian</MenuItem>
            <MenuItem value="Pembimbing KKP">Pembimbing KKP</MenuItem>
          </Select>
        }
      />
      <Divider />
      <CardContent
        className="flex flex-col gap-4"
        sx={{
          maxHeight: "300px", // Membatasi tinggi konten
          overflowY: "scroll", // Menambahkan scroll secara vertikal
          scrollbarWidth: "none", // Menyembunyikan scrollbar di Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Menyembunyikan scrollbar di Chrome, Safari, dan Opera
          },
        }}
      >
        {getData().map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <CustomAvatar size={34} src={item.avatar} />
            <div className="flex items-center justify-between gap-4 is-full">
              <div>
                <Typography className="font-medium" color="text.primary">
                  {item.name}
                </Typography>
                <Typography variant="body2">{item.profession}</Typography>
              </div>
              <Typography className="font-medium" color="text.primary">
                {item.id}
              </Typography>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CardDosen;
