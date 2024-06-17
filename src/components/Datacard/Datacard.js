import { forwardRef } from 'react'
import styles from './Datacard.module.css'
import DetailPopup from '../DetailPopup/DetailPopup'

const Datacard = forwardRef(({ data, onFocus, modalshow, getmoviehover }, ref) => {
  let timeoutId;
  function handleMouseEnter() {
    timeoutId = setTimeout(() => {
      getmoviehover(data);
      modalshow(true);
    }, 1000); 
  }
  function handleMouseLeave() {
    clearTimeout(timeoutId); 
  }
  return (
    <button 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={onFocus} 
      className={styles.card} 
      ref={ref}
    >
      <img src={data.ImgUrl} draggable='false' className={styles.cardimg}></img>
    </button>
  )
})

export default Datacard;