function showOrders() {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += "/programs/1/lab_tests/orders?patient_id=" + sessionStorage.patientID;

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
      var test_name = tests[i].test_type;
      var test_values = tests[i].test_values;
      if(test_name.match(/viral load/i) && test_values.length > 0) {
        VLdates.push(new Date(moment(orders[x].date_ordered).format('YYYY-MM-DD')));
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

}

function addVLorders(order, test) {
  var orders_tbody = document.getElementById('vl-orders');
  var accession_number = order.accession_number;
  var test_name = test.test_type;
  var test_status = test.test_status.toUpperCase();
  var test_values = test.test_values
  var date_ordered = moment(order.date_ordered).format('DD/MMM/YYYY');

  if(test_name.match(/viral load/i) && test_values.length > 0) {
    var r = (formatResults(test_values));
    var div = document.createElement('div');
    div.setAttribute('class','list-group')
    orders_tbody.appendChild(div);

    var a = document.createElement('a');
    var class_test = 'list-group-item d-flex justify-content-between'; 
    class_test += ' align-items-center list-group-item-action ';
    class_test += 'list-group-item- primary list-group-links';
    a.setAttribute('class', class_test);
    a.setAttribute('href','#');
    a.innerHTML = r;
    div.appendChild(a);
    vlCount++;
  }
}

function formatResults(results) {
  var parameters = [];
  for (var i = 0; i < results.length; i++) {
    var indicator = results[i].indicator;
    var value = results[i].value;
    if (indicator == 'result_date') {
        indicator = 'Result date'
        value = "(" + moment(results[i].value).format('DD/MMM/YYYY') + ")";
    }

    parameters.push(indicator + ": " + value);
  }
  return parameters.join('<br />');
}

showOrders();
