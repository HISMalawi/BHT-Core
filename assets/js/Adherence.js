/**
 * Immediately executing function that creates a revealing Adherence module
 * 
 * @return {object}
 */
const Adherence = function () {
  /** @type {string} */
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`

  /** @type {object} */
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  /** @type {object} */
  let adherence = {}

  /**
   * Function to initialize a DrugOrder
   * 
   * @param {object} data
   * 
   * @return {undefined}
   */
  function init (data = {}) {
    order = data
  }

  /**
   * Function to calculate the adherence for a given drug
   * 
   * @param {object} params - object containing drugsGiven, drugsRemaining
   * 
   * @return {number}
   */
  function calculate (params = {}) {
    const ONE_HUNDRED_PERCENT = 100
    const expectedRemaining = getExpectedDrugQuantity({
      dailyDose: params.dailyDose,
      drugsGiven: params.drugsGiven,
      startDate: params.startDate
    })

    if (params.drugsRemaining === expectedRemaining) {
      return {
        expected: expectedRemaining,
        adherence: ONE_HUNDRED_PERCENT
      }
    }

    return {
      expected: expectedRemaining,
      adherence: Math.abs(((params.drugsGiven - params.drugsRemaining) * 100) / (params.drugsRemaining - expectedRemaining)).toFixed(2)
    }
  }

  /**
   * Function to calculate the number of drugs that should be remaining now
   * 
   * @param {object} params - object containing start date, current date, drugs given
   * 
   * @return {number}
   */
  function getExpectedDrugQuantity (params = {}) {
    const daysThatHavePassed = moment(params.currentDate).diff(params.startDate, 'days')
    const expectedIngested = daysThatHavePassed * params.dailyDose

    return params.drugsGiven - expectedIngested
  }

  return {
    calculate
  }
}()