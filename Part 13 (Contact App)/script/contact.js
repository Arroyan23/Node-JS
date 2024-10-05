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

module.exports = {
  loadFavianJSON,
  detailContacts,
};
