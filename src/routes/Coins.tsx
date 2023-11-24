import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

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
const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;
const CoinList = styled.ul``;
const Title = styled.h1`
    color: ${props=>props.theme.accentColor}
`;

interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active:boolean,
    type:string,
}

const Loader = styled.span`
    text-align: center;
`;

const Img = styled.img`
    width: 35px;
    height; 35px;
    margin-right:10px;
`;

function Coins() {
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Title>코인</Title>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinList>
                    {data?.slice(0,100).map((coin)=>(
                        <Coin key={coin.id}>
                            <Link 
                                to={`/${coin.id}`}
                                state={{"name":coin.name}}
                            >
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                {coin.name} &rarr;</Link>
                        </Coin>
                    ))}
                </CoinList>
            )}
        </Container>

    );
  }
  export default Coins;