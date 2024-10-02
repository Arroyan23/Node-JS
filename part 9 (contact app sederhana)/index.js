// membuat contact app sederhana
// MENGUPGRADE

// jadi dengan memanggil require maka sudah memanggil komponen yang di jalankan dalam file tersebut
const contacts = require("./contacts");

// const main = async () => {
//   const nama = await contacts.buatPertanyaan("Tuliskan Nama Anda : ");
//   const email = await contacts.buatPertanyaan("Tuliskan Nama Email Anda : ");
//   const noHp = await contacts.buatPertanyaan("Tuliskan Nomor Hp Anda : ");

//   contacts.masukkanDataContact(nama, email, noHp);
// };

// main();

// Mengambil argumen dari command line

// console.log(process.argv[2]); // jadi dia bisa mengambil elemen yang ditulis ke dalam command line
// denan menggunakan process.argv dan memanggil nya bisa dengan menggunakan index array

// MENGGUNAKAN NPM YARGS
const yargs = require("yargs");

// yargs.command(
//   "add",
//   "Menambahkan contact baru",
//   () => {},
//   (argv) => {
//     console.log(argv.nama);
//   }
// );

yargs
  .command({
    command: "add",
    describe: "Menambahkan Kontak",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Masukkan alamat email anda",
        demandOption: false,
        type: "string",
      },
      nohp: {
        describe: "Masukkan Nomor Hp",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      const { nama, email, nohp } = {
        nama: argv.nama,
        email: argv.email,
        nohp: argv.nohp,
      };

      contacts.masukkanDataContact(nama, email, nohp);
    },
  })
  // untuk mewaujibkan menambahkan command
  .demandCommand();

// tambahkan fungsi untuk melihat contact
yargs.command({
  command: "list",
  describe: "Menampilkan List Dari Contact Contact",
  builder: () => {},
  handler() {
    contacts.tampilkanList();
  },
});

yargs.command({
  command: "detail",
  describe: "Masukkan Nama untuk mencari informasi",
  builder: {
    nama: {
      describe: "Masukkan Nama dan abaikan kapital",
      demandCommand: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailInformasi(argv.nama);
  },
});

yargs.command({
  command: "delete",
  describe: "Masukkan nama yang ingin anda hapus",
  builder: {
    nama: {
      describe: "Masukkan nama yang benar",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteFavian(argv.nama); //ambil parameter namanya woiiii argv.nama
  },
});

// di command tertulisnya node . add --nama="Royan"
// menampilkan daftar semua contact

yargs.parse();
