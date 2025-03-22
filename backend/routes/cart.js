// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

let cart = [];

// Get all cart
router.get('/', async (req, res) => {
    try {
        const cart = await Cart.find();
        console.log("cart find", cart)

        res.json(cart);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Add item to cart
router.post('/add', async (req, res) => {
    try {
        const payload = req.body.payload;
        const newCartItem = {
            title: payload.title,
            productId: payload._id,
            brand: payload.brand,
            price: payload.price,
            thumbnail: payload.thumbnail,
            quantity: 1
        }
        let cart = await Cart.create(newCartItem);

        res.json({ data: cart, message: "cart Updated successfully" });
    } catch (err) {
        res.status(500).send(err);
    }

});


// Delete cart item
router.delete('/delete/:_id', async (req, res) => {
    console.log(req.params)
    const { _id } = req.params;
    try {
        console.log("_id",_id)
        const updatedCart = await Cart.findByIdAndDelete(_id);

        console.log("updatedCart", updatedCart)

        if (!updatedCart) {
            // { success: false, message: "No cart found with this product" };
            return res.json({ success: false, message: "No cart found with this product" });
        }
        return res.json({ success: true, cart: updatedCart });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Clear cart
router.delete('/clear', (req, res) => {
    cart = [];
    res.send('Cart cleared');
});

module.exports = router;
