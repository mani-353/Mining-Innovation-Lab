const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config(); // Add this at the very top

const serviceAccount = {
    type: process.env.FB_TYPE,
    project_id: process.env.FB_PROJECT_ID,
    private_key_id: process.env.FB_PRIVATE_KEY_ID,
    private_key: process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FB_CLIENT_EMAIL,
    client_id: process.env.FB_CLIENT_ID,
    auth_uri: process.env.FB_AUTH_URI,
    token_uri: process.env.FB_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FB_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FB_CLIENT_CERT_URL,
};


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FB_DB_URL// Replace this 
});

const db = admin.database();

app.use(cors());
app.use(bodyParser.json());

// POST: Receive data from ESP32 and store in Firebase
app.post("/sensor-data", (req, res) => {
    const {
        ax, ay, az,
        gx, gy, gz,
        temp, hum, soil,
        rain, vbr, atm, pres,
        lat, long,
        heading, dist, dir, speed, mode, time
    } = req.body;

    const data = {
        ax, ay, az,
        gx, gy, gz,
        temp, hum, atm,
        soil, rain, vbr, lat, long,
        heading, dist, dir, speed, mode, time,
        receivedAt: new Date().toISOString()
    };

    const ref = db.ref("sensorData");
    ref.push(data)
        .then(() => res.status(200).send({ success: true, message: "Data stored" }))
        .catch((err) => res.status(500).send({ success: false, error: err.message }));
});

app.post("/air-monitor-data", (req, res) => {
    const {
        co2, so2, pm25, pm10
    } = req.body;

    const data = {
        co2, so2, pm25, pm10,
        receivedAt: new Date().toISOString()
    };

    const ref = db.ref("airMonitoring");  // <- new folder in database
    ref.push(data)
        .then(() => res.status(200).send({ success: true, message: "Air monitoring data stored" }))
        .catch((err) => res.status(500).send({ success: false, error: err.message }));
});

// GET: Fetch all sensor data
app.get("/sensor-data", async (req, res) => {
    const ref = db.ref("sensorData");
    ref.once("value", (snapshot) => {
        const data = snapshot.val();
        res.status(200).send(data);
    }, (error) => {
        res.status(500).send({ success: false, error: error.message });
    });
});

// GET: dispay the message to the user
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the Sensor Data API! Use /sensor-data to POST all landsling sensor data and /air-monitor-data to POST all air monitoring sensor data.");
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
