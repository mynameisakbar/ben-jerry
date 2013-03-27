window.onload = function() {


  setTimeout(function(){
    // Hide the address bar!
    window.scrollTo(0, 1);
  }, 0);



  $("#container").bind("touchmove", {}, function(event){
    event.preventDefault();
  });


  var fileInput = document.getElementById('mainInput');
  fileInput.onchange = function() {
    var file = fileInput.files[0];

    var abc = new FileReader();

    abc.readAsBinaryString(file);
    abc.onload = function(){

        var finalExif = EXIF.readFromBinaryFile(new BinaryFile(abc.result));
        //alert(finalExif.Orientation);
        var mpImg = new MegaPixImage(file);
        var imgOrient = 1;

        if(finalExif.Orientation == 6){
            //alert("rotate it");
            imgOrient = 6;
            //alert("now change it to" + imgOrient);
        }else{
            imgOrient = 1;
        }

        console.log(mpImg);
        console.log(mpImg.srcImage);

         //Render resized image into canvas element.
        var resCanvas1 = document.getElementById('canvasImage');
        mpImg.render(resCanvas1, { width: 180, height: 180, quality:1, orientation: imgOrient});
        console.log(canvasImage.toDataURL());


      /*var canvas = document.getElementById('testCanvas');
      var context = canvas.getContext('2d');
      var imageObj = new Image();

      imageObj.onload = function() {
        // draw cropped image
        var sourceX = 150;
        var sourceY = 0;
        var sourceWidth = 150;
        var sourceHeight = 150;
        var destWidth = sourceWidth;
        var destHeight = sourceHeight;
        var destX = canvas.width / 2 - destWidth / 2;
        var destY = canvas.height / 2 - destHeight / 2;

        context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
      };
      
      imageObj.src = abc.readAsBinaryString(file);*/


    }
    
  };


  // Convert DataURL to Blob object
    function dataURLtoBlob(dataURL) {
      // Decode the dataURL    
      var binary = atob(dataURL.split(',')[1]);
      // Create 8-bit unsigned array
      var array = [];
      for(var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
      }
      // Return our Blob object
      //alert(array);
      return new Blob([new Uint8Array(array)], {type: 'image/png'});
    }

  var hammertime = $("#continue-btn").hammer();
  hammertime.on("tap", function(ev) {

  //console.log("ok bro");
  //console.log($('#startFriend').offset().left);
  //console.log($('#choosePhoto').offset().left);
  //console.log($('#canvasImage').width());

        //this condition for the 1st tap
        if($('#canvasImage').width() > 200){
            //console.log("it's not in bro");
            alert("Please select an image to proceed");

        }else if ($('#choosePhoto').offset().left > 0 && $('#canvasImage').width() < 200){
            
            $("#choosePhoto").animate({"left":"-240px"},200);
            $("#mainInput").animate({"left":"-240px"},200);
            $("#question-2-title").animate({"left":"0px"},200);
            $("#startFriend").animate({"left":"0px"},200);

        }else if($('#startFriend').offset().left > 0 && $('#startFriend').offset().left < 320 && $("#startFriend").val().length !=0){
            console.log($("#startFriend").val());
            //console.log("it's in bro");
            $("#question-2-title").animate({"left":"-240px"},200);
            $("#startFriend").animate({"left":"-240px"},200);
            $("#question-3-title").animate({"left":"0px"},200);
            $("#q-holder").animate({"left":"0px"},200);

        }else if($("#name1").val().length !=0 && $("#name2").val().length !=0){
            console.log("submit form");
            var datadatadata = document.getElementById('canvasImage').toDataURL();
            console.log(datadatadata);

            var file= dataURLtoBlob(datadatadata);
            alert(file);
    

            var startDate = $("#startFriend").val();
            var FirstName = $("#name1").val();
            var SecondName = $("#name2").val();

           console.log(startDate);
           console.log(FirstName);
           console.log(SecondName);


            // Create new form data
            var fd = new FormData();
            
            // Append our image
            fd.append("imageNameHere", file);
            fd.append("startDate", startDate);
            fd.append("FirstName", FirstName);
            fd.append("SecondName", SecondName);
            alert(fd);

            $.ajax({
               url: "uploadDB.php",
               type: "POST",
               data: fd,
               beforeSend : function(){
                  $("#grayout").show();
                },
                complete : function(){
                  $("#grayout").hide();
                },
                processData: false,
               contentType: false,
            }).done(function(){
              window.location = "gallery.php";
            });

        }

  });

};

$(document).ready(function() {
  // Handler for .ready() called.
    $("#balloon").animate({"left": "-300px"}, 15000);
    $("#cow-pop").animate({"bottom": "130px"}, 3000);

});
