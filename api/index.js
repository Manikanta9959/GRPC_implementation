import express from 'express';
import config from '../config.js';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import swagger from "../swagger.js";
import bodyParser from 'body-parser';


// Define the path to the .proto file
const PROTO_PATH = 'api/calculator.proto';

// Load the .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
});

// Load the gRPC package and define the Calculator service
const calculatorProto = grpc.loadPackageDefinition(packageDefinition).calculator;


// Create an Express application
const app = express();

app.use(express.json()); // To parse JSON bodies
app.use(bodyParser.json());
swagger(app);


// Express route to interact with the calculator via HTTP
app.post('/calculator/add', (req, res) => {
  const { num1, num2 } = req.body;
  const client = new calculatorProto.Calculator(`localhost:${config.GRPC_PORT}`, grpc.credentials.createInsecure());
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
  const client = new calculatorProto.Calculator(`localhost:${config.GRPC_PORT}`, grpc.credentials.createInsecure());
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
  const client = new calculatorProto.Calculator(`localhost:${config.GRPC_PORT}`, grpc.credentials.createInsecure());
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
  const client = new calculatorProto.Calculator(`localhost:${config.GRPC_PORT}`, grpc.credentials.createInsecure());
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
