/**
 * Immediately executing function that creates a Regimen js revealing module
 * 
 * @return {object}
 */
const Specimen = function () {
    /** @type {string} */
    const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`
  
    /** @type {object} */
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.authorization
    }
  
    /** @type {object} */
    let specimen = {}
  
    /**
     *
     * 
     * @param {object} data
     * 
     * @return {undefined}
    */
    function init (data = {}) {
        specimen = data
    }
  
    /**
     * Function that queries the EMR-API for recommended patient regimens
     * 
     * @param {object} params
     * 
     * @return {Promise}
     */
    function getTBSpecimens (params = {}) {
      return fetch (
        `${apiRoot}/programs/${params.programID}/lab_tests/panels?test_type=${params.testType}`,
        {
          method: 'GET',
          headers: { 'Authorization': sessionStorage.authorization }
        })    
    }
  
    return {
        getTBSpecimens
    }
  }()