import {Link} from 'react-router-dom'
import Header from '../Header'
import tr from '../images/traffic.svg'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found">
      <img src={tr} alt="name" />
      <h1>PAGE NOT FOUND</h1>
      <p className="we-are">
        we’re sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <Link to="/">
        <button type="button" className="button-back-home">
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFound
