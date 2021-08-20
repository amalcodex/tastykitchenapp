import {Component} from 'react'
import Slider from 'react-slick'

import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class AutoPlay extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      arrows: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      autoplay: true,
    }
    const {images} = this.props
    return (
      <Slider {...settings}>
        {images.map(each => (
          <div className="container-carousal" key={each.imageUrl}>
            <img className="image" src={each.imageUrl} alt="img" />
          </div>
        ))}
      </Slider>
    )
  }
}

export default AutoPlay
