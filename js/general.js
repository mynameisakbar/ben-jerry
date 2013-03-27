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
    $('#image-temp').css( "display", "none" );
    var file = fileInput.files[0];

    var abc = new FileReader();

    abc.readAsBinaryString(file);
    abc.onload = function(){

        var finalExif = EXIF.readFromBinaryFile(new BinaryFile(abc.result));
    
        //alert(finalExif.ImageHeight + " " + finalExif.DateTimeOriginal + " " +finalExif.Orientation);
        var mpImg = new MegaPixImage(file);

        var imgOrient = 1;

        if(finalExif.Orientation == 6){
            //alert("rotate it");
            imgOrient = 6;
            //alert("now change it to" + imgOrient);
        }else{
            imgOrient = 1;
        }

        //console.log(mpImg);
        //console.log(mpImg.srcImage);

         //Render resized image into canvas element.
        var resCanvas1 = document.getElementById('canvasImage');
        //mpImg.render(resCanvas1, {width: 193, height: 204, quality:1, orientation: imgOrient});
        mpImg.render(resCanvas1, {width: 150, maxHeight: 200, quality:1, orientation: imgOrient});
        console.log(canvasImage.toDataURL());

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
      var test = new Blob([new Uint8Array(array)], {type: 'image/png'});
      alert (test.size);
      return new Blob([new Uint8Array(array)], {type: 'image/png'});
    }

  var hammertime = $("#continue-btn").hammer();
  hammertime.on("tap", function(ev) {

  //console.log("ok bro");
  //console.log($('#startFriend').offset().left);
  //console.log($('#choosePhoto').offset().left);
  //console.log($('#canvasImage').width());

        //this condition for the 1st tap
        if($('#canvasImage').width() > 205){
            //console.log("it's not in bro");
            alert("Please select an image to proceed");

        }else if ($('#choosePhoto').offset().left > 0 && $('#canvasImage').width() < 205){
            
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
            //alert (datadatadata.length);

            
            //console.log(file);
    

            var startDate = $("#startFriend").val();
            var FirstName = $("#name1").val();
            var SecondName = $("#name2").val();

           console.log(startDate);
           console.log(FirstName);
           console.log(SecondName);

      var tep = datadatadata.replace('data:image/png;base64,', '');

            var data = "img=" + tep + '&date=' + startDate + '&fname=' + FirstName + '&sname=' + SecondName;

           console.log (data);
            // Create new form data
            $.ajax({
                    type: "POST",
                    url: "upload.php",
                    data: data,
                    beforeSend : function(){
                      $("#grayout").show();
                    },
                    complete : function(){
                      $("#grayout").hide();
                    },
                    success: function(data){
                      window.location = "gallery.php";
                      console.log(data);
                      if(data.status === 'OK'){
                        console.log('upload success');
                      }
                    }
                  });

        }

  });

};
  
 


$(document).ready(function() {
  // Handler for .ready() called.
    $("#balloon").animate({"left": "-300px"}, 15000);
    $("#cow-pop").animate({"bottom": "200px"}, 3000);
    $("#image-filler").animate({"background-position-y": "-87px"}, 3000);
    $("#image-filler").delay(3000).animate({"background-position-y": "-174px"}, 3000);
    $("#image-filler").delay(6000).animate({"background-position-y": "0px"}, 3000);
    $("#image-filler").delay(9000).animate({"background-position-y": "-87px"}, 3000);
    $("#image-filler").delay(12000).animate({"background-position-y": "-174px"}, 3000);

    var hammertime2 = $("#text-map").hammer();
    hammertime2.on("tap", function(ev) {
      alert('You probably turned off the location sharing in Safari.\nGo to Settings->Privacy->Location Services and ensure that Safari is set to on. Refresh this page and it should work!');
      //console.log("dick");
    });

});
