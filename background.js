function rdify() {

	// The page url
  var url = window.location.href;
  
  // Split url into an array
  var splitUrl = url.split('/');

  // Save the whether the page is a Spotify album or track
  var pageType = splitUrl[3];

  // Remove unneeded array items
  splitUrl.splice(0,4);

  // Rename the raw paramaters
  var rawParams = splitUrl[0];

  // Split the raw paramaters again to obtain the unique ID
  var rawParamsArr = rawParams.split('?');

  // Save the track ID
  var trackID = rawParamsArr[0];

  // Spotify API 
  var spotifySearch = 'http://ws.spotify.com/lookup/1/.json?uri=spotify:' + pageType + ':' + trackID;
  
  // Rdio search URL
  var rdiosearch = 'http://www.rdio.com/search/';

  // Retrieve JSON data from Spotify
	var xhr = new XMLHttpRequest();
	xhr.open("GET", spotifySearch, true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
	    // JSON.parse does not evaluate the attacker's scripts.
	    var resp = JSON.parse(xhr.responseText);
	    var type = (resp.info.type);

	    // Detect if the page is an album or track
	 		if (type = 'track') {
	    	var title = resp.track.name;
	    	console.log(title);
	    	window.location.href = rdiosearch + encodeURIComponent(title);
	    } else if (type = 'album') {
	    	var name = resp.album.name;
	    	console.log(name);
	    	window.location.href = rdiosearch + encodeURIComponent(name);
	    }
	  }
	}
	xhr.send();
}

rdify();
