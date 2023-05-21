const client = require('./client')

const id_buku = 5;

client.deleteBooks(
  {
    id_buku: id_buku,
  },
  (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response.data);
    }
  }
);
