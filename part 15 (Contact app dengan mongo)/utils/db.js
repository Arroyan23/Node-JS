// untuk mongoose
// connect mongoose ke database oyeng
const mongoose = require("mongoose");
const { type } = require("os");
mongoose.connect("mongodb://127.0.0.1:27017/oyeng", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// // testing debug
// // membuat schema
// // otomatis dibuat dengan contacts karena plural
// const Contact = mongoose.model("Contact", {
//   // di isi dengan field yang ingin di dalam contactnya
//   nama: {
//     type: String,
//     required: true,
//   },
//   nohp: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//   },
// });

// // menambah 1 data
// // dengan membuat object yang baru
// const contact1 = new Contact({
//   nama: "Favian Rasyad",
//   nohp: "60836262729",
//   email: "favianrasyad@gmail.com",
// });

// // simpan ke dalam data base dan tampilkan hasilnya dengan promise
// contact1.save().then((result) => console.log(result));