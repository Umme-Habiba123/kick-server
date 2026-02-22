require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jbcozto.mongodb.net/?appName=Cluster0`;

// Create Mongo Client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect(); 

    const db = client.db("kicksDB");
    const dropsCollection = db.collection("dropsCollection");

    // Test Route
    app.get("/", (req, res) => {
      res.send("Server is running");
    });

    app.get("/drops", async (req, res) => {
      try {
        const dropsProducts = await dropsCollection.find().toArray();
        res.send(dropsProducts);
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server Error" });
      }
    });

    app.post("/products", async (req, res) => {
      const products = req.body;
      const result = await productsCollection.insertMany(products);
      res.send(result);
    });


    console.log("MongoDB connected successfully");
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Kicks running on port ${port}`);
});
