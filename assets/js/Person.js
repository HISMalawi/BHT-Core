var Person = function () {
  var apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`
  var person = null

  function init (data) {
    person = data
  }

  function get (options = {}) {
    fetch (`${apiRoot}/people/${options.personId}`, {
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

  function isOfGender (gender) {
    return person.gender === gender
  }

  function isAgedBetween (min, max) {
    return person.age >= min && person.age <= max
  }

  function setAge (moment) {
    person.age = moment().diff(moment(person.birthdate), 'years')
  }

  function isEligibleForPregnancyQuestion () {
    return isOfGender('F') && isAgedBetween(9, 55)
  }

  return {
    init,
    get,
    setAge,
    isEligibleForPregnancyQuestion
  }
}()