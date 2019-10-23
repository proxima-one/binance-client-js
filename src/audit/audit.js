var deepEqual = require('deep-equal')
const {BINANCE_TYPES, parseQuery} = require('../common/queries.js')
const requestAuditValue = require('./request.js')
const transformAudit = require('./transform.js')

function make_audit(audit_base_uri) {
  return async function(value) {
    let audit_result = await binance_audit(audit_base_uri, value)
    return audit_result
  }
}
//list push
async function binance_audit(audit_base_uri, given_value) {
  let {value, proof, type} = parseQuery(given_value)
  let audit_value = await requestAuditValue(audit_base_uri, value, type)
  let expected_value = transformAudit(audit_value, value, type)
  let audit_result = auditCorrectness(expected_value, value)
  return audit_result
}

function auditCorrectness(expected_value, value) {
  if (deepEqual(expected_value, value)) {
    return true
  }
  let scalarEqualityCheck;
  for (var key in value) {
    scalarEqualityCheck = (expected_value[key] && value[key] == expected_value[key])
    if (scalarEqualityCheck || deepEqual(expected_value[key], value[key]) || auditCorrectness(expected_value[key], value[key])) {
      continue
    } else {
      return false
    }
  }
  return true
}







module.exports = {make_audit}
