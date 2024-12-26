import React from 'react'
import './Slide.scss'
import Slider from 'infinite-react-carousel'
import PropTypes from 'prop-types';


const Slide = ({children, slidesToShow, arrowsScroll}) => {
  return (
    <div>
      <div className="slide">
        <div className="container">
            <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll} >
                {children}
            </Slider>
        </div>
      </div>
    </div>
  )
}
Slide.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
export default Slide
