
function getExpected(element) {
  let expected = ["value_group_id","value_boolean","value_coded","value_coded_name_id","value_drug","value_datetime","value_numeric","value_modifier","value_text"] ;
  let key = "";
  Object.keys(element).filter(function(elem) {
    if(expected.includes(elem)){
      key = elem;
    }
  } );
  return key;
}
function submitParameters(parameters, url, returnToFunction) {
  if(parameters["observations"]) {
    parameters["observations"] = parameters["observations"].filter(function(element) { 
        return (element[getExpected(element)] !== "" && element[getExpected(element)] !== undefined);
    });
  }
  try {
    buildWall();
    showStatus();
  } catch (e) {

  }
  if (url === "/encounters") {
    if (typeof providerID === 'undefined') {
    
  }else {
    if(providerID != null) {
      parameters.provider_id = providerID;
    }
    }
  }
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1" + url;
  
  parameters.program_id = sessionStorage.programID;
  var parametersPassed = JSON.stringify(parameters);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 ) {
      if ( (this.status == 201 || this.status == 200)) {
        var obj = JSON.parse(this.responseText);
          eval(returnToFunction)(obj);
          
          try {    
                  document.getElementById("innerPop").style.display = "none";
          }catch(e) {
        
          }
      }else if (this.status == 404 || this.status == 500) {
        jQuery(".loader").hide();
        var message = "Error " + this.status + ". An error has occured,Click yes to continue to patient dashboard or No to go to the main dashboard";
        genericError(message);
      }else if (this.status == 401) {
        jQuery(".loader").hide();
        var message = "Error " + this.status + ". You have been logged out ,Click yes to continue to patient dashboard or No to go to the main dashboard";
        genericError(message);
      }
      }else {
        // var message = "Error " + this.status + ". An error has occured,Click yes to continue to patient dashboard or No to go to the main dashboard";
        // genericError(message);
      }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send(parametersPassed);
}

function genericError(message) {

try {
  document.getElementById("innerPop").style.display = "none";
  document.getElementById("popupBox").style.display = "none";         
  confirmCancelEntryWithMessage(null, message , tt_cancel_destination);
}catch(e) {
  alertify.confirm(message, function(){ 
    window.location = tt_cancel_destination;
  }, function(){ 
    window.location = "/";  
    }
  ).set(
    { 
      labels: 
      {
        ok     : "Yes",
        cancel : "No"
      } 
    }
  );
}
}

function buildWall() {
  var submitCover = document.getElementById('submit-cover');
  if (submitCover){
      submitCover.parentNode.removeChild(submitCover);
  }

  var divCover = document.createElement('div');
  divCover.setAttribute('id','submit-cover');
  var wBody = document.getElementsByTagName('body')[0];
  
  var span = document.createElement('span');
  span.innerHTML = "<style>\
    #submit-cover {\
    position: absolute;\
    background-color: black;\
    width: 100%;\
    height: 102%;\
    left: 0%;\
    top: 0%;\
    z-index: 990;\
    opacity: 0.65;\
  }\
  </style>";
  
  try {
    wBody.appendChild(span);
    wBody.appendChild(divCover);
  }catch(i) {}
}
