import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import fs from 'fs';
import config from '../config.js';

// Load the .proto file
const PROTO_PATH = 'calculator.proto';
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
console.log(calculatorProto)
// gRPC implementation of the calculator methods
const calculator = {
    Add: (call, callback) => {
      const { num1, num2 } = call.request;
      const result = num1 + num2;
      console.log(`Add - num1: ${num1}, num2: ${num2}, result: ${result}`);
      callback(null, { result });
    },
    
    Subtract: (call, callback) => {
      const { num1, num2 } = call.request;
      const result = num1 - num2;
      console.log(`Subtract - num1: ${num1}, num2: ${num2}, result: ${result}`);
      callback(null, { result });
    },
    
    Multiply: (call, callback) => {
      const { num1, num2 } = call.request;
      const result = num1 * num2;
      console.log(`Multiply - num1: ${num1}, num2: ${num2}, result: ${result}`);
      callback(null, { result });
    },
    
    Divide: (call, callback) => {
      const { num1, num2 } = call.request;
      if (num2 === 0) {
        console.error(`Divide - num1: ${num1}, num2: ${num2} - Division by zero error`);
        callback({
          code: grpc.status.INVALID_ARGUMENT,
          details: 'Division by zero is not allowed',
        });
      } else {
        const result = num1 / num2;
        console.log(`Divide - num1: ${num1}, num2: ${num2}, result: ${result}`);
        callback(null, { result });
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
grpcServer.bindAsync(`0.0.0.0:${config.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`gRPC server running at http://localhost:${config.GRPC_PORT}`);
  grpcServer.start();
});

