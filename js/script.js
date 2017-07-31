var map;
var arrayMarkers = [];

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
      '&signed_in=false&callback=initialize';
  document.body.appendChild(script);
}
window.onload = loadScript;

//Map initialization
function initialize() {  
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(9.601992, 41.855809),
        mapTypeControl: false,
        disableDefaultUI: true
    };
    if($(window).width() <= 1080) {
        mapOptions.zoom = 13;
    }
    if ($(window).width() < 850 || $(window).height() < 595) {
        hideNav();
    }

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);  

    setMarkers(arrayMarkers);

    setAllMap();

    //Reset map on click handler and
    //when window resize conditionals are met
    function resetMap() {
        var windowWidth = $(window).width();
        if(windowWidth <= 1080) {
            map.setZoom(13);
            map.setCenter(mapOptions.center);
        } else if(windowWidth > 1080) {
            map.setZoom(14);
            map.setCenter(mapOptions.center);   
        }
    }
    $("#reset").click(function() {
        resetMap();
    });
   $(window).resize(function() {
        resetMap();
    }); 
}

//Determines if arrayMarkers should be visible
//This function is passed in the knockout viewModel function
function setAllMap() {
  for (var i = 0; i < arrayMarkers.length; i++) {
    if(arrayMarkers[i].boolTest === true) {
    arrayMarkers[i].holdMarker.setMap(map);
    } else {
    arrayMarkers[i].holdMarker.setMap(null);
    }
  }
}

//Information about the different locations
//Provides information for the arrayMarkers
var arrayMarkers = [
    {   
    title: "Sabian Primary Hospital",
    lat: 9.611587, 
    lng: 41.837198,
    streetAddress: "",
    cityAddress: "Dire_Dawa",
    url: "http://hospitalnear.com/Ethiopia/Dire_Dawa/Sabian_Primary_Hospital@ChIJJ7Ruff_9MBYR1H8KOGWKB_U",
    id: "nav0",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "Bilal General Hospital",
    lat: 9.600395, 
    lng: 41.853211,
    streetAddress: "Konel Village",
    cityAddress: "Konel Village, Dire Dawa",
    url: "http://www.medpages.co.za/sf/index.php?page=organisation&orgcode=313086",
    id: "nav1",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "Dil Chora Hospital",
    lat: 9.587817, 
    lng: 41.859712,
    streetAddress: "",
    cityAddress: "Dire Dawa",
    url: "whttps://www.flickr.com/photos/usarmyafrica/5117159529/in/photostream/",
    id: "nav2",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "Hiwot Fana Hospital",
    lat: 9.305251, 
    lng: 42.135059,
    streetAddress: "Aye Kokohay Street",
    cityAddress: "Dire Dawa",
    url: "http://hospitalnear.com/Ethiopia/Dire_Dawa/Hiwot_Fana_Hospital@ChIJCyZop5e9MRYRa-nDi9d4m-E/",
    id: "nav3",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Karamardha Hospital",
    lat: 9.359392, 
    lng: 42.135059,
    streetAddress: "Jijiga Airport",
    cityAddress: "Jijiga, Somali",
    url: "http://www.medpages.co.za/sf/index.php?page=organisation&orgcode=313543",
    id: "nav4",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "Dire Dawa International Airport",
    lat: 9.622794, 
    lng: 41.854158,
    streetAddress: "",
    cityAddress: "Dire Dawa town",
    url: "http://www.ethiopianairports.gov.et/web/guest/dire",
    id: "nav5",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "ATM Commercial Bank of Ethiopia",
    lat: 9.601645, 
    lng: 41.862588,
    streetAddress: "",
    cityAddress: "Dire_Dawa",
    url: "http://www.combanketh.et/",
    id: "nav6",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Taxi Stand",
    lat: 9.594865,
    lng: 41.861790,
    streetAddress: "",
    cityAddress: "Dire Dawa",
    url: "",
    id: "nav7",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Gende Kore Shopping Center",
    lat: 9.587434,
    lng: 41.855562,
    streetAddress: "",
    cityAddress: "Dire Dawa",
    url: "",
    id: "nav8",
    visible: ko.observable(true),
    boolTest: true
    }   
];

//Get Google Street View Image for each inidividual marker
    //Passed lat and lng to get each image location

var headingImageView = [5, 235, 55, 170, 190, 240, -10, 10, 190];     
var streetViewImage;
var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=180x90&location=';

function determineImage() {
    streetViewImage = streetViewUrl +
    arrayMarkers[i].lat + ',' + arrayMarkers[i].lng +
    '&fov=75&heading=' + headingImageView[i] + '&pitch=10';                 
}

//Sets the arrayMarkers on the map within the initialize function
    //Sets the infoWindows to each individual marker
    //The arrayMarkers are inidividually set using a for loop
function setMarkers(location) {
    
    for(i=0; i<location.length; i++) {
        location[i].holdMarker = new google.maps.Marker({
          position: new google.maps.LatLng(location[i].lat, location[i].lng),
          map: map,
          title: location[i].title,
          icon: {
            url: 'img/marker.png',
            size: new google.maps.Size(25, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(12.5, 40)
            },
          shape: {
            coords: [1,25,-40,-25,1],
            type: 'poly'
          }  
        });

        //function to place google street view images within info windows
        determineImage();

        //Binds infoWindow content to each marker
        location[i].contentString = '<img src="' + streetViewImage + 
                                    '" alt="Street View Image of ' + location[i].title + '"><br><hr style="margin-bottom: 5px"><strong>' + 
                                    location[i].title + '</strong><br><p>' + 
                                    location[i].streetAddress + '<br>' + 
                                    location[i].cityAddress + '<br></p><a class="web-links" href="http://' + location[i].url + 
                                    '" target="_blank">' + location[i].url + '</a>';

        var infowindow = new google.maps.InfoWindow({
            content: arrayMarkers[i].contentString
        });

        //Click marker to view infoWindow
            //zoom in and center location on click
        new google.maps.event.addListener(location[i].holdMarker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,this);
            var windowWidth = $(window).width();
            if(windowWidth <= 1080) {
                map.setZoom(14);
            } else if(windowWidth > 1080) {
                map.setZoom(16);  
            }
            map.setCenter(marker.getPosition());
            location[i].picBoolTest = true;
          }; 
        })(location[i].holdMarker, i));
        
        //Click nav element to view infoWindow
            //zoom in and center location on click
        var searchNav = $('#nav' + i);
        searchNav.click((function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,marker);
            map.setZoom(16);
            map.setCenter(marker.getPosition());
            location[i].picBoolTest = true;
          }; 
        })(location[i].holdMarker, i));
    }
}

//Query through the different locations from nav bar with knockout.js
    //only display arrayMarkers and nav elements that match query result
var viewModel = {
    query: ko.observable(''),
};

viewModel.arrayMarkers = ko.dependentObservable(function() {
    var self = this;
    var search = self.query().toLowerCase();
    return ko.utils.arrayFilter(arrayMarkers, function(marker) {
    if (marker.title.toLowerCase().indexOf(search) >= 0) {
            marker.boolTest = true;
            return marker.visible(true);
        } else {
            marker.boolTest = false;
            setAllMap();
            return marker.visible(false);
        }
    });       
}, viewModel);

ko.applyBindings(viewModel);

//show $ hide arrayMarkers in sync with nav
$("#input").keyup(function() {
setAllMap();
});

//Hide and Show entire Nav/Search Bar on click
    // Hide/Show Bound to the arrow button
    //Nav is repsonsive to smaller screen sizes
var isNavVisible = true;
function noNav() {
    $("#search-nav").animate({
                height: 0, 
            }, 500);
            setTimeout(function() {
                $("#search-nav").hide();
            }, 500);    
            $("#arrow").attr("src", "img/down-arrow.gif");
            isNavVisible = false;
}
function yesNav() {
    $("#search-nav").show();
            var scrollerHeight = $("#scroller").height() + 55;
            if($(window).height() < 600) {
                $("#search-nav").animate({
                    height: scrollerHeight - 100,
                }, 500, function() {
                    $(this).css('height','auto').css("max-height", 439);
                });  
            } else {
            $("#search-nav").animate({
                height: scrollerHeight,
            }, 500, function() {
                $(this).css('height','auto').css("max-height", 549);
            });
            }
            $("#arrow").attr("src", "img/up-arrow.gif");
            isNavVisible = true;
}

function hideNav() {
    if(isNavVisible === true) {
            noNav();
            
    } else {
            yesNav();  
    }
}
$("#arrow").click(hideNav);

//Hide Nav if screen width is resized to < 850 or height < 595
//Show Nav if screen is resized to >= 850 or height is >= 595
    //Function is run when window is resized
$(window).resize(function() {
    var windowWidth = $(window).width();
    if ($(window).width() < 850 && isNavVisible === true) {
            noNav();
        } else if($(window).height() < 595 && isNavVisible === true) {
            noNav();
        }
    if ($(window).width() >= 850 && isNavVisible === false) {
            if($(window).height() > 595) {
                yesNav();
            }
        } else if($(window).height() >= 595 && isNavVisible === false) {
            if($(window).width() > 850) {
                yesNav();
            }     
        }    
});
