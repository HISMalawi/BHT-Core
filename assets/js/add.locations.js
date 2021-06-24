

function isStringEmpty(str) {
    try {
        return (str.replace(/\s+/g, '').length < 1);
    } catch (e) {
        return true;
    }
}

function addLocation(location_type, parent_location_id) {
  removeAddLocation();
  var root = document.getElementById('buttons');

  var btn = document.createElement('button');
  btn.innerHTML = '<span>Add ' + location_type + '</span>';
  btn.setAttribute('onmousedown','addSetLocation("' + location_type + '", "' + parent_location_id + '");');
  btn.setAttribute('id','location-add');
  btn.setAttribute('class','button green navButton');
  root.appendChild(btn);  
}

function addSetLocation(location_type, parent_location_id) {
  var location_name = document.getElementById('touchscreenInput' + tstCurrentPage);
  var options = document.getElementById('options');
  
  if((options.innerHTML == '<ul></ul>') == false) {
    showMessage('Please make sure the are no options');
    return; 
  }

  location_name = location_name.value;
  if(!isStringEmpty(location_name)) {
    consfirmAdd(location_name, location_type, parent_location_id);
  }
}

function consfirmAdd(name, location_type, parent_location_id) {

 var tstMessageBar = document.createElement("div");
 tstMessageBar.id = "LocationmessageBar";
 tstMessageBar.className = "messageBar";
 tstMessageBar.innerHTML = "Add " + location_type + "<br/>" + name + "?";
 tstMessageBar.style.display = "block";


 buttonDiv = document.createElement('div');
 buttonDiv.innerHTML = '<br /><br />';
 tstMessageBar.appendChild(buttonDiv);
 
 btn = document.createElement('button');
 btn.innerHTML = '<span>Yes</span>';
 btn.setAttribute('onmousedown','addConfirmedLocation("' + location_type + '","' + parent_location_id + '");');
 buttonDiv.appendChild(btn);

 btn = document.createElement('button');
 btn.innerHTML = '<span>No</span>';
 btn.setAttribute('onmousedown','hideLoactionMessageBar();');
 buttonDiv.appendChild(btn);

 document.getElementById("content").appendChild(tstMessageBar);
}

function hideLoactionMessageBar() {
  var cont = document.getElementById("content");
  var msg = document.getElementById('LocationmessageBar');
  cont.removeChild(msg);
}

function removeAddLocation() {
  var root = document.getElementById('buttons');
  try {
    var btn = document.getElementById('location-add');
    root.removeChild(btn);
  }catch(e) {
  }
}

function addConfirmedLocation(location_type, parent_location_id) {
  hideLoactionMessageBar();
  var location_name = document.getElementById('touchscreenInput' + tstCurrentPage);
  var parent_location = document.getElementById(parent_location_id).value;
  location_name = location_name.value;

  
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += '/addresses';

  var parametersPassed = JSON.stringify({
    address_type: location_type, 
    addresses_name: location_name,
    parent_location: parent_location
  });

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      gotoPage(tstCurrentPage);
      //var obj = JSON.parse(this.responseText);
      //loadData(obj);
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send(parametersPassed);

}
