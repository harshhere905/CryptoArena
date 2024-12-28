import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

function Coin() {
  const { coinID } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [historicalData,setHistoricalData]=useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-ZX7ESMrARiUKoPWXVDs4wsdD' },
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinID}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };
  const fetchHistoricalData=()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-ZX7ESMrARiUKoPWXVDs4wsdD'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => console.log(setHistoricalData(res)))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [coinID]); 

  if (loading) {
    return (
      <div className='spinner'>
        <div className="spin"></div>
      </div>
    );
  }

  if (coinData && historicalData) {
    return (
      <div className='coin'>
        <div className='coin-name'>
          <img src={coinData.image.large} alt="" />
          <p>
            <b>{coinData.name} ({coinData.symbol.toUpperCase()})</b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData}/>
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    );
  }

  return null; 
}

export default Coin;
