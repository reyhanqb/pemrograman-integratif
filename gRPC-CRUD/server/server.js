const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

let PROTO_PATH = 'C:/Users/50272/Documents/PI/pemrograman-integratif/gRPC-CRUD/server/protos/buku.proto'

const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef)

const booksPackage = grpcObject.booksPackage

const server = new grpc.Server()



server.addService(booksPackage.newService.service, {
    "addBooks" : addBooks,
    // "getBooks" : getBooks,
    // "deleteBooks" :deleteBooks
});

server.bindAsync(
  "127.0.0.1:5000",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error)
        throw error;

    console.log(`Server running at ${port}`);
    server.start();
  }
);

function addBooks(call, callback){
    console.log('books added');
}
