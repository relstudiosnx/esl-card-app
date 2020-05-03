import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const InfiniteScroll = ({ children, onIsAtBottomChange }) => {

  const [isAtBottom, setIsAtBottom] = useState(false);
  const nodeReference               = useRef(null);

  const updateBottomChange = () => {
    onIsAtBottomChange(isAtBottom);
  };

  const onScroll = () => {
    window.addEventListener('scroll', function() {
      if(nodeReference && nodeReference.current) {
        setIsAtBottom(window.innerHeight + window.scrollY >= nodeReference.current.offsetTop);
      }
    });
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