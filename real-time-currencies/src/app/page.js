"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect } from 'react'
import { resolve } from 'styled-jsx/css';
import LineChart from './components/LineChart';

export default function Home() {
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
        data: [30, 40, 45, 50, 49, 60, 70, 91, 12, 11]
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





      stockInfo ?
        stockInfo.slice(0, 10).map(item => {
          console.log(item)
          categoriesCopy.push(setCategorie(item.t))

        })
        : null

      console.log(categoriesCopy)
      optionsCopy.options.xaxis.categories = categoriesCopy;
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

  useEffect(() => console.log(options), [options])
  //
  //  code
  //
  return (
    <main className={styles.main}>
      {
        options.options.xaxis.categories.length == 10 ?
          <LineChart stockInfo={stockInfo} options={options} />
          :
          null
      }



    </main>
  )
}
