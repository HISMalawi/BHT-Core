var fetchedPrescriptions;
var ordersToPost;
var totalDispensed;
var dataTable;
var dispen = {};
function getDataTable() {
    if (dataTable) {
        return dataTable;
    }
    
    dataTable = jQuery('#med-list').DataTable({
      fixedHeader: true,
      searching: false,
      paging: false,
      scrollY: 330,
      scroller: {
        loadingIndicator: true
      }
    });

    return dataTable;
}

function addModalDiv() {
    var iFrame = document.getElementById("inputFrame" + tstCurrentPage);
    var modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    modal.setAttribute("id", "prescription-modal");
    modal.setAttribute("data-backdrop", "static");
    iFrame.appendChild(modal);

    var modal_content = document.createElement("div");
    modal_content.setAttribute("class", "modal-content");
    modal_content.setAttribute("id", "prescription-modal-content");
    modal.appendChild(modal_content)
}

function dispensingPage() {
    var iFrame = document.getElementById("inputFrame" + tstCurrentPage);
    var helpText = document.getElementById("helpText" + tstCurrentPage);
    iFrame.style = "height: 95%; width: 96%;";
    helpText.style = "display: none;";

    var demographics = document.createElement("div");
    demographics.setAttribute("class", "demographics-table");

    var demographics_row = document.createElement("div");
    demographics_row.setAttribute("class", "demographics-table-row");
    demographics.appendChild(demographics_row);

    var cells = ["left", "right"];
    for (var i = 0; i < cells.length; i++) {
        var demographics_cell = document.createElement("div");
        demographics_cell.setAttribute("class", "demographics-table-cell");
        demographics_cell.setAttribute("id", "demographics-table-" + cells[i]);
        demographics_row.appendChild(demographics_cell);
    }

    iFrame.appendChild(demographics)
    buildDemographicsTable()

    buildMainControllers();

    addModalDiv();
}

function buildDemographicsTable() {
    mainContainer = document.getElementById("demographics-table-left");
    var table = document.createElement("table");
    table.setAttribute("class", "demographics-table-data");

    var tr = document.createElement("tr");
    table.appendChild(tr);

    var td = document.createElement("td");
    td.setAttribute("class", "names");
    td.setAttribute("id", "gender-icon-td");
    var img = document.createElement("img");
    if (sessionStorage.patientGender == "F") {
        img.setAttribute("src", "/assets/images/female.gif");
    } else if (sessionStorage.patientGender == "M") {
        img.setAttribute("src", "/assets/images/male.gif");
    }

    img.setAttribute("id", "gender-icon");
    td.appendChild(img);
    tr.appendChild(td);

    var td = document.createElement("td");
    td.setAttribute("class", "names");
    var span = document.createElement("span");
    span.innerHTML = "<b>Name: " + sessionStorage.given_name + " " + sessionStorage.family_name + "</b>";
    td.appendChild(span);
    tr.appendChild(td)


    mainContainer.appendChild(table);


    /* .................................................... */
    var table = document.createElement("table");
    table.setAttribute("class", "demographics-table-data");

    var tr = document.createElement("tr");
    table.appendChild(tr);

    var th = document.createElement("th");
    th.setAttribute("class", "data-header");

    var span = document.createElement("span");
    span.innerHTML = "<b>Birthdate: " + sessionStorage.patientDOB + "</b>";
    th.appendChild(span);


    tr.appendChild(th)


    mainContainer.appendChild(table);
}

function beautifyPop() {
    var modalDiv = document.getElementById('prescription-modal-content');
    modalDiv.innerHTML = null;

    var mainContainer = document.createElement("div");
    mainContainer.setAttribute("class", "keypad-container-table");
    modalDiv.appendChild(mainContainer);

    var mainContainerRow = document.createElement("div");
    mainContainerRow.setAttribute("class", "keypad-container-table-row");
    mainContainer.appendChild(mainContainerRow);

    var cells = ["left", "right"];
    for (var i = 0; i < cells.length; i++) {
        var mainContainerCell = document.createElement("div");
        mainContainerCell.setAttribute("class", "keypad-container-table-cell");
        mainContainerCell.setAttribute("id", "keypad-container-table-cell-" + cells[i]);
        mainContainerRow.appendChild(mainContainerCell);
    }
}


function displayKeyPad(order_id) {
    beautifyPop();
    var modalDiv = document.getElementById('keypad-container-table-cell-left');
    // var table = document.createElement('table');
    // table.setAttribute("class", "prescription-keypad");

    // /* ........................................ */
    // var tr = document.createElement("tr");
    // var td = document.createElement("td");
    // td.setAttribute("colspan", "3");
    // tr.appendChild(td);

    // var input = document.createElement('input');
    // input.setAttribute("type", "text");
    // input.setAttribute("id", "prescription-input");
    // input.setAttribute("class", "touchscreenTextInput");
    // td.appendChild(input);
    // table.appendChild(tr);
    // /* ........................................ */


    // var keypad_attributes = [];
    // keypad_attributes.push([15, 30, 60]);
    // keypad_attributes.push([90, 120, 180]);
    // keypad_attributes.push(["Del.", "Clear", "Reset"]);
    // keypad_attributes.push(["&nbsp;", "Close", "&nbsp;"]);
    // keypad_attributes.push(["Dispense"]);

    // for (var i = 0; i < keypad_attributes.length; i++) {
    //     var tr = document.createElement("tr");
    //     table.appendChild(tr);

    //     for (var j = 0; j < keypad_attributes[i].length; j++) {
    //         var td = document.createElement('td');
    //         // td.setAttribute("colspan", "3");


    //         tr.appendChild(td);

    //         var span = document.createElement('span');
    //         span.setAttribute("class", "keypad-buttons");
    //         span.setAttribute("onmousedown", "enterKeypadValue(this," + order_id + ");");
    //         span.innerHTML = keypad_attributes[i][j];
    //         if (keypad_attributes[i][j] == "&nbsp;") {
    //             span.setAttribute("class", "keypad-buttons keypad-buttons-hide");
    //         } else {
    //             span.setAttribute("class", "keypad-buttons");
    //         }

    //         if (keypad_attributes[i][j] == "Dispense") {
    //             td.setAttribute("colspan", "3");
    //             span.style.width = "100%";
    //             span.style.textAlign = "center";
    //             span.style.paddingTop = "20px";
    //             span.style.backgroundColor = "green";
    //         }
    //         else if (keypad_attributes[i][j] == "Close") {
    //             span.style.backgroundColor = "#c91c11";
    //         }
    //         td.appendChild(span);
    //     }
    // }

    // modalDiv.appendChild(table);
    // document.getElementById('prescription-modal').style = "display: block;";

    // addPopDescription(order_id);
    cTable(order_id);
    addMedication();
}

function addMedication() {

}
function addPopDescription(order_id) {
    var mainContainer = document.getElementById("keypad-container-table-cell-right");
    var table = document.createElement("table");
    table.setAttribute("id", "popup-table");

    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.innerHTML = "Medication:"
    var td = document.createElement("td");
    td.setAttribute("id", "medication-td");
    tr.appendChild(th)
    tr.appendChild(td)
    table.appendChild(tr);

    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.innerHTML = "Amount needed:"
    var td = document.createElement("td");
    td.setAttribute("id", "amount-needed-td");
    tr.appendChild(th)
    tr.appendChild(td)
    table.appendChild(tr);

    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.innerHTML = "Amount dispensed:"
    var td = document.createElement("td");
    td.setAttribute("id", "amount-dispensed-td");
    tr.appendChild(th)
    tr.appendChild(td)
    table.appendChild(tr);
    mainContainer.appendChild(table)

    var row = document.getElementById(order_id);
    var cells = row.getElementsByTagName("td");

    for (var j = 0; j < cells.length; j++) {
        if (j == 1) {
            document.getElementById("medication-td").innerHTML = cells[j].innerHTML;
        } else if (j == 2) {
            if(cells.length == 6){
              document.getElementById("amount-needed-td").innerHTML = cells[(j + 1)].innerHTML;
            }else{
              document.getElementById("amount-needed-td").innerHTML = cells[j].innerHTML;
            }
        } else if (j == 3) {
            if(cells.length != 6){
              document.getElementById("amount-dispensed-td").innerHTML = cells[j].innerHTML;
              totalDispensed = (cells[j].innerHTML).replace(/<[^>]*>/g, "");
            }else{
              document.getElementById("amount-dispensed-td").innerHTML = cells[(j + 1)].innerHTML;
              totalDispensed = (cells[(j + 1)].innerHTML).replace(/<[^>]*>/g, "");
            }
        }
    }

}

function enterKeypadValue(e, order_id) {
    var inputBox = document.getElementById('prescription-input');
    if(!dispen[order_id]) {
        dispen[order_id] = [];
    }
    try {

        if (e.innerHTML.match(/Del/i)) {
            dispen[order_id].splice(-1, 1);
            inputData(inputBox, order_id);            
        } else if (e.innerHTML.match(/Clear/i)) {
            inputBox.value = null;
            dispen[order_id] =  null;
        } else if (e.innerHTML.match(/Dispense/i)) {
            if(dispen[order_id].length > 0) {
                manualDispensation(order_id);
                document.getElementById("prescription-modal").style = "display: none;";
            }
        } else if (e.innerHTML.match(/Close/i)) {
            document.getElementById("prescription-modal").style = "display: none;";
        }else if (e.innerHTML.match(/Reset/i)) {
            dispen[order_id] =  null;
            voidDrugDispensations(order_id);
            
            // manualDispensation(order_id, -+totalDispensed);
        }
        else {
            dispen[order_id].push(e.innerHTML);
            inputData(inputBox, order_id);
        }

    } catch (x) {
    }

}

function inputData(inputBox, order_id){
    inputBox.value = null;
    dispen[order_id].forEach(element => {
        inputBox.value += (element + "+");
    });
    inputBox.value = inputBox.value.substring(0, inputBox.value.length - 1);
}

function buildMainControllers() {
    var iFrame = document.getElementById("inputFrame" + tstCurrentPage);

    var mainContainer = document.createElement("div");
    mainContainer.setAttribute("class", "controls-table");
    iFrame.appendChild(mainContainer);

    var mainContainerRow = document.createElement("div");
    mainContainerRow.setAttribute("class", "controls-table-row");
    mainContainer.appendChild(mainContainerRow);


    var cells = ["left", "right"];

    for (var i = 0; i < cells.length; i++) {
        var mainContainerCell = document.createElement("div");
        mainContainerCell.setAttribute("class", "controls-table-cell");
        mainContainerCell.setAttribute("id", "controls-table-cell-" + cells[i]);
        mainContainerRow.appendChild(mainContainerCell);
    }


    buildNavButtons();

    buildDispensingPage();
}

function manualDispensation(order_id) {
    var drug_order = {dispensations: []};
    dispen[order_id].forEach((element) => {
        drug_order.dispensations.push({
            date: sessionStorage.sessionDate, 
            drug_order_id: order_id, 
            quantity: element
        });
    });
    if(providerID != null) {
        drug_order.provider_id = providerID;
    }
    submitParameters(drug_order, "/dispensations", "doneDispensing");
    dispen[order_id] = [];
    try {
        var cover = document.getElementById('submit-cover');
        cover.style = 'display: none;';
    } catch (e) {
    }
}

function scannedMedicationBarcode(barcode) {
    var drug_id = barcode.split("-")[0];
    var quantity = barcode.split("-")[1];

    var order_id = fetchedPrescriptions[drug_id];
    postDispensation(order_id, quantity);
}


function postDispensation(order_id, amount_dispensed) {
    if (isNaN(parseInt(order_id))) {
        return
    }

    if (isNaN(parseFloat(amount_dispensed))) {
        return
    }

    var drug_order = {
        dispensations: [{date: sessionStorage.sessionDate, 
        drug_order_id: order_id, 
        quantity: amount_dispensed}]
    }

    if(providerID != null) {
        drug_order.provider_id = providerID;
    }
    submitParameters(drug_order, "/dispensations", "doneDispensing");

    try {
        var cover = document.getElementById('submit-cover');
        cover.style = 'display: none;';
    } catch (e) {
    }
}

function voidDrugDispensations(order_id) {
    
    var url = sessionStorage.apiProtocol + '://' + apiURL + ':' + apiPort + '/api/v1/dispensations/' + order_id;
    
    var req = new XMLHttpRequest();
        
    req.onreadystatechange = function () {

      if (this.readyState == 4 ) {
        if(this.status == 204) {
            doneDispensing("");
            document.getElementById("prescription-modal").style = "display: none;";
        }else if (this.status == 404 || this.status == 500) {
            var message = "Error " + this.status + ". An error has occured,Click yes to continue to patient dashboard or No to go to the main dashboard";
            genericError(message);
        }else if (this.status == 401) {
            var message = "Error " + this.status + ". You have been logged out ,Click yes to continue to patient dashboard or No to go to the main dashboard";
            genericError(message);
        }
        else {
            // var message = "Error " + this.status + ". An error has occured,Click yes to continue to patient dashboard or No to go to the main dashboard";
            // genericError(message);
        }
        
      }
      
    };
        
    try {
      
      req.open('DELETE', url, true);
      
      req.setRequestHeader('Authorization', sessionStorage.getItem('authorization'));
      
      req.send(null);
      
    } catch (e) {

    }
    
  }
function doneDispensing(orders) {
    var e = document.getElementById("nav-prescribed");
    setPage(e);
    checkIfDoneDispensing = true;

    try {
        var cover = document.getElementById('submit-cover');
        cover.style = 'display: none;';
    } catch (e) {
    }
}

var checkIfDoneDispensing = false;

function dispensationDone() {
    var done = true;
    var amount_needed = document.getElementsByClassName("medication-amount-needed");

    for (var i = 0; i < amount_needed.length; i++) {
        var amount = amount_needed[i].children[0].innerHTML
        if (parseFloat(amount) > 0) {
            done = false;
        }
    }

    if (done == true) {
        var fast_track_visit = sessionStorage.getItem("fast_track_visit");
        if (fast_track_visit == "true") {
            sessionStorage.removeItem("fast_track_visit");
            abortFastTrackNextVisit();
        } else {
            gotoAppointmentEncounterType();
        }
    }
}

function abortFastTrackNextVisit() {
    submiFastTracktDispensationEncounter();
}

function submiFastTracktDispensationEncounter() {
    var currentTime = moment().format(' HH:mm:ss');
    var encounter_datetime = moment(sessionStorage.sessionDate).format('YYYY-MM-DD');
    encounter_datetime += currentTime;

    var encounter = {
        encounter_type_name: 'DISPENSING',
        encounter_type_id: 54,
        patient_id: sessionStorage.patientID,
        encounter_datetime: encounter_datetime
    };

    submitParameters(encounter, "/encounters", "postFastTrackObs");
}
function cTable(order_id) {

    beautifyPop();
    var modalDiv = document.getElementById('prescription-modal-content');
    let table = document.createElement("table");
    table.setAttribute('class', 'dispensing-table');
    let headerRow = document.createElement('tr');
    td = document.createElement('td');
    td.innerHTML = "Prescribed";
    td.style.textAlign = 'center';
    td.setAttribute('class', 'dispensing-tds');
    td.setAttribute('colspan', '3');
    headerRow.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = "Available Stock";
    td.style.textAlign = 'center';
    td.setAttribute('class', 'dispensing-tds');
    td.setAttribute('colspan', '3');
    headerRow.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = "Dispensed";
    td.setAttribute('colspan', '3');
    td.style.textAlign = 'center';
    td.setAttribute('class', 'dispensing-tds');
    headerRow.appendChild(td);
    
    let packRow = document.createElement('tr');
    td = document.createElement('td');
    td.innerHTML = "Drug";
    td.setAttribute('colspan', '2');
    td.setAttribute('class', 'dispensing-tds');
    packRow.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = "Total tabs";
    td.setAttribute('colspan', '1');
    td.setAttribute('class', 'dispensing-tds');
    packRow.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = "Pack Size";
    td.setAttribute('colspan', '1');
    td.setAttribute('class', 'dispensing-tds');
    packRow.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = "Packs";
    td.setAttribute('colspan', '2');
    td.setAttribute('class', 'dispensing-tds');
    packRow.appendChild(td);    
    td = document.createElement('td');
    td.innerHTML = "Total tabs";
    td.setAttribute('colspan', '1');
    td.setAttribute('class', 'dispensing-tds');
    packRow.appendChild(td);    
    td = document.createElement('td');
    td.innerHTML = "Packs";
    td.setAttribute('colspan', '2');
    td.setAttribute('class', 'dispensing-tds');
    packRow.appendChild(td);


    let medicationRow = document.createElement('tr');
    let medicationTD = document.createElement('td');
    // td.innerHTML = "AZT/3tcazasas";
    medicationTD.setAttribute("id", "medication-td");
    medicationTD.setAttribute('colspan', '2');
    medicationTD.setAttribute('class', 'dispensing-tds');
    medicationRow.appendChild(medicationTD);
    let tabsNeededTD = document.createElement('td');
    // tabsNeededTD.innerHTML = "200";
    tabsNeededTD.setAttribute("id", "amount-needed-td");
    tabsNeededTD.setAttribute('colspan', '1');
    tabsNeededTD.setAttribute('class', 'dispensing-tds');
    medicationRow.appendChild(tabsNeededTD);
    td = document.createElement('td');
    td.innerHTML = 0;
    td.setAttribute('colspan', '1');
    td.setAttribute('class', 'dispensing-tds');
    medicationRow.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = 0;
    td.setAttribute('colspan', '2');
    td.setAttribute('class', 'dispensing-tds');
    medicationRow.appendChild(td);    
    td = document.createElement('td');
    td.innerHTML = 0;
    td.setAttribute('colspan', '1');
    td.setAttribute('class', 'dispensing-tds');
    medicationRow.appendChild(td);    
    td = document.createElement('td');
    td.innerHTML = 0;
    td.setAttribute('colspan', '2');
    td.setAttribute('class', 'dispensing-tds');
    medicationRow.appendChild(td);
    
    td = document.createElement('td');
    td.setAttribute('colspan', '1');
    td.setAttribute('class', 'dispensing-tds');
    var span = document.createElement("span");
    var btn = document.createElement("img");
    btn.setAttribute("src","/assets/images/up.png");
    btn.style.width = "25px";
    btn.style.height = "40%%";
    // btn.setAttribute("onmousedown", "voidDrugDispensations('" + order_id + "');");
    
    span.appendChild(btn);
    let br = document.createElement('br');
    td.appendChild(span);
    td.appendChild(br);
    span = document.createElement("span");
    btn = document.createElement("img");
    btn.setAttribute("src","/assets/images/reset.png");
    btn.style.width = "25px";
    btn.style.height = "40%%";
    // btn.setAttribute("onmousedown", "voidDrugDispensations('" + order_id + "');");
    span.appendChild(btn);
    td.appendChild(span);
    medicationRow.appendChild(td);
    table.appendChild(headerRow);
    table.appendChild(packRow);
    table.appendChild(medicationRow);
    // return span.innerHTML;

    modalDiv.appendChild(table);
    var row = document.getElementById(order_id);
    var cells = row.getElementsByTagName("td");

    for (var j = 0; j < cells.length; j++) {
        if (j == 1) {
            medicationTD.innerHTML = cells[j].innerHTML;
        } else if (j == 2) {
            if(cells.length == 6){
              tabsNeededTD.innerHTML = cells[(j + 1)].innerHTML;
            }else{
              tabsNeededTD.innerHTML = cells[j].innerHTML;
            }
        } else if (j == 3) {
            if(cells.length != 6){
            //   document.getElementById("amount-dispensed-td").innerHTML = cells[j].innerHTML;
              totalDispensed = (cells[j].innerHTML).replace(/<[^>]*>/g, "");
            }else{
            //   document.getElementById("amount-dispensed-td").innerHTML = cells[(j + 1)].innerHTML;
              totalDispensed = (cells[(j + 1)].innerHTML).replace(/<[^>]*>/g, "");
            }
        }
    }
   
    document.getElementById('prescription-modal').style = "display: block;";
}

function postFastTrackObs(encounter) {
    var fast_track_concept_id = 8471; //TODO change concept_id
    var fast_track_visit_concept_id = 9688;
    var yes_concept_id = 1065;
    var no_concept_id = 1066;

    var obs = {
        encounter_id: encounter["encounter_id"],
        observations: [
            {concept_id: fast_track_concept_id, value_coded: no_concept_id, comments: "fast track done"},
            {concept_id: fast_track_visit_concept_id, value_coded: yes_concept_id}
        ]
    };

    submitParameters(obs, "/observations", "gotoAppointmentEncounterType")
}

function gotoAppointmentEncounterType() {
  if(parseInt(sessionStorage.programID) == 1) {  
    document.location = "/views/patient/appointment.html?patient_id=" + sessionStorage.patientID;
  } else if (parseInt(sessionStorage.programID) === 2) {
    nextEncounter(sessionStorage.patientID, sessionStorage.programID, true)
  } else{
    document.location = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
  }
}


function addPrescriptions(data, onFinishCallback) {
    function buildPrescriptionsTableBody([order, ...otherOrders], {includeStock = false}) {
        if (!order) {
            onFinishCallback && onFinishCallback();
            return;
        }

        var order_id = order.order_id;
        var drug_id = order.drug_inventory_id;
        var medication = order.drug.name;
        var amount_needed = order.amount_needed;
        var quantity = order.quantity;

        if(amount_needed <= 0 && parseFloat(quantity) >= 0) {
          var needed_amount = calculate_complete_pack(order, parseFloat(quantity));
          if(parseFloat(needed_amount) > 0)
            amount_needed = needed_amount;

        }

        var complete_pack = calculate_complete_pack(order, parseFloat(amount_needed)) - (quantity || 0)
        fetchedPrescriptions[drug_id] = order_id;
        complete_pack = complete_pack < 0 ? 0 : complete_pack;

        const row = [addDeleteBTN(order_id),
                     addValue(order_id, medication, true),
                     addValue(order_id, complete_pack, false),
                     addValue(order_id, quantity, false),
                     addReset(order_id)];

        drawTableRow = () => {
            getDataTable().row.add(row).node().id = order_id;
            getDataTable().draw();
            addClassIMGcontainter(order_id);
        };

        if (!includeStock) {
            drawTableRow();
            buildPrescriptionsTableBody(otherOrders, {includeStock})
            return;
        }

        fetchAvailableDrugStock(drug_id).then(stock => {
            row.splice(2, 0, addValue(order_id, stock, false));
            drawTableRow();
            buildPrescriptionsTableBody(otherOrders, {includeStock});
        }).catch((error) => {
            showMessage(error);
        });
    }

    ifArtStockIsEnabled({
        and: () => sessionStorage.programID == HIV_PROGRAM_ID,
        then: () => buildPrescriptionsTableBody(data, {includeStock: true}),
        otherwise: () => buildPrescriptionsTableBody(data, {includeStock: false})
    });
}

function fetchAvailableDrugStock(drug_id) {
    const url = fullResourcePath(`pharmacy/items?drug_id=${drug_id}`)
    const requestParams = {
        headers: {
            'Authorization': sessionStorage.authorization,
            'Content-type': 'application/json'
        },
        mode: 'cors'
    };

    return fetch(url, requestParams).then(response => {
        if (!response.ok) {
            throw new Error("Unable to retrieve available drug stock");
        }

        return response.json();
    }).then(stockItems => {
        if (stockItems.length === 0) {
            return "N/A";
        }

        return stockItems.reduce((accum, {current_quantity}) => accum + current_quantity, 0);
    });
}

function addClassIMGcontainter(order_id) {
    var row = document.getElementById(order_id);
    var cells = row.getElementsByTagName("td"); 
    var td = cells[0];
    td.setAttribute("class", "delete-container");

    if (cells.length === 6) {
        td = row.getElementsByTagName("td")[3]
    } else {
        td = row.getElementsByTagName("td")[2];
    }
    
    td.setAttribute("class", "medication-amount-needed");
}

function addDispBTN(order_id) {
    //var row = document.getElementById(order_id);
    //row.setAttribute("onmousedown", "displayKeyPad('" + order_id + "');");
    var span = document.createElement("span");
    var btn = document.createElement("button");
    btn.setAttribute("class", "dispense-button btn btn-primary");
    btn.setAttribute("onmousedown", "displayKeyPad('" + order_id + "');");
    btn.innerHTML = "Dispense";
    span.appendChild(btn);
    return span.innerHTML;
}

function addReset(order_id) {
    var span = document.createElement("span");
    var btn = document.createElement("img");
    btn.setAttribute("src","/assets/images/reset.png");
    btn.style.width = "20%";
    btn.setAttribute("onmousedown", "voidDrugDispensations('" + order_id + "');");
    span.appendChild(btn);
    return span.innerHTML;
}

function addValue(order_id, value, clickable) {
    //var row = document.getElementById(order_id);
    //row.setAttribute("onmousedown", "displayKeyPad('" + order_id + "');");
    var span = document.createElement("span");
    var btn = document.createElement("p");
    // btn.setAttribute("class","dispense-button btn btn-primary");
    if(clickable) {
        btn.setAttribute("onmousedown", "displayKeyPad('" + order_id + "');");
    }
    btn.innerHTML = value;
    span.appendChild(btn);
    return span.innerHTML;
}

function deleteOrder(row) {
    var order_id = row.id;
    alert(document.getElementById(order_id).innerHTML);
}

function addDeleteBTN(order_id) {
    /*
    var span = document.createElement("span");
    var img  = document.createElement("img");
    img.setAttribute("class","delete-icon");
    img.setAttribute("onmousedown","deleteOrder(this);");
    img.setAttribute("id", order_id);
    img.setAttribute("src", "../../assets/images/delete.png");
    span.appendChild(img);
    return span.innerHTML;
    */
    return "&nbsp;"
}

function getPrescriptions() {
    var url = apiProtocol + "://" + apiURL + ":" + apiPort;
    url += "/api/v1/drug_orders?patient_id=" + sessionStorage.patientID;
    url += "&date=" + sessionStorage.sessionDate;
    url += "&program_id=" + sessionStorage.programID;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            fetchedPrescriptions = {}
            addPrescriptions(obj, () => {
                if (checkIfDoneDispensing == true) {
                    dispensationDone();
                    checkIfDoneDispensing = false;
                }
            });
        }
    };

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send();
}

const HIV_PROGRAM_ID = 1;
const PROPERTIES = { artStockActivated: null };

function fullResourcePath(resource = null) {
    if (resource === null) {
        return `${apiProtocol}://${apiURL}:${apiPort}/api/v1`;       
    }
    
    return `${apiProtocol}://${apiURL}:${apiPort}/api/v1/${resource}`;   
}

function ifArtStockIsEnabled({and = null, then, otherwise = (_) => null}) {
    if (and !== null && and() === false) return otherwise();

    if (PROPERTIES.artStockActivated === null) {
        const requestOptions = { path: fullResourcePath(), authToken: sessionStorage.authorization };
        
        return GlobalProperty(requestOptions).isEnabled(
            'activate.drug.management', 
            (isEnabled) => {
                if (isEnabled) {
                    PROPERTIES.artStockActivated = true;
                    return then();
                } else {
                    PROPERTIES.artStockIsActivated = false;
                    return otherwise();
                }
            },
            (_error) => {
                PROPERTIES.artStockActivated = false;
                return otherwise();
            }
        );
    } else if(PROPERTIES.artStockActivated) {
        return then();
    } else {
        return otherwise();
    }
}

function buildDispensingPage() {
    function makePage(headers) {
        var rightContainer = document.getElementById("controls-table-cell-right");

        var medList = document.createElement("div");
        medList.setAttribute("id", "medList-container");

        var table = document.createElement("table");
        table.setAttribute("id", "med-list");
        table.setAttribute("class", "uk-table uk-table-hover uk-table-striped");
        var thead = document.createElement("thead");
        table.appendChild(thead);

        var tr = document.createElement("tr");
        thead.appendChild(tr);

        for (var i = 0; i < headers.length; i++) {
            var th = document.createElement("th");
            th.innerHTML = headers[i];
            if (i == 1)
                th.style = "width: 50%;"

            tr.appendChild(th);
        }

        var tbody = document.createElement("tbody");
        table.appendChild(tbody);

        medList.appendChild(table);
        rightContainer.appendChild(medList);


        /* ............................................. */

        var barcodeDiv = document.createElement("div");
        barcodeDiv.setAttribute("id", "barcode-container");
        barcodeDiv.setAttribute("class", "barcode");
        barcodeDiv.setAttribute("functionName", "scannedMedicationBarcode");


        rightContainer.appendChild(barcodeDiv);
        inserBarcodeScan();
    }
    
    ifArtStockIsEnabled({
        and: () => sessionStorage.programID == HIV_PROGRAM_ID,
        then: () => makePage(["&nbsp;", "Medication", "Amount available", "Amount needed", "Amount dispensed", "Reset"]),
        otherwise: () => makePage(["&nbsp;", "Medication", "Amount needed", "Amount dispensed", "Reset"])
    });
}


function buildNavButtons() {
    var navContainer = document.getElementById("controls-table-cell-left");
    var navButtons = [
        ["Prescribed", "rx.png"],
        ["History", "history.png"]
    ];

    var navTable = document.createElement("table");
    navTable.setAttribute("id", "nav-table");

    for (var i = 0; i < navButtons.length; i++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        tr.appendChild(td);

        var img = document.createElement("img");
        img.setAttribute("src", "../../assets/images/prescription/" + navButtons[i][1]);
        img.setAttribute("draggable", "false");
        img.setAttribute("class", "icons");

        var a = document.createElement("a");
        a.setAttribute("class", "nav-buttons");
        a.setAttribute("id", "nav-" + navButtons[i][0].toLowerCase());
        a.setAttribute("onmousedown", "setPage(this);");

        if (i != 0)
            a.setAttribute("style", "color: black; background-color: #dddddd;");


        var p = document.createElement("p");
        p.innerHTML = navButtons[i][0];
        a.appendChild(img);
        a.appendChild(p);

        td.appendChild(a);
        navTable.appendChild(tr);

    }

    navContainer.appendChild(navTable)

}

function setPage(e) {
    var buttons = document.getElementsByClassName("nav-buttons");

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style = "color: black; background-color: #dddddd;"
    }

    e.style = "color: white; background-color: #5ca6c4;";
    buildPage(e);

}

function buildPage(e) {
    leftContainer = document.getElementById("controls-table-cell-right");
    leftContainer.innerHTML = null;
    dataTable = null;   // Mark bound data table as null;

    if (e.innerHTML.match(/Prescribed/i)) {
        buildDispensingPage();
        getPrescriptions();
    } else if (e.innerHTML.match(/History/i)) {
        buildMedicationHistory();
        loadHostory();
    }

}

function buildMedicationHistory() {
    var rightContainer = document.getElementById("controls-table-cell-right");

    var table = document.createElement("table");
    table.setAttribute("id", "med-list");
    table.setAttribute("class", "uk-table uk-table-hover uk-table-striped");
    var thead = document.createElement("thead");
    table.appendChild(thead);

    var tr = document.createElement("tr");
    thead.appendChild(tr);

    var headers = ["Medication", "Date", "Amount dispensed"];

    for (var i = 0; i < headers.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = headers[i];
        if (i == 0)
            th.style = "width: 50%;"

        tr.appendChild(th);
    }

    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    rightContainer.appendChild(table);

}

function loadHostory() {
    var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/drug_orders";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            addRows(obj);
        }
    };
    xhttp.open("GET", (url + "?patient_id=" + sessionStorage.patientID), true);
    xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send();
}

function addRows(data) {
    for (var i = 0; i < data.length; i++) {
        var order_id = data[i].order_id;
        var drug_id = data[i].drug_inventory_id;
        var medication = data[i].drug.name;
        var quantity = data[i].quantity;
        var start_date = data[i].order.start_date;

        start_date = formatDate(start_date);

        getDataTable().row.add([medication, start_date, quantity]).node().id = order_id;
        /*var table = $('#example').DataTable();

        $('#example tbody').on('click', 'tr', function () {
            var data = table.row( this ).data();
            alert( 'You clicked on '+data[0]+'\'s row' );
        } );*/
        getDataTable().draw();
    }
}

function formatDate(date_str) {
    return moment(date_str).format('DD/MMM/YYYY')
}

function calculate_complete_pack(drug, units) {
    var drug_order_barcodes = drug.barcodes.sort(function (a, b) {
        return a.tabs - b.tabs;
    }); //sorting in an ascending order by tabs
    if (drug_order_barcodes.length == 0 || units == 0.0) {
        return units;
    }

    for (var i = 0; i <= drug_order_barcodes.length - 1; i++) {
        if (parseInt(drug_order_barcodes[i].tabs) >= units) {
            return drug_order_barcodes[i].tabs;
        }
    }

    var smallest_available_tab = parseInt(drug_order_barcodes[0].tabs)
    var complete_pack = parseInt(drug_order_barcodes[drug_order_barcodes.length - 1].tabs)

    while (complete_pack < units) {
        complete_pack += smallest_available_tab
    }

    return complete_pack

}
