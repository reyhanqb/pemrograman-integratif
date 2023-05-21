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


module.exports = client