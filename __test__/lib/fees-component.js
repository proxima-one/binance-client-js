
const React = require('react');
const gql =  require('graphql-tag');
const { Query } = require('react-apollo');
const { ApolloProvider, useQuery} = require("@apollo/react-hooks");

// Make sure the query is also exported -- not just the component
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

module.exports = Fees
