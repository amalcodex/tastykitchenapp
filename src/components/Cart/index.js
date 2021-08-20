import {Component} from 'react'

import {Link} from 'react-router-dom'
import {
  BiRupee,
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
} from 'react-icons/all'
import Header from '../Header'
import Footer from '../Footer'
import empty from '../images/empty.svg'
import green from '../images/greebl.svg'
import './index.css'

class Cart extends Component {
  state = {
    isEmpty: true,
    isSuccess: false,
    classCon: 'display',
    totalCost: 0,
    rerender: false,
  }

  componentDidMount() {
    this.checkTheItems()
  }

  checkTheItems = () => {
    const k = Object.entries(localStorage).map(([valueJSON]) => valueJSON)
    if (k.length === 0) {
      this.setState(pre => ({isEmpty: !pre.isEmpty}))
    }
    const h = Object.entries(localStorage).map(
      ([key, valueJSON]) =>
        parseInt(valueJSON.split(',')[2], 10) *
        parseInt(valueJSON.split(',')[0], 10),
    )
    this.setState(pre => ({isEmpty: !pre.isEmpty}))
    const total = h.reduce((a, b) => a + b, 0)
    this.setState({totalCost: total})
  }

  setPayment = () => {
    this.setState({isSuccess: true, classCon: 'main-toggle-container'})
    localStorage.clear()
  }

  clearTheItems = () => {
    localStorage.clear()
  }

  setMinus = (m, k) => {
    const d = Object.entries(localStorage).filter(
      ([key, valueJSON]) => key === m,
    )
    const hy = parseInt(k, 10) - 1
    if (hy === 0) {
      localStorage.removeItem(`${m}`)
      this.setState({rerender: true})
    } else {
      localStorage.setItem(
        `${m}`,
        `${parseInt(k, 10) - 1},${d[0][1].split(',')[1]},${
          d[0][1].split(',')[2]
        }`,
      )
      this.setState({rerender: true})
    }
    const h = Object.entries(localStorage).map(
      ([key, valueJSON]) =>
        parseInt(valueJSON.split(',')[2], 10) *
        parseInt(valueJSON.split(',')[0], 10),
    )
    const total = h.reduce((a, b) => a + b, 0)
    this.setState({totalCost: total})
  }

  setPlus = (m, k) => {
    const d = Object.entries(localStorage).filter(
      ([key, valueJSON]) => key === m,
    )
    localStorage.setItem(
      `${m}`,
      `${parseInt(k, 10) + 1},${d[0][1].split(',')[1]},${
        d[0][1].split(',')[2]
      }`,
    )
    this.setState({rerender: true})
    const h = Object.entries(localStorage).map(
      ([key, valueJSON]) =>
        parseInt(valueJSON.split(',')[2], 10) *
        parseInt(valueJSON.split(',')[0], 10),
    )
    const total = h.reduce((a, b) => a + b, 0)
    this.setState({totalCost: total})
  }

  getTheUpdatedMenu = () =>
    Object.entries(localStorage).map(([key, valueJSON]) => (
      <li className="cart" key={key}>
        <div className="main-cart-container">
          <img
            src={valueJSON.split(',')[1]}
            alt="img"
            className="cart-images"
          />
          <div className="mobile">
            <p className="item-name">{key}</p>
          </div>
        </div>

        <div className="final-quantity">
          <div className="mobile-two">
            <p className="item-name">{key}</p>
          </div>
          <div className="quantity">
            <AiOutlineMinusSquare
              onClick={() => this.setMinus(key, valueJSON.split(',')[0])}
            />
            <p className="quantity-two">{valueJSON.split(',')[0]}</p>
            <AiOutlinePlusSquare
              onClick={() => this.setPlus(key, valueJSON.split(',')[0])}
              id={key}
            />
          </div>
          <div className="price">
            <p>
              <BiRupee />
              {valueJSON.split(',')[2]}.00
            </p>
          </div>
        </div>
      </li>
    ))

  render() {
    const {isEmpty, isSuccess, classCon, totalCost} = this.state

    return (
      <>
        {isSuccess && (
          <>
            <Header />
            <div className="cart-empty-container-two">
              <div className="payment-successful">
                <img src={green} alt="tick" />
                <h1>Payment Successful</h1>
                <p className="thank-you">
                  Thank you for ordering Your payment is successfully completed.
                </p>
                <Link to="/">
                  <button type="button" className="button-home">
                    Go to Home Page
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
        <div className={classCon}>
          {isEmpty ? (
            <>
              <Header />
              <div className="cart-empty-container">
                <img src={empty} alt="empty-cart" className="image-small" />
                <h1 className="no-order">No Orders Yet!</h1>
                <p className="no-order-para">
                  Your cart is empty. Add something from the menu.
                </p>
                <Link to="/">
                  <button type="button" className="no-order-button">
                    Order Now
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <Header />
              <div className="cart-height">
                <div className="cart-container">
                  <div className="cart-fina">
                    <p className="head-place">Item</p>
                    <div className="final-quantitys">
                      <p className="head-place">Quantity</p>
                      <p className="head-place">Price</p>
                    </div>
                  </div>
                  {this.getTheUpdatedMenu()}
                  <hr className="cart-ruler" />
                  <div className="cart-final">
                    <p className="order-total">Order Total: </p>
                    <div className="cash">
                      <BiRupee />
                      <p>{totalCost}</p>
                    </div>
                  </div>
                  <button
                    className="place-order"
                    type="button"
                    onClick={this.setPayment}
                  >
                    Place Order
                  </button>
                </div>
              </div>
              <Footer />
            </>
          )}
        </div>
      </>
    )
  }
}

export default Cart
