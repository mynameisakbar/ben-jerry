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
				<?php include_once("analytics.php") ?>
				<div id="logo"></div>
				<div id="head"></div>
				
				<div id="backboard-title">
						<div id="backboard-text">
							<p>As a way to thank you for your support these 3 decades, Ben & Jerry's scoop shops have set aside <strong>April 9th</strong> to give out our chunkiest, funkiest ice cream!</p>
 
							<p>If you just can't wait for Free Cone Day, join our friendship timeline by uploading a photo of you and your friend to get 1-for-1 ice cream!</p>
						</div>
						<div class="backboard-btn-holder">
							<a href="http://mynameisakbar.com/files/bjcal.ics" target="_blank" onClick="trackOutboundLink(this, 'Outbound Links', 'download calendar'); return false;"><div id="calendar"></div></a>
							<a href="gallery-before.php" onClick="_gaq.push(['_trackEvent', 'navigation', 'goToSteps']);"><div id="next-btn"></div></a>
						</div>
				</div>
				
		</div>
    </body>

</html>