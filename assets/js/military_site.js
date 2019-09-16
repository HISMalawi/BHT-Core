

var patientID = sessionStorage.patientID;

var programID = sessionStorage.programID;

var apiProtocol = sessionStorage.apiProtocol;

var apiURL = sessionStorage.apiURL;

var apiPort = sessionStorage.apiPort;

var authToken = sessionStorage.authorization;

var todayDate = new Date(sessionStorage.sessionDate);

var patient_age = parseInt(sessionStorage.patientAge);

YesNoConcepts = {"Yes" : 1065,"No" : 1066};
          
var military_site = false;

var global_property = GlobalProperty({
  authToken: sessionStorage.authorization,
  path: apiProtocol + '://' + apiURL + ':' + apiPort + '/api/v1'
});

global_property.isEnabled('military.enabled', function (res) {
  
  if (res) {

   military_site = true; 

  }

}, function (error) {

  console.error(error);

});

function askMilitarySite(){

  return military_site

}
