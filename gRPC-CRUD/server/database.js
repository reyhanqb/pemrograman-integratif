const mysql = require('mysql')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const Express = require('express')
const cors = require('cors')


// define proto package

const packageDefinition = protoLoader.loadSync("books.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const Books = grpcObject.Books

// add services
server.addService(Books.Books.service, {
  createBooks: createBooks,
  updateBooks: updateBooks,
});

const app = Express()

const server = new grpc.Server();

const port = 3000;

app.use(cors())
app.use(Express())




app.listen(port, () => {
    `Listening on port ${port}`
})

let database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pi-grpc",
}); 
    
database.connect(function(err){
    if(err)
        throw err;

    console.log("konek bg");
})

// const getAvailableBooks = {
//   getBooks: (call, callback) => {
//     const query = "SELECT * FROM books WHERE id = ?";
//     const id = call.request.id;
//     database.query(query, [id], (err, result) => {
//       if (err || result.length === 0) {
//         callback({
//           code: grpc.status.NOT_FOUND,
//           message: "Book does not exist!",
//         });
//       } else {
//         callback(null, { books: result[0] });
//       }
//     });
//   },
//   // Add more methods as needed
// };



function createBooks(call, callback){
    console.log(call);
}

server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(`Failed to start server: ${err}`);
  } else {
    console.log(`Server started on port ${port}`);
    server.start();
  }
});