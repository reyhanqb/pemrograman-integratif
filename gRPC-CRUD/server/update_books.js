const client = require('./client')

client.updateBooks(
  {
    id_buku: 1,
    judul: "Preman Pensiun",
    penulis: "Kang Mus",
  },
  (err, books) => {
    if (err) {
      console.log(err);
    } else {
      updatedBooks({
        id_buku: id_buku,
        judul: judul,
        penulis: penulis,
      });
      console.log(books);
    }
  }
);