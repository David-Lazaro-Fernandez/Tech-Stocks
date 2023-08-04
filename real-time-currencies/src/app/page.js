"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect } from 'react'
import { resolve } from 'styled-jsx/css';
import LineChart from './components/LineChart';

export default function Home() {
  const [n, setN] = useState(100)
  const [stonks, setStonks] = useState("")
  const [stockInfo, setStockInfo] = useState([])

  const [options, setOptions] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: []
      }
    },
    series: [
      {
        name: "series-1",
        data: []
      }
    ]
  })


  useEffect(() => {
    async function getInfo() {
      try {
        const APIKEY = "TBxDsx1YUlUNmatc_OQhkvuyOxYXYydR"
        const data = await fetch(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/2023-08-01/2023-08-02?adjusted=true&sort=asc&limit=120&apiKey=${APIKEY}`)
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
      const optionsCopy = { ...options }; // Create a copy of the options state
      const categoriesCopy = [...optionsCopy.options.xaxis.categories]; // Create a copy of the categories array
      const seriesCopy = [...optionsCopy.series[0].data];




      stockInfo ?
        stockInfo.slice(0, n).map(item => {
          console.log(item)
          categoriesCopy.push(setCategorie(item.t))
          seriesCopy.push(item.c)
        })
        : null

      console.log(categoriesCopy)
      console.log(seriesCopy)
      optionsCopy.options.xaxis.categories = categoriesCopy;
      optionsCopy.series[0].data = seriesCopy
      setOptions(optionsCopy)
    }
    const setCategorie = (timestamp) => {
      const date = new Date(timestamp)
      const time = `${date.getHours()}:${date.getMinutes()}`
      return time
    }

    fillChart()
    console.log("Hey now I'm in a state", stockInfo)
  }, [stockInfo])

  // useEffect(() =>{
  //   const calculateStonks = () => {
  //     options.series[0][0] > options.series[0][series[0].length-1] ? 
  //       setStonks("/notstonks.png")
  //       :
  //       setStonks("wallpaper.png")
  //   }
  //   calculateStonks()
  // }, [options])
  //
  //  code
  //
  return (
    <main className={styles.main}>
      <div className={styles.companies}>
        <button className={styles.stockButton}> <img src="/apple.png" />  </button>
        <button className={styles.stockButton}> <img src="/google.png" /> </button>
        <button className={styles.stockButton}> <img src="/microsoft.png" /> </button>
      </div>
      {
        options.options.xaxis.categories.length >= n ?
          <div className={styles.container}>
            {console.log(options.series[0], options.series[0].data[n - 1])}
            {options.series[0].data[0] > options.series[0].data[n - 1] ?
              <img src="/notstonks.png" className={styles.stonks} />
              :
              <img src="/wallpaper.png" className={styles.stonks} />
            }

            <LineChart stockInfo={stockInfo} options={options} />
          </div>
          :
          null
      }



    </main>
  )
}
