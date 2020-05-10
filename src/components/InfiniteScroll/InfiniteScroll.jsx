import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

const InfiniteScroll = ({ children, onIsAtBottomChange }) => {

  const [isAtBottom, setIsAtBottom] = useState(false);
  const nodeReference               = useRef(null);

  const updateBottomChange = () => {
    onIsAtBottomChange(isAtBottom);
  };

  const onScroll = () => {
    const onScroll = throttle(() => {
      if(nodeReference && nodeReference.current) {
        setIsAtBottom(window.innerHeight + window.scrollY >= nodeReference.current.offsetTop);
      }
    }, 100);
    window.addEventListener('scroll', onScroll);
  };

  useEffect(updateBottomChange, [isAtBottom, onIsAtBottomChange]);

  useEffect(onScroll, []);

  return (
    <div className="hsp-cards-wrapper">
      {children}
      <div ref={nodeReference} />
    </div>
  )
}

InfiniteScroll.propTypes = {
  children: PropTypes.node.isRequired,
  onIsAtBottomChange: PropTypes.func.isRequired
};

export default InfiniteScroll;