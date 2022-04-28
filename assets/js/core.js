//declare your network configurations here
// getAPI();

// window.addEvent('load', function() {
// var apiURL,apiPort =''; sessionStorage.getItem("apiURL");
// var apiPort =''; sessionStorage.getItem("apiPort");
var apiURL, apiPort, apiProtocol;
getAPI();
var url = window.location.href;
var url = new URL(url);
var backupPatientID = "";
var consent = "";
var circumcision_consent = "";
var id = url.searchParams.get("patient_id");
sessionStorage.setItem("backupPatientID", id);
sessionStorage.setItem("filingNumnerAvailable", "false");
// var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
// var activities_tab_content = "";
// })

var admin_tab_content = '';
if(sessionStorage.userRoles && sessionStorage.userRoles.match(/Program Manager|Superuser|System Developer/i)) {
  admin_tab_content = '<button class="overview-btns overview-btns-2nd-class" id="create-user" onclick="redirect(this.id);"><img src="/assets/images/add-user.png" class="btn-icons"/><span>Create user</span></button>';

  admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="view-user" onclick="redirect(this.id); "><img src="/assets/images/edit-user.png" class="btn-icons"/><span>View user</span></button>';

  admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="view-sys-settings" onclick="redirect(this.id); "><img src="/assets/images/sys-setting.png" class="btn-icons"/><span>System settings</span></button>';
  
  if(parseInt(sessionStorage.programID) == 1){
    admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="view-drug-management-settings" onclick="redirect(this.id); "><img src="/assets/images/drug.png" class="btn-icons"/><span>Drug management</span></button>';
    admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="view-data-management-settings" onclick="redirect(this.id); "><img src="/assets/images/clean.jpg" class="btn-icons"/><span>Data management</span></button>';
  }
  if (parseInt(sessionStorage.programID) == 12) {
    admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="view-data-management-settings" onclick="redirect(this.id); "><img src="/assets/images/clean.jpg" class="btn-icons"/><span>Data management</span></button>';      
  }
  admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="enable-portal" onclick="redirect(this.id); "><img src="/assets/images/portal.png" class="btn-icons"/><span>Portal Settings</span></button>';
}

admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="view-change-date" onclick="redirect(this.id); "><img src="/assets/images/time.png" class="btn-icons"/><span>Change sesison date</span></button>';

admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="change-password" onclick="redirect(this.id); "><img src="/assets/images/key.png" class="btn-icons"/><span>Change Password</span></button>';
admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="print-location" onclick="redirect(this.id); "><img src="/assets/images/location.png" class="btn-icons"/><span>Print Location</span></button>';
admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="view-duplicates" onclick="redirect(this.id); "><img src="/assets/images/duplicate.png" class="btn-icons"/><span>View Duplicates</span></button>';

admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="military-site" onclick="redirect(this.id); "><img src="/assets/images/soldier.png" class="btn-icons"/><span>Is this a military site?</span></button>';

admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="malawi-national-id" onclick="redirect(this.id); "><img src="/assets/images/edit-demographic.png" class="btn-icons"/><span>Activate Malawi National ID?</span></button>';

admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="registers" onclick="redirect(this.id); "><img src="/assets/images/list.png" class="btn-icons"/><span>Manage Registers</span></button>';

admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="userStats" onclick="redirect(this.id); "><img src="/assets/images/add-user.png" class="btn-icons"/><span>User Stats</span></button>';

admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="systemVersion" onclick="showVersions();"><img src="/assets/images/version-control.png" class="btn-icons"/><span>View system version</span></button>';

if(sessionStorage.userRoles && sessionStorage.userRoles.match(/Program Manager|Superuser|System Developer/i)) {
admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="systemBackups" onclick="enterBabckupPath();"><img src="/assets/images/path.png" class="btn-icons"/><span>Database backup path</span></button>';
admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="systemBackups" onclick="showBabckups();"><img src="/assets/images/backup.png" class="btn-icons"/><span>View database backups</span></button>';
}

admin_tab_content += '<button class="overview-btns overview-btns-2nd-class" id="systemUsage" onclick="systemUsage();"><img src="/assets/images/usage.png" class="btn-icons"/><span>View user app usasge</span></button>';

var addDiv = "<div class='col-sm-2 tasks'>";
var endDiv = "</div>"

// activities_tab_content += addDiv +'<button id="national-id" class="taskBtns"><span>National ID(Print)</span></button>';
// activities_tab_content += endDiv +addDiv+ '<button  id="visit-summary" class="taskBtns"><span>Visit Summary(Print)</span></button>';
// activities_tab_content += endDiv + addDiv+'<button  id="demographics-print" class="taskBtns"><span>Demographics(Print)</span></button>';
// activities_tab_content += endDiv + addDiv+'<button id="demographics-edit" onclick="activitiesRedirect(this.id);" class="taskBtns"><span>Demographics(Edit)</span></button>' + endDiv;


// URL formulation logic
var auth_token = null;

if (sessionStorage.getItem("applicationName") !== null) {
    showBarcodeDiv();
}
// sessionStorage.setItem("displayBarcode", false);

var userApi = "user";

var firstName = "firstname";

var lastName = "lastname";

var homeDistrict = "homedistrict";

var homeVillage = "homevillage";

var currentDistrict = "currentdistrict";

var currentTA = "currentta";

var homeTA = "homeTA";

var currentVillage = "currentvillage";

var roles = "roles";

var people = "people";

var person_addresses = "person_addresses";

var person_names = "person_names";
var activitiesName = [];
var activitiesDescription = [];
var activitiesIcon = [];
var applicationName = [];
var applicationDescription = [];
var applicationIcon = [];
var applicationFolder = [];
var applicationJsonUrl = [];
var programID = [];
var redirectUrl = [];
var encounter_name = [];

function _ajaxUrl(res) {
    var result = [];
    $.getJSON({
        url: apiProtocol + '://' + apiURL + ':' + apiPort + '/api/v1/' + res,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', sessionStorage.getItem(auth_token));
        },
        success: function (data) {
            result = data;
        },
        error: function () {
            console.log('error message');
        }
    });

    return result;
}


function loadDoc() {

    $.post(apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/auth/login", {
            username: "admin",
            password: "test"
        },
        function (data, status) {

            if (status.toLocaleLowerCase() === "success") {
                sessionStorage.setItem(auth_token, data.authorization.token);

            } else {
            }
        });
}

function PersistData(data, res) {

    var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/" + res;
    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {

        if (req.readyState == 4 && req.status == 200) {
            // window.location.href = '/views/patient_dashboard.html';
        } else {
            console.log("@@@@" + req.responseText);
        }
    }

    req.open('POST', url, true);
    req.setRequestHeader('Content-type', 'application/json');
    req.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    req.send(JSON.stringify(data));

}

function loadConfigurations() {
    $.getJSON('/config/config.json')
        .done((configurations) => {
            loadApplicationsIntoMenu(configurations.apps)
        })
        .fail((error) => {
            console.error(error)
            showMessage('There was an error bootstrapping the application.')
        })
}

function loadApplicationsIntoMenu(applications) {
    applications.forEach((application, idx) => {
        const configFilePath = `/apps/${application.applicationFolder.replace('/','')}/application.json`;
        $.getJSON(configFilePath)
            .done(() => {
                createApplicationCard(application, idx)
            })
            .fail((error) => {
                //console.error(error)
            })
    })
}


function createApplicationCard(applicationData, idx) {
    $("#modal-div").append($('#card_template').html())
    $("#appDescription").text(applicationData.applicationDescription).attr('id', `appDescription${idx}`)
    $("#apptext").text(applicationData.applicationName).attr('id', `apptext${idx}`)
    $("#appName").text(applicationData.applicationName).attr('id', `appName${idx}`)
    $("#moduleButton").attr('id', `moduleButton${idx}`)

    if (applicationData.url == "") {
        $(`#moduleButton${idx}`).attr("href",  window.location.href);
    } else {
        $(`#moduleButton${idx}`).attr("href", "/" +applicationData.url);
    }

    $("#cardImage")
        .on('error', () => {
            $(this).attr('src', "/assets/images/no_image.png")
        }).attr('src', applicationData.applicationIcon).attr('id', `cardImage${idx}`)

    $(`#moduleButton${idx}`).click(() => {
        sessionStorage.setItem("applicationImage", applicationData.applicationIcon)
        sessionStorage.setItem("applicationName", applicationData.applicationName)
        sessionStorage.setItem("applicationFolder", applicationData.applicationFolder)
        sessionStorage.setItem("programID", applicationData.programID)
        changeModule()
    })
}

function generateActivities() {
    if (document.createElement("template").content) {
        /*Code for browsers that supports the TEMPLATE element*/

        $.getJSON("/apps/" + sessionStorage.applicationName + "/application.json")
            .done(function (data, status) {
                getActivities(data);
            })
            .fail(function () {
                console.log("application.json is missing from the /apps/ART folder");
            });
    } else {
        /*Alternative code for browsers that do not support the TEMPLATE element*/
    }
}

function generateTasks() {

    if (document.createElement("template").content) {

        $.getJSON("/apps/" + sessionStorage.applicationName + "/application.json")
            .done(function (data, status) {

                getTasks(data);

            })
            .fail(function () {
                console.log("application.json is missing from /apps/ART folder");
            });
    } else {

    }
}

function _foo(data, resource) {

    var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/" + resource;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(JSON.parse(this.responseText));
        } else {
            //
        }
    }

    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader("Authorization", sessionStorage.getItem("authorization"));
    xhr.send(null);

}

function newActivitiesCard(activitiesName, activitiesDescription, activitiesImage, counter, url) {
    $("#activities-modal-div").append($('#activities_template').html());
    $("#activityDescription").text(activitiesDescription).attr('id', "activityDescription" + counter);
    $("#activitytext").text(activitiesName).attr('id', "activitytext" + counter);
    $("#activityName").text(activitiesName).attr('id', "activityName" + counter);
    $("#activitiesButton").attr('id', "activitiesButton" + counter);
    $("#activitiesCard").attr('id', "activitiesCard" + counter);
    $("#activitiesButton" + counter).attr("href", url);
    // $("activitiesCard"+counter).attr("onclick", "window.location.href='"+url+"';");

    $("#cardImage")
        .on('error', function () {
            $(this).attr('src', "/assets/images/no_image.png");
        }).attr('src', activitiesImage).attr('id', "cardImage" + counter);
    $("#activitiesButton" + counter).click(function () {
        sessionStorage.setItem("activitiesName", activitiesName);
        sessionStorage.setItem("activitiesImage", activitiesImage);
        changeActivities();
    });

}

function getName(user_id, url, port, protocol) {

    jQuery.getJSON({
        url: protocol + '://' + url + ':' + port + '/api/v1/users/' + user_id,
        data: {},
        type: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', sessionStorage.getItem('authorization'));
        },
        success: function (result) {
            var username = result.username;
            var allRoles = '';
            var roles_length = result.roles.length;
            for (var index = 0; index < roles_length; index++) {
                allRoles = result.roles[index].role + ", " + allRoles;
            }
            var role = result.roles.role;
            var date_created = result.date_created;
            var given_name = result.person.names[0].given_name;
            var family_name = result.person.names[0].family_name;
            showUser(username, given_name, family_name, allRoles, date_created);

        }
    });
}

function showUser(username, given_name, family_name, role, date_created) {

    document.getElementById("first_name").innerHTML = given_name;
    document.getElementById("last_name").innerHTML = family_name;
    document.getElementById("username").innerHTML = username;
    document.getElementById("role").innerHTML = role;
    document.getElementById("date_created").innerHTML = moment(sessionStorage.sessionDate).format('DD/MMM/YYYY');
    // document.getElementById("date_created").innerHTML = date_created;    
}

function setUser() {
    var given_name = document.getElementById("first_name").textContent;
    var family_name = document.getElementById("last_name").textContent;
    var username = document.getElementById("username").textContent;
    sessionStorage.setItem("given_name", given_name);
    sessionStorage.setItem("family_name", family_name);
    sessionStorage.setItem("username", username);
}

function checkActivities(applicationJsonUrl, activitiesName, activitiesDescription, counter, activitiesIconUrl) {
    // $.getJSON(applicationJsonUrl)
    //     .done(function (data) {
    newActivitiesCard(activitiesName, activitiesDescription, activitiesIconUrl, counter, applicationJsonUrl);


}

function getActivities(activitiesData) {

    for (var i = 0; i < activitiesData.others.length; i++) {

        activitiesName[i] = activitiesData.others[i].activitiesName || "Activities Name Not Defined!!";
        activitiesDescription[i] = activitiesData.others[i].activitiesDescription || "No Description Available";
        activitiesIcon[i] = activitiesData.others[i].activitiesIcon;
        applicationFolder[i] = activitiesData.others[i].applicationFolder;
        applicationJsonUrl[i] = activitiesData.others[i].url;
        checkActivities(applicationJsonUrl[i], activitiesName[i], activitiesDescription[i], i, activitiesIcon[i]);

    }
}

function getTasks(encountersData) {
    
    var tasks = [];

    if ((parseInt(sessionStorage.programID) == 12) || (parseInt(sessionStorage.programID) == 21)){
        // This is for ANC Program to be able to differnctiate
        // two different activities using a single encounter.
        // e.g. ART Treatment and ANC Treatment both using Treatment encounter.
        var j = encountersData.encounters;
        for(var k = 0; k < encountersData.activities["tasks"].length; k++){
            var values = encountersData.activities["tasks"][k][0]
            var encounter = encountersData.activities["tasks"][k][1]
            if(j[encounter] !== undefined){
                var url = j[encounter].url;
                var icon = j[encounter].activitiesIcon
                tasks.push([values, icon, url, encounter.toUpperCase()])
            }
        }

    }else{
        var j = Object.keys(encountersData.encounters);
        var i = 0;
        j.forEach(function (j) {
            var values = encountersData.encounters[j]
            var url = values.url;
            var icon = values.activitiesIcon;
            var show = values.show;

            if (show || show == undefined) tasks.push([j, icon, url]);
        });
    }

    var container = document.getElementById('tasks-container');
    buildDashboardButtons(tasks, container);
}

function printNPID() {
    print_and_redirect('/views/print/npid.html', '/views/patient_dashboard.html?patient_id=' + sessionStorage.patientID);
}

function printFilingNumber() {
    print_and_redirect('/views/print/filing.html', '/views/patient_dashboard.html?patient_id=' + sessionStorage.patientID);
}

function printVisitSummary() {
    print_and_redirect('/views/print/visit.html?visit_date='+encDate, '/views/patient_dashboard.html?patient_id=' + sessionStorage.patientID);
}

function printTransferOut() {
    print_and_redirect('/views/print/transfer.html', '/views/patient_dashboard.html?patient_id=' + sessionStorage.patientID);
}

function printDemographics() {
    print_and_redirect('/views/print/demographics.html', '/views/patient_dashboard.html?patient_id=' + sessionStorage.patientID);
}

function printPatientHistory() {
    print_and_redirect('/views/print/patient_history.html', '/views/patient_dashboard.html?patient_id=' + sessionStorage.patientID);
}

function printLabResults() {
    print_and_redirect('/views/print/lab_results.html', '/views/patient_dashboard.html?patient_id=' + sessionStorage.patientID);
}

function printTBNumber() {
    print_and_redirect('/views/print/tb_ipt_number.html', '/views/patient_dashboard.html?patient_id=' + sessionStorage.patientID);
}

function printLabOrderSummary(order = {}){
    document.location = `/views/print/print_lab_order_summary.html?patient_id=${sessionStorage.patientID}
    &session_date=${sessionStorage.sessionDate}&test_type=${order.tests[0].test_type}&specimen_type=${order.tests[0].sample_type}
    &recommended_examination=${order.tests[0].recommended_examination}&target_lab=${order.tests[0].target_lab}
    &reason_for_examination=${order.tests[0].reason}&previous_tb_patient=${order.tests[0].treatment_history}`

}

function reprintLabOrderSummary(order = {}){
    document.location = `/views/print/print_lab_order_summary.html?patient_id=${sessionStorage.patientID}
    &session_date=${order[0].order_date}&test_type=${order[0].test_type}&specimen_type=${order[0].sample_type}
    &recommended_examination=${order[0].recommended_examination}&target_lab=${order[0].target_lab}
    &reason_for_examination=${order[0].reason}&previous_tb_patient=${order[0].treatment_history}`

}

function rePrintLabOrderSummary(){
    $.getScript('/assets/js/Lab.js', function()
    {

    params = {
        patient_id: sessionStorage.patientID,
        program_id: sessionStorage.programID
    }

    CONCEPTS = {
        9737: 'Test type',
        7691: 'Tuberculous',
        1004: 'Sputum',
        1594: 'CSF',
        6690: 'Pleural Fluid',
        6691: 'Ascitic Fluid',
        6692: 'Pericardial Fluid',
        2483: 'Peritoneal Fluid',
        9820: 'Pus',
        1592: 'Urine',
        3065: 'Diagnosis',
        2484: 'Follow-up',
        9739: 'Lab',
        3050: 'Tuberculosis smear microscopy method',
        9815: 'Xpert MTB/RIF', 
        9816: 'Xpert MTB/RIF Ultra',
        9817: 'LPA'
    }

    function buildLabDetails(orderDetails = [], orderDates){
        console.log(orderDates)
        return [
            {
                order_date: orderDates,
                test_type: orderDetails[0],
                sample_type: orderDetails[1],
                recommended_examination: orderDetails[3],
                target_lab: 'N/A',
                reason: orderDetails[2],
                treatment_history: "N/A"
            }
        ] 
    }

    var obs_values = []

    function filterDetails(details = {}){

        return details.map(item => obs_values[CONCEPTS[item]] = CONCEPTS[item]).filter(filtered => filtered != null || undefined)

    }

    LabOrder.getRecentOrders(params)
      .then((payload) => {
        if (payload.ok) {

            payload.json().then(order => {

            var orderDates = order.map(order => order.observations)[0].map(value => {
                    return value.obs_datetime
            })
            
            var details = order.map(order => order.observations)[0].map(value => {
                return value.value_coded
            })
            reprintLabOrderSummary(buildLabDetails(filterDetails(details), orderDates[0]))

        })
        } else logErrorAndNotify(payload.statusText)
      })
      .catch(error => logErrorAndNotify(error))

    });
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/label;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function buildDashboardButtons(tasks, container) {
    container.innerHTML = null;
    var count = 0;

    var containerTable = document.createElement("div");
    containerTable.setAttribute("class", "tasks-table");
    containerTable.setAttribute("style", "display: table; width: 100%;");
    container.appendChild(containerTable);

    var containerTableRow = document.createElement("div");
    containerTableRow.setAttribute("class", "tasks-table-row");
    containerTableRow.setAttribute("style", "display: table-row;");
    containerTable.appendChild(containerTableRow);

    if (sessionStorage.programID === "21") {
        checkConsent();
        circumcisionConsent();
    }
    var use_filling_number = false;
    var use_filling_number_property_url = apiProtocol + "://" + apiURL + ":" + apiPort;
    use_filling_number_property_url += "/api/v1/global_properties?property=use.filing.numbers";
    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && (this.status == 201 || this.status == 200 || this.status == 404)) {
            try {
                var use_filling_number_property = JSON.parse(this.responseText)["use.filing.numbers"];
                if (use_filling_number_property == "true") {
                    use_filling_number = true
                }

            } catch (e) {

            }


            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i][0].toUpperCase() == 'HIV CLINIC CONSULTATION (CLINICIAN)')
                  continue;

                if (count == 3) {
                    containerTableRow = document.createElement("div");
                    containerTableRow.setAttribute("class", "tasks-table-row");
                    containerTableRow.setAttribute("style", "display: table-row;");
                    containerTable.appendChild(containerTableRow);
                    count = 0;
                }

                if (!use_filling_number) {
                    if (tasks[i][0].match(/filing/i)) {
                        continue;
                    }
                }
                if (!((tasks[i][0].match(/ART/) || tasks[i][0].match(/HIV/)) && (sessionStorage.programID == "12"))){

                containerTableCell = document.createElement("div");


                if (sessionStorage.programID == "12" || sessionStorage.programID == "21"){ //Disable already saved encounters in ANC and VMMC

                    if (sessionStorage.savedEncounters.includes(tasks[i][3])){
                    
                        containerTableCell.setAttribute("class", "tasks-table-cell-grayed");

                    }else{

                        containerTableCell.setAttribute("class", "tasks-table-cell");

                    }
                    
                }else{
                  containerTableCell.setAttribute("class", "tasks-table-cell");
                }

                if (sessionStorage.programID === "21" && consent === "NO"){ //Disable all VMMC tasks if consent is No
                    
                        containerTableCell.setAttribute("class", "tasks-table-cell-grayed");

                }

                if (sessionStorage.programID === "21" && circumcision_consent === "NO"){ //Disable all VMMC tasks if circumcision consent is No

                        containerTableCell.setAttribute("class", "tasks-table-cell-grayed");

                }

                containerTableCell.setAttribute("style", "display: table-cell;");
                if (tasks[i][0].match(/National Health ID/i)) {
                    containerTableCell.setAttribute("onmousedown", "printNPID();");
                } else if (tasks[i][0].match(/Filing Number \(Print\)/i)) {
                    containerTableCell.setAttribute("onmousedown", "printFilingNumber();");
                } else if (tasks[i][0].match(/Visit Summary/i)) {
                    containerTableCell.setAttribute("onmousedown", "printVisitSummary();");
                } else if (tasks[i][0].match(/Transfer Out/i)) {
                    containerTableCell.setAttribute("onmousedown", "printTransferOut();");
                }else if (tasks[i][0].match(/Demographics \(Print\)/i)) {
                    containerTableCell.setAttribute("onmousedown", "printDemographics();");
                } else if (tasks[i][0].match(/Lab Results \(Print\)/i)) {
                    containerTableCell.setAttribute("onmousedown", "printLabResults();");
                }else if (tasks[i][0].match(/Patient History \(Print\)/i)) {
                    containerTableCell.setAttribute("onmousedown", "printPatientHistory();");
                }else if (tasks[i][0].match(/TB Number \(Print\)/i)) {
                    containerTableCell.setAttribute("onmousedown", "printTBNumber();");
                }else if (tasks[i][0].match(/Lab Order Summary \(Print\)/i)) {
                    containerTableCell.setAttribute("onmousedown", "rePrintLabOrderSummary();");
                }else {
                    containerTableCell.setAttribute("onmousedown", "document.location='" + tasks[i][2] + "'");
                }

                var infoTable = document.createElement("table");
                infoTable.setAttribute("class", "info-table");
                infoTable.setAttribute("style", "width: 100%; padding: 8px; color: black;");

                var tr = document.createElement("tr");
                infoTable.appendChild(tr);

                var td = document.createElement("td");
                td.setAttribute("style", "width: 15%;");
                var img = document.createElement("img");
                img.setAttribute("src", tasks[i][1]);
                img.setAttribute("style", "width: 50px; height: 50px;");
                td.appendChild(img);
                tr.appendChild(td);

                td = document.createElement("td");
                td.setAttribute("style", "color: #fff; font-weight: bold; padding-left: 10px; width: 80%; text-align: left;");
                td.setAttribute("id", "task-button-" + (i + 1));
                td.innerHTML = tasks[i][0].toUpperCase();
                tr.appendChild(td);

                containerTableCell.appendChild(infoTable);
                containerTableCell.setAttribute('data-name', tasks[i][0].toUpperCase());

                containerTableRow.appendChild(containerTableCell);

                count++;
                }
            }


            if(sessionStorage.programID == '21') {

            var url = `${apiProtocol}://${apiURL}:${apiPort}/api/v1/encounters?patient_id=${sessionStorage.patientID}&${sessionStorage.programID}&paginate=false`;
            var headers = {
              'Authorization': sessionStorage.authorization,
              'Content-Type': 'application/json'
            };
            fetch(url, {
              'headers': headers
            }).then(function (response) {
              response.json().then(function (encounters) {
                encounters.forEach(function (encounter) {
                  var type = encounter.type.name;
                  var taskButton = document.querySelector("[data-name='".concat(type, "']"));
                  if (!taskButton) return;
                  taskButton.setAttribute('class', 'tasks-table-cell-grayed');
                });
              });
            });

          }


        }
    };
    xhttp1.open("GET", use_filling_number_property_url, true);
    xhttp1.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    xhttp1.setRequestHeader('Content-type', "application/json");
    xhttp1.send();

}
function checkConsent() {
    var url = apiProtocol + "://" + apiURL + ":" + apiPort;
    url += "/api/v1/observations?person_id=" + sessionStorage.patientID + "&concept_id=9420";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
        var obj = JSON.parse(this.responseText);
        if (obj.length > 0) {
          var consent_vc = (obj[0].value_coded);
          consent = (parseInt(consent_vc) == 1065 ? "YES" : "NO");
          return(consent);
        }
      }
    };
    xhttp.open("GET", url, false);
    xhttp.setRequestHeader(
      "Authorization",
      sessionStorage.getItem("authorization")
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    // console.log(fff); 
    // return "hello";

}

function circumcisionConsent() {

    var url = apiProtocol + "://" + apiURL + ":" + apiPort;
    url += "/api/v1/observations?person_id=" + sessionStorage.patientID + "&concept_id=9644";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
        var obj = JSON.parse(this.responseText);
        if (obj.length > 0) {
          var circumcision_vc = (obj[0].value_coded);
          circumcision_consent = (parseInt(circumcision_vc) == 1065 ? "YES" : "NO");
          return(circumcision_consent);
        }
      }
    };
    xhttp.open("GET", url, false);
    xhttp.setRequestHeader(
      "Authorization",
      sessionStorage.getItem("authorization")
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

}

function changeModule(url) {
    var applicationImage = sessionStorage.getItem("applicationImage");
    var applicationName = sessionStorage.getItem("applicationName");
    if (applicationName != null && applicationImage != null) {
        $("#application-icon").attr("src", sessionStorage.getItem("applicationImage"));
        $("#registerButton").css("visibility", "visible");
        if (sessionStorage.getItem("displayBarcode") == false || sessionStorage.getItem("displayBarcode") == null) {
            // showBarcodeDiv();

        } else {

        }

        $("#myModal").modal("hide");
        $("#application-name").text(sessionStorage.getItem("applicationName"));
    } else {
    }
}

function changeActivities(url) {
    var activitiesImage = sessionStorage.getItem("activitiesImage");
    var activitiesName = sessionStorage.getItem("activitiesName");
    if (activitiesName != null && activitiesImage != null) {
        $("#activities-icon").attr("src", sessionStorage.getItem("activitiesImage"));
        if (sessionStorage.getItem("displayBarcode") == false || sessionStorage.getItem("displayBarcode") == null) {
            // showBarcodeDiv();

        } else {

        }

        $("#myModal").modal("hide");
        $("#activities-name").text(sessionStorage.getItem("activitiesName"));
    } else {
    }
}

function changeTasks(url) {
    var tasksImage = sessionStorage.getItem("tasksImage");
    var encounter_name = sessionStorage.getItem("encounter_name");
    if (encounter_name != null && tasksImage != null) {
        $("tasks-icon").attr("src", sessionStorage.getItem("tasksImage"));
        if (sessionStorage.getItem("displayBarcode") == false || sessionStorage.getItem("displayBarcode") == null) {
            // showBarcodeDiv();

        } else {

        }
        $("myModal").modal("hide");
        $("#tasks-name").text(sessionStorage.getItem("encounter_name"));
    } else {
    }
}

function showBarcodeDiv() {
    sessionStorage.setItem("displayBarcode", true)
    $("#details").width("47.91%");
    $("#header").append($('#barcode').html());
}

function redirect(id) {
    var dvTable = document.getElementById("generic_tabs");
    dvTable.innerHTML = null;
    dvTable.style = "width: 97% !important;";
    
    if (id === "create-user") {
        window.location.href = './views/users/new.html';
    }
    if (id === "view-user") {
        window.location.href = './views/users/view_users.html';
    }
    if (id === "view-change-date") {
        window.location.href = './views/change_session_date.html';
    }if (id === "print-location") {
        window.location.href = '/views/print_location.html';
    }if (id === "enable-portal") {
        window.location.href = '/views/portal.html';
    }if (id === "view-duplicates") {
        window.location.href = '/views/search_identifiers.html';
    }if (id === "change-password") {
        window.location.href = '/views/users/change_password.html?user_id='+sessionStorage.userID;
    }
    if (id === "view-sys-settings") {
      var obj = document.createElement("object");
      obj.setAttribute("data", "/apps/" + sessionStorage.applicationFolder + "/views/system_settings.html");
      obj.setAttribute("type", "text/html");
      obj.setAttribute("style", "width: 97%; height: 430px; text-align: left;");
      dvTable.appendChild(obj);
    }
    //if it is a military site
    if (id === "military-site") {
        window.location.href = "/views/military_site.html";
    } 
    if (id === "malawi-national-id") {
        window.location.href = "/views/malawi_nationalID.html";
    }
    //view-drug-management-settings
    if (id === "view-drug-management-settings") {
        var obj = document.createElement("object");
        obj.setAttribute("data", "/apps/" + sessionStorage.applicationFolder + "/views/drug_management_settings.html");
        obj.setAttribute("type", "text/html");
        obj.setAttribute("style", "width: 97%; height: 430px; text-align: left;");
        dvTable.appendChild(obj);
    }
    
    if (id === "view-data-management-settings") {
        var obj = document.createElement("object");
        obj.setAttribute("data", "/apps/" + sessionStorage.applicationFolder + "/views/data_management_settings.html");
        obj.setAttribute("type", "text/html");
        obj.setAttribute("style", "width: 97%; height: 430px; text-align: left;");
        dvTable.appendChild(obj);
    }
    
    if (id === "report-1") {
    }
    if (id === "registers") {
        window.location.href = './././apps/HTS/views/encounters/registers.html';
    }
    
    if (id === "userStats") {
        window.location.href = './././apps/HTS/views/encounters/user_stats.html';
    }
 
    if (id === "cleaner") {
        // window.location.href = './views/reports/data_inconsistent/cleaner.html';
        var dvTable = document.getElementById("generic_tabs");
        dvTable.innerHTML = null;
        dvTable.style = "width: 97% !important;";
  
        var obj = document.createElement("object");
        obj.setAttribute("data", "/apps/ART/views/reports/data_inconsistent/cleaner.html");
        obj.setAttribute("type","text/html");
        obj.setAttribute("style","width: 97%; height: 430px; text-align: left;");
        dvTable.appendChild(obj);
    }
}

function activitiesRedirect(id) {
    if (id === "demographics-edit") {
        window.location.href = './views/patient/activities.html';
    }
    if (id === "national-id") {
    }
    if (id === "visit-summary") {
    }
    if (id === "demographics-print") {
    }
}

function registerPatientRedirect() {
    window.location.href = '/views/patient/search.html';
}

function gotoFindByMenu() {
    window.location.href = '/views/patient/find_by_menu.html';
}

function updateOutcomeRedirect() {
    window.location.href = '/views/outcome.html';
}

function registerGuardianRedirect() {
    window.location.href = '/views/patient/relationships/search.html?patient_id=' + sessionStorage.backupPatientID;
}

// overview tab work in progress
function overview() {
    var table = document.createElement("TABLE");
    table.className = "table table-bordered";
    var row = table.insertRow(-1);
    var total_columns = 4;
    var total_rows = 7;
    var table_header = ["", "Today", "This Month", "This Year"]

    for (var x = 0; x < total_columns; x++) {
        var header = document.createElement("TH");
        header.innerHTML = table_header[x];
        row.appendChild(header);
        for (var i = 0; i < total_rows; i++) {
            var cell = row.insertCell(-1);
            // cell.className = 'overview-tab';
            if (x === 0 && i === 1) cell.innerHTML = "Total Registered";
            if (x === 1 && i === 2) cell.innerHTML = '&nbsp';
            if (x === 2 && i === 3) cell.innerHTML = '&nbsp';
            if (x === 3 && i === 4) cell.innerHTML = '&nbsp';
            if (x === 4 && i === 5) {
                cell.setAttribute('span', 3);
                cell.innerHTML = "Current Patient Statistics";

            }
        }
    }

    var divtable = document.getElementById("generic_tabs");
    divtable.appendChild(table);
}

function GenerateTable() {
    var dvTable = document.getElementById("generic_tabs");
    dvTable.innerHTML = "";


    //<object data="framed.html" type="text/html"><p>This is the fallback code!</p></object>
    var obj = document.createElement("object");
    obj.setAttribute("data", "/apps/" + sessionStorage.applicationFolder + "/views/overview.html");
    obj.setAttribute("type", "text/html");
    obj.setAttribute("style", "width: 99%; height: 430px; text-align: left;");

    dvTable.style = "height: 430px; width: 97% !important; margin: 15px;";
    dvTable.appendChild(obj);
}

// overview tab work in progress
function showOptions(e) {
    // Get all buttons with class="btn" inside the container
    var btns = document.getElementsByClassName("overview-btns");

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
        btns[i].setAttribute('class', 'btn btn-info overview-btns');
        if (btns[i].innerHTML == e.innerHTML)
            btns[i].setAttribute('class', 'btn btn-info overview-btns active-btn');
    }

}

function showActivities(a) {
    // var btn = document.getElementsByClassName("activities-btns");

    // // Loop through the buttons and add the active class to the current/clicked button
    // for (var x = 0; x < btn.length; x++) {
    //     btn[x].setAttribute('class', 'btn btn-info activities-btns');
    // }
    $.getJSON("/apps/" + sessionStorage.applicationName + "/application.json")
        .done(function (data, status) {
            buildPrintOutandOthers(data);
        })
        .fail(function () {
            console.log("application.json is missing from /apps/ART folder");
        });
}

function buildPrintOutandOthers(data) {
    var j = Object.keys(data.others);
    var i = 0;
    var tasks = [];
    
    j.forEach(function (j) {
        var values = data.others[j]
        var name = values.activitiesName;
        var icon = values.activitiesIcon;
        var url = values.url;
        url = (url == undefined ? '#' : url);
        if(sessionStorage.filingNumnerAvailable == "false"){
          if(name != 'Filing Number (Print)' && name != 'Archive client'){
            tasks.push([name, icon, url]);
          }
        }else{
          if(name != 'Assign filing number'){
            tasks.push([name, icon, url]);
          }
        }
    });

    var container = document.getElementById("activities-body");

    buildDashboardButtons(tasks, container);
}

function showTasks(t) {
    // var btn = document.getElementsByClassName("tasks-btns");

    // for (var x = 0; x < btn.length; x++) {
    //     btn[x].setAttribute('class', 'btn btn-info tasks-btns');
    // }
}

function loadTabContent(id) {
    if (id === "admin") {
        document.getElementById("generic_tabs").innerHTML = admin_tab_content;
    } else if (id === "report") {
        GetApplicationReports();
    } else {
        GenerateTable();
    }

    
}

// function loadActivitiesContent(id) {
//     if (id === "activities") {
//         document.getElementById("generic_tabs").innerHTML = activities_tab_content;
//     }
// }

function signIn() {
    checkDate();
    // checkCredentials(sessionStorage.getItem("username"), sessionStorage.getItem("userPassword"));
}
function checkDate(){
            var url = 'http://' + apiURL + ':' + apiPort + '/api/v1/current_time';
            var req = new XMLHttpRequest();
            req.onreadystatechange = function(){

                if (this.readyState == 4) {
                    if (this.status == 200) {
                        var results = JSON.parse(this.responseText);
                            var sessionDate = moment(results.date).format('YYYY-MM-DD');
                            var date = moment(results.date)
                            var now = moment().format('YYYY-MM-DD');

                            if (now !== sessionDate) {
                              // date is past
                              dateAlert();
                              console.log('device date is not the same as server date')
                            } else {
                              // date is future
                              checkCredentials(sessionStorage.getItem("username"), sessionStorage.getItem("userPassword"));
                              console.log('device date is the same as server date')
                            }
                    }
                }
            };
            try {
                req.open('GET', url, true);
                req.setRequestHeader('Authorization',sessionStorage.getItem('authorization'));
                req.send(null);
            } catch (e) {
            }
}

function checkCredentials(username, password) {
    var http = new XMLHttpRequest();
    var url = apiProtocol + '://' + apiURL + ':' + apiPort + '/api/v1/auth/login';
    var params = JSON.stringify({
        username: username,
        password: password
    });
    http.open('POST', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function () { //Call a function when the state changes.
        if (http.readyState == 4) {
            if (http.status == 200) {
                var v = JSON.parse(http.responseText);

                var user_roles = [];
                var roles = v['authorization'].user.roles;
                for(var i = 0 ; i < roles.length; i++){
                  user_roles.push(roles[i].role);
                }
               
                sessionStorage.setItem("authorization", v.authorization.token);
                sessionStorage.setItem("userRoles", user_roles.join(','));
                sessionStorage.setItem("userID", v.authorization.user.user_id);
                sessionStorage.removeItem("userPassword");
                window.location.href = "location.html";
                // sessionStorage.removeItem("userPassword");
                // window.location.href = 'show.html?user_id=' + v.user.user_id;
            } else if (http.status == 401) {
                wrongPasswordUsernameAlert();
            } else if (http.status == 0) {
                // await sleep(2000);
                // showMessage('No connection to EMR API',null,10000000000);
                alert('no connection to EMR API');
                window.location = "/views/config.html";
            } else {
                try {
                    showMessage('error: ' + http.status);
                } catch (s) {
                    alert('error: ' + http.status);
                }
            }
        }
    }
    http.setRequestHeader('Authorization', sessionStorage.getItem('authorization'));
    http.send(params);
}

function sleep(ms) {
    // return new Promise(resolve => setTimeout(resolve, ms));
}

function getAPI() {

    var url = '/config/config.json';
    var req = new XMLHttpRequest();
    if (localStorage.useLocalStorage) {
        sessionStorage.setItem("apiURL", localStorage.getItem("ip-address"));
        apiURL = localStorage.getItem("ip-address");
        sessionStorage.setItem("apiPort", localStorage.port);
        apiPort = localStorage.getItem("port");
        sessionStorage.setItem("apiProtocol", "http");
        apiProtocol = "http";
    } else {
        req.onreadystatechange = function () {

            if (this.readyState == 4) {

                if (this.status == 200) {
                    try {
                        var data = JSON.parse(this.responseText);
                        sessionStorage.setItem("apiURL", data.apiURL);
                        apiURL = data.apiURL;
                        sessionStorage.setItem("apiPort", data.apiPort);
                        apiPort = data.apiPort;
                        sessionStorage.setItem("apiProtocol", data.apiProtocol);
                        apiProtocol = data.apiProtocol;
                    } catch (e) {
                        console.log("invalid json formatting");
                    }

                } else if (this.status == 404) {
                    console.log("config.json is missing from the /config folder");
                } else {
                    console.log("error " + this.status);
                }
            }
        };
        try {
            req.open('GET', url, true);
            req.send(null);
        } catch (e) {
            console.log(e);
        }
    }


}

function GetApplicationReports() {
    var dvTable = document.getElementById("generic_tabs");
    dvTable.innerHTML = null;
    dvTable.style = "width: 97% !important;";

    var obj = document.createElement("object");
    obj.setAttribute("data", "/apps/" + sessionStorage.applicationFolder + "/views/reports.html");
    obj.setAttribute("type", "text/html");
    obj.setAttribute("style", "width: 97%; height: 430px; text-align: left;");

    dvTable.appendChild(obj);
}

function print_and_redirect(url_forward, url_back) {
    document.location = url_forward;
}

function finishRedirect(url) {
    document.location = url;
}

function getDDEStatus(){
    var property_name = "dde_enabled";
    var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/global_properties?property=" + property_name;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 ) {
            if(this.status == 201 || this.status == 200) {
                try{
                    site_prefix = JSON.parse(this.responseText)["dde_enabled"];
                    if (site_prefix === "true") {
                        sessionStorage.dde_enabled = true;
                    }else {
                        sessionStorage.dde_enabled = false;
                    } 
                } catch(e){
                        sessionStorage.dde_enabled = false;
                }
            }else if(this.status == 404) {
                sessionStorage.dde_enabled = false;
            } 
            
        }
    };

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send();
}
function getPortalStatus(){
    var property_name = "portal.enabled";
    var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/global_properties?property=" + property_name;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 ) {
            if(this.status == 201 || this.status == 200) {
                try{
                    var portalStatus = JSON.parse(this.responseText)["portal.enabled"];
                    sessionStorage.portal_enabled = portalStatus;
                    if (portalStatus === "true") {
                        getPortalLocation();
                    } 
                } catch(e){
                        sessionStorage.portal_enabled = false;
                }
            }else if(this.status == 404) {
                sessionStorage.portal_enabled = false;
            } 
            
        }
    };

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send();
}

function getPortalLocation(){
    var property_name = "portal.properties";
    var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/global_properties?property=" + property_name;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 ) {
            if(this.status == 201 || this.status == 200) {
                try{
                    var portalLocation = JSON.parse(this.responseText)["portal.properties"];
                    sessionStorage.portal_location = portalLocation;
                     
                } catch(e){
                        sessionStorage.portal_enabled = false;
                }
            }else if(this.status == 404) {
                sessionStorage.portal_enabled = false;
            } 
            
        }
    };

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send();
}

function getSavedEncounters() {

    var url = sessionStorage.apiProtocol + '://'+apiURL+':'+apiPort+'/api/v1';
    url += '/programs/'+sessionStorage.programID+'/patients/'+sessionStorage.patientID+'/saved_encounters';
    url += '?date='+sessionStorage.sessionDate;
  
    var req = new XMLHttpRequest();
  
    //var params = JSON.stringify({date: sessionStorage.sessionDate});
  
    req.onreadystatechange = function(){
  
      if (this.readyState == 4) {
  
        if (this.status == 200) {
  
          var results = JSON.parse(this.responseText);
  
          sessionStorage.setItem("savedEncounters", results);
  
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


var system_version_api;
var system_version_core;
var system_version_module;

function fetchVersion() {
  var url = sessionStorage.apiProtocol + "://" + apiURL+ ":" + apiPort + "/api/v1/version";

  var req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if (this.readyState == 4) {
      if (this.status == 200) {
        var results = JSON.parse(this.responseText);
        system_version_api = results['System version'];
        sessionStorage.apiVersion = system_version_api;
        fetchCoreVersion();
      }
    }
  };

  try {
    req.open('GET', url, true);
    req.setRequestHeader('Authorization',sessionStorage.getItem('authorization'));
    req.send();
  } catch (e) {
    //console.log(e);
  }

}

function fetchCoreVersion() {
  $.get("HEAD", function(data) {
   system_version_core = data;
   sessionStorage.coreVersion = system_version_core;
   fetchModuleVersion();
  }, 'text').fail(function () {

    system_version_core = "development";
    console.log("HEAD file missing in BHT-Core folder");
  });
}

function fetchModuleVersion() {
  $.get("apps/" + sessionStorage.applicationName + "/HEAD", function(data) {
   system_version_module = data;
   if(system_version_module != undefined)
    $("#module-version").html(system_version_module);  
    sessionStorage[sessionStorage.applicationName + "Version"] = system_version_module;    

  }, 'text').fail(function () {
    console.log("HEAD is missing from /apps/" + sessionStorage.applicationName + " folder");
  });
}

function showVersions() {
  var innerHTML = "<div style='padding: 15px; font-size: 27px;'>";
  innerHTML += "<p style='font-size: 20px;'>Selected module versions</p>";
  innerHTML += "<hr style='margin: 0px 5px 0px 5px; height: 1px; background-color: black;' />"
  innerHTML += "<p><b>BHT-EMR-API</b>&nbsp;: ";
  innerHTML += "<span style='color: green;'>" + system_version_api + "<span></p>";
  innerHTML += "<p><b>BHT-Core</b>&nbsp;: ";
  innerHTML += "<span style='color: green;'>" + system_version_core + "<span></p>";
  innerHTML += "<p><b>" + sessionStorage.applicationName + "</b>&nbsp;: ";
  innerHTML += "<span style='color: green;'>" + system_version_module + "<span></p></div>";
  $("#generic_tabs").html(innerHTML);
}

function enterBabckupPath() {
  document.location = "views/backup_path.html";
}

function showBabckups() {
  document.location = "/views/database_backups.html";
}

function systemUsage() {
  document.location = "/views/system_usage_timelines.html";
}

fetchVersion();
