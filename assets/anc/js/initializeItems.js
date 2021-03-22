var patientID = sessionStorage.patientID;

var programID = sessionStorage.programID;

var apiProtocol = sessionStorage.apiProtocol;

var apiURL = sessionStorage.apiURL;

var apiPort = sessionStorage.apiPort;

var authToken = sessionStorage.authorization;


$(document).ready(function(){

  if (parseInt(sessionStorage.programID) === 12){

    isSubsequentVisit();

    getAncVisitNumber();

    getPatientHIVStatus();

    //getPatientSummary();

  }

});

/** Function getting patient summary */
function getPatientSummary() {

  var url = 'http://' + apiURL + ':' + apiPort 

  url += '/api/v1/programs/'+programID+'/patients/' + patientID;

  var req = new XMLHttpRequest();

  req.onreadystatechange = function () {

    if (this.readyState == 4) {
      if (this.status == 200) {
        var results = JSON.parse(this.responseText);

        sessionStorage.dateOfLMP = results.date_of_lnmp;
        
        sessionStorage.fundusByLMP = results.fundus;  
        
        sessionStorage.gestation = results.gestation;  
        
        sessionStorage.totalANCVisits = results.anc_visits;
        
        sessionStorage.currentOutcome =  results.current_outcome;

        sessionStorage.patientEDOD = results.edod;
      
      }
    
    }
  
  };
  
  try {
    
    req.open('GET', url, true);
    
    req.setRequestHeader('Authorization', sessionStorage.getItem('authorization'));
    
    req.send(null);
  
  } catch (e) {
  
    console.log(e);

  }
  
}



/** Function getting previous ANC Visit if exist */

function getAncVisitNumber() {

  var url = 'http://'+apiURL+':'+apiPort+'/api/v1';

  url += '/programs/'+programID+'/patients/'+patientID+'/anc_visit';

  var req = new XMLHttpRequest();

  req.onreadystatechange = function(){

    if (this.readyState == 4) {

      if (this.status == 200) {

        var results = JSON.parse(this.responseText);

        past_visits = JSON.stringify(results["visit_number"]);

        sessionStorage.setItem("ancVisitNumbers", past_visits.substring(1, past_visits.length-1));

      }else {

        past_visits = {};

      }

    }

  };

  try {

    req.open('GET', url, true);

    req.setRequestHeader('Authorization',sessionStorage.getItem('authorization'));

    req.send(null);

  } catch (e) {
  
    console.log(e);

  }

}

/** Function which checks whether patient is already
 * in ART or Not
 */
function getPatientHIVStatus(){
  
  var url = 'http://'+apiURL+':'+apiPort+'/api/v1';

  url += '/programs/'+programID+'/patients/'+patientID+'/art_hiv_status';

  var xhttp = new XMLHttpRequest();
        
  xhttp.onreadystatechange = function () {
          
    if (this.readyState == 4 && this.status == 200) {
            
      var obj = JSON.parse(this.responseText);
      
      sessionStorage.setItem("patientHIVStatus", obj['hiv_status']);
      
      sessionStorage.setItem("patientOnART", obj['art_status']);
    
      sessionStorage.setItem("patientARVNumber", obj['arv_number']);

      sessionStorage.setItem("patientARVStartDate", obj["arv_start_date"]);
          
    }
        
  };
  
  xhttp.open("GET", url, true);
        
  xhttp.setRequestHeader('Authorization', authToken);
        
  xhttp.setRequestHeader('Content-type', "application/json");
        
  xhttp.send();
      
}

/** Function to check if patient's visit is a 
 * subsequent visit.
 */
function isSubsequentVisit(){

  var url = 'http://'+apiURL+':'+apiPort+'/api/v1';

  url += '/programs/'+programID+'/patients/'+patientID+'/subsequent_visit';

  url += '?date='+sessionStorage.sessionDate;

  var xhttp = new XMLHttpRequest();
        
  xhttp.onreadystatechange = function () {
          
    if (this.readyState == 4 && this.status == 200) {
      
      try{

        var obj = JSON.parse(this.responseText);

        sessionStorage.setItem("subsequentVisit", obj["subsequent_visit"]);

        sessionStorage.setItem("pregnancyTestDone", obj["pregnancy_test"]);

        sessionStorage.setItem("previousHIVTestResult", obj["hiv_status"]);

      }catch(e){

        console.log(e);

      }
      
    }
        
  };
  
  xhttp.open("GET", url, true);
        
  xhttp.setRequestHeader('Authorization', authToken);
        
  xhttp.setRequestHeader('Content-type', "application/json");
        
  xhttp.send();

}
