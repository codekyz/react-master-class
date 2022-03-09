import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import ApexChart from "react-apexcharts";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isLightAtom } from "../atoms";

const NowPrice = styled.div`
  font-weight: 800;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.accentColor};
  font-size: 24px;
  padding: 16px;
  border-radius: 15px;
  margin-bottom: 10px;
  text-align: center;
`;

interface IChartProps {
  coinId: string;
}

interface TickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Price = () => {
  const isLight = useRecoilValue(isLightAtom);
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery<TickersData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );

  console.log(data);
  return (
    <div>
      <Helmet>
        <title>Price</title>
      </Helmet>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <>
          <NowPrice>${data?.quotes.USD.price}</NowPrice>
          <ApexChart
            type="bar"
            series={[
              {
                data: [
                  data?.quotes.USD.percent_change_30m,
                  data?.quotes.USD.percent_change_12h,
                  data?.quotes.USD.percent_change_24h,
                  data?.quotes.USD.percent_change_30d,
                  data?.quotes.USD.percent_change_1y,
                ],
              },
            ]}
            options={{
              theme: {
                mode: isLight ? "light" : "dark",
              },
              chart: {
                toolbar: {
                  show: false,
                },
                background: "transparent",
                height: 300,
              },
              plotOptions: {
                bar: {
                  borderRadius: 5,
                  horizontal: true,
                },
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                categories: ["30min", "12hours", "24hours", "30days", "1years"],
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default Price;
