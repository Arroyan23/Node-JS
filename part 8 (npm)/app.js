// mencoba package validator

const validator = require("validator");
const chalk = require("chalk");
// bisa untuk cek email
console.log(validator.isEmail("syawqiarroyan@gmail.co"));

// contains, comparison dsb
// untuk selanjutnya bisa di cek di dokumentasi
// coba untuk validator isMobbilePhone
// kalau nomor depannya tidak relevan dengan nomor di indo maka akan menghasilkan false
const nomorTelfon = "081218012006";
console.log(validator.isMobilePhone(nomorTelfon, "id-ID"));
// penggunaan isNumeric
console.log(validator.isNumeric("12345893")); // jika ada yang huruf maka akan menghasilkan false

// PENGGUNAAN PACKAGE CHALK
// Bisa membuat cmd lebih bagus karena warnanya

console.log(chalk.blue("Hello World"));
console.log(chalk.bgRed("favian membunuh dirinya"));

// modifier
console.log(chalk.italic("Favian Autisme"));
// tergantung di setiap command line ada yang support ada yang engga

const bobi = "Favian Membunuh Diri";
console.log(chalk.bgCyan(bobi));

// bisa untuk diberikan template literals
//untuk memberikan di bagian mana warna akan di inisiasi
const pesan = chalk`Yang dilakukan favian rasyad adalah {bgRed membunuh} dirinya snediri, dan Nama saya adalah`;
console.log(pesan);
console.log("Hello World");
// PENGGUNAAN NODEMON
// bisa digunakan secara global bisa dipakai di file mana pun
console.log('Halo nama saya favian rasyad dan hobi saya adalah membunuh saya sendiri')
// jadi dia bisa melihat perubahan secara langsung
//  ibarat seperti live server namun dengan metode terminal
// ini adalah inisiasi secara global
// jika ingin di deploy secara lokal/ tidak global

// jika inisiasi lokal maka penggunaannya di package json di bagian start
