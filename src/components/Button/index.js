import {Component} from 'react'

import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/all'

import './index.css'

class Button extends Component {
  state = {isAdded: false, itemNumber: 1}

  getTheDetails = foodItems => {
    const {itemNumber} = this.state
    this.setState({isAdded: true})
    localStorage.setItem(
      `${foodItems.name}`,
      `${itemNumber}, ${foodItems.url}, ${foodItems.cost}`,
    )
  }

  addItemCart = foodItems => {
    const {itemNumber} = this.state
    this.setState(prevState => ({itemNumber: prevState.itemNumber + 1}))
    localStorage.setItem(
      `${foodItems.name}`,
      `${itemNumber + 1}, ${foodItems.url}, ${foodItems.cost}`,
    )
  }

  minusItemCart = foodItems => {
    const {itemNumber} = this.state
    this.setState(prevState => ({itemNumber: prevState.itemNumber - 1}))
    localStorage.setItem(
      `${foodItems.name}`,
      `${itemNumber - 1}, ${foodItems.url}, ${foodItems.cost}`,
    )
    if (itemNumber <= 1) {
      this.setState({isAdded: false, itemNumber: 1})
      localStorage.removeItem(`${foodItems.name}`)
    }
  }

  render() {
    const {isAdded, itemNumber} = this.state
    const {foodItems} = this.props
    return (
      <>
        {!isAdded ? (
          <button
            type="button"
            className="add-button-details"
            onClick={() => this.getTheDetails(foodItems)}
          >
            ADD
          </button>
        ) : (
          <div className="add-button-second">
            <button
              type="button"
              className="add-button-two"
              onClick={() => this.minusItemCart(foodItems)}
            >
              <AiOutlineMinusSquare />
            </button>
            <p>{itemNumber}</p>
            <button
              type="button"
              className="add-button-two"
              onClick={() => this.addItemCart(foodItems)}
            >
              <AiOutlinePlusSquare />
            </button>
          </div>
        )}
      </>
    )
  }
}
export default Button
