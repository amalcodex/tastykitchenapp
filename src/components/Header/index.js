import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import logo from '../images/logo.svg'
import logout from '../images/logout.svg'

import './index.css'

class Header extends Component {
  state = {isTrue: false}

  getTheNames = () => {
    this.setState(prevState => ({isTrue: !prevState.isTrue}))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {isTrue} = this.state
    return (
      <>
        <nav className="nav-header">
          <div className="nav-content">
            <Link to="/" className="nav-link">
              <div className="home-and-logo">
                <img src={logo} className="logo" alt="home" />
                <h1 className="head">Tasty Kitchens</h1>
              </div>
            </Link>
            <ul className="home-cart-logout">
              <li className="home">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="home">
                <Link to="/Cart" className="nav-link-two">
                  Cart
                </Link>
              </li>
              <button
                type="button"
                onClick={this.onClickLogout}
                className="logout"
              >
                Logout
              </button>
            </ul>
            <button
              type="button"
              className="logout_two"
              onClick={this.getTheNames}
            >
              <img src={logout} alt="menu" />
            </button>
          </div>
        </nav>
        {isTrue && (
          <div className="mobile-home-cart">
            <div className="mobile-cart-nav">
              <div className="bar">
                <div className="bar-one">
                  <Link to="/" className="nav-home">
                    <h1 className="home-home-bar">Home</h1>
                  </Link>
                  <Link to="/cart" className="nav-home">
                    <h1 className="home-cart-bar">Cart</h1>
                  </Link>
                </div>
                <div>
                  <button
                    type="button"
                    className="home-close"
                    onClick={this.onClickLogout}
                  >
                    LogOut
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
