# Binance Client JS

[![CircleCI](https://circleci.com/gh/proxima-one/proxima-client-js.svg?style=svg)](https://circleci.com/gh/proxima-one/proxima-client-js)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)


The Binance client enables access to Proxima index nodes, and provides the tooling to submit and verify queries to the query nodes


`npm install binance-subgraph-client`

## Usage

```javascript
const Binance = require('binance-subgraph-client')
const binanceSubgraph = Binance.createBinanceSubgraph(subgraph_uri, binance_chain_api_uri)
```


### Using as a query client

```javascript
const FEES = gql`
  query fees($prove: Boolean) {
    fees(prove: $prove) {
      fees {
        msg_type
        fee
        fee_for
        multi_transfer_fee
        lower_limit_as_multi
      }
      proof {
        root
        proof
      }

    }
  }
`;

function Fees() {
  const {loading, error, data} = useQuery(FEES);
  if (loading) return 'Loading...';
  if (error) return `Error!`;
      return (
        <div>
        {data.fees.fees.map(fee => (
          <p>
            msg_type {fee.msg_type}
          </p>
        ))}
        </div>
      );
}

<ApolloProvider client={binanceSubgraph.client}>
  <Fees/>
</ApolloProvider>,
);
```

### Proving data

```javascript
const {loading, error, data} = useQuery(FEES);
if (loading) return 'Loading...';
if (error) return `Error!`;
{value, proof, type} = Binance.
binanceSubgraph.audit(value)
```

### Auditing data

```javascript
const {loading, error, data} = useQuery(FEES);
if (loading) return 'Loading...';
if (error) return `Error!`;
binanceSubgraph.verify(value, proof)
{value, proof, type} = Binance.

```




## Licensing
This project is licensed under MIT licensing guidelines.
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)
