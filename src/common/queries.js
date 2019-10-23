'use strict';
var omitDeep = require('omit-deep');

const BINANCE_TYPES = [
  "fees",
  "tokens",
  "token",
  "block_stats",
  "markets",
  "validators",
  "market_depth",
  "market_tickers",
  "market_ticker",
  "market_candlesticks",
  "account",
  "transaction",
  "order",
  "orders",
  "trades",
  "atomic_swap",
  "atomic_swaps",
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
  "marketCandleSticks":"market_candlesticks",
  "trades": "trade",
  "atomicSwaps":"atomic_swap",
  "atomicSwaps":"atomic_swap",
  "validators": "validators",
  "timelocks":"timelocks"
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
  if (value[type]) {
    let proof = value["proof"]
    value = value[type]
    return {value, proof, type}
  } else {
    let rows = []
    for (var row of value) {
      rows.push({value: row[type], proof: row["proof"], type: type})
    }
    return rows
  }

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
    if (query_value[query]) {
      value = query_value[query]
      return {value, type}
    }
  }
  return {value, type: null}
}

module.exports = {BINANCE_TYPES, parseQuery}
