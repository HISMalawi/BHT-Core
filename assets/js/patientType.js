var patient_outcome; 
var active_tranferred_out_popup = true;

function visitPurpose(purpose){
	if(purpose.match(/transfer/i)){
		hideTransferOutPopup();
	}else{
		selected_visit_purpose = purpose;
		createPatientType();
	}
}

var selected_visit_purpose;
function createPatientType(){
	var currentTime = moment().format(' HH:mm:ss');
	var encounter_datetime = moment(sessionStorage.sessionDate).format('YYYY-MM-DD');
	encounter_datetime += currentTime;

	var encounter = {
			encounter_type_id: 5,
			patient_id: parseInt(sessionStorage.patientID),
			encounter_datetime: encounter_datetime,
			program_id: sessionStorage.programID
	};

	postPurposeParams(encounter, "/encounters", "postVisitPuposeObs");
}

function postVisitPuposeObs(encounter){
	let patient_type = (selected_visit_purpose == 'Drug refill' ? 10522 : 9684);

	const obs = {
			encounter_id: encounter.encounter_id,
			observations: [{
					concept_id: 3289, value_coded: patient_type,
					obs_datetime: encounter.encounter_datetime
			}]
	}

	sessionStorage.patient_type = selected_visit_purpose;
	postPurposeParams(obs, "/observations", "hideTransferOutPopup");
}

function hideTransferOutPopup() {
	document.getElementById('transferred-out-patient').style="display:none";
	document.getElementById('page-cover').style="display:none";
	finish(sessionStorage.patientID); 
}

function postPurposeParams(passedPayLoad, url_patch, returnToFunction){
	let url = apiProtocol + "://" + apiURL + ":" + apiPort + `/api/v1${url_patch}`;
	passedPayLoad = JSON.stringify(passedPayLoad);

	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
				let obj = JSON.parse(this.responseText);
				eval(returnToFunction)(obj);	
			}
	};
	xhttp.open("POST", url, true);
	xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
	xhttp.setRequestHeader('Content-type', "application/json");
	xhttp.send(passedPayLoad);
}

//fetchType();