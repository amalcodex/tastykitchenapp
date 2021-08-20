import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import AutoPlay from '../Carousal'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Offers extends Component {
  state = {
    images: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOffers()
  }

  getOffers = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.offers.map(image => ({
        imageUrl: image.image_url,
      }))
      this.setState({
        images: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderOffersList = () => {
    const {images} = this.state
    return (
      <div className="carousal">
        <AutoPlay images={images} />
      </div>
    )
  }

  renderFailureView = () => <h1>No Offers</h1>

  renderLoadingView = () => (
    <div className="carousal">
      <Loader type="Circles" color="#f7931e" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOffersList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default Offers
