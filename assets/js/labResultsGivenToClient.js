
var lab_results_given_to_client = {}

function checkIfResultsGiven(){
	for(const accession_number in lab_results_given_to_client){
		if(!lab_results_given_to_client[accession_number].results_given){
			__$("tb-treatment-cover").style = "display:inline;";
			__$("results-given-popup-div").style = "display:inline;";
			return;
		}
	}
	processVLalert();
}

function labResultsGivenToClient(orders){
	for(const order of orders){
		let encounter_id = order.encounter_id;
		let order_id = order.order_id;
		let accession_number = order.accession_number;
		if(accession_number == null)
			continue;

		if(order.tests){
			for(const test of order.tests){
				if(test.result){
					if(lab_results_given_to_client[accession_number] == undefined){
						lab_results_given_to_client[accession_number] = {
							order_id: order_id,
							encounter_id: encounter_id,
							obs_ids: [],
							results_given: false,
							accession_number: accession_number
						};
					}
					
					for(const result of test.result){
						lab_results_given_to_client[accession_number].obs_ids.push(result.id);
					}

					if(lab_results_given_to_client[accession_number].obs_ids.length > 0){
						resultsGiven(lab_results_given_to_client[accession_number].obs_ids[0], 
							lab_results_given_to_client[accession_number]);
					}
					
				}
			}
		}
	}
}

function createGivenToClientEncounters(){
	for(const accession_number in lab_results_given_to_client){
		if(lab_results_given_to_client[accession_number].results_given)
			continue;

		postGivenToClientObservations(accession_number);
	}
	hideResultsGivenPopup();
}

function postGivenToClientObservations(accession_number){
	let obs = {
		encounter_id: lab_results_given_to_client[accession_number].encounter_id,
		observations: []
	};

	const currentTime = moment().format(' HH:mm:ss');
	let obs_datetime = moment(sessionStorage.sessionDate).format('YYYY-MM-DD');
	obs_datetime += currentTime;

	for(const obs_id of lab_results_given_to_client[accession_number].obs_ids){
		obs.observations.push({
			concept_id: 9764, 
			value_coded: 1065, 
			obs_group_id: obs_id,
			obs_datetime: obs_datetime
		});
	}

	const parametersPassed = JSON.stringify(obs);
	const url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/observations";

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
			//console.log("Observation posted successfully");
		}
	};
	xhttp.open("POST", url, true);
	xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
	xhttp.setRequestHeader('Content-type', "application/json");
	xhttp.send(parametersPassed);
}

function resultsGiven(obs_id, hashObject){
	const url = apiProtocol + "://" + apiURL + ":" + apiPort + `/api/v1/observations/${obs_id}`;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
			const obs = JSON.parse(this.responseText);
			if(obs.children.length < 1){
				__$(`${hashObject.accession_number}-given`).innerHTML = `<span style="color:red;">No</span>`;
			}else{
				for(const child of obs.children){
					if(child.concept_id == 9764 && child.value_coded == 1065){
						hashObject.results_given = true;
						__$(`${hashObject.accession_number}-given`).innerHTML = `<span style="color:green;">Yes</span>`;
					}
				}
			}
		}
	};
	xhttp.open("GET", url, true);
	xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
	xhttp.setRequestHeader('Content-type', "application/json");
	xhttp.send();
}


function hideResultsGivenPopup(){
	__$("results-given-popup-div").style = "display:none;";
	__$("tb-treatment-cover").style = "display:none;";
	processVLalert();
}