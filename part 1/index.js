// console.log("Favian Bunuh Diri");

// // seperti javascript biasanya

// const nama = "Favian membunuh dirinya";

// console.log(nama);

// function perkenalan(nama) {
//   return `Halo nama saya ${nama}`;
// }

// console.log(perkenalan(nama));

// // jadi yang membedakan adalah dia tidak ada object global

// console.log(window);
// // ketika menggunakan file javascript yang lain window masih bisa dipake
// // asal masih di satu file yang sama terhadap html

// file utama bisa di sambungkan dengan file lain di node js

const wasa = require("./app");
// jadi simpan dulu di variabelnya
//
// jika ada function di app namun dipanggil di index maka tidak akan bekerja
// menganut sistem modul, apa yang ada di modul tersebut tak bisa di akses di file lain dengan mudahnya

console.log("Hello World");

// namun bisa memakai key word export

console.log(wasa("Royan"));

// konsep module di dalam node js
// NODE JS MODULES