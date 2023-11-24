import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts"
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
  coinId: string;
}

interface IHistorycal{
  time_open: string;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}


function Chart({coinId}:ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const {isLoading, data} = useQuery<IHistorycal[]>("ohlcv", () => fetchCoinHistory(coinId) );
    return <div>{isLoading ? ( "Loading chart..." ) : (
    <ApexChart type="candlestick" 
    series={[
      {
        name: "Price",
        data: data?.map( (price) => (
          [price.time_close, price.open, price.high, price.low, price.close] 
        )) as any[],
      }
    ]}

    options={{
      theme:{
        mode: isDark ? "dark" : "light"
      },
      chart:{
        type:'candlestick',
        height:300,
        background: "transparent"
      },
      grid:{
        show:false,
      },
      yaxis:{
        show:false
      },
      xaxis:{
        axisBorder:{ show:false },
        axisTicks:{ show:false },
        type: 'category',
        categories: data?.map(price => new Date(price.time_close * 1000).toISOString()),
        /*type: "datetime",
        /*categories: data?.map(price => new Date(price.time_close * 1000).toISOString()),*/
      },
      colors:["#0fbcf9"],
      }} />
    )}</div>;
}
  
export default Chart;