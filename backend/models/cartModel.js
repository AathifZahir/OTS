const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartItem: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    }],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
