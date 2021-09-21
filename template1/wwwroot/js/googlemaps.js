var map;

document.addEventListener("DOMContentLoaded", function () {

});

function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -8.104433, lng: -79.032947 },
        zoom: 7
    });
    directionsRenderer.setMap(map);

    const onChangeHandler = function () {
        calculate(directionsService, directionsRenderer);
    };

    document.getElementById('calculateBtn').addEventListener('click', onChangeHandler);
}

function calculate(directionsService, directionsRenderer) {
     
    let origen =  document.getElementById("start").value; // new google.maps.LatLng(10,23);
    let destino = document.getElementById("finish").value; // new google.maps.LatLng(10,2);
    // = parseFloat(document.getElementById("start").value);
    // = parseFloat(document.getElementById("finish").value);

    directionsService.route(
        {
            origin: {
                query: origen,
            },
            destination: {
                query: destino
            },
            travelMode: google.maps.TravelMode.DRIVING,
        }, function(response, status){
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                window.alert("Directions request failed due to " + status);
            }
        }        
    );
}



