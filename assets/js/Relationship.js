/**
 * Immediately executing func that creates a Relationship js revealing module
 * @return {Object}
 */
const Relationship = function () {
  /** @type {String} */
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`

  /** @type {Object} */
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  /** @type {Object} */
  let relationship = {}

  /**
   * Function to initialize a relationship
   * 
   * @param {Object} data
   * 
   * @return {undefined} 
   */
  function init (data = {}) {
    relationship = data
  }

  /**
   * Function to ask the EMR-API for a relationship
   * 
   * @param {Number} relationshipId
   * 
   * @return {Object}
   */
  function get (relationshipId) {
    return fetch(`${apiRoot}/relationships/${relationshipId}`, {
      method: 'GET',
      headers: { 'Authorization': sessionStorage.authorization }
    })
  }

  /**
   * Function to ask the EMR-API to create a relationship
   * 
   * @param {Number} personId
   * @param {Object} data
   * 
   * @return {Promise} 
   */
  function create (personId, data = {}) {
    return fetch (`${apiRoot}/people/${personId}/relationships`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
  }

  return {
    get,
    create
  }
}()