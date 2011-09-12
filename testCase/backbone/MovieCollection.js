// define our collection
var MovieCollection = Backbone.Collection.extend({
    model: Movie,
    initialize: function (spec) {
        // somthing
        console.log(arguments)
    }
});

/*

var library = new MovieCollection();



// you can add stuff by creating the model first
var dumb_and_dumber = new Movie({
    title: "Dumb and Dumber",
    format: "dvd"
});



library.add(dumb_and_dumber);



// or even by adding the raw attributes
library.add({
    title: "The Big Lebowski",
    format: "VHS"
});
*/
