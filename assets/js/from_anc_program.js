// Check if patient is coming from ANC.
if (sessionStorage.programID === "12" && sessionStorage.switchedFromANC){
                    
    sessionStorage.setItem("programID", 1);
    enrollPatient(sessionStorage.patientID);


}

function enrollPatient(person_id) {
    
  sessionStorage.patientID = person_id;

  var http = new XMLHttpRequest();

  var url = 'http://' + apiURL + ':' + apiPort + '/api/v1/patients/' + person_id + "/programs/";

  var params = JSON.stringify({

    program_id: sessionStorage.programID,

    date_enrolled: moment(sessionStorage.sessionDate).format("YYYY-MM-DD")

  });

  http.open('POST', url, true);

  http.setRequestHeader('Content-type', 'application/json');

  http.onreadystatechange = function () { //Call a function when the state changes.

    if (http.readyState == 4) {

      if (http.status == 201) {

        var v = JSON.parse(http.responseText);

        console.log("Enrolled successfully")


      } else if (http.status == 409) {

        alert('Patient already enrolled');

      } else {

        alert('error' + http.status);
    
      }

    }

  }

  http.setRequestHeader('Authorization', sessionStorage.getItem('authorization'));

  http.send(params);

}