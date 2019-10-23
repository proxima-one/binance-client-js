



function Fees() {
  const { data, loading, error } = useQuery(
    query.FEES
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  return data
}

export function Blockstats() {
const { data, loading, error } = useQuery(
  query.BLOCK_STATS
);
if (loading) return <p>Loading...</p>;
if (error) return <p>ERROR: {error.message}</p>;
return data
}

function Validators() {
  throw New Error("Not implemented")
}

function Tokens() {
  throw New Error("Not implemented")
}

function Markets() {
  throw New Error("Not implemented")
}

function MarketTickers() {
  throw New Error("Not implemented")
}

  //Other functions need to be done

module.exports {
  Fees,
  Blockstats,
  Validators,
  Tokens,
  Markets,
  MarketTickers
}
