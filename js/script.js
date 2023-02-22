$(function() {

  // Check if geolocation is allowed by the user
  if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
	  var accuracy = position.coords.accuracy;


      // Display current location
      //$('#locationhere').text("Current location: " + lat + ", " + long);
	  var accuracyTag = $('<p>').text("Accuracy: " + accuracy + " meters");
      var locationTag = $('<p>').text("Current location: " + lat + ", " + long);
      $('#locationhere').append(accuracyTag, locationTag);
	  
      if (localStorage.getItem('lastLocation')) {
        var lastLocation = JSON.parse(localStorage.getItem('lastLocation'));
        var lastLat = lastLocation.lat;
        var lastLong = lastLocation.long;
		
        // Calculate distance between current and last location and converting it from meters to km.
        var distance = calcDistanceBetweenPoints(lat, long, lastLat, lastLong) / 1000;

        // Displaying last location and distance
        var lastLocationTag = $('<p>').text("Last location: " + lastLat + ", " + lastLong);
        var distanceTag = $('<p>').text("You have traveled " + distance + " kms ");
        $('#locationhere').after(lastLocationTag, distanceTag);

        $('header').prepend('<h2 style="color:green;">Welcome back to the page!</h2>');
      } else {
        // Display welcome message
        $('header').prepend('<h2 style="color:green;">Welcome to the page!</h2>');
      }

      // Storing current location in localstorage
      var currentLocation = {
        lat: lat,
        long: long
      };
      localStorage.setItem('lastLocation', JSON.stringify(currentLocation));

    }, function(error) {
      // Display error message if geolocation is blocked
      $('header').prepend('<h2 style="color:red;">Error: You Blocked The Access</h2>');
    });
  } else {
    // Display error message if geolocation is not supported
    $('header').prepend('<h2 style="color:red;">Error: Geolocation is not supported by this browser</h2>');
  }

  // Function to calculate the distance in metres between two lat/long pairs on Earth
  function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
    var toRadians = function(num) {
      return num * Math.PI / 180;
    };
    var R = 6371000; // radius of Earth in metres
    var φ1 = toRadians(lat1);
    var φ2 = toRadians(lat2);
    var Δφ = toRadians(lat2 - lat1);
    var Δλ = toRadians(lon2 - lon1);

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c);
  }

});
