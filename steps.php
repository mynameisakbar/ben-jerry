<!DOCTYPE HTML>
<html>

<head>
	<title>B&J</title>
	<meta name = "viewport" content = "width=320,initial-scale=1, user-scalable=no">
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="js/general.js"></script>
</head>

	<body>
		<div id="container">
			<?php include_once("analytics.php") ?>
			<div id="logo"></div>
			<div id="head-steps"></div>		

				<div id="backboard-title">		
					<div id="steps"></div>
					<div class="backboard-btn-holder">
						<a href="" target="_blank"><div id="cow"></div></a>
						<a href="upload.html" onClick="_gaq.push(['_trackEvent', 'navigation', 'goToUpload']);"><div id="continue-btn"></div></a>
					</div>
				</div>
				
		</div>
    </body>

</html>