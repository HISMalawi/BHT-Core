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
                VLdates.push(new Date(moment(test_values[0].date).format('YYYY-MM-DD')));
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

            var tdate = moment(orders[x].date_ordered).format('DD/MMM/YYYY')
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
        let value_modifier = results[i].value_indicator ? results[i].value_modifier : '=';

        let result_date = results[i].date ? results[i].date : null;

        if(test_name.match(/Viral Load/i)){
          if(value_modifier.match(/>|</)){
            value_modifier = value.replace('<', '&lt;');
            value_modifier = value.replace('>', '&gt;');
          }
          ((validateVL(`${value_modifier}${result_value}`) === "low" ? vl_alert_level = "" : vl_alert_level = " ( HIGH )"));
          parameters.push(test_name + ": " + result_value + vl_alert_level);
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

showOrders();

function validateVL(results) {
    if(results.match(/=/)){
      var res = parseFloat(results.replace('=',''));
      if(res >= 1000) 
        return 'high';

    }else if(results.match(/>/)){
      var res = parseFloat(results.replace('>',''));
      if(res >= 1000) 
        return 'high';

    }else if(results.match(/</)){
      var res = parseFloat(results.replace('<',''));
      if(res > 1000) 
        return 'high';

    }
    
    return 'low'
}

function alertHighVL() {
  if(latestVLresultDate != undefined) {
    var result = vlParameters[latestVLresultDate];
    var resultValidated = validateVL(result);
    if(resultValidated == 'high')
      $("#confirm-VL").modal();
      

  }
}
