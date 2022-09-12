import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useEffect, useState} from 'react';

interface wanikani_word {
  "kanji": string,
  "level": number,
  "english_meaning": string,
  "primary_meaning": string,
  "alternatives": string,
  "word_type": string,
  "meaning_explanation": string,
  "reading": string,
  "reading_explanation": string,
  "audio": string[],
  "context_sentences": string,
  "kanji_composition": string[],
}

const DisplayWord = ({data}: wanikani_word) => {
  return (
    <div>
      {data.map((res, index) => (
        <div key={index}>
          <p>{res.english_meaning}</p>
          <p>kanji: {res.english_meaning}</p>
          <p>level: {res.number}</p>
          <p>primary meaning: {res.primary_meaning}</p>
          <p>alternatives: {res.alternatives}</p>
          <p>word type: {res.word_type}</p>
          <p>meaning explanation: {res.meaning_explanation}</p>
          <p>reading: {res.reading}</p>
          <p>audio: {res.audio}</p>
          <p>context sentences: {res.context_sentences}</p>
          <p>kanji composition: {res.kanji_composition}</p>
        </div>
      ))}
    </div>
  )
}

const Home: NextPage = () => {
  const [result, setResult] = useState()
  const [text, setText] = useState('')
  const handleSearch = async () => {
    if (text == ''){
      return
    }
    fetch(`https://flask-server.ricorico1.repl.co/word/${text}`).then((res) => res.json()).then(data => setResult(data))

  }
  const handleInput = (e) => {
    setText(e.target.value)                   
  }
  return (
    <div  className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <h1> Wanikani scraper app </h1>

     <input className="border-black b-2" type="search" value={text} onChange={(e) => handleInput(e)} />
     <button onClick={() => handleSearch()}>Search wanikani database</button>

     <div> 
        {result ? 
        <DisplayWord data={result.data} />
        :
        'search for a term in the wanikani database'}
     </div>

    </div>
  )
}

export default Home
