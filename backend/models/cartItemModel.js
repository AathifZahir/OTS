const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    fabric: {
        type: String,
    },
    color: {
        type: String,
    },
    size: {
        type: String,
    },
    measurements: {
        type: {
            chest: Number,
            waist: Number,
            hips: Number,
            shoulders: Number,
            sleeveLength: Number,
            jacketLength: Number,
            inseam: Number,
            outseam: Number,
            rise: Number,
            neck: Number,
            shirtLength: Number
        },
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
