const BASE_URL = `https://api.coinpaprika.com/v1`;

export const fetchCoins = async () => {
  return await (await fetch(`${BASE_URL}/coins`)).json();
};

export const fetchCoinInfo = async (coinId?: string) => {
  return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
};

export const fetchCoinTickers = async (coinId?: string) => {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
};

export const fetchCoinHistory = async (coinId?: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return await (
    await fetch(
      `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
    )
  ).json();
};
