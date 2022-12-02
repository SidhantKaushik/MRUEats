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
    const menu = await Menu.find({ restaurant_id: req.restaurant_id });

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
        description: req.body.address,
        restaurant_id: req.body.restaurant_id,
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

    await Menu.findByIdAndUpdate(req.body.restaurant_id, { 
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.address,
        restaurant_id: req.body.restaurant_id,
        category: req.body.category },
        function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated Menu Item: ", docs);
            }
    });
    
});


// @desc   Deletes a menu
// @route  DELETE /api/menu/DELETE
// @access Private
const deleteMenu = asyncHandler(async (req, res) => {

    await Menu.findByIdAndDelete(req.body.restaurant_id,
        function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted Menu Item: ", docs);
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