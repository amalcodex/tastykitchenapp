import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Bottom from '../Bottom'
import Footer from '../Footer'

import Header from '../Header'

import Offers from '../Offers'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <Offers />
      <div className="main">
        <Bottom />
      </div>
      <Footer />
    </>
  )
}

export default Home
