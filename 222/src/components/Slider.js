import React, { useState } from 'react';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
      <h2>Slider</h2>
      <button onClick={handlePrev}>Previous</button>
      <img src={`images/${images[currentIndex]}`} alt={`Image ${currentIndex + 1}`} />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Slider;
