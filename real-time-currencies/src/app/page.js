"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect } from 'react'
import LineChart from './components/LineChart';

export default function Home() {
  const APIKEY = "TBxDsx1YUlUNmatc_OQhkvuyOxYXYydR"
  const [stockURL, setStockURL] = useState({
    MSFT: `https://api.polygon.io/v2/aggs/ticker/MSFT/range/1/minute/2023-08-01/2023-08-02?adjusted=true&sort=asc&limit=120&apiKey=${APIKEY}`,
    APPL: `https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/2023-08-01/2023-08-02?adjusted=true&sort=asc&limit=120&apiKey=${APIKEY}`,
    GOOGL: `https://api.polygon.io/v2/aggs/ticker/GOOGL/range/1/minute/2023-08-01/2023-08-02?adjusted=true&sort=asc&limit=120&apiKey=${APIKEY}`,
  })
  const [currentStock, setCurrentStock] = useState('APPL')
  const [n, setN] = useState(100)
  const [stonks, setStonks] = useState("")
  const [stockInfo, setStockInfo] = useState([])
  const [categories, setCategories] = useState([])
  const [series, setSeries] = useState({
    name:'Series 1 ',
    data: []
  })
  const options = {
    options:{
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: categories
      }
    
  }
}


  useEffect(() => {
    async function getInfo() {
      try {
        const data = await fetch(stockURL[currentStock])
        const jsonData = await data.json()
        setStockInfo(jsonData.results)
      } catch (error) {
        console.error(error)
      }
    }

    getInfo()
  }, [])

  useEffect(() => {
    const fillChart = () => {
      setCategories([])
      setSeries({name:'Series 1 ', data: []})
      const categoriesCopy = []; // Create a copy of the categories array
      const seriesCopy = [];
      stockInfo ?
        stockInfo.slice(0, n).map(item => {
          categoriesCopy.push(setCategorie(item.t))
          seriesCopy.push(item.c)
        })
        : null

      setCategories(categoriesCopy)
      setSeries([{name:'A', data:seriesCopy}])
    }
    const setCategorie = (timestamp) => {
      const date = new Date(timestamp)
      const time = `${date.getHours()}:${date.getMinutes()}`
      return time
    }
    console.log(stockInfo)
    fillChart()
  }, [stockInfo])

  useEffect(() => {
    async function updateInfo() {
      try {
        setStockInfo([])
        const data = await fetch(stockURL[currentStock])
        const jsonData = await data.json()
        setStockInfo(jsonData.results)
      } catch (error) {
        console.error(error)
      }
    }
    console.log(options)
    updateInfo()
  }, [currentStock])

  useEffect(() => { console.log(series, options) }, [series])

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
        </button>
        <button
          onClick={() => handleClick('GOOGL')}
          className={styles.stockButton}
        >
          <img src="/google.png" />
        </button>
        <button
          onClick={() => handleClick('MSFT')}
          className={styles.stockButton}
        >
          <img src="/microsoft.png" />
        </button>
      </div>
      {
        categories && series ?
          <div className={styles.container}>
            {/* {options.series[0] > series[n - 1] ?
              <img src="/notstonks.png" className={styles.stonks} />
              :
              <img src="/wallpaper.png" className={styles.stonks} />
            } */}

            <LineChart options={options} series={series} />
          </div>
          :
          null
      }



    </main>
  )
}
