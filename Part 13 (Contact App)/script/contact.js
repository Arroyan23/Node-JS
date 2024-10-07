// menggunakan fungsi untuk menuliskan ke dalam package json
const fs = require("fs");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
// membuat file .json jika belom ada
const dataPath = "./data/favian.json";
if (!fs.existsSync(dataPath)) {
  // buatkan array di dalamnya
  // dan format encoding nya ke dalam UTF 8
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

function loadFavianJSON() {
  const bacaFileFavian = fs.readFileSync("data/favian.json");
  //   ubah menjadi string
  const ubahFile = JSON.parse(bacaFileFavian);
  return ubahFile;
}

function detailContacts(nama) {
  const bacaFileDulu = fs.readFileSync("data/favian.json");
  const ubahJson = JSON.parse(bacaFileDulu);
  const contact = ubahJson.find((contact) => contact.nama === nama);
  return contact;
}

// menambahkan fungsi tambah di form untuk data dan sebagainya
// menulis ulang data yang ada di json
const tulisData = (contact) => {
  fs.writeFileSync("data/favian.json", JSON.stringify(contact));
};

const addContact = (contact) => {
  // masukkan ke dalam file json
  // baca dulu file jsonnya
  const contacts = loadFavianJSON();
  contacts.push(contact);
  tulisData(contacts);
};

const cekDuplikat = (nama) => {
  // tangkap array di dalam json
  const contacts = loadFavianJSON();
  const temukan = contacts.find((contact) => contact.nama === nama);
  return temukan;
};

// berhasil membuat fungsi delette
// membuat fungsi delete
const deleteContact = (nama) => {
  // temukan dulu nama yang ada di dalam contact delete
  const contacts = loadFavianJSON();
  const filterDelete = contacts.filter((element) => element.nama != nama);
  // masukkan filter delete ke dalam tlis data
  tulisData(filterDelete);
};

// membuat fungsi untuk meng update datanya


module.exports = {
  loadFavianJSON,
  detailContacts,
  addContact,
  cekDuplikat,
  deleteContact,
};
