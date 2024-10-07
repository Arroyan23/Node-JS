// Membuat Aplikasi Data yang sangat sederhana
// nama , email, kasus
// menggunakan express validator

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const contact = require("./script/contact.js");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const flash = require("connect-flash");
const { body, validationResult, check } = require("express-validator");
const app = express();
const port = 3000;

// masukkan view engine ejs
app.set("view engine", "ejs");
app.use(express.static("style"));
app.use(express.static("utils"));

// buatkan middle ware untuk menampilkan bagian pesan

app.use(cookieparser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

// untuk menampilkan halaman req.body dan mengubahnya menjadi object
// biar tidak terjadi masalah tambah extended true
app.use(express.urlencoded({ extended: true }));

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
    flash: req.flash("msg"),
  });
});

// menambahkan aksi untuk form menambahkan data
// tambahkan validator untuk mengecek apakah menggunakan email atau tidak
// menambahkan fungsi duplikat / jika ada nama yang sama di dalam json
// jika error pesannya akan tampil di halaman yang sama
app.post(
  "/data",
  [
    body("nama").custom((value) => {
      // maka nama yang sama akan di lempar ke error
      const duplication = contact.cekDuplikat(value);
      if (duplication) {
        throw new Error("Maaf nama yang anda masukkan sudah terdaftar");
      }

      // jika tidak ada duplikat
      return true;
    }),
    check("email", "Maaf anda salah memasukkan format email").isEmail(), //bisa pakai custom msg
    body("nohp").isMobilePhone("id-ID"), // tidak pakai custom msg
  ],
  (req, res) => {
    // gunakan fungsi error
    const errors = validationResult(req);
    // ini akan meng errorkan jika format nya bukan format email
    // dan bisa menambahkan lagi mana yang mau di cek seperti isMobilePhone dsb
    // bisa membuat pesan agar lebih bagus dengan check sehingga bisa kustomisasi pesan error
    if (!errors.isEmpty()) {
      // masukkan render yang baru
      res.render("addform.ejs", {
        layout: "layouts/main-layout.ejs",
        nav: "Add Data",
        error: errors.array(),
      });
    } else {
      contact.addContact(req.body);
      // kirimkan flash message
      req.flash("msg", "Data Berhasil Dimasukkan ke tabel");
      res.redirect("/data");
    }
  }
);

app.get("/data/delete/:nama", (req, res) => {
  // temukan jika di parameternya tidak ada namanya maka
  // gunakan fungsi cekDuplikat
  const findContact = contact.cekDuplikat(req.params.nama);

  if (!findContact) {
    res.status(404).send(/* html */ `<h1>Error not found</h1>`);
  } else {
    contact.deleteContact(req.params.nama);
    res.redirect("/data");
  }
});

app.get("/data/update/:nama", (req, res) => {
  const contactsName = contact.cekDuplikat(req.params.nama);
  res.render("update.ejs", {
    layout: "layouts/main-layout",
    nav: "Update form",
    contactsName,
  });
});

// buat validator untuk formulir update
// copy paste dengan validator tambah
app.post(
  "/data/update",
  [
    body("nama").custom((value, { req }) => {
      // maka nama yang sama akan di lempar ke error
      const duplication = contact.cekDuplikat(value);
      // beri validasi jika nama tidak sama dengan oldName
      // dan namanya ada di bagian json
      if (value !== req.body.oldName && duplication) {
        throw new Error("Maaf nama yang anda masukkan sudah terdaftar");
      }

      // jika tidak ada duplikat
      return true;
    }),
    check("email", "Maaf anda salah memasukkan format email").isEmail(), //bisa pakai custom msg
    body("nohp").isMobilePhone("id-ID"), // tidak pakai custom msg
  ],
  (req, res) => {
    const contactsName = contact.cekDuplikat(req.body.nama);
    // gunakan fungsi error
    const errors = validationResult(req);
    // ini akan meng errorkan jika format nya bukan format email
    // dan bisa menambahkan lagi mana yang mau di cek seperti isMobilePhone dsb
    // bisa membuat pesan agar lebih bagus dengan check sehingga bisa kustomisasi pesan error
    if (!errors.isEmpty()) {
      console.log("Gagal Di uupdate");
      // masukkan render yang baru
      res.render("update.ejs", {
        layout: "layouts/main-layout.ejs",
        nav: "Update Data",
        error: errors.array(),
        contactsName,
      });
    } else {
      // contact.addContact(req.body);
      // // kirimkan flash message
      // req.flash("msg", "Data Berhasil Dimasukkan ke tabel");
      // res.redirect("/data");
      res.send(req.body);
    }
  }
);

app.get("/data/add", (req, res) => {
  res.render("addform.ejs", {
    layout: "layouts/main-layout.ejs",
    title: "Add Data",
    nav: "Tambah Data",
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
