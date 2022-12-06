const asyncHandler = require('express-async-handler');

const Menu = require('../models/MenuItem');

// @desc   Get menu items
// @route  GET /api/menu
// @access Private
const getMenu = asyncHandler(async (req, res) => {
    const menu = await Menu.find();

    res.status(200).json(menu);
});

// @desc   Get menu items for single menu
// @route  GET /api/menu/:id
// @access Private
const getMenuByRestaurant = asyncHandler(async (req, res) => {
    const menu = await Menu.find({ restaurantId: req.restaurant_id });

    res.status(200).json(menu);
});

// @desc   Adds a new menu item
// @route  POST /api/menu/ADD
// @access Private
const addMenu = asyncHandler(async (req, res) => {

    const menu = await Menu.create({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        restaurantId: req.body.restaurantId,
        category: req.body.category
    });

    if(menu){

        res.status(201).json({menu});

    }
});

// @desc   Updates a menu item
// @route  PUT /api/menu/UPDATE
// @access Private
const updateMenu = asyncHandler(async (req, res) => {

    let menuToUpdate = await Menu.findById({_id: req.body._id});

    if (!menuToUpdate) {
        throw new NotFoundError();
    }

    menuToUpdate.set({name:req.body.name, price:req.body.price, description:req.body.description, category:req.body.category});

    await menuToUpdate.save();

    res.status(201).json({menuToUpdate});

});


// @desc   Deletes a menu
// @route  DELETE /api/menu/DELETE
// @access Private
const deleteMenu = asyncHandler(async (req, res) => {

    await Menu.remove({ _id: req.body._id }, function(err) {
        if (!err) {
                message.type = 'Deleted menu item!';
        }
        else {
                message.type = 'error';
        }
    });
    
});

module.exports = {

    getMenu,
    getMenuByRestaurant,
    addMenu,
    updateMenu,
    deleteMenu

}