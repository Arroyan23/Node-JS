// Membuat Aplikasi Data yang sangat sederhana
// nama , email, kasus

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const contact = require("./script/contact.js");
const app = express();
const port = 3000;

// masukkan view engine ejs
app.set("view engine", "ejs");
app.use(express.static("style"));
app.use(express.static("utils"));

// lempar ke halaman login . ejs
// buat fungsi login sederhana

app.get("/", (req, res) => {
  res.render("login");
});

app.use(expressLayout);

app.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    layout: "layouts/main-layout.ejs",
    nav: "Dashboard",
  });
});

app.get("/data", (req, res) => {
  const ambilFile = contact.loadFavianJSON();
  // kirimkan datanya ke halaman html dengan
  res.render("contact", {
    layout: "layouts/main-layout.ejs",
    nav: "Data Favian",
    dataContact: ambilFile,
  });
});

// membuat halaman detail
app.get("/data/:nama", (req, res) => {
  const ambilFiles = contact.detailContacts(req.params.nama);
  // kirimkan datanya ke halaman html dengan
  res.render("menu", {
    layout: "layouts/main-layout.ejs",
    nav: "Data Favian",
    ambilFiles,
    nama: req.params.nama,
  });
});

app.listen(port, () => {
  console.log(`App is Listening on port ${port}`);
});
