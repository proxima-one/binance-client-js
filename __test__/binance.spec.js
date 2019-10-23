const React = require('react');
const { ApolloProvider, useQuery} = require("@apollo/react-hooks");
const wait = require('waait')
const {MockProvider} = require("@apollo/react-testing")
require("babel-polyfill");
const createBinanceSubgraph = require('../index.js')
const Fees = require('./lib/fees-component');
const renderer = require('react-test-renderer');

const audit_uri = "https://dex.binance.org";
const client_uri = "http://localhost:4000/query"
const binanceSubgraph = createBinanceSubgraph({client_uri, audit_uri})

// Suite
describe('Fees', function () {

it('Should render and load without error', async () => {
  let component = renderer.create(
    <ApolloProvider client={binanceSubgraph.client}>
      <Fees/>
    </ApolloProvider>,
  );
  await wait(0);
  const tree = component.toJSON();
  expect(tree).toContain('Loading');
});

it('Should load the query data', async () => {
  let component = renderer.create(
    <ApolloProvider client={binanceSubgraph.client}>
      <Fees/>
    </ApolloProvider>,
  );
  await wait(10);
  const tree = component.toJSON()
  const p = component.root.findAllByType('p');
  console.log(tree.children)

});

it('Should show an error', async () => {
  let component = renderer.create(
    <ApolloProvider client={binanceSubgraph.client}>
      <Fees/>
    </ApolloProvider>,
  );
});

});




it ('Should be auditable', async () => {
  let component = renderer.create(
    <ApolloProvider client={binanceSubgraph.client}>
      <Fees/>
    </ApolloProvider>,
  );
});

it ('Should be verifiable', async () => {
  let component = renderer.create(
    <ApolloProvider client={binanceSubgraph.client}>
      <Fees/>
    </ApolloProvider>,
  );
})
