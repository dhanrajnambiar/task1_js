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
---------------------------------------------------

function my_func(data) {
  var my_data = JSON.parse(data);
  var box_id_suffix = "box";

  //below section obtains the maxm and minm values of x and y coordinates.
  var max_val_x = max_value(data,'x');
  var max_val_y = max_value(data,'y');
  var min_val_x = min_value(data,'x');
  var min_val_y = min_value(data,'y');

  //below var's has the values to which we want to limit the x and y coordinates..
  var range_x = {'min':0,'max':100};
  var range_y = {'min':0,'max':300};

  for (var i = 0; i < my_data.length; i++){
      var bb_name = box_id_suffix + i;//type = string ;id attribute of bbox object

      var divi = document.createElement("DIV");
      var bbox = document.createElement("CANVAS");

      bbox.setAttribute('width',"500");
      bbox.setAttribute('height',"1000");
      bbox.setAttribute('id',bb_name);
      bbox.setAttribute('style',"border:1px solid #000000;");

      divi.appendChild(bbox); //appendChild function forms sort of connection of lower branch to next upper branch of DOM tree
      document.body.appendChild(divi);//appending should start from the lower levels ,
      // so bbox to divi done first followed by divi to body

      var txt = document.getElementById(bb_name);
      var msg = txt.getContext("2d");
      msg.font = "40px Georgia";
      var new_x = normalize(max_val_x, min_val_x, my_data[i]['x'], range_x);
      var new_y = normalize(max_val_y, min_val_y, my_data[i]['y'], range_y);
      msg.fillText(my_data[i]['txt'], new_x, new_y);
    }
}

function normalize(max_actl, min_actl, val, range_dict) {//we want to limit to range range_dict[min]<x<range_dict[max]
  //val is the actual value to be scaled
  //max & min_actl are the actual max and min values of the coordinate whose current value is to be scaled
    var diff = max_actl - min_actl;//max - min in eqn
    var r_diff = range_dict['max'] - range_dict['min'];//
    return (((r_diff * (val - min_actl)) / diff) + range_dict['min']);
}

function max_value(data, varr) {
  my_data = JSON.parse(data);
  var init_value = 0;
  lengt = my_data.length;
  if (varr === 'x' || varr === 'y'){
    for (var i = 0; i < lengt; i++){
      if(init_value < my_data[i][varr]){
        init_value = my_data[i][varr];
      }
    }
    return init_value;
  }else{
    return null;
  }
}

function min_value(data, varr) {
  my_data = JSON.parse(data);
  var init_value = my_data[0][varr];
  lengt = my_data.length;
  if (varr === 'x' || varr === 'y'){
    for (var i = 0; i < lengt; i++){
      if(init_value > my_data[i][varr]){
        init_value = my_data[i][varr];
      }
    }
    return init_value;
  }else{
    return null;
  }
}

function count_elements(){
  var para = document.createElement("P");
  document.body.appendChild(para);
  x = document.getElementById('table1').childElementCount;
  num_elements = "Number of rows : " + x;
  var txt = document.createTextNode(num_elements);
  para.appendChild(txt);


  //my first interpretation:
  ---------------------------------------------------------------------------------
  function display(data) {
    var my_data = JSON.parse(data);
    var box_id_suffix = "box";

    //below section obtains the maxm and minm values of x and y coordinates.
    var max_val_x = max_value(data,'x');
    var max_val_y = max_value(data,'y');
    var min_val_x = min_value(data,'x');
    var min_val_y = min_value(data,'y');

    //below var's has the values to which we want to limit the x and y coordinates..
    var range_x = {'min':30,'max':150};
    var range_y = {'min':60,'max':300};

    var t = document.createElement("TABLE");
    t.setAttribute('style',"border: 1px solid black;");
    t.setAttribute('id','table1');
    document.body.appendChild(t);//appending table to body
    for (var i = 0; i < my_data.length; i++){
        var bb_name = box_id_suffix + i;//type = string ;id attribute of bbox object
        var td_2_id = "id_td_2:" + i;//id of content of td_2
        var td_2_txt = JSON.stringify(my_data[i]);//content of td_2

        var tr = document.createElement("TR");
        var td_1 = document.createElement("TD");

        var td_2 = document.createElement("TD");
        td_2.setAttribute('id',td_2_id);

        var bbox = document.createElement("CANVAS");

        bbox.setAttribute('width',"400");//width of bounding box
        bbox.setAttribute('height',"500");//height of bounding box
        bbox.setAttribute('id',bb_name);
        bbox.setAttribute('style',"border:1px solid #000000;");

        var txx = document.createTextNode(td_2_txt);

        td_1.appendChild(bbox); //appendChild function forms sort of connection of lower branch to next upper branch of DOM tree
        td_2.appendChild(txx);
        tr.appendChild(td_1);
        tr.appendChild(td_2);
        t.appendChild(tr);//appending should start from the lower levels ,
        // so bbox to tr done first followed by tr to t

        var txt = document.getElementById(bb_name);
        var msg = txt.getContext("2d");
        msg.font = "40px Georgia";
        var new_x = normalize(max_val_x, min_val_x, my_data[i]['x'], range_x);
        var new_y = normalize(max_val_y, min_val_y, my_data[i]['y'], range_y);
        msg.fillText(my_data[i]['txt'], new_x, new_y);
    }
  }

  function normalize(max_actl, min_actl, val, range_dict) {//we want to limit to range range_dict[min]<x<range_dict[max]
    //val is the actual value to be scaled
    //max & min_actl are the actual max and min values of the coordinate whose current value is to be scaled
      var diff = max_actl - min_actl;//max - min in eqn
      var r_diff = range_dict['max'] - range_dict['min'];//
      return (((r_diff * (val - min_actl)) / diff) + range_dict['min']);
  }

  function max_value(data, varr) {
    my_data = JSON.parse(data);
    var init_value = 0;
    lengt = my_data.length;
    if (varr === 'x' || varr === 'y'){
      for (var i = 0; i < lengt; i++){
        if(init_value < my_data[i][varr]){
          init_value = my_data[i][varr];
        }
      }
      return init_value;
    }else{
      return null;
    }
  }

  function min_value(data, varr) {
    my_data = JSON.parse(data);
    var init_value = my_data[0][varr];
    lengt = my_data.length;
    if (varr === 'x' || varr === 'y'){
      for (var i = 0; i < lengt; i++){
        if(init_value > my_data[i][varr]){
          init_value = my_data[i][varr];
        }
      }
      return init_value;
    }else{
      return null;
    }
  }

  function count_elements(){
    var para = document.createElement("P");
    para.setAttribute('id','numb');
    document.body.appendChild(para);
    x = document.getElementById('table1').childElementCount;
    num_elements = "<strong>Number of rows : </strong>" + x;
    document.getElementById('numb').innerHTML = num_elements;
  }
-------------------------------------------------------------------------------
