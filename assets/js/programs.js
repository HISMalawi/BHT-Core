

function setUpProgramPage() {
  var f = document.getElementById('inputFrame' + tstCurrentPage);
  f.style = 'width: 96%; height: 88%;';

  var div = document.createElement('div');
  div.setAttribute('class','main-table');
  f.appendChild(div);

  var row = document.createElement('div');
  row.setAttribute('class','table-row');
  div.appendChild(row);

  var cells = ['left','right'];
  for(var i = 0 ; i < cells.length ; i++){
    var cell = document.createElement('div');
    cell.setAttribute('class','table-cell');
    cell.setAttribute('id','cell-' + cells[i]);
    row.appendChild(cell);
  }
 
  fetchPrograms(); 
  var nextButton = document.getElementById('nextButton');
  nextButton.setAttribute('onmousedown', 'enroll();');
  nextButton.innerHTML = '<span>Enroll</span>';
}

var programsHash = {};

function addPrograms(programs) {
  var container = document.getElementById('cell-left');
  var table = document.createElement('table');
  table.setAttribute('class','program-tables');
  container.appendChild(table);

  for(var i = 0 ; i < programs.length ; i++){
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.setAttribute('class','program-names');
    td.setAttribute('id', programs[i].program.program_id);
    td.setAttribute('program-name', programs[i].program.name);
    td.setAttribute('onclick','showStates(this);');
    td.innerHTML = programs[i].program.name
    tr.appendChild(td);

    if(programsHash[programs[i].program.name] == undefined){
      programsHash[programs[i].program.name] = [];
    }

    programsHash[programs[i].program.name].push(programs[i].patient_states);
    table.appendChild(tr);
  }
}

function showStates(program){
  var container = document.getElementById('cell-right');
  container.innerHTML = null;
  var table = document.createElement('table');
  table.setAttribute('class','program-tables');
  container.appendChild(table);

  var program_states = programsHash[program.getAttribute('program-name')];
  var programHasStates = false

  setSelectedProgram(program.getAttribute('id'))

  for(var i = 0 ; i < program_states.length ; i++){
    if (program_states[i].length < 1) {
      continue;
    } else {
      programHasStates = true

      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.setAttribute('class','program-states');
      tr.appendChild(td);
      table.appendChild(tr);

      renderStates(td, program_states[i]);
    }
  }

  if (!programHasStates) {
    var tableRow = document.createElement('tr')
    tableRow.style.textAlign = 'center'
    tableRow.style.fontSize = '1.4em'
    var message = document.createElement('p')
    message.innerText = 'This program has no states so far.'
    tableRow.appendChild(message)
    table.appendChild(tableRow)
  }

  var btns = document.getElementsByClassName('program-names');
  for(var i = 0 ; i < btns.length ; i++){
    btns[i].style = 'background-color: "";';
  }

  program.style = 'background-color: lightblue;';

  //Add program update state button
  if(document.getElementById('update-state') == undefined) {
    var btn = document.createElement('button');
  }else{
    var btn = document.getElementById('update-state');
  }
  
  btn.setAttribute('id','update-state');
  btn.setAttribute('class','button blue navButton');
  btn.innerHTML = '<span>Update state</span>';
  btn.setAttribute('onmousedown','updateState(' + program.id + ');');

  var root = document.getElementById('buttons');
  root.appendChild(btn);
}

function updateState(program_id) {
  document.location = '/views/patient/update_state.html?program_id=' + program_id;
}

function renderStates (container, states = []) {
  const table = createTable(
    [
      { name: 'class', value: 'states'},
      { name: 'cellpadding', value: '10px'}
    ],
    'padding: 4%'
  )

  const headerRow = createHeaderRow(['State', 'Start Date', 'End Date', 'Actions'])
  table.appendChild(headerRow)

  states.forEach((state, idx) => {
    const style = idx % 2 === 0 ? 'background-color: grey; color: white' : ''
    const selector = `state${idx}`
    table.appendChild(createStateRow(state, style, [{ name: 'id', value: selector}]), selector)
  })

  container.appendChild(table)
}

function createTable (attributes = [], style = '') {
  const table = document.createElement('table')
  table.style = style

  if (attributes.length) {
    attributes.forEach((attribute) => {
      table.setAttribute(attribute.name, attribute.value)
    })
  }

  return table
}

function createHeaderRow (headers = []) {
  const headerRow = document.createElement('thead')
  headers.forEach((header) => {
    headerRow.appendChild(createTableHeader(header))
  })
  return headerRow
}

function createStateRow (state = {}, style = '', attributes = []) {
  const stateRow = document.createElement('tr')
  stateRow.style = style

  stateRow.appendChild(createTableData(stateName(state.name)))
  stateRow.appendChild(createTableData(moment(state.start_date).format('DD/MMM/YYYY')))
  stateRow.appendChild(createTableData(
    state.end_date ? moment(state.end_date).format('DD/MMM/YYYY') : 'N/A'
  ))

  const voidln = createTableData()
  voidln.appendChild(createVoidLink({
    patientId: sessionStorage.patientID,
    programId: sessionStorage.selectedProgram,
    stateId: state.patient_state_id
  }))
  stateRow.appendChild(voidln)

  if(state.name === "Patient transferred out") {
    const printTransferOut = createTableData();
    printTransferOut.appendChild(creatTransferLink());
    stateRow.appendChild(printTransferOut);
  }

  if (attributes.length) {
    attributes.forEach((attribute) => {
      stateRow.setAttribute(attribute.name, attribute.value)
    })
  }

  return stateRow
}

function createTableHeader (headerTitle = '') {
  const header = document.createElement('th')
  header.innerText = headerTitle
  return header
}

function createTableData (innerText = '') {
  const tableData = document.createElement('td')
  tableData.innerText = innerText
  return tableData
}

function createLink (innerText = '', listeners = [], style = '') {
  const link = document.createElement('a')
  link.innerText = innerText
  link.style = style

  if (listeners.length) {
    listeners.forEach((listener) => {
      link.addEventListener(listener.event, listener.handler)
    })
  }

  return link
}

function createVoidLink (options = {}) {
  return createLink(
    'Void State',
    [
      {
        event: 'click',
        handler: (event) => {
          var modal = document.getElementById("myModal");
          modal.style.display = "block";
          var btn = document.getElementById("modal-btn-si");
          btn.onclick = function() {
            event.preventDefault()
            State._void({
              stateId: options.stateId,
              programId: options.programId,
              patientId: options.patientId,
              success: (response) => {
                if (response.status === 204) {
                  showMessage('State successfully voided.')
                  setTimeout(() => {
                    location.reload()
                  }, 1000)
                } else {
                  console.error(response)
                  showMessage('There was a problem voiding the state.')
                }
              },
              fail: (error) => {
                console.error(error)
                showMessage('There was a problem voiding the state.')
              }
            })
          }
          
        }
      }
    ],
    'text-align: center; color: blue; font-weight: bold; font-size: 1.1em; text-decoration: underline'
  )
}

function creatTransferLink() {
  return createLink(
      'Print',
      [
        {
          event: 'click',
          handler: (event) => {
            window.location.href = "/views/print/transfer.html";
          }
        }
      ],
      // 'text-align: center; color: blue; font-weight: bold;border: solid 1px black; font-size: 1.1em; text-decoration: underline; border-radius:20%;'
      ' background-color: rgb(119, 136, 187); /* Green */\n' +
      '  border: none;\n' +
      '  border-radius: 20%;\n'+
      '  color: white;\n' +
      '  padding: 16px 32px;\n' +
      '  text-align: center;\n' +
      '  text-decoration: none;\n' +
      '  display: inline-block;\n' +
      '  font-size: 16px;\n' +
      '  margin: 4px 2px;\n' +
      '  -webkit-transition-duration: 0.4s; /* Safari */\n' +
      '  transition-duration: 0.4s;\n' +
      '  cursor: pointer;'
  )
}

function setSelectedProgram (programId) {
  sessionStorage.selectedProgram = programId
}

function stateName(num) {
  if(num == 7){
    return 'On ART';
  }else if(num == 3){
    return 'Died';
  }

  return num
}

function fetchPrograms() {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/patients/";
  url += sessionStorage.patientID + "/programs";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var objs = JSON.parse(this.responseText);
      addPrograms(objs);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}


function selectReason(element) {
  var items = document.getElementsByClassName("list-group-item reason active-reason");
  for (let index = 0; index < items.length; index++) {
      items[index].className = "list-group-item reason";
  }
  if(element != undefined) {
  document.getElementById("modal-btn-si").removeAttribute("disabled");
  element.className = "list-group-item reason active-reason"
  void_reason = element.innerHTML;
  }else {
      document.getElementById("modal-btn-si").setAttribute('disabled', null);
  }
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}