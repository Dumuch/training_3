var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var TABLET_WIDTH = 768;
var DESKTOP_WIDTH = 1300;
var LONGITUDE = 59.939181
var LATITUDE = 30.321469

var LATITUDE_TABLET = 30.319356

var LATITUDE_DESKTOP = 30.323199

  var getScreenWidth = function() {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

    navMain.classList.remove('main-nav--nojs');
    navToggle.addEventListener('click', function() {
      if (navMain.classList.contains('main-nav--closed')) {
        navMain.classList.remove('main-nav--closed');
        navMain.classList.add('main-nav--opened');
      } else {
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
      }
    })
  ;

    var mapElement = document.querySelector("#map");
    var mapWrapper = document.querySelector(".contacts__map-wrapper");
    var map = "";
    google.maps.event.addDomListener(window, "load", init);
    google.maps.event.addDomListener(window, "resize", resizeMap);
    function init() {
        var mapOptions = {
            zoom: 16,
            mapTypeControl: false,
            zoomControl: true,
            scrollwheel: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            },
            streetViewControl: false,
            center: new google.maps.LatLng(LONGITUDE,LATITUDE),
        };
        map = new google.maps.Map(mapElement,mapOptions);
        var image = {
            url: "img/map-pin.png",
            size: new google.maps.Size(124,106),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(62,106)
        };
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(LONGITUDE,LATITUDE),
            map: map,
            optimized: false,
            icon: image
        });
        resizeMap();
    }
    function resizeMap() {
        google.maps.event.trigger(map, "resize");
        var width = getScreenWidth();
        map.setZoom(width >= TABLET_WIDTH ? 17 : 16);
        if (width >= DESKTOP_WIDTH) {
            map.panTo(new google.maps.LatLng(LONGITUDE,LATITUDE_TABLET));
        } else {
            map.panTo(new google.maps.LatLng(LONGITUDE,LATITUDE_DESKTOP));
        }
      }
    ;
