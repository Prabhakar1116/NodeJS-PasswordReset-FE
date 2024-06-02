// importing React
import React, { useState } from 'react';

// importing Card component
const Card = ({ name, price, imageUrl, sale, details, value, setValue }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

// creating function for add to cart
  const addToCart = () => {
    setIsAddedToCart(true);
    setValue((prevValue) => prevValue + 1);
  };

// creating function for remove from cart
  const removeFromCart = () => {
    setIsAddedToCart(false);
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    }
  };

  return (
    <div className="col mb-5">
      <div className="card h-100">
        {sale && <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>}
        <img className="card-img-top" src={imageUrl} alt="..." />
        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">{name}</h5>
            <p className='fw-smaller'>{details}</p>
            {sale ? (
              <span className="text-muted text-decoration-line-through">{price}</span>
            ) : (
              <span>{price}</span>
            )}
          </div>
        </div>
        {/* Product styling*/}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            {/* Display button with  cart status */}
            {isAddedToCart ? (
              <button className="btn btn-outline-dark mt-auto" onClick={removeFromCart}>
                Remove from cart
              </button>
            ) : (
              <button className="btn btn-outline-dark mt-auto" onClick={addToCart}>
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
