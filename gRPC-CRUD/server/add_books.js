const client = require('./client')

client.addBooks(
  {
    id_buku: "",
    judul: "Tendangan si Madun",
    penulis: "Madun",
  },
  (err, response) => {
    if (err) {
      console.error(err);
    } else {
      console.log(response.data);
    }
  }
);
