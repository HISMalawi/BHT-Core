function showOrders() {
    if (sessionStorage.patientID == 'null')
        return;

    var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
    url += "/lab/orders?patient_id=" + sessionStorage.patientID;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
            var obj = JSON.parse(this.responseText);
            updateOrdersTable(obj);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send();
}

var vlCount = 0;

function updateOrdersTable(orders) {
    var VLdates = [];

    for (var x = 0; x < orders.length; x++) {
        var tests = orders[x].tests;

        for (var i = 0; i < tests.length; i++) {
            var test_name = tests[i].name;
            var test_values = tests[i].result ? tests[i].result : [];
            if(test_name.match(/viral load/i) && test_values.length > 0) {
                VLdates.push(moment(test_values[0].date).format('YYYY-MM-DD'));
            }
        }
    }

    VLdates = VLdates.sort().reverse();

    for(var j = 0 ; j < VLdates.length ; j++) {
        if(vlCount == 2)
            break;

        for (var x = 0; x < orders.length; x++) {
            if(vlCount == 2)
                break;

            let tdate;
            if(orders[x].tests[0].result)
                tdate = moment(orders[x].tests[0].result[0].date).format('DD/MMM/YYYY');

            if(tdate !== moment(VLdates[j]).format('DD/MMM/YYYY'))
                continue;

            var tests = orders[x].tests;
            for (var i = 0; i < tests.length; i++) {
                addVLorders(orders[x], tests[i]);
            }
        }


    }

    alertHighVL();
}

function addVLorders(order, test) {
    var orders_tbody = document.getElementById('vl-orders');
    //var accession_number = order.accession_number;
    var test_name = test.name;
    //var test_status = test.test_status.toUpperCase();
    var test_values = test.result ? test.result : [];
    //var date_ordered = moment(order.date_ordered).format('DD/MMM/YYYY');

    if(test_name.match(/viral load/i) && test_values.length > 0) {
        var r = formatResults(test_values);
        var div = document.createElement('div');
        div.setAttribute('class','list-group')
        orders_tbody.appendChild(div);

        var a = document.createElement('a');
        var class_test = 'list-group-item d-flex justify-content-between';
        class_test += ' align-items-center list-group-item-action ';
        class_test += 'list-group-item- primary list-group-links';
        a.setAttribute('class', class_test);
        a.setAttribute('style', "margin: 0px 32px 0px 2px !important;");
        a.setAttribute('href','#');
        a.innerHTML = r;
        /*if (a.innerHTML.match(/HIGH/g)) {
            a.className += " high";

            if(sessionStorage.userRoles.match(/clerk/ig)) {

            }else {
                $("#confirm-VL").modal();
            }
        } */
        div.appendChild(a);
        vlCount++;
    }
}

var vlParameters = {};
var latestVLresultDate;

function formatResults(results) {
    var parameters = [];
    var parametersVL = {result: null, date: null};

    var vl_alert_level = "";
    for (var i = 0; i < results.length; i++) {

        var indicator = results[i].value_indicator;
        var result_value = results[i].value;
        let test_name = results[i].indicator.name;
        let value_modifier = results[i].value_modifier ? results[i].value_modifier : '=';

        let result_date = results[i].date ? results[i].date : null;

        if(test_name.match(/Viral Load/i)){
          if(value_modifier.match(/>|</)){
            value_modifier = value_modifier.replace('<', '&lt;');
            value_modifier = value_modifier.replace('>', '&gt;');
          }
          ((validateVL(`${value_modifier}${result_value}`) === "low" ? vl_alert_level = "" : vl_alert_level = " (<b style='color:red;'>HIGH</b>)"));
          parameters.push(test_name + `: ${value_modifier}` + result_value + vl_alert_level);
          parametersVL.results = `${value_modifier}${result_value}`;
        }
        //if (indicator == 'result_date') {
        if (result_date) {
          indicator = 'Result date'
          parametersVL.date = moment(result_date).format('DD/MMM/YYYY');
          let value = "(" + moment(result_date).format('DD/MMM/YYYY') + ")";
          parameters.push(indicator + ": " + value);
          if(latestVLresultDate == undefined)
            latestVLresultDate = moment(result_date).format('DD/MMM/YYYY');


          if((new Date(moment(result_date).format('YYYY-MM-DD'))) > (new Date(moment(latestVLresultDate).format('YYYY-MM-DD'))))
            latestVLresultDate = moment(result_date).format('DD/MMM/YYYY');
  

        }


    }

    if(parametersVL.date != null){
      vlParameters[parametersVL.date] = parametersVL.results;
    }
    return parameters.join('<br />');
}

function validateVL(results) {
    if(results.match(/=/)){
      var res = parseFloat(results.replace('=',''));
      if(res >= 1000) 
        return 'high';

    }else if(results.match(/>/) || results.match(/&gt;/)){
      let res = results.match(/>/) ? parseFloat(results.replace('>','')) : parseFloat(results.replace('&gt;',''));
      if(res >= 1000) 
        return 'high';

      if(results.replace('>',"").replace("&gt;","").toUpperCase().replace(/\s+/g, '') == 'LDL') 
        return 'high';

    }else if(results.match(/</) || results.match(/&lt;/)){
      let res = results.match(/</) ? parseFloat(results.replace('<','')) : parseFloat(results.replace('&lt;',''));
      if(res > 1000) 
        return 'high';

    }
    
    return 'low'
}

function alertHighVL() {
  if(latestVLresultDate != undefined) {
    var result = vlParameters[latestVLresultDate];
    var resultValidated = validateVL(result);
    if(resultValidated == 'high' && document.URL.match(/confirm/i))
      confirmVLwarning();
      

  }
}

if(document.URL.match(/patient_dashboard/i))
    showOrders();


function confirmVLwarning(){
    var tstMessageBar = document.createElement('div');
    var p = document.createElement('p');
    p.setAttribute('style','text-align: center;font-size: 35px;');
    p.innerHTML = "<p style='color: black;'>Patient has a high viral load,  Please take immediate action!</p>";
    tstMessageBar.appendChild(p);

    /*var noBTN = document.createElement('button');
    noBTN.innerHTML = "<span>No</span>";
    noBTN.setAttribute('class', 'button blue navButton filing-number-btn');
    noBTN.setAttribute('onmousedown','document.location="/";');
    tstMessageBar.appendChild(noBTN);*/

    var yesBTN = document.createElement('button');
    yesBTN.innerHTML = "<span>OK</span>";
    yesBTN.setAttribute('class', 'button red navButton filing-number-btn');
    yesBTN.style = 'right: 140px;'; 
    yesBTN.setAttribute('onmousedown','closeHighVLwarning();');
    yesBTN.setAttribute('style','right: 5px; position: absolute;');
    tstMessageBar.appendChild(yesBTN);
    tstMessageBar.setAttribute('id', 'address-confirmation');

    var cover = document.createElement('div');
    cover.setAttribute('id','address-confirmation-cover');
    var bdy = document.getElementsByTagName('body')[0];
    bdy.appendChild(cover);
    bdy.appendChild(tstMessageBar);
    tstMessageBar.style = 'z-index: 1000;display: inline; height: 30%; width: 50%; left: 25%;top: 10%;';
    cover.style = 'display: inline;';

    let coverPage = document.getElementById('page-cover');
    coverPage.style = 'display: inline;';
}

function closeHighVLwarning(){
   let bdy = document.getElementsByTagName('body')[0];
   let e = document.getElementById('address-confirmation');
   bdy.removeChild(e)

   let coverPage = document.getElementById('page-cover');
   coverPage.style = 'display: none;';
}
