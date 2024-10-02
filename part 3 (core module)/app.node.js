//  Core Module
// File System

const fs = require("fs");

// menuliskan string ke file secara synchronus

// fs.writeFileSync("test.txt", "Hello World secara synchronus");
// fs.writeFileSync("test.txt", "Hallo nama saya royan");

// jika menggunakan asynchronus

// fs.writeFile("test.txt", "Hello World secara asynchronus", (err) => {
//   console.log(err);
// });

// jika ingin membaca isi file
// Secara synchronus
// const data = fs.readFileSync("test.txt"); // atau bisa dengan encoding secara langsung utf 8
// // yang dibaca adalah buffernya
// console.log(data.toString());

// secara asynchronus

// fs.readFile("data/test.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// mencoba readline

// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Masukkan Nama anda : ", (nama) => {
//   rl.question("Masukkan alasan favian bunuh diri : ", (why) => {
//     console.log(`Terimakasih ${nama}`);
//     console.log(`Thank You mr ${why}`);
//     rl.close();
//   });
// });

// membuat contact app yang sederhana

const readline = require("readline");
rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function memasukkanDataJSON(nama, nomorHP) {
  return `
    {
    "nama": ${nama},
    "nomor": ${nomorHP},
    },
    `;
}

rl.question("Masukkan nama anda : ", (nama) => {
  rl.question("Masukkan nomor hp anda : ", (nomor) => {
    const objContact = {
      nama: nama,
      nomorHP: nomor,
    };
    // bikin file yang membaca
    const file = fs.readFileSync("data/phone.json");
    // ubah ke format json
    const contacts = JSON.parse(file);
    contacts.push(objContact);
    // masukkan ke file datanya
    fs.writeFileSync("data/phone.json", JSON.stringify(contacts));
    console.log("Terimakasih Sudah Mengisi datanya");
    rl.close();
  });
});

let dataHP = fs.readFileSync("data/phone.json");

module.exports.data = dataHP;
