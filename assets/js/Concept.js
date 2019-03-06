var Concept = function () {
  var apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`
  var concept = null

  function init (data) {
    concept = data
  }

  const CONCEPT_IDS = {
    'Cough lasting >1 week': 2762,
    'Cough lasting >2 weeks': 2573,
    'Cough (any duration)': 8261,
    'Weight loss': 832,
    'Fever lasting >1 week': 8279,
    'Fever lasting >2 weeks': 9689,
    'Fever (any duration)': 9690,
    'Profuse night sweats lasting >1 week': 9691,
    'Profuse night sweats lasting >2 weeks': 9692,
    'Profuse night sweats (any duration)': 9693,
    PATIENT_IS_PREGNANT: 1755,
    YES_ANSWER: 1065,
    NO_ANSWER: 1066,
    TB_SCREENING_CRITERIA: 9698,
    'OPD / MCH Clinic / HIV Negative': 9695,
    'Mining Communities': 9696,
    'HIV Clinic / PLHIV / Prisoners': 9697,
    HTS_CLINIC: 7796,
    ART_CLINIC: 8181,
    PRIVATE_PRACTITIONER: 8349,
    SPUTUM_COLLECTION_POINT: 8350,
    PMTCT: 1939,
    WALK_IN: 1791,
    SOURCE_OF_REFERRAL: 8021
  }

  function create (data = {}) {
    fetch (`${apiRoot}/concepts`, {
      method: 'POST',
      headers: {
        'Authorization': sessionStorage.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data.params)
    })
      .then((response) => {
        if (response.status === 201) {
          data.success(response)
        } else {
          data.fail(response)
        }
      })
      .catch((error) => {
        data.fail(error)
      })
  }

  return {
    create,
    CONCEPT_IDS
  }
}()