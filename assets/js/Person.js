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

  return {
    get
  }
}()