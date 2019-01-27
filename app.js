var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    seedDB        = require("./seeds");


   

 mongoose.connect("mongodb://localhost:27017/yelp_camp_3", { useNewUrlParser: true });  
 app.use(bodyParser.urlencoded({extended: true}));
 app.set("view engine", "ejs"); 


        seedDB();

      // Campground.create(
      // {
      //      name: "Salmon Creek",
      //      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2mQ1RXudGn6i7mN_BnuuEMjBXetI8ILWz0gEbBvh1cnuPWolF", 
      //      description: "This is  a huge granite hill, no bathrooms. No water. Beautiful granite!"      
      // }, function(err, campground) {

      // 	  if(err) {
      // 	  	console.log(err);
      // 	  } else {
      // 	  	console.log("NEW CAMPGROUND HAS BEEN CREATED!");
      // 	  	console.log(campground);
      // 	  }

      // }); 


// var campground = [

//           {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2mQ1RXudGn6i7mN_BnuuEMjBXetI8ILWz0gEbBvh1cnuPWolF"},
//           {name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=350"},
//           {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/05/03/00/42/vw-camper-336606__340.jpg"},
         
//      ]



app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	//Get all campgrounds from DB
	Campground.find({}, function(err, allcampgrounds) {
		if(err) {
			console.log(err);
		} else {
     res.render("index", {campground: allcampgrounds});

		}
	})
	
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description: description};
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){

          if(err) {

          	console.log(err);
          	
          } else {

	         res.redirect("/campgrounds");

          }
	});
	//redirect back to campgrounds page
});


//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
});

// SHOW more info about one campground
app.get("/campgrounds/:id", function(req, res) {
	//find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err) {
			console.log(err);
		} else {
	//render show template with that camoground			
			res.render("show", {campground: foundCampground});
		}
	});

});




app.listen(3000, function() {
	console.log("The yelpCamp Server has started!");
}) 
