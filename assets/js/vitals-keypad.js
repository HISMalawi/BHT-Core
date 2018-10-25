function buildKeyPad() {
  document.getElementById("clearButton").style="display: none;"
  var table = document.createElement('table');
  table.setAttribute("class","vitals-keypad");

  /* ........................................ */
  var tr  = document.createElement("tr");
  var td  = document.createElement("td");
  td.setAttribute("colspan","3");
  tr.appendChild(td);

  var input = document.createElement('input');
  input.setAttribute("type","text");
  input.setAttribute("id","vitals-input");
  input.setAttribute("class","touchscreenTextInput");
  td.appendChild(input);
  table.appendChild(tr);
  /* ........................................ */


  var keypad_attributes = [];
  keypad_attributes.push([1,2,3]);
  keypad_attributes.push([4,5,6]);
  keypad_attributes.push([7,8,9]);
  keypad_attributes.push(["Del.",0,"."]);
  keypad_attributes.push(["Clear","%","/"]);

  for(var i = 0 ; i < keypad_attributes.length ; i++) {
    var tr = document.createElement("tr");
    table.appendChild(tr);

    for(var j = 0 ; j < keypad_attributes[i].length ; j++){
      var td = document.createElement('td');
      tr.appendChild(td);

      var span = document.createElement('span');
      span.setAttribute("class","keypad-buttons");
      span.setAttribute("onmousedown","enterKeypadValue(this);");
      span.innerHTML = keypad_attributes[i][j];
      td.appendChild(span);
    }
  }

  document.getElementsByClassName('cell-right')[0].appendChild(table);
  resetInput();

}

function resetInput() {
  var allButtons = document.getElementsByClassName('app-btn');
  var currentVital = null;

  for(var i = 0 ; i < allButtons.length; i++){
    if(allButtons[i].getAttribute('class').trim() == "app-btn"){
      document.getElementById("vitals-input").value = vitalsEntered[allButtons[i].id];
      break;
    }
  }
}

function enterKeypadValue(e){
  var inputBox = document.getElementById('vitals-input');

  try{

    if(e.innerHTML.match(/Del/i)){
      inputBox.value = inputBox.value.substring(0, inputBox.value.length - 1);
    }else if(e.innerHTML.match(/Clear/i)){
      inputBox.value = null;
      removeFromHash();
    }else{
      inputBox.value += e.innerHTML;
    }
  
  }catch(x) { }   

  var allButtons = document.getElementsByClassName("app-btn");
  var activeBTN;
  
  for(var i = 0 ; i < allButtons.length ; i++){
    if(allButtons[i].getAttribute("class").trim() == "app-btn"){
      activeBTN = allButtons[i];
      break;
    }
  }
   
  var id = activeBTN.id.replace("vitals-",""); 
  var targetTD = document.getElementById("td-" + id);
  targetTD.innerHTML = inputBox.value; 
  vitalsEntered["vitals-" + id] = inputBox.value;
  if(targetTD.innerHTML.length < 1)
    vitalsEntered["vitals-" + id] = null;

}

function buildTable() {
  var container = document.getElementsByClassName("cell-summary")[0];
  var table = document.createElement("table");
  table.setAttribute("id","dy-summary-table");
  container.appendChild(table);

  for(var i = 0 ; i < vitalsAssigned.length ; i++){
    var tr = document.createElement("tr");
    table.appendChild(tr);

    var th = document.createElement("th");
    th.innerHTML = vitalsAssigned[i][0];
    tr.appendChild(th);

    var td = document.createElement("td");
    td.setAttribute("id", "td-" + vitalsAssigned[i][0]);
    tr.appendChild(td);

  }
}

