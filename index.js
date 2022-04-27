const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json())

// add mongo connect
const uri = "mongodb+srv://nur:1010778711@mydata.zdc33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();
        const serviceCollection = client.db('carService').collection('services');

        // make a api for showing data in the client site
        app.get('/service', async(req, res)=>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        // find single data by id
        app.get('/service/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await serviceCollection.findOne(query);
            res.send(result);
        });

    }
    finally{

    }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('running my boy');
})

app.listen(port, ()=>{
    console.log('Running your server at port', port);
})