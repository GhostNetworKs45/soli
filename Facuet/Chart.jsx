import styled from 'styled-components';
import axios from 'axios';
import { ethers } from 'ethers';
import { useState, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import dayjs from 'dayjs';
import { Spin } from 'antd'; 
import numeral from 'numeral';
import { fountainContractAbi, fountainContractAddress } from '../utils/Fountain';
const provider = new ethers.providers.JsonRpcProvider(
  'https://polygon-rpc.com'
);

const contract = new ethers.Contract(fountainContractAddress, fountainContractAbi, provider);
const Section = styled.div`
  /* background-color: #4e2e4b; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`; 
const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  overflow: none;
  position: relative;
  padding: 0px 20px 30px 20px;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
`;
const Title = styled.div`
  text-transform: uppercase;
  font-size: 72px;
  font-weight: bold;
  @media screen and (max-width: 850px) {
    font-size: 9vw;
  }
`;
const Legend = styled.div`
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translate(-50%, 0%);
  font-size: 14px;
  z-index: 3;
  color: #ffffff;
  background-color: #1d6d7e;
  border-radius: 2px;
  padding: 5px 20px;
`;
const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const [lastPrice, setLastPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    startPriceListener();
  }, []);
  const startPriceListener = async () => {
    setLoading(true);
    let priceHistory = (
      await axios.get(
        'https://splassiveserver.herokuapp.com/api/chart/getPriceHistory'
      )
    ).data.priceHistory;
    if (!priceHistory) return;
    let parsedData = priceHistory.map((tick) => {
      return {
        time: dayjs(tick.timeStamp * 1000).unix(),
        value: parseFloat(tick.splashPriceInUSD / 2.8),
      };
    });
    setChartData(parsedData);
    updateLastPrice();
    setInterval(() => {
      updateLastPrice(); 
    }, 15000);

    setLoading(false);
  };
  const updateLastPrice = async () => {
    const maticbalance = parseFloat(
      ethers.utils.formatEther(
        await provider.getBalance('0xb595F8EC42fAfc56c05b6ecAD6d0B382c49dB222')
      )
    );
    const splassivebalance = parseFloat(
      ethers.utils.formatEther(await contract.tokenBalance())
    );
    const maticprice = parseFloat(
      (
        await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd'
        )
      ).data['matic-network'].usd
    );
    const axaxbalanceinusd = maticbalance * maticprice;
    const splassiveprice = axaxbalanceinusd / splassivebalance;
    setLastPrice({ time: dayjs().unix(), value: splassiveprice });
  };
  return (
    <Section>
      <Container>
        
        <Spin spinning={loading} />
        {lastPrice && (
          <>
            <Legend>{numeral(lastPrice?.value).format('$0,0.000')}</Legend>
            <ChartComponent data={chartData} lastPrice={lastPrice} />
          </>
        )}
      </Container>
    </Section>
  );
};

const ChartComponent = ({ data, lastPrice }) => {
  const chartContainerRef = useRef();
  let serie = useRef();
  const addLastPrice = async () => {
    const maticbalance = parseFloat(
      ethers.utils.formatEther(
        await provider.getBalance('0xb595F8EC42fAfc56c05b6ecAD6d0B382c49dB222')
      )
    );
    const splassivebalance = parseFloat(
      ethers.utils.formatEther(await contract.tokenBalance())
    );
    const maticprice = parseFloat(
      (
        await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd'
        )
      ).data['matic-network'].usd
    );
    const axaxbalanceinusd = maticbalance * maticprice;
    const splassiveprice = axaxbalanceinusd / splassivebalance;
    serie.current.update({ time: dayjs().unix(), value: splassiveprice });
  };
  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    };
    const chartOptions = {
      layout: {
        backgroundColor: '#232223',
        textColor: '#ffffff',
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: '#2c2b2c',
        },
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
      },
    };
    const serieOptions = {
      topColor: 'rgba(78, 46, 75, 0)',
      bottomColor: 'rgba(78, 46, 75, 0)',
      lineColor: '#1d6d7e',
    };
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    });
    chart.timeScale().fitContent();
    chart.applyOptions(chartOptions);
    serie.current = chart.addAreaSeries();
    serie.current.setData(data);
    serie.current.applyOptions(serieOptions);
    setInterval(() => {
      addLastPrice();
    }, 600000);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);
  useEffect(() => {
    if (!lastPrice) return;
    // console.log('actualPrice');
    let newData = [...data];
    newData[newData.length - 1] = lastPrice;
    serie.current.setData(newData);
  }, [lastPrice]);
  return <div ref={chartContainerRef} style={{ width: '100%', height: 600 }} />;
};

export default Chart;
