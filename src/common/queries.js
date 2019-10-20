'use strict';
var omitDeep = require('omit-deep');

const BINANCE_TYPES = [
  "fees",
  "tokens",
  "token",
  "block_stats",
  "markets",
  "market",
  "validators",
  "market_depth",
  "market_tickers",
  "market",
  "market_candlesticks",
  "account",
  "transaction",
  "order",
  "trade",
  "atomic_swap",
]

const BINANCE_QUERIES = {
  "blockStats": "block_stats",
  "fees": "fees",
  "tokens": "tokens",
  "account": "account",
  "orders": "order",
  "order" : "order",
  "transactions":"transaction",
  "transaction":"transaction",
  "markets" : "markets",
  "marketTicker":"market_ticker",
  "marketTickers":"market_tickers",
  "marketDepth": "market_depth",
  // marketCandleSticks
  // trades
  // trade
  // atomicSwaps
  // atomicSwap
  "validators": "validators",
  // timelocks
}


function preprocessQuery(query) {
  query = JSON.parse(JSON.stringify(query))
  query = omitDeep(query, ["__typename"])
  return query
}
//check if iterable/if proof associated
function parseQuery(query) {
  query = preprocessQuery(query)
  let {value, type} = binanceUnwrapQuery(query)
  let proof = value["proof"]
  value = value[type]
  return {value, proof, type}
}

function binanceUnwrapQuery(query_value) {

  let value;
  for (var key in BINANCE_QUERIES) {
    let query = key
    let type = BINANCE_QUERIES[query]
    if (query_value[query] && query_value[query][type]) {
      value = query_value[query]
      return {value, type}
    }
    if (query_value[type]) {
      value = query_value
      return {value, type}
    }
  }
  return {value, type: null}
}

module.exports = {BINANCE_TYPES, parseQuery}
