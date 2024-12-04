import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import fs from 'fs';

// Load the .proto file
const PROTO_PATH = 'grpc/calculator.proto';
console.log(`PROTO_PATH: ${PROTO_PATH}`);  // Debugging: Check the resolved path

// Ensure that the path is correct
if (!fs.existsSync(PROTO_PATH)) {
  console.error('Proto file does not exist at the resolved path:', PROTO_PATH);
  process.exit(1);
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Load the package definition into gRPC
const calculatorProto = grpc.loadPackageDefinition(packageDefinition).Calculator;

// gRPC implementation of the calculator methods
const calculator = {
  Add: (call, callback) => {
    const { num1, num2 } = call.request;
    callback(null, { result: num1 + num2 });
  },
  Subtract: (call, callback) => {
    const { num1, num2 } = call.request;
    callback(null, { result: num1 - num2 });
  },
  Multiply: (call, callback) => {
    const { num1, num2 } = call.request;
    callback(null, { result: num1 * num2 });
  },
  Divide: (call, callback) => {
    const { num1, num2 } = call.request;
    if (num2 === 0) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: 'Division by zero is not allowed',
      });
    } else {
      callback(null, { result: num1 / num2 });
    }
  },
};

// Create a gRPC server and add the service
const grpcServer = new grpc.Server();

// Ensure the service is correctly loaded
if (calculatorProto && calculatorProto.service) {
  grpcServer.addService(calculatorProto.service, calculator);
} else {
  console.error('gRPC service is not correctly loaded.');
  process.exit(1);
}

// Bind the gRPC server to a port
const GRPC_PORT = '50051';
grpcServer.bindAsync(`0.0.0.0:${GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`gRPC server running at http://localhost:${GRPC_PORT}`);
  grpcServer.start();
});

