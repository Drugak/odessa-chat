var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var roomShema = new Schema({
    room: {
        id: {
            type: Number,
            unique: true,
            required: true
        },
        name: {
            type: String,
            unique: true,
            required: true
        },
        messageCount: {
            type: Number
        },
        listThems: {
            type: Array
        },
        lastDateMessage: {
            type: Date || undefined
        }
    }
});

exports.Rooms = mongoose.model('newRoom', roomShema);