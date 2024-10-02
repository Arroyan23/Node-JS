// // // agar bisa ditampilkan ke server
// // // menggunakan metode create server
// const http = require("http");
// const fs = require("fs");

// // req apa yang dikirimkan oleh server
// // apa yang di respon
// // namun ada cara untuk menampilkan si node js dengan html

// const renderServer = (path, res) => {
//   fs.readFile(`./public/${path}`, (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.write("Sorry Page Req not Found");
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// };

// const server = http.createServer((req, res) => {
//   // url adalah apa yang dituliskan setelah nama localhost
//   // localhost:3000/about maka urlnya /about
//   const url = req.url;
//   res.writeHead(200, {
//     "Content-Type": "text/html",
//   });

//   switch (url) {
//     case "/about":
//       renderServer("about.html", res);
//       break;
//     case "/contact":
//       renderServer("contact.html", res);
//       break;
//     default:
//       renderServer("index.html", res);
//       break;
//   }
// });
// // atau bisa chaining sehingga tidak perlu buat variabel
// server.listen(3000, () => {
//   console.log("Server is Listening on port 3000");
// });

// MENGGUNAKAN EXPRESS JS YANG LEBIH SIMPLE

// lebih mudah digunakan
import express from "express";
const app = express();
const port = 3000;
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// route nya tidak bisa sembarang

function renderServer(path) {}
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/coba", (req, res) => {
  //   res.json({
  //     nama: "Favian Bunuh Diri",
  //     email: "favianmembunuhdirinya@gmail.com",
  //     noHp: "081218012006",
  //   });
  res.sendFile("./public/contact.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./public/about.html", { root: __dirname });
});

// bisa mendapatkan id usernya
// jadi req.params mendapatkan apa yang ada di dalam http
// req query untuk ambil variabel setelah tanda tanya
// jadi di websitemua product/20?category=shoes
// maka di req.query.category akan keluar tulisan shoes
app.get("/product/:id", (req, res) => {
  res.send(
    "Product ID : " + req.params.id + "<br>Category ID : " + req.query.category
  );
});

// use method untuk menjalankan middleware
// ini jangan di simpan di atas karena awalnya yang dijalankan bagian yang use ini
// sehingga ini digunakan untuk menangani jika tidak ada req nya di dalam
// halaman tersebut

// Request adalah apa yang dikirimkan oleh res
app.use("/", (req, res) => {
  res.status(404);
  res.send(/* html */ `<h1>404 Not Found</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
