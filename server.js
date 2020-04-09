const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const app = express()
app.use(cors())
app.use(bodyParser.json())

const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });

// Adding All Treatments from Client
app.post('/addTreatments', (req, res) => {
    const treatments = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("dentistsPortal").collection("treatments");
        collection.insert(treatments, (error, result) => {
            if(error) {
                console.log(error);
                res.status(500).send({ message:error });
            }
            else{
                res.send(result.ops[0]);
            }
        })
        client.close();
    });
});

// Insert an Appointment from client
app.post('/addAppointment', (req, res) => {
    const appointments = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("dentistsPortal").collection("appointments");
        collection.insertOne(appointments, (error, result) => {
            if(error) {
                console.log(error);
                res.status(500).send({ message:error });
            }
            else{
                res.send(result.ops[0]);
            }
        })
        client.close();
    });
});

// Getting all Treatments
app.get('/getTreatments', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("dentistsPortal").collection("treatments");
        collection.find().toArray((error, documents) => {
            if(error) {
                console.log(error);
                res.status(500).send({ message:error });
            }
            else{
                res.send(documents);
            }
        })
        client.close();
    });
});

// Getting all Appointments 
app.get('/getAppointments', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("dentistsPortal").collection("appointments");
        collection.find().toArray((error, documents) => {
            if(error) {
                console.log(error);
                res.status(500).send({ message:error });
            }
            else{
                res.send(documents);
            }
        })
        client.close();
    });
});

// Getting Appointments by selected Date
app.post('/appointmentsByDate', (req, res) => {
    const clickedDate = req.body.localDate;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("dentistsPortal").collection("appointments");
        collection.find({ date : clickedDate }).toArray((error, documents) => {
            if(error) {
                console.log(error);
                res.status(500).send({ message:error });
            }
            else{
                res.send(documents);
            }
        })
        client.close();
    });
});

// Root Api
app.get('/', (req, res) => res.send("Hello World!"));

// app.post('/appointmentsByToday', (req, res) => {
//     const today = req.body.today;
//     client = new MongoClient(uri, { useNewUrlParser: true });
//     client.connect(err => {
//         const collection = client.db("dentistsPortal").collection("appointments");
//         collection.find({ date : today }).toArray((error, documents) => {
//             if(error) {
//                 console.log(error);
//                 res.status(500).send({ message:error });
//             }
//             else{
//                 res.send(documents);
//             }
//         })
//         client.close();
//     });
// });

const port = process.env.PORT || 4200;

app.listen(port, () => console.log(`App listening at :${port}`))