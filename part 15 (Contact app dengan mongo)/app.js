const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const flash = require("connect-flash");
const { body, validationResult, check } = require("express-validator");
require("./utils/db");
const contact = require("./model/contact");

const app = express();

const port = 3000;

app.set("view engine", "ejs");
// jangan lupa di encoded untuk membaca form di html
app.use(express.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
  res.render("login");
});

app.use(expressLayouts);

app.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    layout: "layouts/main-layout.ejs",
    nav: "Dashboard",
  });
});

app.get("/data/add", (req, res) => {
  res.render("addform.ejs", {
    layout: "layouts/main-layout.ejs",
    title: "Add Data",
    nav: "Tambah Data",
  });
});

// fungsi menghapus data dari database

app.get("/data/delete/:nama", async (req, res) => {
  const findContact = await contact.findOne({ nama: req.params.nama });

  if (!findContact) {
    res.status(404).send(/* html */ `<h1>Error not found</h1>`);
  } else {
    contact.deleteOne({ _id: findContact._id }).then((result) => {
      res.redirect("/data");
    });
  }
});

// fitur menambah kan ke database dengan mongo db
app.post(
  "/data",
  [
    body("nama").custom(async (value) => {
      // maka nama yang sama akan di lempar ke error
      // const duplication = contact.cekDuplikat(value);
      const duplication = await contact.findOne({ nama: value });

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
      // kirimkan flash message
      //   jika berhasil tambahkan data ke dalam database dan redirect ke halaman utama
      contact.insertMany(req.body, (error, result) => {
        req.flash("msg", "Data Berhasil Dimasukkan ke tabel");
        res.redirect("/data");
      });
    }
  }
);

app.get("/data", async (req, res) => {
  // tampilkan dengan database
  //   contact.find().then((contact) => {
  //     res.send(contact);
  //   });
  // gunakan async await untuk menjalankan promisenya
  const ambilFile = await contact.find();
  //   kirimkan datanya ke halaman html dengan
  res.render("contact", {
    layout: "layouts/main-layout.ejs",
    nav: "Data Favian",
    dataContact: ambilFile,
    flash: req.flash("msg"),
  });
});

// membuat halaman detail
app.get("/data/:nama", async (req, res) => {
  // const ambilFiles = contact.detailContacts(req.params.nama);
  // gantikan dengan ambil di database
  const ambilFiles = await contact.findOne({ nama: req.params.nama });
  // kirimkan datanya ke halaman html dengan
  res.render("menu", {
    layout: "layouts/main-layout.ejs",
    nav: "Data Favian",
    ambilFiles,
    nama: req.params.nama,
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact App | Listening at port 3000`);
});
