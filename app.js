const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');

const app = express();

mongoose.connect('mongodb://localhost/PCAT', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    const photos = await Photo.find({});
    console.log(photos);
    res.render('index', {
        photos,
    });
});

app.get('/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    console.log(photo)
    res.render('photo', {
        photo,
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/photos', async (req, res) => {
    await Photo.create(req.body);
    res.redirect('/');
});

app.listen(port, () => {});
