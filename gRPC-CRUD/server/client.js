const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

let PROTO_PATH =
  "C:/Users/50272/Documents/PI/pemrograman-integratif/gRPC-CRUD/server/protos/buku.proto";

const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);

const booksPackage = grpcObject.booksPackage;

const client = new booksPackage.newService(
  "localhost:50001",
  grpc.credentials.createInsecure()
);

// send a getBooks request
// client.getBooks({}, (err, response) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(response.books);
//   }
// });


// const book = {
//   id_buku: "",
//   judul: "Belajar Menjadi Koding Master",
//   penulis: "John Doe",
//   tahun_terbit: "2022",
// };

// client.addBooks(
//   {
//     id_buku: "",
//     judul: "new book",
//     penulis: "John Doe",
//     tahun_terbit: 2001
//   },
//   (err, response) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(response.data);
//     }
//   }
// );

// const id_buku = 2
let request = { id_buku : 4 }

client.deleteBooks({
  id_buku: request
}, (err, response) => {
  if(err){
    console.log(err)
  } else {
    console.log(response.data)
  }
})

const id = 1;

client.updateBooks({
  id_buku : id,
  judul: "5 Menara",
  penulis: "Penulis",
  tahun_terbit: "2003"
}, (err, response) => {
  if(err){
    console.log(err)
  } else {
    console.log(response.data)
  }
})