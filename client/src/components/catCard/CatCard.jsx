import React from 'react'
import PropTypes from 'prop-types';
import './CatCard.scss'
import { Link } from 'react-router-dom'
// import Slider from 'infinite-react-carousel'

const CatCard = ({ item }) => {
  return (
    <Link to='/gigs?cat=design'>
      <div className="catCard">
        <img src={item.img} alt={item.title} />
        <span className='desc'>{item.desc}</span>
        <span className='title'>{item.title}</span>
      </div>
    </Link>
  );
};
CatCard.propTypes = {
  item: PropTypes.shape({
    img: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default CatCard;

