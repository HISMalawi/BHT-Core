const Prescription = function () {
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`
  let prescription = null

  function init (data) {
    prescription = data
  }

  function get (options = {}) {
    fetch (`${apiRoot}/prescriptions/`, {
      method: 'GET',
      headers: {
        'Authorization': sessionStorage.authorization
      }
    })
      .then((response) => {
        if (response.status === 200) {
          options.success(response)
        } else {
          options.fail(response)
        }
      })
      .catch((error) => {
        options.fail(error)
      })
  }

  function getTbPrescription (options = {}) {
    const query = `locality=${options.data.patientLocality}&days=${options.data.recommendedTemporalMedsDays}`
    fetch (`${apiRoot}/programs/${options.data.programId}/${options.data.personId}/prescriptions?${query}`, {
      method: 'GET',
      headers: {
        'Authorization': sessionStorage.authorization
      }
    })
      .then((response) => {
        if (response.status === 200) {
          options.success(response)
        } else {
          options.fail(response)
        }
      })
      .catch((error) => {
        options.fail(error)
      })
  }

  return {
    init,
    getTbPrescription,
    get
  }
}()