var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path'); // Import the path module

mongoose.connect("mongodb://localhost:27017/musafir_records", { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function(callback) {
    console.log("connection succeeded");
});

var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.set({
        'Access-Control-Allow-Origin': '*'
    });
    res.sendFile(path.join(__dirname, 'index.html')); // Serve index.html from the root directory
});

const userSchema2 = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    subject: String,
    message: String
});

const Musafir_contact = mongoose.model("Musafir_contact", userSchema2);

app.post("/contact", async(req, res) => {
    try {
        console.log(req.body);
        const userData = new Musafir_contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            subject: req.body.subject,
            message: req.body.message
        });
        await userData.save();
        res.redirect('/'); // Redirect to the root URL after saving
    } catch (err) {
        res.status(500).send(err);
    }
});

const userSchema = new mongoose.Schema({
    name: String,
    count: Number,
    email: String,
    phone: Number,
    address: String,
    fdate: Date,
    ldate: Date,
    package: String
});

const Musafir_booking = mongoose.model("Musafir_booking", userSchema);

app.post("/bookdetail", async(req, res) => {
    try {
        console.log(req.body);
        const userData = new Musafir_booking({
            name: req.body.place,
            count: req.body.count,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            fdate: req.body.fdate,
            ldate: req.body.ldate,
            package: req.body.package
        });
        await userData.save();
        res.redirect('/'); // Redirect to the root URL after saving
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => {
    console.log("Server listening at port 3000");
});
