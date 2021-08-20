import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/all'
import Header from '../Header'
import Footer from '../Footer'
import Each from '../Each'
import './index.css'

class RestaurantDetails extends Component {
  state = {
    restuarant: {},
    isLoading: false,
  }

  componentDidMount() {
    this.getTheData()
  }

  getTheData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        imageUrl: data.image_url,
        name: data.name,
        cuisine: data.cuisine,
        foodItems: data.food_items,
        costForTwo: data.cost_for_two,
        itemsCount: data.items_count,
        reviewsCount: data.reviews_count,
        rating: data.rating,
        opensAt: data.opens_at,
        location: data.location,
      }
      if (updatedData) {
        this.setState({
          restuarant: updatedData,
          isLoading: true,
        })
      }
    }
  }

  renderProductsList = () => {
    const {restuarant} = this.state
    return (
      <>
        <div className="top-banner">
          <div className="top-details">
            <div>
              <img src={restuarant.imageUrl} alt="main" className="res-image" />
            </div>
            <div className="res-name">
              <h1 className="main-head-name">{restuarant.name}</h1>
              <p className="cuisine">{restuarant.cuisine}</p>
              <p className="location-res">{restuarant.location}</p>
              <div className="small-view">
                <div>
                  <p className="star-rating">
                    <AiFillStar />
                    {restuarant.rating}
                  </p>
                  <p className="star-rating ratings-main">
                    {restuarant.reviewsCount} + Ratings
                  </p>
                </div>
                <hr className="ruler" />
                <div>
                  <p className="star-rating">{restuarant.costForTwo}</p>
                  <p className="star-rating cost-for-two">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fix">
          <Each foodItems={restuarant.foodItems} />
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

    return (
      <>
        <Header />
        {!isLoading ? this.renderLoader() : this.renderProductsList()}
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
