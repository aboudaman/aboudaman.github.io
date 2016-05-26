var myApp = (function() {
    var neighborhoodProjectModel = {
        placesResults: ko.observableArray([]),
        selectedName: ko.observable(''),
        arrayFilter: ko.observableArray([]),
        myMarkers2: ko.observableArray([]),
        removedItems: ko.observableArray([])
    };
    // Set up global variables for map
    var map;
    var nami = "BOOOPO";
    var markers = [];
    var marker;
    var mapOptions;
    var service;
    var mapCenter;
    var location = {
        lat: 28.46,
        lng: -81.46
    };
    var request;
    var infoWindow;
    var diffIndexes = [];
    var myMarkers = [];
    var markerOnMap = [];
    var displayHtml = "";
    var isMapsLoaded = false;
    var httpRequest;
    /**
     * Define function to asynchronously load Google map
     * @return {[type]} [description]
     */
    var drawMap = function() {
        var url =
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyA9b9z3j3paRm7FYwL00BetS5am-2ntTR8&libraries=places";
        $.ajax({
            type: "GET",
            dataType: 'script',
            url: url,
            crossDomain: true,
        }).done(function(data) {
            initMap();
        }).fail(function(xhr, textStatus, errorThrown) {
            alert("There is an error " + textStatus);
        });
    };
    /**
     * Define function to load the map
     * @return {[type]} [description]
     */
    var initMap = function() {
        isMapsLoaded = true;
        var mapElement = document.getElementById("mapcontainer");
        map = new google.maps.Map((mapElement), {
            center: location,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        google.maps.event.addDomListener(map, 'idle', function() {
            calculateMapCenter();
        });
        google.maps.event.addDomListener(window, 'resize', function() {
            map.setCenter(mapCenter);
        });
        //Create request object for search
        request = {
            location: location,
            radius: "300",
            types: ["restaurant"]
        };
        //Create infowindow object
        infoWindow = new google.maps.InfoWindow({
            disableAutoPan: false
        });
        // Create service request
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
        registerSubscribers();
    }; //End initMap
    /**
     * Define the function to ensure that the map is always displayed centrally
     */
    var calculateMapCenter = function() {
        mapCenter = map.getCenter();
    };
    var callback = function(results, status) {
        var bounds = new google.maps.LatLngBounds();
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                bounds.extend(results[i].geometry.location);
                createMarker(results[i], i);
            }
            map.fitBounds(bounds);
        }
    };
    var createMarker = function(place, i) {
        var placeLoc = place.geometry.location;
        // console.log(place.name + " and index "+i);
        markers[i] = new google.maps.Marker({
            map: map,
            position: placeLoc,
            animation: google.maps.Animation.DROP
        });
        addResult(place.name, i);
        google.maps.event.addDomListener(markers[i], "click",
            function() {
                markers[i].setAnimation(google.maps.Animation.BOUNCE);
                getFourSquareData(place.name, markers[i]);
                infoWindow.open(map, this);
                map.setCenter(this.position);
                // infoWindow.disableAutoPan(map, true);
                setTimeout(function() {
                    markers[i].setAnimation(null);
                }, 2000);
            });
    }; //End createMarker
    // Add result to the view
    var addResult = function(result, i) {
        neighborhoodProjectModel.placesResults.push({
            name: result,
            marker: i
        });
    };
    // Compare two arrays and log the difference
    var arrayDiff = function(a, b) {
        return a.filter(function(i) {
            if (b.indexOf(i) < 0) {
                diffIndexes.push(a.indexOf(i));
                return true;
            } else {
                return false;
            }
        });
    };
    /**
     * Function to filter the names of places on the screen
     */
    neighborhoodProjectModel.filterByNames = ko.computed(function() {
        var filterByName = neighborhoodProjectModel.selectedName();
        myMarkers = [];
        markerOnMap = [];
        neighborhoodProjectModel.myMarkers2([]);
        return neighborhoodProjectModel.placesResults().filter(
            function(i) {
                markerOnMap.push(i.marker);
                if (i.name.toLowerCase().indexOf(
                    filterByName) >= 0) {
                    // var myMarkers2 = neighborhoodProjectModel.myMarkers2();
                    myMarkers.push(i.marker);
                    neighborhoodProjectModel.myMarkers2().push(
                        i.marker);
                    return i.name.toLowerCase().indexOf(
                        filterByName) >= 0;
                }
            });
    });
    // Register subscribers to be used
    var registerSubscribers = function() {
        // Fire when the search is changed
        neighborhoodProjectModel.selectedName.subscribe(function(
            changes) {
            var removedItems2 = neighborhoodProjectModel.removedItems();
            var dynaArray = neighborhoodProjectModel.myMarkers2();
            removedItems2 = arrayDiff(markerOnMap,
                dynaArray);
            console.log("The resulting array " +
                removedItems2.length);
            if (removedItems2.length === 0) {
                $.each(markerOnMap, function(id, value) {
                    if (infoWindow) {
                        infoWindow.close();
                    }
                    console.log(
                        "BOOOO AM RESTTING MARKERS!!!"
                    );
                    markers[value].setVisible(true);
                });
            }
            drawFilterMarker(dynaArray);
            trackMarker(removedItems2);
        }, null, "change");
    };
    /**
     * Function to display only markers that corresponds to the search filter
     */
    var drawFilterMarker = function(arr) {
        var toDraw = arr;
        if (toDraw.length >= 0) {
            $.each(toDraw, function(id, value) {
                var mark = value;
                // markers[mark].setMap(map);
                markers[mark].setVisible(true);
                markers[mark].setAnimation(google.maps.Animation
                    .BOUNCE);
                setTimeout(function() {
                    markers[mark].setAnimation(null);
                }, 2000);
            });
        }
    };
    /**
     * Function to track which markers are not required
     */
    var trackMarker = function(arr) {
        var removedItems2 = arr;
        if (removedItems2.length !== 0) {
            $.each(removedItems2, function(id, val) {
                // markers[val].setMap(null);
                markers[val].setVisible(false);
                infoWindow.close();
            });
        }
    };
    /**
     * show which markers have been clicked on the map
     */
    neighborhoodProjectModel.showMarkerOnMap = function(id) {
        google.maps.event.trigger(markers[id], "click");
    };
    /**
     * Function to make API calls to foursquare website
     */
    var collectJSON = function(urlData, marker) {
        // Make the ajax call to foursquare API:
        $.ajax({
            url: urlData,
            type: "GET",
            dataType: "jsonp"
        }).done(function(data) {
            // Declare foursquare data variables to be used
            var jsData = data;
            var venuePrice;
            var results = Number(jsData.response.totalResults);
            var venueName;
            var picPrefix;
            var picSuffix;
            var venueAddress;
            var venueCategory;
            var venueTelephone;
            // Ensure that the info returned from foursquare has data
            if (results !== 0) {
                var location = jsData.response.headerFullLocation;
                venueName = jsData.response.groups[0].items[
                    0].venue.name;
                venueTelephone = jsData.response.groups[0].items[
                    0].venue.contact.formattedPhone;
                venueCategory = jsData.response.groups[0].items[
                    0].venue.categories[0].name;
                venuePrice = jsData.response.groups[0].items[
                    0].venue.price.message;
                picPrefix = jsData.response.groups[0].items[
                    0].venue.featuredPhotos.items[0].prefix;
                picSuffix = jsData.response.groups[0].items[
                    0].venue.featuredPhotos.items[0].suffix;
                venueAddress = jsData.response.groups[0].items[
                    0].venue.location.formattedAddress;
            } else {
                venueName = "No Data on FourSquare";
                venuePrice = " No Data on FourSquare";
                picPrefix = "No Data";
                picSuffix = "No Data";
                venueAddress = "No Data";
                venueTelephone = "No Data";
            }
            // Get the data in info window
            infoWindow.setContent("<div> <p>" + (results ===
                    0 ?
                    "<strong>No Pictures From Foursquare</strong> " :
                    "<img src=" + picPrefix + "100x100" +
                    picSuffix + ">") + "</p>" +
                "<p><strong>Restaurant Name:</strong> " +
                venueName + "</p>" +
                "<p><strong>Restaurant Category:</strong> " +
                venueCategory + "</p>" +
                "<p><strong> Affordability:</strong> " +
                venuePrice + "</p>" +
                "<p><strong> Telephone</strong> " +
                venueTelephone + "</p>" +
                "<p><strong> Address:</strong> " +
                venueAddress + "</p>" + "</div>");
        }).fail(function(xhr, textStatus, errorThrown) {
            alert("There is a " + textStatus);
        });
    }; //End collectJSON
    var getFourSquareData = function(placeQuery, marker) {
        if (infoWindow) {
            infoWindow.close();
        }
        var markerID = marker;
        var theDate = new Date();
        var month = theDate.getMonth() + 1;
        var year = theDate.getFullYear();
        var day = theDate.getDate();
        var displayHtml = "";
        // Format date into format readable by foursquare
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        var currentDate = year + "" + month + "" + day;
        var fourSquareQuery = placeQuery.split(" ").join("%20");
        var url = "https://api.foursquare.com/v2/venues/explore?";
        var clientID =
            "EOTJ0B10VHRWA5GYPMLFOUNHCY3YQYNH0ZOJ11FPGIBA0PSH";
        var clientSecret =
            "LYTJEQU1MYB0EVMCERMCZ3YWFRE1XM1IPZLAHBAYIM4AG1PH";
        var linkVariable = "ll=28.46,-81.46&client_id=" + clientID +
            "&client_secret=" + clientSecret + "&v=" + currentDate;
        var fullUrl = url + linkVariable + "&query=" +
            fourSquareQuery + "&limit=1&venuePhotos=1&radius=300";
        collectJSON(fullUrl, markerID);
    };
    // Call drawMap
    drawMap();
    ko.applyBindings(neighborhoodProjectModel);
    return {
        initMap: initMap
    };
})();