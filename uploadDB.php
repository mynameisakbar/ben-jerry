<?php

//check if the values from the form are actually coming in

if(isset($_FILES["imageNameHere"]) && !empty($_FILES["imageNameHere"]) &&
   isset($_POST["startDate"]) && !empty($_POST["startDate"]) &&
   isset($_POST["FirstName"]) && !empty($_POST["FirstName"]) &&
   isset($_POST["SecondName"]) && !empty($_POST["SecondName"])
   ) 
  {

    //check the image details

    echo $_FILES["imageNameHere"];
      $img = $_FILES["imageNameHere"];
      $imgpath = $_FILES["imageNameHere"]['tmp_name'];
      $imgname = $_FILES["imageNameHere"]['name'];
      $imgsize = $_FILES["imageNameHere"]['size'];
      $imgtype = $_FILES["imageNameHere"]['type'];

//store the form data into variables
      $sDate = $_POST["startDate"];
      $fName = $_POST["FirstName"];
      $sName = $_POST["SecondName"];
      
      // Random name
      echo $img . "</br>" . $imgpath . "</br>" . $imgname . "</br>" . $imgsize . "</br>" . $imgtype . "</br>" ;

      $imgData =addslashes (file_get_contents($_FILES["imageNameHere"]['tmp_name']));

      
//diretory to upload the images
      if (!is_dir('uploads')) {
          mkdir('uploads');
          echo "Uploads directory exists";
      }
      $uploads_dir = 'uploads';

        $tmpname = $_FILES["imageNameHere"]['tmp_name'];
        $name= $sDate . '^' . $fName . '^' . $sName  . '^'. '.png';

        //store the image in the uploads directory
        move_uploaded_file($tmpname, "$uploads_dir/$name");
       
       echo $imgData[0];

  }

  else{
     print "No image selected/uploaded";
  }

  // Close our MySQL Link
  

  

?>