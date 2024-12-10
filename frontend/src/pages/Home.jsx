import React from 'react'
import Hero from '../components/Hero'
import LatestColection from '../components/LatestColection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPOlicy'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestColection/>
      <BestSeller/>
      <OurPolicy/>
    </div>
  )
}

export default Home
