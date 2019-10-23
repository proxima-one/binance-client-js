const createBinanceSubgraph= require("./src/index.js");
const query= require("./src/common/queries.js");


module.exports = {createBinanceSubgraph, parseQuery: query.parseQuery};
