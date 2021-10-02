const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true,
    },
    description: {
        type: String,
        required: 'Description is required',
        trim: true,
    },
    price: {
        type: Number,
        required: 'Price is required'
    },
    imageId: {
        type: String,
        required: 'ImageId is required',
        trim: true
    },
    imageUrl: {
        type: String,
        required: 'ImageUrl is required'
    },
    inStock: {
        type: Number,
        default: 1
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item