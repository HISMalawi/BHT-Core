/**
 * Immediately executing function that creates a Reporting js revealing module
 * @return {Object}
 */
const Reporting = (function() {
  /** @type {String} */
  const apiRoot = `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${
    sessionStorage.apiPort
  }/api/v1`;

  /** @type {Object} */
  const headers = {
    "Content-Type": "application/json",
    Authorization: sessionStorage.authorization
  };

  /**
   * Ask the EMR-API to return a value for the given indicator
   * @param {Number} programId
   * @param {String} name
   * @param {String} startDate
   * @param {String} endDate
   * @return {Promise}
   */
  function getIndicator (programId, report, name, startDate, endDate) {
    return fetch(`${apiRoot}/programs/${programId}/reports/${report}?name=${name}&start_date=${startDate}&end_date=${endDate}`, {
      method: 'GET',
      headers: { Authorization: sessionStorage.authorization }
    });
  }

  /**
   * Ask the EMR-API to return dashboard statistics for a given program
   * @param {Number} programId
   * @param {String} date
   * @return {Promise}
   */
  function dashboardStats (programId, date) {
    return fetch(`${apiRoot}/dashboard_stats?date=${date}&program_id=${programId}`, {
      method: 'GET',
      headers: { Authorization: sessionStorage.authorization }
    })
  }


  return { getIndicator, dashboardStats };
})();
