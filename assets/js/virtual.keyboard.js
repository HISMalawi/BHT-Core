

var targetInput;

function lookForTag() {
  inputs = document.getElementsByTagName('input');
  
  //loop through the inputs to assign virtual-keyboard
  for(var i = 0 ; i < inputs.length; i++){
    var keyup = inputs[i].getAttribute('onkeyup');
    if(keyup == undefined){
      inputs[i].setAttribute('onfocus', 'popupVK(this);');
    }else{
      inputs[i].setAttribute('onfocus', keyup + '; popupVK(this);');
    }
  }
}

function popupVK(e) {
  var vl = document.getElementById('virtual-keyboard');
  var w = document.getElementsByTagName('body')[0];
  if(vl != undefined) {
    w.removeChild(vl);
    return;
  }
  
  var div = document.createElement('div');
  div.setAttribute('id','virtual-keyboard');
  div.setAttribute('class','keyboard');
  var divStyle = "background-color: #F4F4F4;border: 2px solid #E0E0E0;"
  divStyle += "border-radius: 15px;height: 350px;position: absolute;";
  divStyle += "z-index: 991;width: 820px;";

  var l = e.getBoundingClientRect().left;
  //var divPos = ((50 / width)*100);
  var inputPos = e.getBoundingClientRect().top;
  inputPos = parseInt(inputPos);

  divStyle += "left: " + (l - 680) + "px;top: " + (inputPos + 31) + "px;";
  div.style = divStyle;

  keyboardKeys(e, div);


  w.appendChild(div);
}

function keyboardKeys(e, table) {
  var keypress = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l","Del."],
    ["z","x","c","v","b","n","m", "Space","Caps","Hide"]
  ];

  //var table = document.createElement("div");
  //table.setAttribute("class","keyboard");

  for(var i = 0 ; i < keypress.length ; i++){
    var row = document.createElement("span")
    row.setAttribute("class","buttonLine");
    table.appendChild(row);

    for(var x = 0 ; x < keypress[i].length ; x++){
      var cell = document.createElement("button")
      cell.setAttribute("class","keyboardButton");
      row.appendChild(cell);

      cell.setAttribute("onmousedown","keyPressed(this);");
      cell.innerHTML = "<span>" + keypress[i][x] + "</span>";


    }
  }

  targetInput = e;
}

function keyPressed(e) {
  var inputBox = targetInput;
  var value_string = e.innerHTML.replace('<span>','');
  value_string = value_string.replace('</span>','');

  try{

    if(value_string.match(/Del/i)){
      inputBox.value = inputBox.value.substring(0, inputBox.value.length - 1);
    }else if(e.innerHTML.match(/Caps/i)){
    }else if(e.innerHTML.match(/Space/i)){
      inputBox.value += " ";
    }else if(e.innerHTML.match(/Hide/i)){
      var vl = document.getElementById('virtual-keyboard');
      var w = document.getElementsByTagName('body')[0];
      w.removeChild(vl);
    }else{
      inputBox.value += value_string;
    }
 
    try {
      $('input[type="search"]').val(inputBox.value).keyup();
    }catch(z) {}
  }catch(x) { }

}


