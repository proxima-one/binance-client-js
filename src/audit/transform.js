
'use strict';

const TRANSFORM_AUDIT = {
  "fees": feesTransform,
  // "tokens": tokens_translate_res,
  // "block_stats": blockStats_translate_res,
  // "markets": markets_translate_res,
  // "validators":validators_translate_res,
  //"market_depth":marketDepth_translate_res,
  // "market_tickers":marketTickers_translate_res,
  //"market_candlesticks":  marketCandlesticks_translate_res,
  // "account": account_translate_res,
  //"transactions": transactions_translate_res,
   //"orders": order_translate_res,
   //"trades": trade_translate_res,
  // "atomic_swap": atomicSwap_translate_res
}

function transformAudit(audit_value, value, type) {
  let transformedAudit = value
  if (TRANSFORM_AUDIT[type]) {
    transformedAudit = TRANSFORM_AUDIT[type](audit_value, value)
  }
  return transformedAudit
}

function feesTransform(audit_value, value) {
  for (index in audit_value) {
    let res = responses[index]
    if ((!res["msg_type"]) && (res["dex_fee_fields"])) {
      res["msg_type"] = "dex_fee_fields"
      console.log(res["dex_fee_fields"])
    }
    if ((res["msg_type"] == "") && (res["fixed_fee_fields"])) {
      res["msg_type"] = "fixed_fee_fields"
    }
    responses[index] = res
  }
  return responses
}


module.exports = transformAudit;
