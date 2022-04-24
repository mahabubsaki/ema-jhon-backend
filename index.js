const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wcxgg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    client.connect()
    const productCollection = await client.db("emaJhon").collection("products");
    app.get('/', (req, res) => {
        res.send('Hello crazy World!')
    })
}
run().catch(console.dir)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
