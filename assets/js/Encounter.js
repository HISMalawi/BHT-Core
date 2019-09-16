/**
 * Immediately executing function that creates a revealing Encounter js module
 * 
 * @return {object}
 */
const Encounter = function () {
  /** @type {string} */
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`

  /** @type {object} */
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  /** @type {object} */
  let encounter = {}

  /**
   * Function that initializes as an encounter
   * 
   * @param {object} data
   * 
   * @return {undefined}
   */
  function init (data = {}) {
    encounter = data
  }

  /**
   * Function that asks the EMR-API to create an encounter
   * 
   * @param {object} params
   * 
   * @return {Promise}
   */
  function create (params = {}) {
    return fetch (`${apiRoot}/encounters`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params)
    })
  }

  function retrieve(queryString = ''){
    console.log(queryString)
    return fetch (`${apiRoot}/encounters${queryString}`, {
      method: 'GET',
      headers: headers
    })
  }
  
  return {
    create,
    retrieve
  }
}()