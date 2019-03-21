var User = function () {
  var user = null

  function init (data) {
    user = data
  }

  function isActive () {
    return user.deactivated_on === null
  }

  function getUsernames () {
    return {
      given_name: user.person.names[0].given_name,
      family_name: user.person.names[0].family_name,
      username: user.username
    }
  }

  function getRoles () {
    return user.roles.map(role => role.role).toString()
  }

  function getDateOfCreation () {
    return user.date_created
  }

  return {
    init,
    isActive,
    getUsernames,
    getRoles,
    getDateOfCreation
  }
}()