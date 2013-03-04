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

  var element = document.getElementById('continue-btn');
  var hammertime = Hammer(element).on("tap", function(event) {
        //console.log('tap me bro!');

        

        //this condition for the 1st tap
        if($('#choosePhoto').offset().left > 0){
            console.log($('#choosePhoto').offset().left);
            console.log($('#choosePhoto').offset().top);
            //$("#choosePhoto").animate({"left":"-240px"},200);
            //$("#mainInput").animate({"left":"-240px"},200);
        }else{
            console.log("it's not in bro");
            //$('#canvasImage').css("padding-left", "35px");
        }

    });


};


