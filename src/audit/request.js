
const axios = require('axios')

'use strict'

const PARSE_URI = {
//"fees": fees_parse_uri,
"tokens": tokens_parse_uri,
"block_stats": blockStats_parse_uri,
"markets": markets_parse_uri,
"validators":validators_parse_uri,
//"marketDepth":marketDepth_parse_uri,
"market_tickers":marketTickers_parse_uri,
"market_ticker":marketTickers_parse_uri,
//"market_candlesticks":  marketCandlesticks_parse_uri,
"account": account_parse_uri,
//"transaction": transaction_parse_uri,
"order": order_parse_uri,
//"orders": order_parse_uri,
"trade": trade_parse_uri,
//"atomic_swap": atomicSwap_parse_uri,
}


async function requestAuditValue(audit_base_uri, value, type){
  if (!PARSE_URI[type]) {
    return value
  } else {
    let audit_uri = parse_uri(audit_base_uri, value, type)
    var response = await Promise.resolve(axios.get(audit_uri))
    return response["data"]
  }
}

function parse_uri(audit_uri, value, type) {
  if (!PARSE_URI[type]) {
    return ""
  }
  return PARSE_URI[type](audit_uri, value)
}

function marketCandlesticks_parse_uri(audit_uri, val) {
  return audit_uri + "/api/v1/klines?symbol="+ val["symbol"] + "&interval=" + val["interval"]
}

function marketTickers_parse_uri(audit_uri, val) {
  return audit_uri + "/api/v1/ticker/24hr"
}

function marketDepth_parse_uri(audit_uri, val) {
  return audit_uri + "/api/v1/depth?symbol=" + val["symbol"]
}

function marketDepth_translate_res(res, args = {}) {
  res["symbol"] = args["symbol"]
  return res
}
function account_parse_uri(audit_uri, val) {
  return audit_uri + "/api/v1/account/" + val["address"]
}

function trade_parse_uri(audit_uri, val) {
  return audit_uri + "/api/v1/trades?height=" + val["height"]
}

function order_parse_uri(audit_uri, val) {
  return audit_uri + "/api/v1/orders/" + val["orderId"]
}

function transaction_parse_uri(audit_uri, val) {
  return audit_uri + "/api/v2/transactions-in-block/" + val["blockHeight"]
}

function atomicSwap_parse_uri(audit_uri, value) {
  return audit_uri + "/api/v1/atomic-swaps/" + val["swapId"]
}

function blockStats_parse_uri(audit_uri, val) {
  return audit_uri + "/api/v1/node-info"
}

function blockStats_translate_res(res, args = {}) {
  return res["sync_info"]
}

function validators_parse_uri(audit_uri, val) {
  return audit_uri + "/api/v1/validators"
}

function markets_parse_uri(audit_uri, val) {
  return audit_uri + "/api/v1/markets"
}

function tokens_parse_uri(audit_uri, val) {
  return audit_uri + "/api/v1/tokens"
}

function fees_parse_uri(audit_uri, val) {
  return audit_uri + "/api/v1/fees"
}

function default_parse_uri(audit_uri, val) {
  return audit_uri
}

module.exports = requestAuditValue;
