/**
 * Immediately executing function that creates a revealing Person module
 * 
 * @return {object}
 */
const Person = function () {
  /** @type {string} */
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`

  /** @type {object} */
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  /** @type {object} */
  let person = {}

  /**
   * Function that initializes a person
   * 
   * @param {object} data
   * 
   * @return {undefined}
   */
  function init (data = {}) {
    person = data
  }

  /**
   * Function to ask the EMR-API to create a person
   * 
   * @param {Object} params
   * 
   * @return {Promise}
   */
  function create (params) {
    return fetch(`${apiRoot}/people`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params)
    })
  }

  /**
   * Function that asks the EMR-API for a person given a personId
   * 
   * @param {number} personId
   * 
   * @return {Promise}
   */
  function get (personId) {
    return fetch (`${apiRoot}/people/${personId}`, {
      method: 'GET',
      headers: { 'Authorization': sessionStorage.authorization }
    })
  }

  /**
   * Function to check whether a person is of a particular gender
   * 
   * @param {string} gender
   * 
   * @return {boolean}
   */
  function isOfGender (gender = '') {
    return person.gender === gender
  }

  /**
   * Function to check if a person is within a given age range
   * 
   * @param {number} min 
   * @param {number} max
   * 
   * @return {boolean}
   */
  function isAgedBetween (min, max) {
    return person.age >= min && person.age <= max
  }

  /**
   * Function to set the age of a person
   * 
   * @param {moment} moment - Moment.js dependency
   * 
   * @return {undefined}
   */
  function setAge (moment) {
    person.age = moment().diff(moment(person.birthdate), 'years')
  }

  /**
   * Functiion to check if a person is elible for the pregnancy question
   * They are eliglible if they're aged between 9<->55 and are female
   * 
   * @return {boolean}
   */
  function isEligibleForPregnancyQuestion () {
    return isOfGender('F') && isAgedBetween(9, 55)
  }

  /**
   * Function that asks the EMR-API to assign a patient a TB number
   * A TB number (Tuberculosis number) is given to TB+ patients
   * These patients must be staying near or assigned to the TB facility
   * 
   * @param {Object} params
   * 
   * @return {Promise}
   */
  function assignTbRegistrationNumber (params) {
    let args = `?date=${params.sessionDate}&number=${params.number}`
    return fetch (`${apiRoot}/patients/${params.personId}/assign_tb_number${args}`, {
      method: 'GET',
      headers: { 'Authorization': sessionStorage.authorization }
    })
  }

  /**
   * Ask to EMR-API to return a person's relationships
   * 
   * @param {Number} personId
   * @return {Promise}
   */
  function getRelationships (personId) {
    return fetch(`${apiRoot}/people/${personId}/relationships`, {
      method: 'GET',
      headers: { 'Authorization': sessionStorage.authorization }
    })
  }

  return {
    init,
    get,
    create,
    setAge,
    isEligibleForPregnancyQuestion,
    assignTbRegistrationNumber,
    getRelationships
  }
}()