"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect } from 'react'
import { resolve } from 'styled-jsx/css';

export default function Home() {
  const [pokeData, setPokeData] = useState({})
  const [pokemonImage, setPokemonImage] = useState("")
  useEffect(() => {
    async function getInfo() {
      try {
        const data = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        const jsonData = await data.json()
        setPokeData(jsonData)
        setPokemonImage(jsonData.sprites.front_default)
      } catch (error) {
        console.error(error)
      }
    }
    getInfo()
  }, [])


  //
  //  code
  //
  return (
    <main className={styles.main}>
      <h1>Hello World!</h1>
      {pokemonImage && pokeData ?
        <>
          <img src={pokemonImage} style={{height:'400px'}}/>
          <p>{pokeData.name}</p>
        </>
        :
        <p></p>
      }

    </main>
  )
}
