function getInfosServices() {

  var ajax = new XMLHttpRequest();
	var url = "services.php";
	ajax.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		
	}

	
	
 jQuery.ajax({
    type: "GET",
    url: 'httpRequest.php',
    url: 'httpRequest.php',
    data: {request: "http://api.geonames.org/extendedFindNearby?lat="+satCoord.lat+"&lng="+satCoord.lng+"&username=mharrach"},
    success: function(data){
        reponse = JSON.parse(data);