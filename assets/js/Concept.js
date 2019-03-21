var Concept = function () {
  var apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`
  var concept = null

  function init (data) {
    concept = data
  }

  function getConceptIdByName (conceptName) {
    return CONCEPT_IDS[conceptName] || null
  } 

  const CONCEPT_IDS = {
    'Cough lasting >1 week': 9694,
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
    PRIVATE_PRACTITIONER: 8349,
    SPUTUM_COLLECTION_POINT: 8350,
    PMTCT: 1939,
    WALK_IN: 1791,
    SOURCE_OF_REFERRAL: 8021,
    NEGATIVE: 664,
    MCH: 1018,
    OPD: 7799,
    MINING_COMMUNITIES: 9696,
    ART_CLINIC: 7054,
    POSITIVE: 703,
    PRISONER: 9734,
    WARD: 7829,
    HIV_TEST_DATE: 1837,
    PREVIOSULY_TESTED: 9656,
    PREVIOUS_TEST_DATE: 9657,
    ON_ART: 7010,
    NOT_ON_ART: 8037,
    HIV_STATUS: 3753,
    HIV_TEST_DONE_TODAY: 9568,
    NOT_DONE: 2475,
    REASON_HIV_TEST_NOT_DONE: 9569
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
    getConceptIdByName,
    CONCEPT_IDS
  }
}()