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
