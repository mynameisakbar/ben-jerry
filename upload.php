<?php


$img =  isset($_GET['img']) ? $_GET['img'] : $_POST['img'];
$date = isset($_GET['date']) ? $_GET['date'] : $_POST['date'];
$fname = isset($_GET['fname']) ?$_GET['fname'] : $_POST['fname'];
$sname = isset($_GET['sname']) ?$_GET['sname'] : $_POST['sname'];


//echo $img;
echo  "dates is" . "</br>" . $date; 
echo "fname is" . "</br>" . $fname; 
echo "sname is" . "</br>" . $sname; 
 
//flag to indicate which method it uses. If POST set it to 1
if ($_POST) $post=1;


$name= $date . '^' . $fname . '^' . $sname  . '^'. '.png';

 
 define('UPLOAD_DIR', 'uploads/');
  $img = $_POST['img'];
  $img = str_replace('data:image/png;base64,', '', $img);
  $img = str_replace(' ', '+', $img);
  $data = base64_decode($img);
  $file = UPLOAD_DIR . $name;
  $success = file_put_contents($file, $data);
  print $success ? $file : 'Unable to save the file.';


?>