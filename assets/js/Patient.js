/**
 * Immediately executing func that creates a Patient js revealing module
 * @return {object}
 */
const Patient = function () {
  /** @type {string} */
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`

  /** @type {object} */
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  /** @type {object} */
  let patient = {}

  /**
   * Function to initialize a patient
   * 
   * @param {object} data
   * 
   * @return {undefined} 
   */
  function init (data = {}) {
    patient = data
  }

  /**
   * Function to ask the EMR-API for a patient summary
   * 
   * @param {Object} params - Object with programId and patientId
   * 
   * @return {Object}
   */
  function get (params = {}) {
    return fetch(`${apiRoot}/programs/${params.programId}/patients/${params.patientId}`, {
      method: 'GET',
      headers: { 'Authorization': sessionStorage.authorization }
    })
  }

  /**
   * Function to ask the EMR-API for a patient
   * 
   * @param {Number} params
   * 
   * @return {Object}
   */
  function retrieve (patientId) {
    return fetch(`${apiRoot}/patients/${patientId}`, {
      method: 'GET',
      headers: { 'Authorization': sessionStorage.authorization }
    })
  }

  /**
   * Function to ask the EMR-API to create a patient
   * 
   * @param {object} params
   * 
   * @return {Promise} 
   */
  function create (params = {}) {
    return fetch (`${apiRoot}/patients`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params)
    })
  }

  /**
   * Ask EMR-API to create patient identifier
   * 
   * @param {Number} patientId
   * @param {String} identifier
   * @param {Number} identifierType
   * @return {Promise}
   */
  function createIdentifier (patientId, identifier, identifierType) {
    return fetch(`${apiRoot}/patient_identifiers`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ patient_id: patientId, identifier: identifier, identifier_type: identifierType })
    })
  }

  /**
   * Ask the EMR-API if the patient has any lab orders in recent times
   * 
   * @param {Number} patientId
   * @param {Number} programId
   * @param {String} referenceDate
   * @return {Promise}
   */
  function recentLabOrders (patientId, programId, referenceDate) {
    return fetch(`${apiRoot}/patients/${patientId}/recent_lab_orders?program_id=${programId}&reference_date=${referenceDate}`, {
      method: 'GET',
      headers: { 'Authorization': sessionStorage.authorization }
    })
  }

  /**
   * Ask the EMR-API if the patient is due a lab order
   * 
   * @param {Number} patientId
   * @param {Number} programId
   * @return {Promise}
   */
  function isDueLabOrder (patientId, programId) {
    return fetch(`${apiRoot}/programs/${programId}/patients/${patientId}/is_due_lab_order`, {
      method: 'GET',
      headers: { 'Authorization': sessionStorage.authorization }
    })
  }

  return {
    get,
    retrieve,
    create,
    createIdentifier,
    recentLabOrders,
    isDueLabOrder
  }
}()