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
  addBooks(call, callback) {
    // const id = call.request.id_buku;
    const judul = call.request.judul;
    const penulis = call.request.penulis;
    const tahun_terbit = call.request.tahun_terbit;
    const query = `INSERT INTO buku ( judul, penulis, tahun_terbit) VALUES ('${judul}', '${penulis}', '${tahun_terbit}')`;
    db.query(query, (err, result) => {
      if (err) {
        callback({});
        console.log(err);
      } else {
        callback(null, { message: "buku berhasil ditambahkan" });
        console.log(result);
      }
    });
  },
  getBooks(call, callback) {
    const query = "SELECT * FROM buku";
    db.query(query, (err, result) => {
      if (err) {
        callback({
          message: "gagal mengambil data buku",
        });
      } else if (result.length === 0) {
        callback({
          message: "buku tidak ditemukan",
        });
      } else {
        const books = [];
        result.forEach((book) => {
          books.push({
            id_buku: book.id_buku,
            judul: book.judul,
            penulis: book.penulis,
            tahun_terbit: book.tahun_terbit,
          });
        });
        callback(null, { books: books });
        console.log(books);
      }
    });
  },
  deleteBooks(call, callback) {
    const id = 4;
    const query = `DELETE FROM buku WHERE id_buku = '${id}'`;

    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, "Successfully deleted book");
      }
    });
  },
  updateBooks(call, callback) {
    let id = uuidv1();
    let { judul, penulis, tahun_terbit } = call.request;
    const query = `UPDATE buku SET judul = ?, penulis = ?, tahun_terbit = ? WHERE id_buku = '${id}'`;

    db.query(query, [judul, penulis, tahun_terbit], (err, result) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        if (typeof callback === "function") {
          callback(null, "Successfully updated book");
        }
        else {
          console.log(err)
        }
      }
    });
  },
});

server.bindAsync(
  "127.0.0.1:50001",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) throw error;

    console.log(`Server running at ${port}`);
    server.start();
  }
);

// function getBooks(call, callback) {
//   const query = "SELECT * FROM buku";
//   const id = call.request.id;
//   console.log(id)
//   db.query(query, (err, result) => {
//     if (err || result.length === 0) {
//       callback({
//         message: "buku tidak ditemukan",
//       });
//     } else {
//       callback(null, { user: result[0] });
//     }
//   });
// }

// function addBooks(call, callback) {
//   const query =
//     "INSERT INTO buku (judul, penulis, tahun_terbit) VALUES (?, ?, ?)";
//   const { judul, penulis, tahun_terbit } = call.request;
//   db.query(query, [judul, penulis, tahun_terbit], (err, result) => {
//     if (err) {
//       callback({
//         message: "gagal menambahkan buku",
//       });
//     } else {
//       callback(null, { message: "buku berhasil ditambahkan" });
//       console.log(result)
//     }
//   });
// }

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
