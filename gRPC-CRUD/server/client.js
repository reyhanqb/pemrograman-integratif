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
client.getBooks({}, (err, response) => {
  if (err) {
    console.error(err);
  } else {
    console.log(response.books);
  }
});

const book = {
  id_buku: "",
  judul: "Belajar Menjadi Koding Master",
  penulis: "John Doe",
  tahun_terbit: "2022",
};

client.addBooks(
  {
    id_buku: "",
    judul: "new book",
    penulis: "John Doe",
  },
  (err, response) => {
    if (err) {
      console.error(err);
    } else {
      console.log(response.data);
    }
  }
);

const id_buku = 2;
let request = { id_buku: 4 };

client.deleteBooks(
  {
    id_buku: request,
  },
  (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response.data);
    }
  }
);

client.updateBooks(
  {
    id_buku: 1,
    judul: "5 Menara",
    penulis: "Penulis",
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
