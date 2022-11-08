const path = require("path");
const fs = require("fs");
const helper = require("./helpers.js");

//Replace all before (req, res)
//helper.ensureAuthenticated,
const handleAllRestaurants = (app, Restaurant) => {
    app.route('/api/restaurants').get((req, resp) => {
        Restaurant.find( (err, data) => {
            if (err) {
                resp.json({ message: 'Unable to connect to restaurants' })
            } else {
                resp.json(data)
            }
        })
    })
}

const handleSingleRestaurant = (app, Restaurant) => {
    app.route('/api/restaurants/:id').get((req, resp) => {
        Restaurant.find({ 'id': req.params.id }, (err, data) => {
            if (err) {
                resp.json({ message: 'Unable to connect to restaurants' })
            } else {
                resp.json(data)
            }
        })
    })
}

const handleAllOrders = (app, Order) => {
    app.route('/api/orders').get((req, resp) => {
        Order.find((err, data) => {
            if (err) {
                resp.json({ message: 'Unable to connect to orders' })
            } else {
                resp.json(data)
            }
        })
    })
}

const handleSingleOrder = (app, Order) => {
    app.route('/api/orders/:id').get((req, resp) => {
        Order.find({ 'id': req.params.id }, (err, data) => {
            if (err) {
                resp.json({ message: 'Unable to connect to orders' })
            } else {
                resp.json(data)
            }
        })
    })
}

const handleAllItems = (app, MenuItem) => {
    app.route('/api/menu').get((req, resp) => {
        MenuItem.find( (err, data) => {
            if (err) {
                resp.json({ message: 'Unable to connect to menu items' })
            } else {
                resp.json(data)
            }
        })
    })
}

const handleItemsByRestaurant = (app, MenuItem) => {
    app.route('/api/menu/:restaurant_id').get((req, resp) => {
        MenuItem.find({ 'restaurant_id': req.params.restaurant_id }, (err, data) => {
            if (err) {
                resp.json({ message: 'Unable to connect to menu items' })
            } else {
                resp.json(data)
            }
        })
    })
}

const handleSingleUser = (app, User) => {
    app.route('/api/user/:id').get((req, resp) => {
        User.find({ 'id': req.params.id }, (err, data) => {
            if (err) {
                resp.json({ message: 'Unable to find user' })
            } else {
                resp.json(data)
            }
        })
    })
}
//req.params.isAdmin change to boolean? 
const handleAdmins = (app, User) => {
    app.route('/api/user/:isAdmin').get((req, resp) => {
        User.find({ 'isAdmin': req.params.isAdmin }, (err, data) => {
            if (err) {
                resp.json({ message: 'Unable to find user' })
            } else {
                resp.json(data)
            }
        })
    })
}

const handleCurrentUser = (app, User) => {
    app.route('/userCookie').get((req, resp) => {
        User.find({ 'id': req.user.id }, (err, data) => {
            if (err) {
                resp.json({ message: 'Unable to find user' })
            } else {
                resp.json(data)
            }
        })
    })
}


module.exports = {
    handleAllRestaurants,
    handleSingleRestaurant,
    handleAllOrders,
    handleSingleOrder,
    handleAllItems,
    handleItemsByRestaurant,
    handleSingleUser,
    handleAdmins,
    handleCurrentUser
}