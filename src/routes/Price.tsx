import styled from "styled-components";

export interface PriceData{
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

interface IPrice{
  tickerData?:PriceData;
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Button = styled.div`
  padding: 20px;
  cursor: pointer;
  background-color: ${props => props.theme.accentColor};
  border-radius: 6px;
  font-weight: bold;
  transition: 0.3s;
  &:hover{
    opacity:0.7;
  }
`;

const AreaPrice = styled.div`
  h1{
    margin: 20px 0;
  }
  h2{
    margin: 20px 0;
    font-size:40px;
    color: ${props => props.theme.accentColor};
    text-align:center;
  }  
`;

function Price({tickerData}:IPrice) {
  return (
    <>
      <AreaPrice>
      <h1>Price</h1>
      <h2>${tickerData?.quotes.USD.price.toFixed(8)}</h2>
      </AreaPrice>
      <ButtonWrapper>
        <Button>BUY &rarr;</Button>
        <Button>SELL &rarr;</Button>
      </ButtonWrapper>
    </>
  );
}
  
export default Price;