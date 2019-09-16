/**
 * Immediately executing func that creates a Dispensation js revealing module
 * @return {object}
 */
const Dispensation = function () {
  /** @type {string} */
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`

  /** @type {object} */
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  /** @type {object} */
  let dispensation = {}

  /**
   * Function to initialize a dispensation
   * 
   * @param {object} data
   * 
   * @return {undefined} 
   */
  function init (data = {}) {
    dispensation = data
  }

  /**
   * Requests the creation of a Dispensation encounter
   * 
   * @param {object} params
   * 
   * @return {Promise} 
   */
  function create (params = {}) {
    return fetch (`${apiRoot}/dispensations`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params)
    })
  }

  /**
   * Function to fetch the patient's most recent dispensation
   * 
   * @param {number} patientId
   * 
   * @return {Array}
   */
  function getLastPatientDispensation (patientId) {
    return fetch (`${apiRoot}/dispensations?patient_id=${patientId}`, {
      method: 'GET',
      headers: { 'Authorization': sessionStorage.authorization }
    })
  }

  return {
    create,
    getLastPatientDispensation
  }
}()