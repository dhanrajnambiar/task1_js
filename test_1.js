function my_func(data) {
  var my_data = JSON.parse(data);
  var display = [];

  for (var i = 0; i < my_data.length; i++){
    var unit = new DOMRect(my_data[i]['x'],my_data[i]['y'],my_data[i]['w'],my_data[i]['h']);
    length_of_array = display.push(unit);
  }
  document.getElementById('cord').innerHTML = display;
}
