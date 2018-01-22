function my_func(data) {
    var my_data = JSON.parse(data);
    var font_size = "20px";//set the font size of text here

    // below var's contain max'm and min'm values of x and y in data.json
    var max_val_x = max_value(my_data,'x');
    var max_val_y = max_value(my_data,'y');
    var min_val_x = min_value(my_data,'x');
    var min_val_y = min_value(my_data,'y');

    //below section determines the size of the Bounding Box
    var box_x = bb_size(max_val_x);
    var box_y = bb_size(max_val_y);

    //below var's has the values to which we want to limit the x and y coordinates..
    var range_x = {'min':20,'max':max_val_x};
    var range_y = {'min':20,'max':max_val_y};

    var row = document.createElement("DIV");
    row.setAttribute('id',"root");
    document.body.appendChild(row);

    var bbox = document.createElement("CANVAS");
    bbox.setAttribute('width',box_x);
    bbox.setAttribute('height',box_y);
    bbox.setAttribute('id',"bound_box");
    bbox.setAttribute('style',"border:2px solid #000000;");
    row.appendChild(bbox);

    for (var i = 0; i < my_data.length; i++){
        var txt = document.getElementById("bound_box");
        var msg = txt.getContext("2d");
        msg.font = font_size + " Georgia";
        var new_x = normalize(max_val_x, min_val_x, my_data[i]['x'], range_x);
        var new_y = normalize(max_val_y, min_val_y, my_data[i]['y'], range_y);
        msg.fillText(my_data[i]['txt'], new_x, new_y);
    }
    num_rows(my_data);
    display_data(my_data);
}

function normalize(max_actl, min_actl, val, range_dict) {//we want to limit to range range_dict[min]<x<range_dict[max]
  //val is the actual value to be scaled
  //max & min_actl are the actual max and min values of the coordinate whose current value is to be scaled
    var diff = max_actl - min_actl;//max - min in eqn
    var r_diff = range_dict['max'] - range_dict['min'];//
    return (((r_diff * (val - min_actl)) / diff) + range_dict['min']);
}

function max_value(my_data, varr) { // returns the maximum value of x and y in data.json
  var init_value = 0;
  lengt = my_data.length;
  for (var i = 0; i < lengt; i++){
    if(init_value < my_data[i][varr]){
      init_value = my_data[i][varr];
    }
  }
  return init_value;
}

function min_value(my_data, varr) {//returns the minimum value of x and y in data.json
  var init_value = my_data[0][varr];
  lengt = my_data.length;
  for (var i = 0; i < lengt; i++){
    if(init_value > my_data[i][varr]){
      init_value = my_data[i][varr];
    }
  }
  return init_value;
}

function bb_size(maxx) {//this function returns the bbox size ie, x and y coordinates
  // of box depending on the highest value of x and y from data.json inputted to fn;
    return (maxx + (500 - (maxx % 500)));
}

function num_rows(my_data) {//this function displays the number of rows in the bounding box being drawn
    var arr = [];
    for (var i = 0; i < my_data.length; i++){
        if (!arr.includes(my_data[i]['y'])){
          arr.push(my_data[i]['y']);
        }
    }
    var t = document.createElement("P");
    var txt = document.createTextNode("The number of rows in above Bounding Box is " + arr.length);
    t.appendChild(txt);
    document.getElementById("root").appendChild(t);
}

function display_data(my_data) {
    var string = "";
    for (var i = 0; i < my_data.length; i ++){
        string += JSON.stringify(my_data[i]);
    }
    var contents = document.createElement("P");
    var tt = document.createTextNode(string);
    contents.appendChild(tt);
    document.getElementById("root").appendChild(contents);
}
