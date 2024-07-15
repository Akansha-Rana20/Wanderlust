const express=require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const{isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer');
const {storage} = require("../Cloud_config.js");
const upload = multer({storage});



router.route("/")
.get(wrapAsync(listingController.index)) //Index Route
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));  //Create Route


//New Route
router.get("/new",isLoggedIn,wrapAsync(listingController.renderNewForm));


router.route("/:id")
.get(wrapAsync(listingController.showListing))  //Show Route
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing)) //Update route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));   //Delete Route

 
 //Edit Route
 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
 
 
module.exports = router;