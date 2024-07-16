import { forwardRef } from 'react'
import styles from './Datacard.module.css'
import React, { useState, useEffect, useCallback } from 'react';

const Datacard = forwardRef(({ data, onFocus, modalshow, getmoviehover }, refs) => {
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = useCallback(() => {
    const id = setTimeout(() => {
      getmoviehover(data);
      modalshow();
    }, 1000);
    setTimeoutId(id);
  }, [data, getmoviehover, modalshow]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [timeoutId]);

  const handleFocusOrClick = useCallback(() => {
    handleMouseLeave();
    onFocus();
  }, [handleMouseLeave, onFocus]);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocusOrClick}
      onClick={handleFocusOrClick}
      onDoubleClick={() => { getmoviehover(data); modalshow(); }}
      className={styles.card}
      ref={refs}
    >
      <img src={data.ImgUrl} draggable='false' className={styles.cardimg} alt={data.title} />
    </button>
  );
});

export default Datacard;