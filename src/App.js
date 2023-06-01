import './App.css';
import { motion, useAnimation } from 'framer-motion';
import images from './images';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const controls = useAnimation();

  useEffect(() => {
    console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  const handlePrev = () => {
    controls.start({ x: 0 });
  };

  const handleNext = () => {
    controls.start({ x: -width });
  };

  return (
    <div className="App">
      <motion.div ref={carousel} className="carousel">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: 'grabbing' }}
          className="inner-carousel"
          animate={controls}
        >
          {images.map((image, index) => (
            <motion.div className="item" key={index}>
              <img src={image} alt={`cat ${index + 1}`} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <div className="controls">
        <button onClick={handlePrev}>Start</button>
        <button onClick={handleNext}>End</button>
      </div>
    </div>
  );
}

export default App;
