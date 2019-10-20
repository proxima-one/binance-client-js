const ApolloClient = require('apollo-boost');
const {Subgraph, Proofs} = require('proxima-client');
const {QUERIES, QUERY_MAP} = require("./common/index.js");
const audit = require("./audit/audit.js");


function createBinanceSubgraph(args = {}) {
  let audit_fn = audit.make_audit(args.audit_uri)
  let queries = QUERIES
  let binance_subgraph = new Subgraph(args.client_uri, queries,  audit_fn)
  return binance_subgraph
}


module.exports =  createBinanceSubgraph
