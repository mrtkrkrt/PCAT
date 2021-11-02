const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload")
const ejs = require('ejs');
const path = require('path');
const fs = require('fs')
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
app.use(fileUpload());

app.get('/', async (req, res) => {
    /*let photos;
    const promise = new Promise((resolve, reject) => {
        const photo = Photo.find({});
        if(photo){
            photos = photo
            resolve("Tamam");
        }else{
            console.log(reject)
        }
    })
    promise.then((message) => {
        res.render('index', {
            photos
        })
    }).catch(function(hata){
        console.log(hata)
      })*/

    const photos = await Photo.find({}).sort("-dateCreated");
    res.render('index', {
        photos,
    });
});

app.get('/index.html', function (req, res) {
    res.redirect('/');
});

app.get('/index.html/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    console.log(photo);
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
    /* await Photo.create(req.body);
    res.redirect('/'); */

    const path = "public/uploads";

    if(!fs.existsSync(path)){
        fs.mkdirSync(path)
    }

    let uploadedImage = req.files.image;
    let imagePath = __dirname + '/public/uploads/' + uploadedImage.name;

    uploadedImage.mv(imagePath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name,
        });
        res.redirect('/');
    });
});

app.listen(port, () => {});
