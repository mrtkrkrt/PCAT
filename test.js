const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const GameSchema = new Schema({
    name: String,
    playerNum: Number,
});

const game = mongoose.model('Game', GameSchema);

/* //Create record
game.create({
    name: 'Valorant',
    playerNum: 123456,
});
 */

//read records
game.find({}, (err, data) => {
    console.log(data);
});

const id = '6079f04e5916c524d4bdcb74';
Photo.findByIdAndUpdate(
    id,
    {
        title: 'Photo Title 111 updated',
        description: 'Photo description 111 updated',
    },
    {
        new: true,
    },
    (err, data) => {
        console.log(data);
    }
);

//delete a photo
const id = '6079f1ce8c0f602c98964346';

Photo.findByIdAndDelete(id, (err, data) => {
    console.log('Photo is removed..');
});
