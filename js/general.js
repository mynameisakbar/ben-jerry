window.onload = function() {

  setTimeout(function(){
    // Hide the address bar!
    window.scrollTo(0, 1);
  }, 0);

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

    /*abc.onloadend = function(){
        console.log($('#canvasImage').height());
        if($('#canvasImage').width() < 200){
            console.log("less than 200");
            //$('#resultCanvas').css("left", "45px");
        }else{
            //$('#resultCanvas').css("left", "10px");
        }
    }

    (function checkCanvas() {
        console.log($('#canvasImage').height());
        if($('#canvasImage').width() < 200){
            console.log("less than 200");
            //$('#resultCanvas').css("left", "45px");
        }else{
            //$('#resultCanvas').css("left", "10px");
        }
    }*/
    
    console.log(file);
    console.log(file.type);
    
  };
};
