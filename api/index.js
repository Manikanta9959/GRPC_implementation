import express from 'express';
import config from '../config.js';
import swagger from "../swagger.js";

// Create an Express application
const app = express();

app.use(express.json()); // To parse JSON bodies
swagger(app);

// Express route to interact with the calculator via HTTP
app.post('/calculator/add', (req, res) => {
  const { num1, num2 } = req.body;
  const client = new calculatorProto.Calculator('localhost:50051', grpc.credentials.createInsecure());
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
  const client = new calculatorProto.Calculator('localhost:50051', grpc.credentials.createInsecure());
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
  const client = new calculatorProto.Calculator('localhost:50051', grpc.credentials.createInsecure());
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
  const client = new calculatorProto.Calculator('localhost:50051', grpc.credentials.createInsecure());
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
