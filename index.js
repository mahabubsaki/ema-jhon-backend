const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wcxgg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect()
        const productCollection = client.db("emaJhon").collection("products");
        app.get('/', (req, res) => {
            res.send('Hello crazy World!')
        })
        app.get('/products', async (req, res) => {
            const page = Number(req.query.page)
            const size = Number(req.query.size)
            const query = {}
            const cursor = productCollection.find(query)
            const products = await cursor.skip(page * size).limit(size).toArray()
            res.send(products)
        })
        app.get('/productsCount', async (req, res) => {
            const count = await productCollection.estimatedDocumentCount()
            res.send({ count })
        })
        app.post('/productFindByKey', async (req, res) => {
            const keys = req.body
            const ids = keys.map((key) => ObjectId(key))
            const query = { _id: { $in: ids } }
            const cursor = productCollection.find(query)
            const products = await cursor.toArray()
            res.send(products)
        })
    }
    finally {

    }
}
run().catch(console.dir)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
