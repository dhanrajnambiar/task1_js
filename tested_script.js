function func(){
  var co = document.getElementById('t');
  co.style.color = "red";
}

function func2(){
  var x = document.getElementsByTagName("LI");
  for(var i = 0; i < x.length; ++i){
    alert(x[i].innerHTML);
  }
}

//Below function drew bounding boxes as many elements as there are GBox's in data.json
function my_func(data) {
  var my_data = JSON.parse(data);
  var display = "";
  for (var i = 0; i < my_data.length; i++){
    var box = '<p><canvas width = "1000" height = "300" style="border:1px solid #000000;"></canvas></p>';
    display += box;
  }

  document.getElementById('targ').innerHTML = display;
}

//below function created the bounding box with text to be displayed within it. Scaling issues persist.
function my_func(data) {
  var my_data = JSON.parse(data);
  var box_id_suffix = "box";

  for (var i = 0; i < my_data.length; i++){
      var bb_name = box_id_suffix + i;//type = string ;id attribute of bbox object
      var divi = document.createElement("DIV");

      var bbox = document.createElement("CANVAS");
      bbox.setAttribute('width',"1000");
      bbox.setAttribute('height','300');
      bbox.setAttribute('id',bb_name);
      bbox.setAttribute('style',"border:1px solid #000000;");

      divi.appendChild(bbox); //appendChild function forms sort of connection of lower branch to next upper branch of DOM tree
      document.body.appendChild(divi);//appending should start from the lower levels ,
      // so bbox to divi done first followed by divi to body

      var txt = document.getElementById(bb_name);
      var msg = txt.getContext("2d");
      msg.font = "30px Georgia";
      msg.fillText(my_data[i]['txt'],my_data[i]['x'] / 5,my_data[i]['y'] / 5);

  }
}
