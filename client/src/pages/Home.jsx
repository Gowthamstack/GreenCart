import React from 'react'
import BestSeller from '../Component/BestSeller'
import Categories from '../Component/Categories'
import Footer from '../Component/Footer'
import FooterBanner from '../Component/FooterBanner'
import MainBanner from '../Component/MainBanner'
import NewsLetter from '../Component/NewsLetter'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner/>
      <Categories/>
      <BestSeller/>
      <FooterBanner/>
      <NewsLetter/>
     
    </div>
  )
}

export default Home
