console.log(`Selamat Datang`);

const fs = require("fs");
const validator = require("validator");
const chalk = require("chalk");
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// membuat folder data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
// membuat file .json jika belom ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  // buatkan array di dalamnya
  // dan format encoding nya ke dalam UTF 8
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// cara mencegah callback hell
// const buatPertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) => {
//     rl.question(pertanyaan, (nama) => {
//       resolve(nama);
//     });
//   });
// };

// abstraksikan sehingga bisa untuk dipakai berkali kali
// dan tidak menimbulkan duplikat yang berulang ulang

const loadContactJSON = () => {
  //   baca filenya
  const contact = fs.readFileSync("data/contacts.json");
  // ubah menjadi json
  const ubahFile = JSON.parse(contact);

  return ubahFile;
};

function masukkanDataContact(nama, email, noHp) {
  const objContact = { nama, email, noHp };

  if (!validator.isEmail(objContact.email)) {
    console.log("Masukkan Email Anda dengan format yang benar");
    return false;
  }

  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(
      `Halo ${nama}, Tolong masukkan nomor hp sesuai dengan format indonesia`
    );
    return false;
  }

  const ubahFile = loadContactJSON();

  const duplikat = ubahFile.find((contacts) => contacts.nama === nama);

  if (duplikat) {
    console.log(`Nama sudah Terdaftar Silahkan coba nama yang lain`);
    return false;
  }

  ubahFile.push(objContact);
  // tuliskan objectnya ke dalam file
  fs.writeFileSync("data/contacts.json", JSON.stringify(ubahFile));
  console.log(`Terimakasih ${nama}, telah membantu mengisi data tersebut`);
}

//   buatkan objectnya

// buat fungsi untuk menampilkan list

const sukses = (tulisan) => {
  console.log(chalk.bgBlue(tulisan));
};

const fail = (tulisan) => {
  console.log(chalk.bgRed(tulisan));
};

const tampilkanList = () => {
  const ubahFile = loadContactJSON();
  sukses("Data Berhasil di Tampilkan");
  ubahFile.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.nama} - ${contact.noHp}`);
  });
};

const detailInformasi = (param) => {
  // munculkan detail informasi terhadap nama yang dikirimkan oleh builder
  const contact = loadContactJSON();
  // gunakan fungsi find
  const temukan = contact.find((parameter) => parameter.nama == param);
  if (!temukan) {
    console.log("Maaf tidak ada nama yang anda cari");
    return false;
  }

  // taro nama dengan variabel temukan ditambah dengan bagan mana yang ingin di taro
  // console.log(temukan); //ini akan melahirkan object yang di dalam array yang sama dengan namanya
  console.log(temukan.nama);
  if (temukan.email) {
    console.log(temukan.email);
  }
  console.log(temukan.noHp);
};

//menghapus data

const deleteFavian = (param) => {
  const contact = loadContactJSON();
  // buat array baru yang memfilter selain nama yang di input

  const newContact = contact.filter((contaca) => contaca.nama !== param);
  if (newContact.length == contact.length) {
    console.log("Maaf nama yang anda cari belum terdaftar");
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContact));
  console.log("Berhasil Di Hapus");
};

// export tiap data yang dibuhkan
module.exports = {
  masukkanDataContact,
  tampilkanList,
  detailInformasi,
  deleteFavian,
};
