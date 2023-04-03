const grpc = require("@grpc/grpc-js");
const mysql = require("mysql");

const protoLoader = require("@grpc/proto-loader");

let PROTO_PATH =
  "C:/Users/50272/Documents/PI/pemrograman-integratif/gRPC-CRUD/server/protos/buku.proto";

const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);

const booksPackage = grpcObject.booksPackage;

const server = new grpc.Server();

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pi-grpc",
});

server.addService(booksPackage.newService.service, {
  addBooks: addBooks,
  getBooks: getBooks,
  // "deleteBooks" :deleteBooks
});

let books = [];

server.bindAsync(
  "127.0.0.1:50001",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) throw error;

    console.log(`Server running at ${port}`);
    server.start();
  }
);

function getBooks(call, callback) {
  const query = "SELECT * FROM buku";
  const id = call.request.id;
  console.log(id)
  db.query(query, (err, result) => {
    if (err || result.length === 0) {
      callback({
        message: "buku tidak ditemukan",
      });
    } else {
      callback(null, { user: result[0] });
    }
  });
}

function addBooks(call, callback) {
  const query =
    "INSERT INTO buku (judul, penulis, tahun_terbit) VALUES (?, ?, ?)";
  const { judul, penulis, tahun_terbit } = call.request;
  db.query(query, [judul, penulis, tahun_terbit], (err, result) => {
    if (err) {
      callback({
        message: "gagal menambahkan buku",
      });
    } else {
      callback(null, { message: "buku berhasil ditambahkan" });
      console.log(result)
    }
  });
}


/* 

function addMahasiswa(call, callback) {
    
    const id_mahasiswa = call.request.id_mahasiswa;
    const nama = call.request.nama;
    const nrp = call.request.nrp;
    const nilai = call.request.nilai;
  
    connection.query(
      `INSERT INTO mahasiswa (id_mahasiswa, nama, nrp, nilai) VALUES (?, ?, ?, ?)`,
      [id_mahasiswa, nama, nrp, nilai],
      (error, results, fields) => {
        if (error) {
          console.error('Error:', error);
          callback(error, null);
          return;
        }
  
        callback(null, { message: 'Mahasiswa berhasil ditambahkan' });
      }
    );
  }

*/