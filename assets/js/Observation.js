/**
 * Immediately executing function that creates a revealing Observation module
 * 
 * @return {object}
 */
const Observation = function () {
  /** @type {string} */
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`

  /** @type {object} */
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  /** @type {object} */
  let observation = {}

  /**
   * Function to initialize an Observation
   * 
   * @param {object} data
   * 
   * @return {undefined}
   */
  function init (data = {}) {
    observation = data
  }

  /**
   * Function that asks the EMR-API to create observations
   * 
   * @param {object} params
   * 
   * @return {Promise}
   */
  function create (params = {}) {
    return fetch (`${apiRoot}/observations`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params)
    })
  }

  /**
   * Function to look up an observation
   * 
   * @param {String} queryString
   * 
   * @return {Promise}
   */
  function find (queryString = '') {
    return fetch (`${apiRoot}/observations?${queryString}`, {
      method: 'GET',
      headers: { Authorization: sessionStorage.authorization }
    })
  }

  return {
    create,
    find
  }
}()