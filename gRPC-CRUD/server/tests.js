const client = require("./client");

const request = { id_buku: "" };

const id_buku = "";

client.getBooks(request, (error, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(response.data);
  }
});

// client.addBooks(
//   {
//     id_buku: "",
//     judul: "Judul baru",
//     penulis: "John Doe",
//     tahun_terbit: "2022",
//   },
//   (err, response) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(response.data);
//     }
//   }
// );
