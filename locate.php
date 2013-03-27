<!DOCTYPE HTML>
<html>

<head>
	<title>B&J</title>
	<meta name = "viewport" content = "width=320,initial-scale=1, user-scalable=no">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="http://eightmedia.github.com/hammer.js/dist/jquery.hammer.js"></script>
	<script src="js/general.js"></script>
	
	<style type="text/css">
      #map-canvas { 
      	height: 70%; 
      	width: 80%; 
      	margin: 0 auto;
      	top: 25px;
      	border: solid hsl(206, 62%, 40%) 5px;
      	box-shadow: 2px 3px 3px 0px hsl(206, 63%, 40%);
      }
    </style>
   
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDw97DyjcwLwwkei1mrtrCLSjtKQ2rK550&sensor=false"></script>
    
  <script>
      function initialize() {
        var mapOptions = {
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // Define Marker properties
        var image = new google.maps.MarkerImage('assets/iconmarker.png',
        // This marker is 129 pixels wide by 42 pixels tall.
        new google.maps.Size(28, 44),
        // The origin for this image is 0,0.
        new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 18,42.
        new google.maps.Point(10, 44)
        );


        var contentString = '<h3>Rochester Park</h3>31 Rochester Drive #01-01<br/>'+
        'Rochester Mall<br/>Singapore 138637<br/>'+
        'Telephone: +6684 9606<br/>11am-10pm daily';

        var contentString2 = '<h3>VivoCity</h3>1 Harbourfront Walk, #02-135/136<br/>'+
        'Singapore 098585<br/>Telephone: +65 6376 9917br/>'+
        '11am-10pm daily';

        var contentString3 = '<h3>Great World City</h3>#02-40A 1 Kim Seng Promenade<br/>'+
        'Singapore 237994<br/>'+
        'Telephone: +65 6836 0814<br/>11am-10pm daily';

        var contentString4 = '<h3>The Cathay</h3>2 Handy Road, #02-12<br/>'+
        'Singapore 229233<br/>'+
        'Telephone: +65 6235 2467<br/>11am-11pm daily';

        var contentString5 = '<h3>Dempsey</h3>Blk 8 Dempsey Road #01-14<br/>'+
        'Telephone: +65 6473 3231<br/>'+
        '11am-11pm daily';

        var contentString6 = '<h3>Raffles City</h3>252 North Bridge Road, Raffles City Shopping Centre,<br/>'+
        '#B1-80 Singapore 179103<br/>'+
        'Telephone: +65 6336 2143<br/>11am-10pm daily';

        var contentString9 = '<h3>Night Safari</h3>80 Mandai Road<br/>'+
        'Singapore 729826<br/>'+
        'Telephone: +65 6368 9140<br/>8am-12am daily';

        var contentString8 = '<h3>Jurong Bird Park (Birdz of Play)</h3>2 Jurong Hill<br/>'+
        'Singapore 628924<br/>'+
        '11am - 5:30pm (Weekdays)<br/>8am-12am daily';

        var scoopShop1 = new google.maps.InfoWindow({
            content: contentString
        });

        var marker1 = new google.maps.Marker({
            position: new google.maps.LatLng(1.3052569,103.78842),
            map: map,
            icon: image,
            title: 'Rochester Park'
        });
        google.maps.event.addListener(marker1, 'click', function() {
          scoopShop1.open(map,marker1);
        });

        var scoopShop2 = new google.maps.InfoWindow({
            content: contentString2
        });

        var marker2 = new google.maps.Marker({
            position: new google.maps.LatLng(1.2650329,103.821761),
            map: map,
            icon: image,
            title: 'VivoCity'
        });
        google.maps.event.addListener(marker2, 'click', function() {
          scoopShop2.open(map,marker2);
        });

        var scoopShop3 = new google.maps.InfoWindow({
            content: contentString3
        });

        var marker3 = new google.maps.Marker({
            position: new google.maps.LatLng(1.293984,103.832088),
            map: map,
            icon: image,
            title: 'Great World City'
        });
        google.maps.event.addListener(marker3, 'click', function() {
          scoopShop3.open(map,marker3);
        });

        var scoopShop4 = new google.maps.InfoWindow({
            content: contentString4
        });

        var marker4 = new google.maps.Marker({
            position: new google.maps.LatLng(1.299451,103.847698),
            map: map,
            icon: image,
            title: 'The Cathay'
        });
        google.maps.event.addListener(marker4, 'click', function() {
          scoopShop4.open(map,marker4);
        });

        var scoopShop5 = new google.maps.InfoWindow({
            content: contentString5
        });

        var marker5 = new google.maps.Marker({
            position: new google.maps.LatLng(1.3043198,103.8093897),
            map: map,
            icon: image,
            title: 'Dempsey'
        });
        google.maps.event.addListener(marker5, 'click', function() {
          scoopShop5.open(map,marker5);
        });

        var scoopShop6 = new google.maps.InfoWindow({
            content: contentString6
        });

        var marker6 = new google.maps.Marker({
            position: new google.maps.LatLng(1.2925456,103.8535097),
            map: map,
            icon: image,
            title: 'Raffles City'
        });
        google.maps.event.addListener(marker6, 'click', function() {
          scoopShop6.open(map,marker6);
        });

        var scoopShop9 = new google.maps.InfoWindow({
            content: contentString9
        });

        var marker9 = new google.maps.Marker({
            position: new google.maps.LatLng(1.41167,103.785738),
            map: map,
            icon: image,
            title: 'Night Safari'
        });
        google.maps.event.addListener(marker9, 'click', function() {
          scoopShop9.open(map,marker9);
        });

        var scoopShop8 = new google.maps.InfoWindow({
            content: contentString8
        });

        var marker8 = new google.maps.Marker({
            position: new google.maps.LatLng(1.3180714,103.7068176),
            map: map,
            icon: image,
            title: 'Jurong Bird Park'
        });
        google.maps.event.addListener(marker8, 'click', function() {
          scoopShop8.open(map,marker8);
        });


        // Try HTML5 geolocation
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);

            var infowindow = new google.maps.InfoWindow({
              map: map,
              position: pos,
              content: 'Click the marker for details!'
            });

            map.setCenter(pos);
          }, function() {
            handleNoGeolocation(true);
          });
        } else {
          // Browser doesn't support Geolocation
          handleNoGeolocation(false);
        }

      }

      function handleNoGeolocation(errorFlag) {
        if (errorFlag) {
          var content = 'Error: The Geolocation service failed.';
        } else {
          var content = 'Error: Your browser doesn\'t support geolocation.';
        }

        var options = {
          map: map,
          position: new google.maps.LatLng(60, 105),
          content: content
        };

        var infowindow = new google.maps.InfoWindow(options);
        map.setCenter(options.position);
      }

      google.maps.event.addDomListener(window, 'load', initialize);

    </script>
  </head>
    
    <body onload="initialize()">  
    <?php include_once("analytics.php") ?>

		
  		<div id="container">
          <div id="logo"></div>

  				<div id="map-canvas"></div>

          <a href="coupon.php" onClick="_gaq.push(['_trackEvent', 'navigation', 'goToCoupon']);"><div id="close-btn"></div></a>

          <div id="text-map">Can't see the map? Tap here!</div>
  		</div>
    </body>
     <script type="text/javascript">
        setTimeout(function(){
        // Hide the address bar!
        window.scrollTo(0, 1);
        }, 0);
    </script>
</html>