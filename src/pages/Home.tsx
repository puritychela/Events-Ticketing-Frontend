import HeroSection from '../components/home/HeroSection'
import FeaturedEvents from '../components/FeaturedEvents'
import Footer from '../components/Footer'
import { useState } from 'react'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <HeroSection onSearch={setSearchQuery} />
      <FeaturedEvents searchQuery={searchQuery} />
      <Footer />
    </div>
  )
}

export default Home

