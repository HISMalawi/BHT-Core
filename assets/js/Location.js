/**
 * Immediately executing function that creates a revealing Location module
 * 
 * @return {object}
 */
{/* <script src="/assets/js/core.js "></script> */}
const Location = function () {
    /** @type {string} */
    const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`
  
    /** @type {object} */
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.authorization
    }
  
    /** @type {object} */
    let location = {}
  
    /**
     * Function to initialize an Location
     * 
     * @param {object} data
     * 
     * @return {undefined}
     */
    function init (data = {}) {
        location = data
    }
  
    /**
     * Function to look up an location
     * 
     * @param {String} queryString
     * 
     * @return {Promise}
     */
    function name(id) {
        return fetch (`${apiRoot}/locations/${id}`, {
            method: 'GET',
            headers: { Authorization: sessionStorage.authorization }
        })
    }

    function id() {
        return fetch (`${apiRoot}/global_properties?property=current_health_center_id`, {
            method: 'GET',
            headers: { Authorization: sessionStorage.authorization }
        })
    }
  
    return {
      name,
      id
    }
  }()