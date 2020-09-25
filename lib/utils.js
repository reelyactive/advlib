/**
 * Copyright reelyActive 2015-2020
 * We believe in an open Internet of Things
 */


/**
 * Determine if the given object has a function of the given name.
 * @param {Object} object The given object.
 * @param {String} functionName The function name for which to check.
 * @return {boolean} True if the function exists, false otherwise.
 */
function hasFunction(object, functionName) {
  if(object && object.hasOwnProperty(functionName) &&
     (typeof object[functionName] === 'function')) {
    return true;
  }

  return false;
}


module.exports.hasFunction = hasFunction;