import {AiFillStar, BiRupee} from 'react-icons/all'
import Button from '../Button'

import './index.css'

const Each = props => {
  const {foodItems} = props

  return (
    <div className="box-items">
      {foodItems.map(each => (
        <div key={each.id} style={{listStyle: 'none'}} className="list-view">
          <div className="view-list-container">
            <div>
              <img src={each.image_url} alt="hoem" className="small-image" />
            </div>
            <div className="view-container">
              <div>
                <div className="item-namez">
                  <h1 className="i-name">{each.name}</h1>
                </div>
                <div className="rupees">
                  <BiRupee />
                  <p className="item-costs">{each.cost}</p>
                </div>
                <div className="rating-star">
                  <AiFillStar />
                  <p className="items-ratings">{each.rating}</p>
                </div>
                <div>
                  <Button
                    foodItems={{
                      name: each.name,
                      cost: each.cost,
                      url: each.image_url,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Each
