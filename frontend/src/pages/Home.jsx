import React from 'react'
import Hero from '../components/Hero'
import LatestColection from '../components/LatestColection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPOlicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestColection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
