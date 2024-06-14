import React from 'react';
import styles from './Datacard.module.css'

const Datacard = React.forwardRef(({data , onFocus}, ref) => {
  return (
    <button onFocus={onFocus} className={styles.card} ref={ref}>
          <img src={data.ImgUrl} className={styles.cardimg}></img>
    </button>
  )
})

export default Datacard
