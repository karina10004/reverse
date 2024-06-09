import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

function App() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      const url = 'https://the-vegan-recipes-db.p.rapidapi.com/';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'a470565484mshfb17c398ac3fb71p135af4jsneaf020816deb',
          'x-rapidapi-host': 'the-vegan-recipes-db.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setSlides(result);
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };

    fetchSlides();
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className={`max-w-[1200px] h-[550px] w-full m-auto pb-2 px-4 relative group`}>
      {slides.length > 0 && (
        <>
          <div
            style={{ backgroundImage: `url(${slides[currentIndex]?.image})` }}
            className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
          ></div>
          {/* Left Arrow */}
          <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>
          {/* Right Arrow */}
          <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
          <div className='flex top-4 justify-center py-2'>
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className='text-2xl cursor-pointer'
              >
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
