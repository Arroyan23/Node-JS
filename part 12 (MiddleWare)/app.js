// MENGGUNAKAN EXPRESS JS YANG LEBIH SIMPLE

// lebih mudah digunakan
import express from "express";
import expressLayouts from "express-ejs-layouts";
const app = express();
const port = 3000;

// penggunaan middleware sebagai identifikasi error dan sebagainya
app.set("view engine", "ejs");
app.use(expressLayouts);

// bisa untuk dengan login fungsi login
// Sebagai awalan untuk menambahkan fungsi autentikasi user
const username = "FavianBunuhDiri";
const password = "123456";

app.use((req, res, next) => {
  if (username == "FavianBunuhDiri" && password == "123456") {
    next();
  } else {
    res.status(401).send("User Tidak Dikenali");
  }
});

app.use((req, res, next) => {
  console.log("User Ini Mengakses Halaman Home");
  next();
});

app.get("/", (req, res) => {
  // bisa mengirimkan data ke halaman index.ejs
  const mahasiswaDinamakan = [
    {
      nama: "Favian Rasyad",
      hobby: "Membunuh Dirinya Sendiri",
    },
    {
      nama: "Sammy Muchammad",
      hobby: "Membunuh Favian Rasyad",
    },
    {
      nama: "Azzam Wartaputra",
      hobby: "Membunuh Binatang dan Memakan Favian Rasyad",
    },
  ];
  res.render("index", {
    layout: "layouts/main-layout",
    nama: "Ahmad Syawqi Arroyan",
    mahasiswaDinamakan,
    title: "Halaman Home",
  });
});

// contoh penggunaan middle ware
// bisa untuk menuliskan css ke dalam html
app.use(express.static("style"));

app.use((req, res, next) => {
  console.log("User ini mengakses halaman contact");
  // setiap dia mengakses halaman contact maka akan di cetak
  // user ini mengakses halaman contact
  next();
});

// mendeteksi apakah orang tersebut mengakses bagian mana
// bisa berguna untuk fungsi login juga

app.get("/contact", (req, res) => {
  // bisa lebih simple pemakaian untuk mendapatkan file dari folder views
  // fitur ejsnya bisa di eksplor lebih di dalam ejs dokumentasi
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
  });
});

// bisa menambahkan variabel yang nantinya disimpan di html
// sekarang ke file .ejs

app.use((req, res, next) => {
  console.log("User Ini Mengakses Halaman About");
  next();
});

// bisa mengirimkan variabel ke layout yang dibuat oleh kita sendiri
app.get("/about", (req, res) => {
  // dengan memberikan nama object maka dibagian body akan otomatis memasukkan bagian yang dituju
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

// Request adalah apa yang dikirimkan oleh res
app.use("/", (req, res) => {
  res.status(404);
  res.send(/* html */ `<h1>404 Not Found</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
