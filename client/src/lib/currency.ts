// USD to INR conversion rate (fixed for demo purposes)
const USD_TO_INR_RATE = 75;

export const convertUSDtoINR = (amountUSD: number): number => {
  return Math.round(amountUSD * USD_TO_INR_RATE);
};

export const formatCurrency = (amount: number, currency: 'USD' | 'INR'): string => {
  if (currency === 'USD') {
    return `$${amount.toLocaleString()}`;
  } else {
    return `₹${amount.toLocaleString()}`;
  }
};
