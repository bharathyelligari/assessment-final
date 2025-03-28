
const Cart = require("../models/Cart");
let cart = [];
let productId;

//Get cart items
const getCartItems = async (req, res) => {
    try {
        cart = await Cart.find();
        res.json(cart);
    } catch (err) {
        res.status(500).send(err);
    }
}


//Add or Update cart
const cartAddOrUpdate = async (req, res) => {
    try {
        const payload = req.body;

        productId = payload._id;
        if (payload.action) {
            productId = payload.productId;
        }

        let cartItem = await Cart.findOne({ productId });
        if (cartItem) {
            if (payload.action === "remove") {
                if (cartItem.quantity > 1) {
                    cartItem.quantity -= 1;
                    cart = await cartItem.save();
                } else {
                    cart = await Cart.findByIdAndDelete(payload._id).lean();;
                    cart["action"] = "remove";
                }
            }
            else {
                cartItem.quantity += 1;
                cart = await cartItem.save();
            }

            return res.json({ message: "Cart updated", cart: cart });
        } else {
            const newCartItem = {
                title: payload.title,
                productId: payload._id,
                brand: payload.brand,
                price: payload.price,
                thumbnail: payload.thumbnail,
                quantity: 1
            }
            cart = await Cart.create(newCartItem);

            res.json({ cart: cart, message: "cart Updated successfully" });
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

//Delete cart by Id
const deleteCartById = async (req, res) => {
    const { _id } = req.params;
    try {
        cart = await Cart.findByIdAndDelete(_id);

        if (!cart) {
            // { success: false, message: "No cart found with this product" };
            return res.json({ success: false, message: "No cart found with this product" });
        }
        return res.json({ success: true, cart: cart });
    } catch (err) {
        res.status(500).send(err);
    }
}

//Clear cart Items
const clearCart = async (req, res) => {
    try {
        cart = await Cart.deleteMany({});
        if (!cart) {
            return res.json({ success: false, message: "No cart found with this product" });
        }
        return res.json({ success: true, cart: cart });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { getCartItems, cartAddOrUpdate, deleteCartById, clearCart };
