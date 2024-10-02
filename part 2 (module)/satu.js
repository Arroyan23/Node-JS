// untuk file kedua

function cetakNama(nama) {
  return `Halo Selamat Datang ${nama}`;
}

// bisa untuk object juga

const dataBunuhDiriFavian = {
  nama: "Favian Rasyad",
  kelas: "Mahasiswa",
  alasan: "Karena kucingnya gamau diet",

  cetakAlasan() {
    return `Halo nama saya ${this.nama}, dan saya mau bundir karena ${this.alasan}`;
  },
};

class dataBunDirFavian {
  constructor(nama, alasan, hobby) {
    (this.nama = nama), (this.alasan = alasan), (this.hobby = hobby);
  }

  cetakKenapa() {
    return `Halo nama saya ${this.nama}, saya memiliki hobby yaitu${this.hobby}
    karena ${this.alasan} `;
  }
}

const PI = 3.14;

// module.exports.nama = cetakNama;
// module.exports.PI = PI;
// module.exports.favianBundir = dataBunuhDiriFavian;
// module.exports.cetakFavian = dataBunDirFavian;

//bisa dibuat lebih simple dengan object

module.exports = {
  nama: cetakNama,
  PI: PI,
  favianBundir: dataBunuhDiriFavian,
  cetakFavian: dataBunDirFavian,
};

//maka hasilnya lebih simple dan lebih rapi
