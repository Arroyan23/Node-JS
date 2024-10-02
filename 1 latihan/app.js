//  panggil untuk bisa read

const fs = require("fs");
// ini untuk membuat comman prompt dapat menanyakan

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Masukkan Nama Anda : ", (nama) => {
  rl.question("Masukkan Nama Pendamping anda : ", (pendamping) => {
    rl.question("Masukkan Password Anda : ", (password) => {
      rl.question("Masukkan nomor Hp anda : ", (noHp) => {
        // bikin objectnya
        let kapital = nama.toUpperCase(); // iseng ajah biar jadi kapital di dalam data
        const obj1 = { kapital, pendamping, password, noHp };
        // baca filenya
        const bacaFile = fs.readFileSync("data/phone.json", "utf-8");
        // ubah filenya tersebut dengan json stringift
        const files = JSON.parse(bacaFile);
        // console.log(files); // ini akan menghasilkan array yang ada di dalam json

        files.push(obj1); // ini memasukkan object ke dalam array di json
        // gunakan function write untuk memasukkan object ke dalam file array ke json

        fs.writeFileSync("data/phone.json", JSON.stringify(files)); //masukkan ke dalam json dan ubah menjadi stringify

        // console.log(files); // ini akan me ncetak object di dalam array
        console.log(`Terimakasih ${nama}, telah memasukkan data!`);
        rl.close();
      });
    });
  });
});
