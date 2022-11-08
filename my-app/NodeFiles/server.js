require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const helper = require("./handlers/helpers.js");

// create connection to database
require("./handlers/dataConnector.js").connect();

// Express session
const app = express();
const Restaurant = require("./models/Restaurant");
const User = require("./models/User");
const MenuItem = require("./models/MenuItem");
const Order = require("./models/Order");

app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: process.env.SECRET,
		resave: true,
		saveUninitialized: true,
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// use express flash, which will be used for passing messages
app.use(flash());
require("./handlers/auth.js");

app.set("views", "./views");
app.set("view engine", "ejs");

// default route
/* app.get("/", helper.ensureAuthenticated, (req, res) => {
	res.render("home.ejs", { user: req.user });
}); */

//const publicPath = path.join(__dirname, 'build');
//app.use(express.static(publicPath));

// routes to HomeView
/* app.get('/HomeView', helper.ensureAuthenticated, function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
}) */

/* //routes to DefaultView
app.get('/DefaultView', helper.ensureAuthenticated, function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
}) */

// routes to Profile
/* app.get('/Profile', helper.ensureAuthenticated, (req, res) => {
  res.render("profile.ejs", { user: req.user });
}) */

//Sign-up route

// login error
app.get("/login", (req, res) => {
	res.render("login.ejs", { message: req.flash("error") });
});

// login check
app.post("/login" || "/", async (req, res, next) => {
	//use passport authentication to see if valid login
	passport.authenticate("localLogin", {
		successRedirect: "/HomeView",
		failureRedirect: "/login",
		failureFlash: true,
	})(req, res, next);
});


app.get("/registration", async (req, res) => {
	res.render("registration.ejs", { message: req.flash("error") });
});

/* app.post(() =>{



}) */

// logout
app.get("/logout", (req, resp) => {
	req.logout();
	req.flash("info", "You were logged out");
	resp.render("login", { message: req.flash("info") });
});

// use the route handlers
const router = require("./handlers/router.js");

router.handleAllRestaurants(app, Restaurant);
router.handleSingleRestaurant(app, Restaurant);
router.handleAllOrders(app, Order);
router.handleSingleOrder(app, Order);
router.handleAllItems(app, MenuItem);
router.handleItemsByRestaurant(app, MenuItem);
router.handleSingleUser(app, User);
router.handleAdmins(app, User);
router.handleCurrentUser(app, User);

// return all the Plays when a root request arrives
//app.get('/api/list', helper.ensureAuthenticated, (req, resp) => { resp.json(router.handleAllPlays(app, Play)) });

// return all the Plays when a root request arrives
app.get('/', (req, resp) => {
	const filename = path.join(publicPath, 'index.html');
	resp.sendFile(filename);
});

// port connection
const port = process.env.PORT;
app.listen(port, 3000, function () {
	console.log("Server running at port = " + port);
});
