// melakukan koneksi dengan local mongo

const { mongoClient, ObjectId } = require("mongodb");
const MongoClient = require("mongodb/lib/mongo_client");
const uri = "mongodb://127.0.0.1:27017";

const dbName = "oyeng";

// melakukan stabilisasi koneksi ke database
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// jalankan menggunakan callback
client.connect((error, client) => {
  if (error) {
    return console.log("Koneksi Gagal");
  }
  console.log("Koneksi Dbs Berhasil");

  //   pilih database
  const db = client.db(dbName);

  //   CREATE

  //   //   memasukkan 1 data ke data base

  //   db.collection("mahasiswa").insertOne(
  //     {
  //       nama: "Favian Sammy",
  //       email: "Azzam@gmail.com",
  //     },
  //     (error, result) => {
  //       if (error) {
  //         return console.log("Gagal Menambahkan data");
  //       }

  //       console.log(result);
  //     }
  //   );
  //   berhasil memasukkan data ke mongo db

  //   menambahkan lebih dari 1 data
  //   db.collection("mahasiswa").insertMany(
  //     [
  //       {
  //         nama: "Mamed Arabian",
  //         enail: "mamed@gmail.com",
  //       },
  //       {
  //         nama: "Favian Bunuh Binatang",
  //         email: "binatangvian@gmail.com",
  //       },
  //     ],
  //     (error, result) => {
  //       if (error) {
  //         return console.log("Data gagal ditambahkan");
  //       }

  //       console.log(result + "Data berhasil ditambahkan");
  //     }
  //   );

  //   READ
  // membaca halaman
  //   console.log(
  //     db
  //       .collection("mahasiswa")
  //       .find()
  //       .toArray((error, result) => {
  //         console.log(result);
  //       })
  //   );

  // menampilkan data berdasarkan kriteria yang di inginkan di mahasiswa
  //   jika ingin menampilkan berdasarkan id maka yang di cetak dengan objectId nya
  //   console.log(
  //     db
  //       .collection("mahasiswa")
  //       .find({ nama: "Favian Bunuh Binatang" })
  //       .toArray((error, result) => {
  //         console.log(result);
  //       })
  //   );

  // UPDATE
  //   berdasarkan id
  //   db.collection("mahasiswa").updateOne(
  //     {
  //       _id: ObjectId("6704836f3e3a1264f8bb0bb1"),
  //     },
  //     {
  //       $set: {
  //         nama: "Favian Pemalas",
  //       },
  //     }
  //   );
  //   mengubah dari bentuk promise
  //   const updatePromise = db.collection("mahasiswa").updateOne(
  //     {
  //       _id: ObjectId("6704836f3e3a1264f8bb0bb1"),
  //     },
  //     {
  //       $set: {
  //         email: "favianmemalaskan@yahoo.com",
  //       },
  //     }
  //   );
  //   updatePromise
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // jika ingin update banyak maka memakai update many

  // DELETE
  // menghapus 1 data

  //   db.collection("mahasiswa")
  //     .deleteOne({
  //       _id: ObjectId("6703eadf91d22cdef8530698"),
  //     })
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // menghapus lebih dari 1 data
  db.collection("mahasiswa")
    .deleteMany({
      nama: "Favian bunuh sammy",
      nama: "Mamed Arabian",
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
// ini sudah berhasil terkoneksi kepada mongodb
