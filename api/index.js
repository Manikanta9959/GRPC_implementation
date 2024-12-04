import express from 'express';
import config from '../config.js';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import swagger from "../swagger.js";
import bodyParser from 'body-parser';
import fs from 'fs';


// Define the path to the .proto file
const PROTO_PATH = 'calculator.proto';
console.log(`PROTO_PATH: ${PROTO_PATH}`);  // Debugging: Check the resolved path

// Ensure that the path is correct
if (!fs.existsSync(PROTO_PATH)) {
  console.error('Proto file does not exist at the resolved path:', PROTO_PATH);
  process.exit(1);
}

// Load the .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Load the gRPC package and define the Calculator service
const calculatorProto = grpc.loadPackageDefinition(packageDefinition).Calculator;
console.log(calculatorProto);  // Should log the calculator service if loaded correctly


// Create an Express application
const app = express();

app.use(express.json()); // To parse JSON bodies
app.use(bodyParser.json());
swagger(app);


// Express route to interact with the calculator via HTTP
app.post('/calculator/add', (req, res) => {
  const { num1, num2 } = req.body;
  const client = new calculatorProto(`localhost:${config.GRPC_PORT}`, grpc.credentials.createInsecure());
  client.Add({ num1, num2 }, (error, response) => {
    if (error) {
      res.status(500).send({ error: error.message });
    } else {
      res.json({ result: response.result });
    }
  });
});


app.post('/calculator/sub', (req, res) => {
  const { num1, num2 } = req.body;
  const client = new calculatorProto(`localhost:${config.GRPC_PORT}`, grpc.credentials.createInsecure());
  client.Subtract({ num1, num2 }, (error, response) => {
    if (error) {
      res.status(500).send({ error: error.message });
    } else {
      res.json({ result: response.result });
    }
  });
});


app.post('/calculator/multiply', (req, res) => {
  const { num1, num2 } = req.body;
  const client = new calculatorProto(`localhost:${config.GRPC_PORT}`, grpc.credentials.createInsecure());
  client.Multiply({ num1, num2 }, (error, response) => {
    if (error) {
      res.status(500).send({ error: error.message });
    } else {
      res.json({ result: response.result });
    }
  });
});


app.post('/calculator/divide', (req, res) => {
  const { num1, num2 } = req.body;
  const client = new calculatorProto(`localhost:${config.GRPC_PORT}`, grpc.credentials.createInsecure());
  client.Divide({ num1, num2 }, (error, response) => {
    if (error) {
      res.status(500).send({ error: error.message });
    } else {
      res.json({ result: response.result });
    }
  });
});

// Start the Express server
app.listen(config.API_PORT, () => {
  console.log(`Express server running at http://localhost:${config.API_PORT}`);
});
