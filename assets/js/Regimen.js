/**
 * Immediately executing function that creates a Regimen js revealing module
 * 
 * @return {object}
 */
const Regimen = function () {
  /** @type {string} */
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`

  /** @type {object} */
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  /** @type {object} */
  let regimen = {}

  /**
   * Function to initialize a Regimen
   * 
   * @param {object} data
   * 
   * @return {undefined}
  */
  function init (data = {}) {
    regimen = data
  }

  /**
   * Function that queries the EMR-API for recommended patient regimens
   * 
   * @param {object} params
   * 
   * @return {Promise}
   */
  function getApplicableRegimens (params = {}) {
    return fetch (
      `${apiRoot}/programs/${params.programId}/regimens?patient_id=${params.patientId}`,
      {
        method: 'GET',
        headers: { 'Authorization': sessionStorage.authorization }
      })
  }

  /**
   * Function that asks the EMR-API for all Tuberculosis drug ingredients
   * 
   * @param {Number} programId
   * @param {Number} patientId
   * @return {Promise}
   */
  function getCustomIngredients (programId, patientId) {
    return fetch(
      `${apiRoot}/programs/${programId}/custom_tb_ingredients?patient_id=${patientId}`, {
        method: 'GET',
        headers: { 'Authorization': sessionStorage.authorization }
      }
    )
  }

  return {
    getApplicableRegimens,
    getCustomIngredients
  }
}()