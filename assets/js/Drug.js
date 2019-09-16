/**
 * Immediately executing function that creates a revealing Drug module
 * 
 * @return {object}
 */
const Drug = function () {
  /** @type {string} */
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`

  /** @type {object} */
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  /** @type {object} */
  let drug = {}

  /**
   * Function to initialize a drug
   * 
   * @param {object} data
   * 
   * @return {undefined}
   */
  function init (data = {}) {
    drug = data
  }

  /**
   * Global containing drugs and their associated concept ids
   */
  const DRUGS = {
    'Moxi (Moxifloxacin 400mg tablet)': 955,
    'LFX (Levofloxacin 500mg tablet)': 755,
    'RHZ (R75/H50/Z150)': 765,
    'E (Ethambutol 100mg tablet)': 745,
    'RH (R75/H50)': 1194,
    'RH (R150/H75)': 1194,
    'RHZE (R150/H75/Z400/E275)': 1131,
    'INH or H (Isoniazid 100mg tablet)': 656,
    'INH or H (Isoniazid 300mg tablet)': 656,
    'Rifabutin (150mgs)': 2460,
    'Pyridoxine (25mgs)': 766,
    'Pyridoxine (150mgs)': 766,
    'Pyridoxine (50mgs)': 766,
    'Pyridoxine (50mgs)': 766,
    'S (Streptomycin 0.50mgs)': 438,
    'S (Streptomycin 0.75mgs)': 438,
    'S (Streptomycin 1.00mgs)': 438,
    'Rifabutin Isoniazid Pyrazinamide Ethambutol': 9784,
    'RHZ (R75/H50/Z150)': 768
  }

  /**
   * 
   * @param {String} drugName
   * @return {Number|null}
   */
  function getDrugIdByName (drugName) {
    return DRUGS[drugName] || null
  }

  return {
    getDrugIdByName
  }
}()