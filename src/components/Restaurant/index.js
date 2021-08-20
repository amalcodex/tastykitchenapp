import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const Restaurant = props => {
  const onChangeSortby = event => {
    const {updateActiveOption} = props
    updateActiveOption(event.target.value)
  }

  const {sortByOption, activeSort} = props
  return (
    <>
      <h1 className="main-head">Popular Restaurants</h1>
      <div className="paragraph-container">
        <p className="paragraph-two-main">
          Select Your favourite restaurent special dish and make your day
          happy..
        </p>
        <div className="name-and-filter">
          <BsFilterRight />
          <p className="small-para">Sort by</p>
          <select
            className="sort-by-select"
            value={activeSort}
            onChange={onChangeSortby}
          >
            {sortByOption.map(eachOption => (
              <option
                key={eachOption.textId}
                value={eachOption.text}
                className="select-option"
              >
                {eachOption.text}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr />
    </>
  )
}

export default Restaurant
