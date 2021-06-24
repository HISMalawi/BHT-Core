function showPrompt () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var prompt = document.createElement('div');
  prompt.setAttribute('id', 'dankPrompt');
  prompt.style = 'background-color: white;font-size: 1.5em;font-family: Ubuntu;position: fixed;width: 50%;height: auto;top: 25%;left: 25%;padding: 2%;' + 'border-radius: 4px;z-index: 9000;';

  var promptMessage = document.createElement('h3');
  promptMessage.innerText = options.message;
  promptMessage.innerHTML += '<hr />';
  prompt.appendChild(promptMessage);

  prompt.appendChild(createToolkitButton({
    text: 'Yes',
    listeners: [{
      event: 'click',
      handler: options.yesCallback
    }],
    style: 'color: white; float: left'
  }));

  prompt.appendChild(createToolkitButton({
    text: 'No',
    listeners: [{
      event: 'click',
      handler: options.noCallback
    }],
    style: 'color: white; float: right'
  }));

  document.body.appendChild(createScreenOverlay({
    color: 'black',
    opacity: .8
  }));
  document.body.appendChild(prompt);
}

function createScreenOverlay() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var overlay = document.createElement('div');
  overlay.setAttribute('id', 'dankOverlay');
  overlay.style = 'background-color: ' + options.color + ';\nopacity: ' + options.opacity + ';position: fixed;width: 100%;height: 100%;top: 0;bottom: 0;left: 0;right: 0;z-index: 9000;';
  return overlay;
}

function removePrompt() {
  document.body.removeChild(document.getElementById('dankOverlay'));
  document.body.removeChild(document.getElementById('dankPrompt'));
}

/**
 * Function that creates a touchscreen toolkit button
 * 
 * @param {object} options - Contains name; ?attributes, ?listeners and ?styles
 * 
 * @return {object} - An HTMLButtonElement object
 */
function createToolkitButton() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var button = document.createElement('button');
  button.innerHTML += '<span>' + options.text + '</span>';

  if (options.attributes) {
    options.attributes.forEach(function (attribute) {
      button.setAttribute(attribute.name, attribute.value);
    });
  }

  if (options.listeners) {
    options.listeners.forEach(function (listener) {
      button.addEventListener(listener.event, listener.handler);
    });
  }

  if (options.style) {
    button.style = options.style;
  }

  return button;
}

/**
 * Function that depends on tt_toolkit to display error messages to the user
 * 
 * @param {string|object} error
 * 
 * @return {undefined}
 */
function logErrorAndNotify (error) {
  console.error(error)
  showMessage('Oops! An error has occurred.')
}

/**
 * Function that depends on jQuery to hide elements in the DOM
 * 
 * @param {string} selector
 * 
 * @return {undefined}
 */
function hide (selector = '') {
  jQuery(selector).hide()
}

/**
 * Function that depends on jQuery to show elements in the DOM
 * 
 * @param {string} selector
 * 
 * @return {undefined}
 */
function show (selector = '') {
  jQuery(selector).show()
}

/**
 * Function to hide an element given an id in the DOM
 * 
 * @param {string} id
 * 
 * @return {undefined}
 */
function hideElementById (id = '') {
  document.getElementById(id).style.display = 'none'
}

/**
 * Function to wait for a given delay and go to the patient dashboard
 * 
 * @param {number} delay
 * 
 * @return {undefined}
 */
function delayAndGoToPatientDashboard (delay) {
  setTimeout(() => {
    document.location = `/views/patient_dashboard.html?patient_id=${sessionStorage.patientID}`
  }, delay)
}

/**
 * Function to save a key-value pair in sessionStorage
 * 
 * @param {string} key 
 * @param {string|number|boolean|object} data
 * 
 * @return {undefined}
 */
function saveInSessionStorage (key = '', data) {
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  sessionStorage.setItem(key, data)
}

/**
 * Function to remove items from sessionStorage given a key
 * 
 * @param {string} key
 * 
 * @return {undefined} 
 */
function removeFromSessionStorage (key = '') {
  sessionStorage.removeItem(key)
}