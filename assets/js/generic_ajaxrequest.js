var url = new URL(window.location.href);
var apiURL = sessionStorage.getItem("apiURL");
var apiPort = sessionStorage.getItem("apiPort");
var apiProtocol = sessionStorage.getItem("apiProtocol");
var id = url.searchParams.get("user_id");
function checkIfEncounterCaptured(encounter_name, id, redirect) {
  var applicationName = sessionStorage.applicationFolder;
  let setUrl = '/apps/' + applicationName + '/application.json';
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var results = JSON.parse(this.responseText);
        try {
          let available = results.encounters[encounter_name].available;
          let url = results.encounters[encounter_name].url;
          if (available == false) {
          } else if (available == true) {
            if (redirect == false ) {
              sessionStorage.setItem("nextEncounter", encounter_name);
              sessionStorage.setItem("nextEncounterAvailable", "Available");
            } else {
              // window.location.href = url;
              sessionStorage.setItem("nextEncounter", encounter_name);
              sessionStorage.setItem("nextEncounterAvailable", "Available");
              checkIfActivitySelected(encounter_name, url);
            }
          }
        } catch (error) {
          // showMessage("selected encounter " + encounter_name + " is not available, continue to patient dashboard?", null, 3000);
          // tstConfirmCancel =
            if (redirect == false ) {
              sessionStorage.setItem("nextEncounter", encounter_name);
              sessionStorage.setItem("nextEncounterAvailable", "Not Configured");
            } else {
              sessionStorage.setItem("nextEncounter", encounter_name);
              sessionStorage.setItem("nextEncounterAvailable", "Not Configured");
                try {
                  if(parseInt(sessionStorage.programID) == 1){
                    confirmCancelEntryWithMessage(null, "selected encounter " + encounter_name + " is not available, continue to patient dashboard?", '/views/patient_dashboard.html?patient_id=' + id);
                  }else{ 
                    window.location.href = "/views/patient_dashboard.html?patient_id=" + id;
                  }
                }catch(e) {
                  alert("not available");
                  window.location.href = "/views/patient_dashboard.html?patient_id=" + id;
                }  
            }
   
        }
      } else if (this.status == 404) {
        showMessage("application.json missing from application configuration");
      } 
    } else {

    }
  };
  try {
    req.open('GET', setUrl, true);
    req.setRequestHeader('Authorization', sessionStorage.getItem('authorization'));
    req.send(null);
  } catch (e) {

   }
}
function confirmCancelEntryWithMessage(save, message = "Are you sure you want to Cancel", patientDashboard, noRedirect) {     // If you want to save state set save =
  // true
  var href = noRedirect ? '' : 'window.location.href=&#034/&#034';
  var button =  "<button onmousedown='hideMessage(); "+href+"'><span>No</span></button>";
  if (tstConfirmCancel) {
    tstMessageBar.innerHTML = message + "<br/>" +
      "<button onmousedown='hideMessage(); window.location.href = &#034" + patientDashboard + "&#034;'><span>Yes</span></button>" +
      (save ? "<button onmousedown='var completeField = document.createElement(\"input\"); \n\
      completeField.type = \"hidden\"; completeField.value = \"false\"; completeField.name = \"complete\"; \n\
      document.forms[0].appendChild(completeField); document.forms[0].submit(); hideMessage();'><span>Save</span></button>": "") +
      button
    tstMessageBar.style.display = "block";
  }
}

function nextEncounter(patient_id, program_id, redirect) {
  let url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/workflows";
  url += "/" + program_id + "/" + patient_id + "?date=" + sessionStorage.sessionDate;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var obj = JSON.parse(this.responseText);
        checkIfEncounterCaptured(obj["name"].toLowerCase(), patient_id, redirect);
      }
      else if (this.status == 400) {
        try {
          showMessage("Can not select Patient. Reason: Patient Record is incomplete. Create new patient record instead", null, 3000);
        }catch(e) {
          alert("patient record is damaged");
            window.history.back();
        }
        
      }
      else if (this.status == 204) {
        sessionStorage.setItem("nextEncounter", "None");
        sessionStorage.setItem("nextEncounterAvailable", "Unavailable");
        if(redirect !== false) {
          window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
        }
      }else if ((this.status == 500 || this.status == 0) && redirect == undefined) {
        window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      }else if((this.status == 500 || this.status == 404) && redirect != false) {
        window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}
function checkIfActivitySelected(encounter_name, url) {
  var selected_activities = sessionStorage.userActivities;
  if  (parseInt(sessionStorage.programID) == 1 ){
    if (encounter_name == "art adherence" && !selected_activities.match(/ART adherence/i)) {
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    } else if  (encounter_name == "hiv clinic consultation" && !selected_activities.match(/HIV clinic consultations/i) ) {
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    } else if  (encounter_name == "hiv clinic consultation (clinician)" && !selected_activities.match(/HIV clinic consultations/i) ) {
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    } else if  (encounter_name == "hiv clinic consultation (clinician)" && selected_activities.match(/HIV clinic consultations/i) ) {
      if(sessionStorage.userRoles.match(/Nurse/i)) {
        window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
        return;
      }
    } else if (encounter_name == "hiv reception" && !selected_activities.match(/HIV reception visits/i)) {
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    } else if (encounter_name == "hiv staging" && !selected_activities.match(/HIV staging visits/i)) {
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    } else if (encounter_name == "appointment" && !selected_activities.match(/Manage Appointments/i)) {
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    } else if (encounter_name == "dispensing" && !selected_activities.match(/Drug Dispensations/i)) {
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    } else if (encounter_name == "treatment" && !selected_activities.match(/Prescriptions/i)) {
      window.location.href = "/views/patient_dashboard.html?source=prescription&patient_id=" + sessionStorage.patientID;
      return;
    } else if (encounter_name == "vitals" && !selected_activities.match(/Vitals/i)) {
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    } else if (encounter_name == "hiv clinic registration" && !selected_activities.match(/HIV first visits/i)) {
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    }
  }
  window.location.href = url;
}
function setCurrentLocation() {
  $('touchscreenInput' + tstCurrentPage).setAttribute('ajaxURL', "/locations?name=" + sessionStorage.currentLocation);
  listSuggestions(tstCurrentPage);
  $('touchscreenInput' + tstCurrentPage).setAttribute('ajaxURL', "/locations?name="); 
}

function getTriageObs(callback) {
  var obsUrl = apiProtocol + "://" + apiURL + ":" + apiPort;
      obsUrl += '/api/v1/observations?person_id=' + sessionStorage.patientID;
      obsUrl += '&concept_id=' +10539;
      obsUrl += '&end_date=' + sessionStorage.sessionDate + "&start_date=" + sessionStorage.sessionDate;
      obsUrl += '&program_id=' + sessionStorage.programID;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      
      data = JSON.parse(this.responseText);
      if((data.length > 0)) {
        callback
      }

    }
  };
  xhttp.open("GET", obsUrl, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();  
}