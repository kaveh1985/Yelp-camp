var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
// ===========================================

var data = [

  {

  	name: "yelp camping",
  	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfil1b3s6rnlswTsqnt57_wwtIucynKGP-cZlydRowGzX_IcPLfA",
  	description: "blah blah blah blah" 
    
  },

   {
  	
  	name: "yelp camping",
  	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfil1b3s6rnlswTsqnt57_wwtIucynKGP-cZlydRowGzX_IcPLfA",
  	description: "blah blah blah blah" 
    
  },

   {
  	
  	name: "yelp camping",
  	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKj32u2h5xaN2c7HnpT6ixjCppKSFwegO8GUAG3Kl7vr0RYYmIzQ",
  	description: "blah blah blah blah" 
    
  }

];

 function seedDB() {
        //Remove all campgrounds
    	Campground.remove( {}, function(err) {
	    if(err) {
		console.log(err);
	 }
	    console.log("removed Campgrounds!");
   });
    	//add a few campgrounds
        data.forEach(function(seed) {
        	Campground.create(seed, function(err, campground) {
        		if(err) {
        			console.log(err);
        		} else {
        			console.log("added a new campground");
        			Comment.create( {
        				text: "this place is awesome but i wish there was internet!",
        				author: "Homer"
        			}, function(err, comment) {
        				if(err) {
        					console.log(err);
        				} else {
        					campground.comments.push(comment);
        					campground.save();
        			        console.log("Created new comment");
        				}
        			});
        			
        		}
        	});
        });
    	
    	//add a few comments
 }

    module.exports = seedDB;