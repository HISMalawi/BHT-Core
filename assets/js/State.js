const State = function () {
  const state = null
  const apiRoot = `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`

  /** @type {object} */
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  function init (data = {}) {
    state = data
  }

  function _void (options = {}) {
    fetch(
      `${apiRoot}/programs/${options.programId}/patients/${options.patientId}/states/${options.stateId}?reason=${encodeURIComponent(void_reason)}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': sessionStorage.authorization
        }
      }
    )
      .then(options.success)
      .catch(options.fail)
  }

  function create (options = {}) {
    return fetch(`${apiRoot}/programs/${options.programId}/patients/${options.patientId}/states`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({state: options.stateId, date: options.startDate})
      }
    )
  }

  /**
   * @param {Number} patientId
   * @param {Number} programId
   * @return {Promise}
   */
  function getPatientStates (patientId, programId) {
    return fetch(`${apiRoot}/programs/${programId}/patients/${patientId}/states`, {
      method: 'GET',
      headers: { Authorization: sessionStorage.authorization }
    })
  }

  return {
    _void,
    create,
    getPatientStates
  }
}()