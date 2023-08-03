"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect } from 'react'
import { resolve } from 'styled-jsx/css';

export default function Home() {
  const [stockInfo, setStockInfo] = useState([])
  
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
    console.log("Hey now I'm in a state", stockInfo)
  }, [stockInfo])

  //
  //  code
  //
  return (
    <main className={styles.main}>
      <h1>Hello World!</h1>
        

    </main>
  )
}
