const express = require("express");
const cors = require("cors");
const app = express();

let latestLocation = null; // store the most recent location

app.use(cors());
app.use(express.json());

// Receive and store user location
app.post("/location", (req, res) => {
    latestLocation = {
        lat: req.body.lat,
        lng: req.body.lng,
        time: req.body.time
    };

    console.log("📍 User Location Received:");
    console.log("Latitude:", latestLocation.lat);
    console.log("Longitude:", latestLocation.lng);
    console.log("Timestamp:", latestLocation.time);
    console.log("-----------------------------------");

    res.json({ status: "ok", received: true });
});

// Show map at latest location
app.get("/map", (req, res) => {
    if (!latestLocation) {
        return res.send("<h1>No location received yet!</h1>");
    }

    const html = `
        <html>
        <head>
            <title>User Location Map</title>
        </head>
        <body>
            <h2>User Last Known Location</h2>
            <p><b>Latitude:</b> ${latestLocation.lat}</p>
            <p><b>Longitude:</b> ${latestLocation.lng}</p>
            <p><b>Timestamp:</b> ${latestLocation.time}</p>

            <iframe 
                width="100%" 
                height="500" 
                frameborder="0" 
                style="border:0"
                src="https://www.google.com/maps?q=${latestLocation.lat},${latestLocation.lng}&z=15&output=embed">
            </iframe>
        </body>
        </html>
    `;
    res.send(html);
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Backend running on http://localhost:3000");
    console.log("Map available at → http://localhost:3000/map");

});

