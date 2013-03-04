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
        console.log(resCanvas1);
        mpImg.render(resCanvas1, { maxWidth: 180, maxHeight: 190, quality:1, orientation: imgOrient});

    }
    
  };

  var hammertime = $("#continue-btn").hammer();
  hammertime.on("tap", function(ev) {
  console.log($('#startFriend').offset().left);

        //this condition for the 1st tap
        if($('#canvasImage').width() > 200){
            //console.log("it's not in bro");
            alert("Please select an image to proceed");

        }else if ($('#choosePhoto').offset().left > 0 && $('#canvasImage').width() < 200){
            //console.log("ok bro");
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

        }

  });

        


};


