import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import CountrySearchForm from '../components/countrySearchForm'
import CountrySearchResult from '../components/countrySearchResult'
import SearchResultSummary from '../components/searchResultSummary'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [ searchResult, setSearchResult] = useState(); 

  const title = "Country Search";

  //TODO: double check API again
  //TODO: code review incl delete irrelevant
  //TODO: unit tests
  //TODO: readme
  //TODO: documentation
  //TODO: move some css?
  //TODO: page history
  //TODO: accessibility
  //TODO: favicon
  //TODO: auto focus on search box
  //TODO: make search box UI nicer
  //TODO: center header/footer
  //TODO: only send relevant properties
  //TODO: split up countrySearchResult

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header>
        <ul className={styles.navbar}> 
          <li  className={styles.navbarTitle}>{title}</li>
          <li><CountrySearchForm setSearchResult={setSearchResult} /></li>
        </ul>
      </header>

      <main className={styles.main}>
        <CountrySearchResult searchResult={searchResult} />
      </main>

      <footer className={styles.footer}>
        <SearchResultSummary searchResult={searchResult}/>
      </footer>

    </div>
  )
}

export default Home
