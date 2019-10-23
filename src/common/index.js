
'use strict'
const gql = require('graphql-tag');



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

const VALIDATORS = gql`
  query validators($prove: Boolean){
    validators(prove: $prove) {
      validators {
        address
        pub_key
        voting_power
        accum
      }
      proof {
        root
        proof
      }
    }
  }
`;

const BLOCK_STATS = gql`
  query blockStats($prove: Boolean) {
    blockStats(prove: $prove) {
      block_stats {
        latest_block_hash
        latest_app_hash
        latest_block_height
        latest_block_time
        catching_up
      }
      proof {
        root
        proof
      }
    }
  }
`;

const MARKETS = gql`
  query markets($limit: Int, $offset: Int, $prove: Boolean) {
    markets(limit: $limit, offset: $offset, prove: $prove) {
      markets {
        base_asset_symbol
        quote_asset_symbol
        tick_size
        lot_size
      }
      proof {
        root
        proof
      }
    }
  }
`;

const TOKENS = gql`
  query tokens($limit: Int, $offset: Int, $prove: Boolean){
    tokens(limit: $limit, offset: $offset, prove: $prove) {
      tokens {
        name
        symbol
        original_symbol
        total_supply
        owner
      }
      proof {
        root
        proof
      }
    }
  }
`;

const MARKET_TICKERS = gql`
  query marketTickers($limit: Int, $offset: Int, $prove: Boolean){
    marketTickers(limit: $limit, offset: $offset, prove: $prove) {
      market_tickers {
        askPrice
        askQuantity
        bidPrice
        closeTime
        count
        firstId
        highPrice
        lastId
        lastPrice
        lastQuantity
        lowPrice
        openTime
        prevClosePrice
        priceChange
        priceChangePercent
        quoteVolume
        symbol
        volume
        weightedAvgPrice
      }
      proof {
        root
        proof
      }
    }
  }
`;

const MARKET_TICKER = gql`
  query marketTicker($symbol: String, $prove: Boolean){
    marketTicker(symbol: $symbol, prove: $prove) {
      market_ticker {
        askPrice
        askQuantity
        bidPrice
        closeTime
        count
        firstId
        highPrice
        lastId
        lastPrice
        lastQuantity
        lowPrice
        openTime
        prevClosePrice
        priceChange
        priceChangePercent
        quoteVolume
        symbol
        volume
        weightedAvgPrice
      }
      proof {
        root
        proof
      }
    }
  }
`;

const MARKET_DEPTH = gql`
  query marketDepth($symbol_pair: String, $prove: Boolean) {
    marketDepth(symbol_pair: $symbol_pair, prove: $prove) {
  market_depth {
		bids {
      price
      qty
    }
    asks {
      price
      qty
    }
  }
  proof {
    root
    proof
}
}
  }
`;

const MARKET_CANDLESTICKS = gql`
  query marketCandleSticks($symbol: String, $startTime: String, $endTime: String, $interval: String, $limit: Int, $prove: Boolean) {
    marketCandleSticks(symbol: $symbol, startTime: $startTime, endTime: $endTime, interval: $interval, limit: $limit, prove: $prove) {
      market_candlesticks {
        close
        closingTime
        high
        low
        numberOfTrades
        open
        openTime
        quoteAssetVolume
        volume
      }
      proof {
        root
        proof
      }
    }
  }
`;

const ACCOUNT = gql`
  query account($address: String, $prove: Boolean){
    account(address: $address, prove: $prove) {
      account {
        account_number
        address
        public_key
        sequence
        balances {
          symbol
          free
          locked
          frozen
        }
      }
      proof {
        root
        proof
      }
    }
  }
`;

const TRADES = gql`
  query trades($address: String, $symbol: String, $quoteAssetSymbol: String, $blockHeight: String, $startTime: String, $endTime: String, $buyerOrderId: String, $sellerOrderId: String, $orderSide: Int, $limit: Int, $offset: Int, $prove: Boolean) {
    trades(address: $address, symbol: $symbol, quoteAssetSymbol: $quoteAssetSymbol, blockHeight: $blockHeight, startTime: $startTime, endTime: $endTime, buyerOrderId: $buyerOrderId, sellerOrderId: $sellerOrderId, orderSide: $orderSide, limit: $limit, offset: $offset, prove: $prove)
    {
      trade {
        baseAsset
        blockHeight
        price
        quantity
        quoteAsset
        sellFee
        sellerOrderId
        sellSingleFee
        symbol
        tickType
        time
        tradeId
        }
        proof {
          root
          proof
        }
      }
  }`;

const ATOMIC_SWAPS = gql`
query atomicSwaps($fromAddress: String, $toAddress: String, $startTime: String, $endTime: String, $limit: Int, $offset: Int, $prove: Boolean) {
  atomicSwaps(fromAddress: $fromAddress, toAddress: $toAddress, startTime: $startTime, endTime: $endTime, limit: $limit, offset: $offset, prove: $prove) {
  atomic_swap {
    closedTime
  createdTime
  crossChain
  expectedIncome
  expireHeight
  fromAddr
  inAmount
  outAmount
  randomString
  randomStringHash
  recipientOtherChain
  status
  swapId
  timestamp
  toAddr
  updateTime
  }
  proof {
    root
    proof
  }
}
}
`;

const ATOMIC_SWAP = gql`
  query atomicSwap($swapId: String, $prove: Boolean) {
  atomicSwap(swapId: $swapId, prove: $prove) {
  atomic_swap {
  closedTime
  createdTime
  crossChain
  expectedIncome
  expireHeight
  fromAddr
  inAmount
  outAmount
  randomString
  randomStringHash
  recipientOtherChain
  status
  swapId
  timestamp
  toAddr
  updateTime
  }
  proof {
    root
    proof
  }
}
}
`;

const ORDERS = gql`
query orders($address: String, $symbol: String, $start: String, $end: String, $orderSide: Int, $open: Boolean, $status: String, $total: Int, $limit: Int, $offset: Int, $prove: Boolean) {
  orders(address: $address, symbol: $symbol, start: $start, end: $end, orderSide: $orderSide, open: $open, status: $status, total: $total, limit: $limit, offset: $offset, prove: $prove){
  order{
  cumulateQuantity
  fee
  lastExecutedPrice
  lastExecutedQuantity
  orderCreateTime
  orderId
  owner
  price
  quantity
  side
  status
  symbol
  timeInForce
  tradeId
  transactionHash
  transactionTime
  type
  }
  proof {
    root
    proof
  }
}
}
`;

const ORDER = gql`
query order($orderId: String, $prove: Boolean) {
  order(orderId: $orderId, prove: $prove){
  order {
  cumulateQuantity
  fee
  lastExecutedPrice
  lastExecutedQuantity
  orderCreateTime
  orderId
  owner
  price
  quantity
  side
  status
  symbol
  timeInForce
  tradeId
  transactionHash
  transactionTime
  type
  }
  proof {
    root
    proof
  }
}
}
`;

const TRANSACTIONS = gql`
  query transactions($address: String, $txType: String, $txAsset: String, $txSide: Int, $blockHeight: String, $startTime: String, $endTime: String, $limit: Int, $offset: Int, $prove: Boolean){
    transactions(address: $address, txType: $txType, txAsset: $txAsset, txSide: $txSide, blockHeight: $blockHeight, startTime: $startTime, endTime: $endTime, limit: $limit, offset: $offset, prove: $prove)
    {
      transaction {
        blockHeight
        code
        data
        fromAddr
        sequence
        source
        swapId
        timeStamp
        toAddr
        txAsset
        txFee
        txHash
        txType
        value
      }
      proof {
        root
        proof
      }
    }
  }
`;


const TRANSACTION = gql`
  query transaction($txHash: String, $prove: Boolean){
    transaction(txHash: $txHash, prove: $prove) {
      transaction {
        blockHeight
        code
        data
        fromAddr
        memo
        orderId
        proposalId
        sequence
        source
        swapId
        timeStamp
        toAddr
        txAsset
        txFee
        txHash
        txType
        value
      }
      proof {
        root
        proof
      }
    }
  }
`;



const QUERIES = {
  //TRANSACTION,
  //TRANSACTIONS,
  //ORDERS,
  //ORDER,
  //MARKET_TICKER,
  //MARKET_TICKERS,
  //ATOMIC_SWAP,
  //ATOMIC_SWAPS,
  //ACCOUNT,
  //MARKETS,
  //TOKENS,
//  TRADES,
//  VALIDATORS,
//  BLOCK_STATS,
  //MARKET_DEPTH,
  MARKET_CANDLESTICKS,
  //FEES
}


module.exports = {
  QUERIES
};
