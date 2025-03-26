const Orders = require("../models/Orders");
let orders = []; 

//Get all orders
const getAllOrders= async (req, res) => {
    try {
        orders = await Orders.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).send(err);
    }
}

//Create and order
const createOrder = async (req, res) => {
    try {
        const payload = req.body.payload;
        const newOrder = {
            paymentMode: payload.paymentMode,
            shippingDetails: payload.shippingDetails,
            items: payload.items,
            deliveryStatus: payload.deliveryStatus
        }

       orders = await Orders.create(newOrder);

       res.json({ data: orders, message: "Orders Updated successfully" });
    } catch (err) {
        res.status(500).send(err);
    }

}

module.exports = { getAllOrders, createOrder };
