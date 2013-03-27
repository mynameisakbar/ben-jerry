<?php
    $dir = 'uploads/';
    $imgs = array();

    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
            if (!is_dir($file) && preg_match("/\.(bmp|jpe?g|gif|png)$/", $file)) {
                array_push($imgs, $file);
            }
        }

        closedir($dh);
    } else {
        die('cannot open ' . $dir);
    }

    
?>

<!DOCTYPE HTML>
<html>

<head>
	<title>B&J</title>
	<meta name = "viewport" content = "width=320,initial-scale=1, user-scalable=no">
	<link rel="stylesheet" type="text/css" href="css/style.css" />

	<link rel="stylesheet" href="icarousel/css/icarousel.css" />

		<link rel="stylesheet" href="icarousel/css/demo2.css" />
		<script src="icarousel/js/jquery.min.js"></script>
		<script src="icarousel/js/raphael-min.js"></script>
		<script src="icarousel/js/jquery.mousewheel.js"></script>
		<script src="icarousel/js/jquery.easing.1.3.js"></script>
		<script src="icarousel/js/icarousel.packed.js"></script>
		<script>
			$(window).scroll(function(){
				window.scrollTo(0,0);
			});
			$(document).ready(function(){

				$('#icarousel').iCarousel({
					autoPlay: false,
					keyboardNav: true, // To Enable or Disable the keyboard navigation
        			touchNav: true,
					animationSpeed: 1000,
					pauseTime: 7000,
					slidesSpace: 300,
					timerOpacity: 0.0,
					directionNav: false,
					onAfterLoad: function(){
						console.log('slider loaded');
					}
				});
			});
		</script>
</head>

	<body>
		<?php include_once("analytics.php") ?>
		<div id="container">
			<div id="logo"></div>

			

				<div id="imageholder" style="margin-bottom:100px;">
					<div class="carousel-container">
						<div id="icarousel" class="icarousel">
							<?php

								foreach ($imgs as $idx=>$img) {
						        $class = ($idx == count($imgs) - 1 ? ' class="last"' : '');
						        //echo $dir;
						        //echo $img . "</br>";
						        $myArray = explode('^', $img);
						        //echo $myArray[0] ."</br>" ;
						        //echo $myArray[1] ."</br>";
						        //echo $myArray[2] ."</br>";
						       // echo '<img src="' . $dir . $img . '" alt="' . $img . '"' . $class . ' />' . "\n";
						        //echo "</br>" . "</br>";


								echo '<div class="placeHolder">';
									        echo '<div class="imageholder">';
									        	echo '<img src="' . 'uploads/' . $img . '" alt="' . $img . '"'  . ' />';
									        echo '</div>';

									        echo '<div class="namesholder">';
									        		echo $myArray[1] . " & " . $myArray[2];
									        echo '</div>';

									        echo '<div id="point"></div>';
									        
									        echo '<div class="yearholder">';
									        	//echo $myArray[0];
									        	$newdate = strtotime($myArray[0]);
									        	$newformat = date('M-Y',$newdate);
									        	echo $newformat;
									        echo '</div>';
								        echo '</div>';

					    		}

							?>
						</div/>
					</div>
				</div>
				<div id="timeline"></div>
				

			

			<div class="backboard-btn-holder" style="bottom:70px;position:relative;">
					<!--a href="coupon.php" onClick="_gaq.push(['_trackEvent', 'navigation', 'goToClaimCoupon']);"><div id="claim-btn"></div></a>
					<a href="https://www.facebook.com/dialog/feed?
						  app_id=472882532779296&
						  link=https://www.mynameisakbar.com/bjlive&
						  picture=http://mynameisakbar.com/files/bj.jpg&
						  name=Ben%20%26%20Jerry%27s%20Free%20Cone%20Day&
						  caption=Just%20claimed%20my%201%2Dfor%2D1%20ice%20cream%20coupon%20from%20Ben%20%26%20Jerry%27s%2E%20Get%20yours%20now%21&
						  redirect_uri=http://facebook.com" target="_blank" onClick="trackOutboundLink(this, 'Outbound Links', 'facebook sharing'); return false;"><div id="fb-btn"></div></a-->
					<a href="steps.php" onClick="_gaq.push(['_trackEvent', 'navigation', 'goToSteps']);"><div id="go-to-steps"></div></a>

			</div>
		</div>
    </body>
    <script type="text/javascript">
    	  setTimeout(function(){
    		// Hide the address bar!
    		window.scrollTo(0, 1);
  		  }, 0);
    </script>
</html>