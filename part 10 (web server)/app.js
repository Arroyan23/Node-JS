// // agar bisa ditampilkan ke server
// // menggunakan metode create server
const http = require("http");
const fs = require("fs");

// req apa yang dikirimkan oleh server
// apa yang di respon
// namun ada cara untuk menampilkan si node js dengan html

const renderServer = (path, res) => {
  fs.readFile(`./public/${path}`, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("Sorry Page Req not Found");
    } else {
      res.write(data);
    }
    res.end();
  });
};

const server = http.createServer((req, res) => {
  // url adalah apa yang dituliskan setelah nama localhost
  // localhost:3000/about maka urlnya /about
  const url = req.url;
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  switch (url) {
    case "/about":
      renderServer("about.html", res);
      break;
    case "/contact":
      renderServer("contact.html", res);
      break;
    default:
      renderServer("index.html", res);
      break;
  }
});
// atau bisa chaining sehingga tidak perlu buat variabel
server.listen(3000, () => {
  console.log("Server is Listening on port 3000");
});
