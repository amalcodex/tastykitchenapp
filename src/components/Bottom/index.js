import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
  AiFillStar,
} from 'react-icons/all'
import Restaurant from '../Restaurant'

import './index.css'

const sortByOption = [
  {
    text: 'Highest',
    textId: 'HIGHEST',
  },
  {
    text: 'Lowest',
    textId: 'LOWEST',
  },
]

class Bottom extends Component {
  state = {
    restaurantList: [],
    isLoading: false,
    activePage: 1,
    pagination: 0,
    limit: 9,
    offset: 0,
    activeSort: sortByOption[0].text,
  }

  componentDidMount() {
    this.getRestaurant()
  }

  updateActiveOption = activeSort => {
    this.setState({activeSort}, this.getRestaurant)
  }

  getRestaurant = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {activeSort, limit, offset} = this.state

    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeSort}`
    console.log(apiUrl)

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.restaurants.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
        type: each.menu_type,
        rating: each.user_rating.rating,
        totalReviews: each.user_rating.total_reviews,
        color: each.user_rating.rating_color,
        id: each.id,
      }))

      this.setState({
        restaurantList: updatedData,
        isLoading: false,
        pagination: Math.ceil(data.total / 9),
      })
    }
  }

  onClickRightPage = () => {
    const {offset, activePage, pagination, limit} = this.state
    if (activePage === 4) {
      this.setState({activePage: 4})
    } else {
      this.setState(prev => ({
        offset: prev.offset + 9,
        activePage: prev.activePage + 1,
      }))
      this.getRestaurant()
    }
  }

  onClickLeftPage = () => {
    const {offset, activePage, limit} = this.state
    if (activePage === 1) {
      this.setState({activePage: 1})
    } else {
      this.setState(prev => ({
        offset: prev.offset - 9,
        activePage: prev.activePage - 1,
      }))
      this.getRestaurant()
    }
  }

  renderProductsList = () => {
    const {restaurantList, activePage, activeSort, pagination} = this.state
    return (
      <>
        <Restaurant
          sortByOption={sortByOption}
          updateActiveOption={this.updateActiveOption}
          activeSort={activeSort}
        />
        <div className="container-one">
          {restaurantList.map(each => (
            <Link to={`/restaurant/${each.id}`} className="link" key={each.id}>
              <li className="restaurant-container">
                <div>
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="restaurant-image"
                  />
                </div>
                <div className="details">
                  <div>
                    <div className="res-name-container">
                      <h1 className="name-res">{each.name}</h1>
                    </div>
                    <p className="type">{each.type}</p>
                    <div className="align-rating">
                      <p className="rating">
                        <span style={{color: `#${each.color}`}}>
                          <AiFillStar />
                        </span>
                        {each.rating}{' '}
                        <span className="rate">
                          ({each.totalReviews} rating)
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </div>
        <div className="pagination">
          <AiOutlineMinusSquare
            className="common"
            onClick={this.onClickLeftPage}
          />
          <p>
            {activePage} of {pagination}
          </p>
          <AiOutlinePlusSquare
            className="common"
            onClick={this.onClickRightPage}
          />
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader">
      <Loader type="Circles" color="#F7931E" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return <>{isLoading ? this.renderLoader() : this.renderProductsList()}</>
  }
}

export default Bottom
