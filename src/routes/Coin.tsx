import { useParams, useLocation, Routes, Route } from "react-router";
import styled from "styled-components";
import { useQuery } from "react-query";
import { Link, useMatch } from "react-router-dom";
import Chart from "./Chart";
import Price, { PriceData } from "./Price";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
    color: inherit;
  }
`;

const BackButton = styled.div`
  font-size:16px;
  font-weight:400;
  display: block;
  padding: 10px 0;
  a {
      color: ${(props) => props.theme.textColor};
  }
`;

interface Location{
  state: {
    name:string;
  }
}

interface InfoData{
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

function Coin() {
  const { coinId } = useParams();
  const location = useLocation();
  const { state } = location as Location;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading:infoLoading, data:infoData} = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId!) );

  const { isLoading:tickerLoading, data:tickerData} = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId ? coinId : ""), { refetchInterval: 10000} );
  
  return (
  <Container>
    <Helmet>
      <title>{state?.name ? state.name : infoLoading ? "Loading..." : infoData?.name}</title>
    </Helmet>
    <Header>
        <Title>
          {state?.name ? state.name : infoLoading ? "Loading..." : infoData?.name}
        </Title>
    </Header>
    <BackButton>
      <Link to={`/`}>&larr; Back</Link>
    </BackButton>
    {infoLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickerData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path="/price" element={<Price tickerData={tickerData ? tickerData : undefined} />} />
            <Route path="/chart" element={<Chart coinId={coinId ? coinId : ""} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}
export default Coin;