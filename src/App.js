import './App.css';
import { motion, useAnimation } from 'framer-motion';
import images from './images';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const controls = useAnimation();

  const [leftMove, setLeftMove] = useState(200);
  const [rightMove, setRightMove] = useState(200);

  useEffect(() => {
    console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  const handlePrev = () => {
    controls.start({ x: -leftMove });
  };

  const handleNext = () => {
    controls.start({ x: rightMove });
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
        <button onClick={() => {
          setLeftMove(leftMove + 200);
          setRightMove(rightMove - 200);
          handlePrev();
        }}>Left</button>
        <button onClick={() => {
          setRightMove(rightMove + 200);
          setLeftMove(leftMove - 200);
          handleNext();
        }}>Right</button>
      </div>
    </div>
  );
}

export default App;
