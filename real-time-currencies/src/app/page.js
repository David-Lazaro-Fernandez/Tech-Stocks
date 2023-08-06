"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect, useMemo, useCallback } from 'react'
import LineChart from './components/LineChart';

const APIKEY = "TBxDsx1YUlUNmatc_OQhkvuyOxYXYydR"
const stockURLs = {
  MSFT: `https://api.polygon.io/v2/aggs/ticker/MSFT/range/1/minute/2023-08-01/2023-08-02?adjusted=true&sort=asc&limit=120&apiKey=${APIKEY}`,
  APPL: `https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/2023-08-01/2023-08-02?adjusted=true&sort=asc&limit=120&apiKey=${APIKEY}`,
  GOOGL: `https://api.polygon.io/v2/aggs/ticker/GOOGL/range/1/minute/2023-08-01/2023-08-02?adjusted=true&sort=asc&limit=120&apiKey=${APIKEY}`,
  META: `https://api.polygon.io/v2/aggs/ticker/META/range/1/minute/2023-08-01/2023-08-02?adjusted=true&sort=asc&limit=120&apiKey=${APIKEY}`,
  AMZN: `https://api.polygon.io/v2/aggs/ticker/AMZN/range/1/minute/2023-08-01/2023-08-02?adjusted=true&sort=asc&limit=120&apiKey=${APIKEY}`,
}

export default function Home() {

  const [currentStock, setCurrentStock] = useState('APPL')
  const [n, setN] = useState(100)
  const [stonks, setStonks] = useState("")
  const [stockInfo, setStockInfo] = useState([])
  const [categories, setCategories] = useState([])
  const [series, setSeries] = useState([{
    name: 'Series 1 ',
    data: []
  }])

  const options = useMemo(() => ({
    options: {
      chart: { id: "basic-bar", type: 'area' },
      xaxis: { categories: categories },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
    }
  }), [categories]);

  const fetchStockInfo = useCallback(async () => {
    try {
      const data = await fetch(stockURLs[currentStock]);
      const jsonData = await data.json();
      setStockInfo(jsonData.results);
    } catch (error) {
      console.error(error);
    }
  }, [currentStock]);

  const updateChart = useCallback(() => {
    const categoriesCopy = [];
    const seriesCopy = [];
    stockInfo.slice(0, n).forEach(item => {
      const date = new Date(item.t);
      const time = `${date.getHours()}:${date.getMinutes()}`;
      categoriesCopy.push(time);
      seriesCopy.push(item.c);
    });
    setCategories(categoriesCopy);
    setSeries([{ name: 'A', data: seriesCopy }]);
  }, [stockInfo, n]);

  useEffect(() => {
    fetchStockInfo();
  }, [fetchStockInfo]);

  useEffect(() => {
    updateChart();
  }, [updateChart]);

  useEffect(() => {
    console.log(series, options);
  }, [series, options]);


  const handleClick = (symb) => {
    setCurrentStock(symb)
    console.log(symb)
  }
  return (
    <main className={styles.main}>
      <div className={styles.companies}>
        <button
          onClick={() => handleClick('APPL')}
          className={styles.stockButton}
        >
          <img src="/apple.png" />
          <p>APPL</p>
        </button>
        <button
          onClick={() => handleClick('GOOGL')}
          className={styles.stockButton}
        >
          <img src="/google.png" />
          <p>GOOGL</p>
        </button>
        <button
          onClick={() => handleClick('MSFT')}
          className={styles.stockButton}
        >
          <img src="/microsoft.png" />
          <p>MSFT</p>
        </button>
        <button
          onClick={() => handleClick('META')}
          className={styles.stockButton}
        >
          <img src="/meta.png" />
          <p>META</p>
        </button>
        <button
          onClick={() => handleClick('AMZN')}
          className={styles.stockButton}
        >
          <img src="/amazon.png" />
          <p>AMZN</p>
        </button>
      </div>
      <h3 className={styles.symbol_name}>{currentStock}</h3>
      {series ? <h1 className={styles.symbol}>{series[0].data[0]} USD</h1> : null}
      {
        categories && series && series[0].data && series[0].data.length >= n ?
          <div className={styles.container}>
            {series[0].data[0] > series[0].data[n - 1] ?
              <img src="/notstonks.png" className={styles.stonks} />
              :
              <img src="/wallpaper.png" className={styles.stonks} />
            }
            <LineChart options={options} series={series} />
          </div>
          :
          console.log("aaaaaaaaa", series[0])
      }



    </main>
  )
}
