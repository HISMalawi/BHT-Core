/**
 * Immediately executing function that creates a revealing Orders module
 * 
 * @return {object}
 */
var LabOrder = function () {
    /** @type {string} */
    const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`
  
    /** @type {object} */
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.authorization
    }
  
    /** @type {object} */
    let orders = {}
  
    /**
     * Function to initialize an Orders
     * 
     * @param {object} data
     * 
     * @return {undefined}
     */
    function init (data = {}) {
      orders = data
    }
  
    /**
     * Function that asks the EMR-API to create orders
     * 
     * @param {object} params
     * 
     * @return {Promise}
     */

    function create (params = {}) {
      return fetch (`${apiRoot}/programs/${sessionStorage.programID}/lab_tests/orders`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
      })
    }

    function getRecentOrders(params = {}){
      return fetch (`${apiRoot}/patients/${params.patient_id}/recent_lab_orders?patient_id=${params.patient_id}&program_id=${params.program_id}`, {
        method: 'GET',
        headers: headers
      })
    }

    return {
      create,
      getRecentOrders
    }
  }()