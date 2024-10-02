// node js

// nama variabelnya bebas
// jika ingin mengimport core module

// const fs = require('fs'); //core module
const cetakNama = require("./satu"); // local module
// const moment = require('moment') // third party module / npm modules / nodes module

console.log(cetakNama.nama("Ahmad Syawqi Arroyan"));
console.log(cetakNama.favianBundir.cetakAlasan());
console.log(cetakNama.favianBundir.nama);

const dataFavian = new cetakNama.cetakFavian(
  "Favian Rasyad",
  "Gabut aja",
  "Bunuh diri"
);

console.log(dataFavian.cetakKenapa());
