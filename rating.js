window.onload = insertRating();
function insertRating() {
	var movieClasses = ["l1", "l2", "l3"]
	for(var movieClassIndex = 0; movieClassIndex < movieClasses.length; movieClassIndex++) {
		var movies = document.getElementsByClassName(movieClasses[movieClassIndex]);
		for (var movieIndex = 0; movieIndex < movies.length; movieIndex++) {
			createAndSendRequestForRating(movies[movieIndex])
		}
	}
}

function createAndSendRequestForRating(movieElement)
{
	var textElement = movieElement.childNodes[0]
	var titleArray = textElement.textContent.split("(")
	if(titleArray.length >= 2) {
	    var request = new XMLHttpRequest();
	    request.onreadystatechange = function(){
	        if ( request.readyState == 4 ){
	            getAndSetRating(movieElement, request);
	        }
	    };
    
		var title = titleArray[0]
		var year = titleArray[1].split(")")[0]
	    var ratingURL = "https://www.omdbapi.com/?t=" + title + "&y=" + year + "&plot=short&r=json"
	    request.open( "GET", ratingURL, true );
	    request.send();
	}
}

function getAndSetRating(movieElement, request) {
	var jsonResponse = convertStringToJSON(request.responseText)
	var rating = "N/A"
	if(jsonResponse != null && jsonResponse.hasOwnProperty("imdbRating")) {
		rating = jsonResponse["imdbRating"]
	}
	var ratingElement = document.createElement("span");
    ratingElement.appendChild(document.createTextNode("IMDb Rating: " + rating));
    ratingElement.style.padding = "2px"
    ratingElement.style.backgroundColor = "#EFE3A4"
    movieElement.appendChild(ratingElement);
    var breakElement = document.createElement("br");
    movieElement.insertBefore(breakElement, ratingElement)
}

function convertStringToJSON(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
}