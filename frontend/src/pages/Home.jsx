import React from 'react'
import Hero from '../components/Hero'
import LatestColection from '../components/LatestColection'
import BestSeller from '../components/BestSeller'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestColection/>
      <BestSeller/>
    </div>
  )
}

export default Home
