/**
 * React for app home (only) page
 */

import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import SearchForm from '../components/searchForm'
import SearchResults from '../components/searchResults'
import SearchResultSummary from '../components/searchResultSummary'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [ searchResult, setSearchResult] = useState(); 

  const title = "Country Search";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header>
        <ul className={styles.navbar}> 
          <li  className={styles.navbarTitle}>{title}</li>
          <li><SearchForm setSearchResult={setSearchResult} /></li>
        </ul>
      </header>

      <main className={styles.main}>
        <SearchResults searchResult={searchResult} />
      </main>

      <footer className={styles.footer}>
        <SearchResultSummary searchResult={searchResult}/>
      </footer>

    </div>
  )
}

export default Home
