<!DOCTYPE HTML>
<html>

<head>
	<title>B&J</title>
	<meta name = "viewport" content = "width=320,initial-scale=1, user-scalable=no">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="js/general.js"></script>
</head>

	<body>
		
		<div id="container">
				<div id="logo"></div>
				<?php include_once("analytics.php") ?>
				<div id="head"></div>
				
				<div id="backboard-title">
						<!--div id="backboard-text">
							<p>Enter your email address:</p>
						</div>
						<div id="input-coupon"><input type="text" id="name1" required/></div-->
						<div id="backboard-text">
							<p>The coupon will appear in a new window. Simply tap and hold to save it to your phone!</p>
						</div>
						<a href="assets/Coupon.jpg" target="_blank" onClick="trackOutboundLink(this, 'Outbound Links', 'download coupon'); return false;"><div id="save-to-phone"></div></a>
				<div class="backboard-btn-holder">
					<a href="gallery.php" onClick="_gaq.push(['_trackEvent', 'navigation', 'goToGallery']);"><div id="back"></div></a>
					<a href="locate.php" onClick="_gaq.push(['_trackEvent', 'navigation', 'goToMaps']);"><div id="locate-btn"></div></a>
				</div>
				</div>
				
		</div>
    </body>

</html>