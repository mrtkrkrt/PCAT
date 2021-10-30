const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: String,
    player_num: String,
    Description: String,
    image: String,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

const Photo = mongoose.model('Photo', GameSchema);
module.exports = Photo;